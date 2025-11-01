/**
 * Creates a debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Creates a throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Creates a memoized function
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  keyFn?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = keyFn
      ? keyFn(...args)
      : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Composes functions from right to left
 */
export function compose<A, B, C>(
  f: (b: B) => C,
  g: (a: A) => B
): (a: A) => C;
export function compose<A, B, C, D>(
  f: (c: C) => D,
  g: (b: B) => C,
  h: (a: A) => B
): (a: A) => D;
export function compose(...fns: ((...args: any[]) => any)[]): any {
  return (arg: any) => fns.reduceRight((acc, fn) => fn(acc), arg);
}

/**
 * Pipes functions from left to right
 */
export function pipe<A, B, C>(
  f: (a: A) => B,
  g: (b: B) => C
): (a: A) => C;
export function pipe<A, B, C, D>(
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D
): (a: A) => D;
export function pipe(...fns: ((...args: any[]) => any)[]): any {
  return (arg: any) => fns.reduce((acc, fn) => fn(acc), arg);
}

