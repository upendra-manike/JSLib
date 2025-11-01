/**
 * Deep clone object/array preserving types
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as T;
  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  return obj;
}

/**
 * Deep merge two objects
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

/**
 * Deep pick keys from nested object immutably
 */
export function deepPick<T extends Record<string, any>>(
  obj: T,
  keys: string[]
): Partial<T> {
  const result: Partial<T> = {};
  keys.forEach((key) => {
    if (key in obj) {
      const value = obj[key];
      if (isObject(value) && !Array.isArray(value)) {
        const nestedKeys = keys.filter((k) => k.startsWith(`${key}.`)).map((k) => k.substring(key.length + 1));
        if (nestedKeys.length > 0) {
          result[key] = deepPick(value, nestedKeys) as any;
        } else {
          result[key] = value;
        }
      } else {
        result[key] = value;
      }
    }
  });
  return result;
}

/**
 * Deep omit keys from nested object immutably
 */
export function deepOmit<T extends Record<string, any>>(
  obj: T,
  keys: string[]
): Partial<T> {
  const result = { ...obj };
  keys.forEach((key) => {
    if (key.includes('.')) {
      const [firstKey, ...rest] = key.split('.');
      if (firstKey in result && isObject(result[firstKey])) {
        (result[firstKey] as any) = deepOmit(result[firstKey], [rest.join('.')]);
      }
    } else {
      delete result[key];
    }
  });
  return result;
}

/**
 * Flatten nested object
 */
export function flattenObject(
  obj: Record<string, any>,
  prefix: string = '',
  separator: string = '.'
): Record<string, any> {
  const flattened: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}${separator}${key}` : key;
      if (isObject(obj[key]) && !Array.isArray(obj[key])) {
        Object.assign(flattened, flattenObject(obj[key], newKey, separator));
      } else {
        flattened[newKey] = obj[key];
      }
    }
  }
  return flattened;
}

/**
 * Safely get nested property
 */
export function getNested<T = any>(
  obj: any,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== undefined ? result : defaultValue;
}

/**
 * Set nested property
 */
export function setNested(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || !isObject(current[key])) {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}

function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}

