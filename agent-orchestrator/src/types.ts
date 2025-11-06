export interface ToolContext {}

export interface ToolResult { text?: string; data?: unknown }

export interface Tool {
  name: string;
  schema: any; // JSONSchema (kept minimal to avoid deps)
  run: (args: unknown, ctx: ToolContext) => Promise<ToolResult>;
}

export interface MemoryItem {
  key: string;
  content: string;
  tags?: string[];
}

export interface MemoryStore {
  put(item: MemoryItem): Promise<void>;
  search(query: string, k?: number): Promise<MemoryItem[]>;
}

export interface LLMMessage { role: 'system' | 'user' | 'assistant'; content: string }

export interface LLMUsage { promptTokens: number; completionTokens: number; usd: number }

export interface LLMClient {
  chat(messages: LLMMessage[], opts?: { stream?: (chunk: string) => void }): Promise<{ content: string; usage: LLMUsage }>
}

export interface AgentInput {
  goal: string;
  context?: string[];
  budget?: { maxTokens?: number; maxCostUSD?: number };
  tools?: Tool[];
  memory?: MemoryStore;
  llm: LLMClient;
}

export interface AgentStep {
  name: string;
  toolUsed?: { name: string };
  summary: string;
  output?: string;
}

export interface AgentResult {
  finalAnswer: string;
  steps: AgentStep[];
  cost: LLMUsage;
  telemetry: TelemetryEvent[];
}

export type TelemetryEvent = {
  type: string;
  at: number;
  meta?: Record<string, unknown>;
};

