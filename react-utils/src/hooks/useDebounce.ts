import { useState, useEffect } from 'react';

/**
 * Debounces a value, updating only after delay has passed.
 * Solves: "Debouncing or throttling input within React causing stale state or excessive renders"
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

