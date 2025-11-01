export type EnvType = 'string' | 'number' | 'boolean' | 'url' | 'email';

export interface EnvSchema {
  [key: string]: EnvType | {
    type: EnvType;
    required?: boolean;
    default?: string | number | boolean;
  };
}

