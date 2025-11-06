import { useRef, useCallback } from 'react';

/**
 * Returns a stable callback reference that doesn't change between renders.
 * Solves: "inline functions in props causing child components to re-render unnecessarily"
 */
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const ref = useRef(callback);
  ref.current = callback;
  return useCallback((...args: Parameters<T>) => ref.current(...args), []) as T;
}

