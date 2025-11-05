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

export const asyncUtils = { sleep, backoffDelay, withRetry, pMapSeries };


