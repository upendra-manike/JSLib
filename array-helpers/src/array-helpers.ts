/**
 * Group array of objects by key
 */
export function groupBy<T>(
  array: T[],
  keyFn: (item: T) => string | number
): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const key = String(keyFn(item));
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * Count occurrences by key
 */
export function countBy<T>(
  array: T[],
  keyFn: (item: T) => string | number
): Record<string, number> {
  return array.reduce((counts, item) => {
    const key = String(keyFn(item));
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
}

/**
 * Remove duplicates from array
 */
export function removeDuplicates<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Count occurrences of each value
 */
export function countOccurrences<T>(array: T[]): Map<T, number> {
  return array.reduce((map, item) => {
    map.set(item, (map.get(item) || 0) + 1);
    return map;
  }, new Map<T, number>());
}

/**
 * Remove falsy values from array
 */
export function removeFalsy<T>(array: (T | null | undefined | false | 0 | '' | number)[]): T[] {
  return array.filter((item) => Boolean(item) && !Number.isNaN(item)) as T[];
}

/**
 * Calculate average of numeric array
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

/**
 * Calculate median of numeric array
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

/**
 * Calculate mode (most frequent) of numeric array
 */
export function mode(numbers: number[]): number | null {
  if (numbers.length === 0) return null;
  const counts = countOccurrences(numbers);
  let maxCount = 0;
  let modeValue: number | null = null;
  counts.forEach((count, value) => {
    if (count > maxCount) {
      maxCount = count;
      modeValue = value;
    }
  });
  return modeValue;
}

/**
 * Calculate sum of numeric array
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

/**
 * Get maximum value
 */
export function max<T>(array: T[], compareFn?: (a: T, b: T) => number): T | undefined {
  if (array.length === 0) return undefined;
  if (compareFn) {
    return array.reduce((maxItem, item) => (compareFn(item, maxItem) > 0 ? item : maxItem));
  }
  return Math.max(...(array as number[])) as T;
}

/**
 * Get minimum value
 */
export function min<T>(array: T[], compareFn?: (a: T, b: T) => number): T | undefined {
  if (array.length === 0) return undefined;
  if (compareFn) {
    return array.reduce((minItem, item) => (compareFn(item, minItem) < 0 ? item : minItem));
  }
  return Math.min(...(array as number[])) as T;
}

