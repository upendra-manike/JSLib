import React, { useState } from 'react';
import type { FormGenieProps, FieldConfig } from './types';

export function FormGenie({
  schema,
  onSubmit,
  defaultValues = {},
  className = '',
  renderField,
}: FormGenieProps) {
  const [formData, setFormData] = useState<Record<string, any>>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fields: FieldConfig[] = Array.isArray(schema)
    ? schema
    : Object.entries(schema).map(([name, config]) => ({
        name,
        ...(typeof config === 'object' ? config : { type: config as any }),
      }));

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateField = (field: FieldConfig, value: any): string | null => {
    if (field.required && (!value || value.toString().trim() === '')) {
      return `${field.label || field.name} is required`;
    }

    if (value && field.validation) {
      if (field.type === 'number') {
        const num = Number(value);
        if (field.validation.min !== undefined && num < field.validation.min) {
          return field.validation.message || `Must be at least ${field.validation.min}`;
        }
        if (field.validation.max !== undefined && num > field.validation.max) {
          return field.validation.message || `Must be at most ${field.validation.max}`;
        }
      }

      if (field.validation.pattern && field.type === 'text') {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(value)) {
          return field.validation.message || 'Invalid format';
        }
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const value = formData[field.name];
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const shouldShowField = (field: FieldConfig): boolean => {
    if (!field.conditional) return true;
    const conditionalValue = formData[field.conditional.field];
    return field.conditional.value === conditionalValue ? field.conditional.show : !field.conditional.show;
  };

  const renderInput = (field: FieldConfig) => {
    if (renderField) {
      return renderField(field, formData[field.name] || '', (value) => handleChange(field.name, value));
    }

    const value = formData[field.name] || '';
    const error = errors[field.name];

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.name}>
            <label>
              {field.label || field.name}
              {field.required && <span style={{ color: 'red' }}>*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
            />
            {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
          </div>
        );

      case 'select':
        return (
          <div key={field.name}>
            <label>
              {field.label || field.name}
              {field.required && <span style={{ color: 'red' }}>*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
            >
              <option value="">Select...</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name}>
            <label>
              <input
                type="checkbox"
                checked={!!value}
                onChange={(e) => handleChange(field.name, e.target.checked)}
                required={field.required}
              />
              {field.label || field.name}
              {field.required && <span style={{ color: 'red' }}>*</span>}
            </label>
            {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
          </div>
        );

      default:
        return (
          <div key={field.name}>
            <label>
              {field.label || field.name}
              {field.required && <span style={{ color: 'red' }}>*</span>}
            </label>
            <input
              type={field.type}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              min={field.type === 'number' ? field.validation?.min : undefined}
              max={field.type === 'number' ? field.validation?.max : undefined}
              pattern={field.validation?.pattern}
            />
            {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {fields.filter(shouldShowField).map(renderInput)}
      <button type="submit">Submit</button>
    </form>
  );
}

