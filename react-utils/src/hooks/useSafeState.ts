import { useState, useEffect, useRef } from 'react';

/**
 * Safe state that prevents updates after component unmount.
 * Solves: "State updates not triggering re-render" and race conditions
 */
export function useSafeState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState(initialState);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const safeSetState = (value: T | ((prev: T) => T)) => {
    if (isMountedRef.current) {
      setState(value);
    }
  };

  return [state, safeSetState];
}

