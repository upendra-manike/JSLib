import { useEffect, useRef, EffectCallback, DependencyList } from 'react';

/**
 * useEffect with deep comparison of dependencies.
 * Solves: "State updates not triggering re-render when using nested objects/arrays (reference unchanged)"
 * and "Infinite render loops due to incorrect useEffect dependencies"
 */
export function useDeepCompareEffect(
  effect: EffectCallback,
  deps: DependencyList
): void {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);

  if (!isEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current += 1;
  }

  useEffect(effect, [signalRef.current]);
}

function isEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!isEqual(a[key], b[key])) return false;
  }
  return true;
}

