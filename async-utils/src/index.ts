export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);
    const onAbort = () => {
      cleanup();
      reject(new DOMException('Aborted', 'AbortError'));
    };
    const cleanup = () => {
      clearTimeout(t);
      signal?.removeEventListener('abort', onAbort);
    };
    if (signal) {
      if (signal.aborted) return onAbort();
      signal.addEventListener('abort', onAbort);
    }
  });
}

export type BackoffKind = 'none' | 'linear' | 'exponential';

export function backoffDelay(attempt: number, base = 250, kind: BackoffKind = 'exponential', jitter = true): number {
  let delay = base;
  if (kind === 'linear') delay = base * attempt;
  if (kind === 'exponential') delay = base * Math.pow(2, attempt - 1);
  if (jitter) delay = Math.random() * delay;
  return Math.min(delay, 30_000);
}

export interface RetryOptions {
  retries?: number;
  baseDelayMs?: number;
  backoff?: BackoffKind;
  retryable?: (error: unknown) => boolean;
  signal?: AbortSignal;
}

export async function withRetry<T>(fn: () => Promise<T>, opts: RetryOptions = {}): Promise<T> {
  const {
    retries = 3,
    baseDelayMs = 250,
    backoff = 'exponential',
    retryable = () => true,
    signal,
  } = opts;

  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    attempt += 1;
    try {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
      return await fn();
    } catch (err) {
      if (attempt > retries || !retryable(err)) throw err;
      const delay = backoffDelay(attempt, baseDelayMs, backoff);
      await sleep(delay, signal);
    }
  }
}

export async function pMapSeries<I, O>(items: readonly I[], mapper: (item: I, index: number) => Promise<O>): Promise<O[]> {
  const out: O[] = [];
  for (let i = 0; i < items.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    out.push(await mapper(items[i], i));
  }
  return out;
}

export function timeoutPromise<T>(promise: Promise<T>, ms: number, message = 'Timed out'): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer!)) as Promise<T>;
}

export async function pQueue<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
  const results: T[] = [];
  for (const task of tasks) {
    // eslint-disable-next-line no-await-in-loop
    results.push(await task());
  }
  return results;
}

export async function pMapLimit<I, O>(
  items: readonly I[],
  limit: number,
  mapper: (item: I, index: number) => Promise<O>
): Promise<O[]> {
  if (limit <= 0) return [];
  const results: O[] = new Array(items.length);
  let nextIndex = 0;
  const workers = new Array(Math.min(limit, items.length)).fill(0).map(async () => {
    while (true) {
      const current = nextIndex;
      if (current >= items.length) break;
      nextIndex += 1;
      // eslint-disable-next-line no-await-in-loop
      results[current] = await mapper(items[current], current);
    }
  });
  await Promise.all(workers);
  return results;
}

export function memoizeAsync<A extends any[], R>(
  fn: (...args: A) => Promise<R>,
  keyFn?: (...args: A) => string
): (...args: A) => Promise<R> {
  const cache = new Map<string, Promise<R>>();
  return (...args: A) => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    let cached = cache.get(key);
    if (!cached) {
      cached = fn(...args);
      cache.set(key, cached);
    }
    return cached;
  };
}

export function promiseRace<T>(promises: Iterable<Promise<T>>): Promise<T> {
  return Promise.race(promises);
}

/**
 * Concurrency-limited task queue
 */
export async function concurrencyLimitedQueue<T>(
  tasks: Array<() => Promise<T>>,
  concurrency: number
): Promise<T[]> {
  if (concurrency <= 0) return [];
  const results: T[] = new Array(tasks.length);
  let next = 0;
  let running = 0;
  let resolveAll: (() => void) | null = null;
  const done = new Promise<void>((resolve) => (resolveAll = resolve));

  return new Promise<T[]>((resolve, reject) => {
    const runNext = () => {
      if (next >= tasks.length && running === 0) {
        resolveAll!();
        return resolve(results);
      }
      while (running < concurrency && next < tasks.length) {
        const current = next++;
        running += 1;
        tasks[current]()
          .then((val) => {
            results[current] = val;
          })
          .catch(reject)
          .finally(() => {
            running -= 1;
            runNext();
          });
      }
    };
    runNext();
  });
}

/**
 * Promise pool executor (accepts generator of tasks)
 */
export async function promisePool<T>(
  iterator: Iterable<() => Promise<T>>,
  concurrency: number
): Promise<T[]> {
  const tasks = Array.from(iterator);
  return concurrencyLimitedQueue(tasks, concurrency);
}

export const asyncUtils = { sleep, backoffDelay, withRetry, pMapSeries, timeoutPromise, pQueue, pMapLimit, memoizeAsync, promiseRace, concurrencyLimitedQueue, promisePool };


