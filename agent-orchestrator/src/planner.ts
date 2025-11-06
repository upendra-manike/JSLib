import type { AgentInput, AgentStep } from './types';

export async function planSteps(goal: string, context: string[] = []): Promise<AgentStep[]> {
  const first = context.length ? `Use context: ${context.slice(0, 2).join('; ')}` : 'Plan execution';
  return [
    { name: 'plan', summary: first },
  ];
}

