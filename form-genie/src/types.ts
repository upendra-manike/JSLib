import type { ReactNode } from 'react';

export interface FieldConfig {
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  conditional?: {
    field: string;
    value: any;
    show: boolean;
  };
}

export interface FormGenieProps {
  schema: FieldConfig[] | Record<string, any>;
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  defaultValues?: Record<string, any>;
  className?: string;
  renderField?: (field: FieldConfig, value: any, onChange: (value: any) => void) => ReactNode;
}

