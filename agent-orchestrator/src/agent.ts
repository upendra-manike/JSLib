import type { AgentInput, AgentResult, AgentStep, Tool } from './types';
import { planSteps } from './planner';
import { validateArgs } from './tools';
import { makeTelemetry } from './telemetry';
import { capOutput, executeWithTimeout } from './sandbox';
import type { LLMUsage } from './types';

function addUsage(total: LLMUsage, delta: LLMUsage): LLMUsage {
  return {
    promptTokens: total.promptTokens + delta.promptTokens,
    completionTokens: total.completionTokens + delta.completionTokens,
    usd: total.usd + delta.usd,
  };
}

function budgetExceeded(total: LLMUsage, budget?: { maxTokens?: number; maxCostUSD?: number }): boolean {
  if (!budget) return false;
  if (budget.maxTokens !== undefined && (total.promptTokens + total.completionTokens) > budget.maxTokens) return true;
  if (budget.maxCostUSD !== undefined && total.usd > budget.maxCostUSD) return true;
  return false;
}

function tryParseSteps(text: string): Array<{ name: string; tool?: string; args?: any }> | null {
  const m = text.match(/Steps:\s*(\[.*\])/s);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch { return null; }
}

export async function runAgent(input: AgentInput): Promise<AgentResult> {
  const telemetry = makeTelemetry();
  const steps: AgentStep[] = [];
  const toolsByName: Record<string, Tool> = Object.fromEntries((input.tools || []).map(t => [t.name, t]));
  telemetry.push('agent.start', { goal: input.goal });

  // Plan
  const planned = await planSteps(input.goal, input.context);
  steps.push(...planned);
  telemetry.push('agent.plan', { steps: planned.length });

  // Use LLM to produce plan/final stub
  let total: LLMUsage = { promptTokens: 0, completionTokens: 0, usd: 0 };
  const first = await input.llm.chat([
    { role: 'system', content: 'You are an orchestrator.' },
    { role: 'user', content: input.goal }
  ]);
  total = addUsage(total, first.usage);
  telemetry.push('llm.chat', { tokens: first.usage });

  // Optional: parse tool steps and execute
  const parsed = tryParseSteps(first.content);
  if (parsed && parsed.length) {
    for (const s of parsed) {
      if (!s.tool) { steps.push({ name: s.name, summary: 'No tool specified' }); continue; }
      const tool = toolsByName[s.tool];
      if (!tool) { steps.push({ name: s.name, summary: `Tool not found: ${s.tool}` }); continue; }
      const v = validateArgs(tool.schema, s.args);
      if (!v.ok) { steps.push({ name: s.name, toolUsed: { name: tool.name }, summary: `Invalid args: ${v.error}` }); continue; }
      telemetry.push('tool.start', { tool: tool.name });
      try {
        const result = await executeWithTimeout(() => tool.run(s.args, {}), { timeoutMs: 10_000 });
        const out = capOutput(result.text ?? JSON.stringify(result.data ?? ''), 262_144);
        steps.push({ name: s.name, toolUsed: { name: tool.name }, summary: 'Executed', output: out });
        telemetry.push('tool.end', { tool: tool.name });
      } catch (e: any) {
        steps.push({ name: s.name, toolUsed: { name: tool.name }, summary: `Tool error: ${e?.message || 'error'}` });
        telemetry.push('tool.error', { tool: tool.name, error: String(e) });
      }
    }
  }

  if (budgetExceeded(total, input.budget)) {
    return { finalAnswer: 'Stopped due to budget limit.', steps, cost: total, telemetry: telemetry.all() };
  }

  return { finalAnswer: first.content, steps, cost: total, telemetry: telemetry.all() };
}

export async function streamAgent(input: AgentInput, onChunk: (c: string) => void): Promise<AgentResult> {
  const telemetry = makeTelemetry();
  const steps: AgentStep[] = [];
  telemetry.push('agent.start', { goal: input.goal, stream: true });
  const planned = await planSteps(input.goal, input.context);
  steps.push(...planned);
  telemetry.push('agent.plan', { steps: planned.length });

  let total: LLMUsage = { promptTokens: 0, completionTokens: 0, usd: 0 };
  const first = await input.llm.chat([
    { role: 'system', content: 'You are an orchestrator.' },
    { role: 'user', content: input.goal }
  ], { stream: (c) => { onChunk(c); telemetry.push('llm.token'); } });
  total = addUsage(total, first.usage);
  telemetry.push('llm.chat', { tokens: first.usage });
  if (budgetExceeded(total, input.budget)) {
    return { finalAnswer: 'Stopped due to budget limit.', steps, cost: total, telemetry: telemetry.all() };
  }
  return { finalAnswer: first.content, steps, cost: total, telemetry: telemetry.all() };
}

