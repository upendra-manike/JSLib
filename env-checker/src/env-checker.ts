import type { EnvSchema, EnvType } from './types';

export function checkEnv(schema: EnvSchema): void {
  const missing: string[] = [];
  const invalid: string[] = [];

  for (const [key, config] of Object.entries(schema)) {
    const value = process.env[key];
    const typeConfig = typeof config === 'string' 
      ? { type: config as EnvType, required: true }
      : { required: true, ...config };

    // Check if required and missing
    if (typeConfig.required && !value && typeConfig.default === undefined) {
      missing.push(key);
      continue;
    }

    // Use default if provided
    const envValue = value || String(typeConfig.default ?? '');

    // Validate type if value exists
    if (envValue && typeConfig.type) {
      const isValid = validateType(envValue, typeConfig.type);
      if (!isValid) {
        invalid.push(`${key} (expected ${typeConfig.type})`);
      }
    }
  }

  if (missing.length > 0 || invalid.length > 0) {
    let errorMessage = 'Environment variable validation failed:\n\n';
    
    if (missing.length > 0) {
      errorMessage += `Missing required variables:\n${missing.map(k => `  - ${k}`).join('\n')}\n\n`;
    }
    
    if (invalid.length > 0) {
      errorMessage += `Invalid variable types:\n${invalid.map(k => `  - ${k}`).join('\n')}\n`;
    }

    throw new Error(errorMessage);
  }
}

export function validateEnv(schema: EnvSchema): Record<string, any> {
  checkEnv(schema);
  
  const result: Record<string, any> = {};
  
  for (const [key, config] of Object.entries(schema)) {
    const typeConfig = typeof config === 'string' 
      ? { type: config as EnvType, required: true }
      : { required: true, ...config };
    
    const value = process.env[key] || String(typeConfig.default ?? '');
    
    if (value) {
      result[key] = convertType(value, typeConfig.type);
    }
  }
  
  return result;
}

function validateType(value: string, type: EnvType): boolean {
  switch (type) {
    case 'string':
      return true;
    case 'number':
      return !isNaN(Number(value));
    case 'boolean':
      return value === 'true' || value === 'false' || value === '1' || value === '0';
    case 'url':
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    default:
      return true;
  }
}

function convertType(value: string, type: EnvType): any {
  switch (type) {
    case 'number':
      return Number(value);
    case 'boolean':
      return value === 'true' || value === '1';
    default:
      return value;
  }
}

