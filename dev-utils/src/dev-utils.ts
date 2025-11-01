/**
 * Logger with timestamp and optional context
 */
export function logger(context?: string) {
  return {
    log: (...args: any[]) => {
      const prefix = context ? `[${context}]` : '';
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}]${prefix}`, ...args);
    },
    error: (...args: any[]) => {
      const prefix = context ? `[${context}]` : '';
      const timestamp = new Date().toISOString();
      console.error(`[${timestamp}]${prefix}`, ...args);
    },
    warn: (...args: any[]) => {
      const prefix = context ? `[${context}]` : '';
      const timestamp = new Date().toISOString();
      console.warn(`[${timestamp}]${prefix}`, ...args);
    },
  };
}

/**
 * Measure execution time of function (sync or async)
 */
export async function measureTime<T>(
  fn: () => T | Promise<T>,
  label?: string
): Promise<{ result: T; time: number }> {
  const start = performance.now();
  const result = await fn();
  const time = performance.now() - start;
  if (label) {
    logger().log(`${label} took ${time.toFixed(2)}ms`);
  }
  return { result, time };
}

/**
 * Parse query string to object
 */
export function parseQueryString(query: string): Record<string, string> {
  const params: Record<string, string> = {};
  if (!query || !query.trim()) return params;
  
  const search = query.startsWith('?') ? query.slice(1) : query;
  search.split('&').forEach((pair) => {
    const [key, value] = pair.split('=').map(decodeURIComponent);
    if (key) {
      params[key] = value || '';
    }
  });
  
  return params;
}

/**
 * Build query string from object
 */
export function buildQueryString(params: Record<string, any>): string {
  const pairs: string[] = [];
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value != null) {
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  });
  return pairs.length > 0 ? `?${pairs.join('&')}` : '';
}

/**
 * Simple pub-sub event emitter
 */
export class EventEmitter {
  private events: Map<string, Set<Function>> = new Map();

  on(event: string, listener: Function): void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(listener);
  }

  off(event: string, listener: Function): void {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.delete(listener);
    }
  }

  emit(event: string, ...args: any[]): void {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach((listener) => {
        try {
          listener(...args);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  once(event: string, listener: Function): void {
    const onceListener = (...args: any[]) => {
      listener(...args);
      this.off(event, onceListener);
    };
    this.on(event, onceListener);
  }

  removeAllListeners(event?: string): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
}

