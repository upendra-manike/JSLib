import type { LLMClient, LLMMessage, LLMUsage } from './types';

interface MockOpts {
  responses?: { role: 'assistant'; content: string }[];
  streamChunks?: string[];
  tokenCost?: { prompt: number; completion: number };
}

export function makeLLMMock(opts: MockOpts): LLMClient {
  let idx = 0;
  const usage = { promptTokens: 0, completionTokens: 0, usd: 0 } as LLMUsage;
  return {
    async chat(messages: LLMMessage[], cfg?: { stream?: (chunk: string) => void }) {
      const promptTokens = messages.reduce((n, m) => n + Math.ceil(m.content.length / 4), 0);
      usage.promptTokens += promptTokens;
      let content = '';
      if (opts.streamChunks && cfg?.stream) {
        for (const c of opts.streamChunks) { cfg.stream(c); content += c; }
      } else if (opts.responses && idx < opts.responses.length) {
        content = opts.responses[idx++].content;
      } else {
        content = 'OK';
      }
      const completionTokens = Math.ceil(content.length / 4);
      usage.completionTokens += completionTokens;
      const cost = (opts.tokenCost?.prompt || 0) * promptTokens + (opts.tokenCost?.completion || 0) * completionTokens;
      usage.usd += cost;
      return { content, usage: { ...usage } };
    }
  };
}

