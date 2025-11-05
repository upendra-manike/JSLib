import { useCallback, useEffect, useRef } from 'react';

export function useStableCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useRef(fn);
  ref.current = fn;
  // @ts-expect-error stable wrapper
  return useCallback((...args: any[]) => ref.current(...args), []);
}

export function useAsyncEffect(
  effect: (signal: AbortSignal) => Promise<void> | void,
  deps: React.DependencyList
): void {
  useEffect(() => {
    const controller = new AbortController();
    const maybePromise = effect(controller.signal);
    return () => {
      controller.abort();
      if (maybePromise && typeof (maybePromise as any).catch === 'function') {
        (maybePromise as Promise<void>).catch(() => {});
      }
    };
  }, deps);
}

export function useSafeEffect(effect: React.EffectCallback, deps: React.DependencyList): void {
  useEffect(() => {
    let mounted = true;
    const cleanup = effect();
    return () => {
      mounted = false;
      if (typeof cleanup === 'function') cleanup();
    };
  }, deps);
}

export const reactSafeEffects = { useStableCallback, useAsyncEffect, useSafeEffect };


