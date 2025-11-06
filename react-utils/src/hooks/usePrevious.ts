import { useRef, useEffect } from 'react';

/**
 * Returns the previous value of a prop or state.
 * Solves: "setState isn't applied immediately — subsequent code sees stale value"
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

