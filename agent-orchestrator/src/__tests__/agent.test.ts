import { describe, it, expect } from 'vitest';
import { runAgent, streamAgent } from '../../src/agent';
import { defineTool } from '../../src/tools';
import { makeMemory } from '../../src/memory';
import { makeLLMMock } from '../../src/llm';

describe('agent-orchestrator', () => {
  it('runs with mock LLM and returns final answer', async () => {
    const llm = makeLLMMock({ responses: [{ role: 'assistant', content: 'Final answer.' }] });
    const res = await runAgent({ goal: 'Test', tools: [], memory: makeMemory(), llm });
    expect(res.finalAnswer).toContain('Final');
    expect(res.steps.length).toBeGreaterThan(0);
  });

  it('streams chunks', async () => {
    const chunks: string[] = [];
    const llm = makeLLMMock({ streamChunks: ['A', 'B', 'C'] });
    const res = await streamAgent({ goal: 'Stream', tools: [], memory: makeMemory(), llm }, (c) => chunks.push(c));
    expect(chunks.join('')).toBe('ABC');
    expect(res.finalAnswer.length).toBeGreaterThan(0);
  });
});


