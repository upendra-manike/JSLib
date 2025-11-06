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
  const output = { ...target } as any;
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key] as any, source[key] as any);
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
  const result: any = {};
  keys.forEach((key) => {
    if (key in obj) {
      const value = obj[key];
      if (isObject(value) && !Array.isArray(value)) {
        const nestedKeys = keys.filter((k) => k.startsWith(`${key}.`)).map((k) => k.substring(key.length + 1));
        if (nestedKeys.length > 0) {
          result[key] = deepPick(value, nestedKeys);
        } else {
          result[key] = value;
        }
      } else {
        result[key] = value;
      }
    }
  });
  return result as Partial<T>;
}

/**
 * Deep omit keys from nested object immutably
 */
export function deepOmit<T extends Record<string, any>>(
  obj: T,
  keys: string[]
): Partial<T> {
  const result = { ...obj } as any;
  keys.forEach((key) => {
    if (key.includes('.')) {
      const [firstKey, ...rest] = key.split('.');
      if (firstKey in result && isObject(result[firstKey])) {
        result[firstKey] = deepOmit(result[firstKey] as any, [rest.join('.')]);
      }
    } else {
      delete result[key];
    }
  });
  return result as Partial<T>;
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

/**
 * Shallow clone object
 */
export function shallowClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return [...obj] as T;
  return { ...obj };
}

/**
 * Deep compare two objects for equality
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}

/**
 * Unflatten object (reverse of flatten)
 */
export function unflattenObject(
  obj: Record<string, any>,
  separator: string = '.'
): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const keys = key.split(separator);
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!(k in current) || !isObject(current[k])) {
        current[k] = {};
      }
      current = current[k];
    }
    current[keys[keys.length - 1]] = value;
  }
  return result;
}

/**
 * Remove undefined/null keys from object
 */
export function removeNullishKeys<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Convert Map to Object
 */
export function mapToObject<K extends string | number, V>(map: Map<K, V>): Record<K, V> {
  const obj = {} as Record<K, V>;
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}

/**
 * Convert Object to Map
 */
export function objectToMap<K extends string | number, V>(obj: Record<K, V>): Map<K, V> {
  const map = new Map<K, V>();
  for (const [key, value] of Object.entries(obj)) {
    map.set(key as K, value as V);
  }
  return map;
}

/**
 * Sort object keys alphabetically
 */
export function sortKeys<T extends Record<string, any>>(obj: T): T {
  const sorted: any = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    sorted[key] = obj[key];
  }
  return sorted as T;
}

/**
 * Pick specific keys from object (shallow)
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result: any = {};
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omit specific keys from object (shallow)
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result: any = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Count number of keys in object
 */
export function countKeys(obj: Record<string, any>): number {
  return Object.keys(obj).length;
}

/**
 * Find key by value
 */
export function findKeyByValue<T>(obj: Record<string, T>, value: T): string | undefined {
  for (const [key, val] of Object.entries(obj)) {
    if (val === value) return key;
  }
  return undefined;
}

/**
 * Invert object (swap keys and values)
 */
export function invertObject<T extends string | number, U extends string | number>(
  obj: Record<T, U>
): Record<U, T> {
  const inverted: any = {};
  for (const [key, value] of Object.entries(obj)) {
    inverted[value as U] = key as T;
  }
  return inverted;
}

/**
 * Get nested keys list (dot notation)
 */
export function getNestedKeys(obj: Record<string, any>, prefix: string = ''): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (isObject(value) && !Array.isArray(value)) {
      keys.push(...getNestedKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

/**
 * Freeze object recursively
 */
export function deepFreeze<T>(obj: T): T {
  Object.freeze(obj);
  for (const key in obj) {
    if (isObject(obj[key])) {
      deepFreeze(obj[key]);
    }
  }
  return obj;
}

/**
 * Validate object against schema (basic type checking)
 */
export function validateSchema(
  obj: Record<string, any>,
  schema: Record<string, string>
): boolean {
  for (const [key, expectedType] of Object.entries(schema)) {
    if (!(key in obj)) return false;
    const actualType = typeof obj[key];
    if (expectedType === 'array' && !Array.isArray(obj[key])) return false;
    if (expectedType !== 'array' && actualType !== expectedType) return false;
  }
  return true;
}

/**
 * Filter object by value type
 */
export function filterByType<T extends Record<string, any>>(
  obj: T,
  type: string
): Partial<T> {
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const valueType = Array.isArray(value) ? 'array' : typeof value;
    if (valueType === type) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Replace all values with default value
 */
export function replaceValues<T extends Record<string, any>>(
  obj: T,
  defaultValue: any
): Record<string, any> {
  const result: any = {};
  for (const key of Object.keys(obj)) {
    result[key] = defaultValue;
  }
  return result;
}

/**
 * Convert object to query string
 */
export function objectToQueryString(obj: Record<string, any>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    if (value != null) {
      params.append(key, String(value));
    }
  }
  return params.toString();
}

/**
 * Parse query string to object
 */
export function queryStringToObject(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const obj: Record<string, string> = {};
  for (const [key, value] of params) {
    obj[key] = value;
  }
  return obj;
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}

