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

/**
 * Curry a function
 */
export function curry<A extends any[], R>(
  fn: (...args: A) => R
): <B extends Partial<A>>(...args: B) => B extends A ? R : ReturnType<typeof curry<A, R>> {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn(...(args as A));
    }
    return (...nextArgs: any[]) => curried(...args, ...nextArgs);
  } as any;
}

/**
 * Safe JSON parse with fallback
 */
export function jsonSafeParse<T = any>(json: string, fallback: T | null = null): T | null {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * LRU Cache implementation
 */
export class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key)!;
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

/**
 * LRU Cache with TTL support
 */
export class LRUCacheTTL<K, V> {
  private capacity: number;
  private ttlMs: number;
  private cache: Map<K, { value: V; expiresAt: number | null }>;

  constructor(capacity: number, ttlMs: number) {
    this.capacity = capacity;
    this.ttlMs = ttlMs;
    this.cache = new Map();
  }

  private isExpired(entry: { value: V; expiresAt: number | null }): boolean {
    return entry.expiresAt !== null && Date.now() > entry.expiresAt;
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return undefined;
    }
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key: K, value: V): void {
    const expiresAt = this.ttlMs > 0 ? Date.now() + this.ttlMs : null;
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, { value, expiresAt });
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    // Count non-expired items
    let count = 0;
    for (const [key, entry] of this.cache) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
      } else {
        count += 1;
      }
    }
    return count;
  }
}

/**
 * Priority Queue (min-heap by default)
 */
export class PriorityQueue<T> {
  private heap: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number = (a: any, b: any) => a - b) {
    this.compare = compare;
  }

  private parent(i: number) { return Math.floor((i - 1) / 2); }
  private left(i: number) { return i * 2 + 1; }
  private right(i: number) { return i * 2 + 2; }

  private swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private heapifyUp(i: number) {
    while (i > 0 && this.compare(this.heap[i], this.heap[this.parent(i)]) < 0) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  private heapifyDown(i: number) {
    while (true) {
      const l = this.left(i);
      const r = this.right(i);
      let smallest = i;
      if (l < this.heap.length && this.compare(this.heap[l], this.heap[smallest]) < 0) smallest = l;
      if (r < this.heap.length && this.compare(this.heap[r], this.heap[smallest]) < 0) smallest = r;
      if (smallest === i) break;
      this.swap(i, smallest);
      i = smallest;
    }
  }

  push(value: T): void {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0];
    const end = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.heapifyDown(0);
    }
    return top;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  size(): number { return this.heap.length; }
  isEmpty(): boolean { return this.heap.length === 0; }
}

/**
 * Dijkstra's shortest path for weighted graph
 * Graph format: adjacency list { node: Array<{ to: string, weight: number }> }
 */
export function dijkstra(
  graph: Record<string, Array<{ to: string; weight: number }>>,
  start: string
): { distance: Record<string, number>; previous: Record<string, string | null> } {
  const dist: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  const pq = new PriorityQueue<{ node: string; dist: number }>((a, b) => a.dist - b.dist);

  for (const node of Object.keys(graph)) {
    dist[node] = Infinity;
    prev[node] = null;
  }
  dist[start] = 0;
  pq.push({ node: start, dist: 0 });

  while (!pq.isEmpty()) {
    const current = pq.pop()!;
    if (current.dist !== dist[current.node]) continue; // stale entry
    const neighbors = graph[current.node] || [];
    for (const { to, weight } of neighbors) {
      const alt = current.dist + weight;
      if (alt < dist[to]) {
        dist[to] = alt;
        prev[to] = current.node;
        pq.push({ node: to, dist: alt });
      }
    }
  }
  return { distance: dist, previous: prev };
}
