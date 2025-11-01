import type { AIMiniOptions, AIMiniResponse, Provider } from './types';

export class AIMini {
  private provider: Provider;
  private apiKey: string;
  private baseURL: string;
  private model: string;

  constructor(options: AIMiniOptions) {
    this.provider = options.provider;
    this.apiKey = options.apiKey;
    this.baseURL = options.baseURL || this.getDefaultBaseURL(options.provider);
    this.model = options.model || this.getDefaultModel(options.provider);
  }

  private getDefaultBaseURL(provider: Provider): string {
    const urls: Record<Provider, string> = {
      openai: 'https://api.openai.com/v1',
      claude: 'https://api.anthropic.com/v1',
      gemini: 'https://generativelanguage.googleapis.com/v1',
      groq: 'https://api.groq.com/openai/v1',
    };
    return urls[provider];
  }

  private getDefaultModel(provider: Provider): string {
    const models: Record<Provider, string> = {
      openai: 'gpt-3.5-turbo',
      claude: 'claude-3-sonnet-20240229',
      gemini: 'gemini-pro',
      groq: 'llama-3-8b-8192',
    };
    return models[provider];
  }

  async ask(prompt: string, systemPrompt?: string): Promise<AIMiniResponse> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0]?.message?.content || '',
      usage: data.usage,
    };
  }

  async summarize(text: string): Promise<string> {
    const response = await this.ask(
      `Summarize the following text:\n\n${text}`,
      'You are a helpful assistant that creates concise summaries.'
    );
    return response.content;
  }

  async extract(text: string, fields: string[]): Promise<Record<string, any>> {
    const response = await this.ask(
      `Extract the following fields from the text and return as JSON: ${fields.join(', ')}\n\nText: ${text}`,
      'You are a helpful assistant that extracts structured data. Return only valid JSON.'
    );
    try {
      return JSON.parse(response.content);
    } catch {
      return {};
    }
  }

  async classify(text: string, categories: string[]): Promise<string> {
    const response = await this.ask(
      `Classify the following text into one of these categories: ${categories.join(', ')}\n\nText: ${text}`,
      'You are a helpful assistant that classifies text. Return only the category name.'
    );
    return response.content.trim();
  }
}

