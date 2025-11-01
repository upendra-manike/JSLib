/**
 * Type guard for checking if value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Type guard for checking if value is null or undefined
 */
export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Type guard for checking if value is an array
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

/**
 * Type guard for checking if value is an object (not null, not array)
 */
export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Type guard for checking if value is a string
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}

/**
 * Type guard for checking if value is a number
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Type guard for checking if value is a function
 */
export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

/**
 * Type guard for checking if value is a Promise
 */
export function isPromise<T = any>(value: any): value is Promise<T> {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.then === 'function' &&
    typeof value.catch === 'function'
  );
}

