import type { Tool } from './types';

export function defineTool<T extends Tool>(tool: T): T { return tool; }

export function validateArgs(schema: any, args: unknown): { ok: boolean; error?: string } {
  // Minimal validation: check required keys exist
  try {
    if (!schema || typeof schema !== 'object') return { ok: true };
    const required: string[] = schema.required || [];
    const obj = args as any;
    for (const key of required) {
      if (!(key in obj)) return { ok: false, error: `Missing required arg: ${key}` };
    }
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Validation failed' };
  }
}

