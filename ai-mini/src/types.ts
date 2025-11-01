export type Provider = 'openai' | 'claude' | 'gemini' | 'groq';

export interface AIMiniOptions {
  provider: Provider;
  apiKey: string;
  baseURL?: string;
  model?: string;
}

export interface AIMiniResponse {
  content: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

