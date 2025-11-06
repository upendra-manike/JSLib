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

/**
 * Shuffle array randomly (Fisher-Yates algorithm)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Check if array is sorted
 */
export function isSorted<T>(array: T[], compareFn?: (a: T, b: T) => number): boolean {
  if (array.length <= 1) return true;
  const cmp = compareFn || ((a: T, b: T) => (a as any) - (b as any));
  for (let i = 1; i < array.length; i++) {
    if (cmp(array[i - 1], array[i]) > 0) return false;
  }
  return true;
}

/**
 * Rotate array by N positions
 */
export function rotate<T>(array: T[], positions: number): T[] {
  if (array.length === 0) return [];
  const n = positions % array.length;
  if (n === 0) return [...array];
  return [...array.slice(-n), ...array.slice(0, -n)];
}

/**
 * Find second largest element
 */
export function secondLargest(numbers: number[]): number | undefined {
  if (numbers.length < 2) return undefined;
  const sorted = [...new Set(numbers)].sort((a, b) => b - a);
  return sorted[1];
}

/**
 * Split array into even and odd numbers
 */
export function splitEvenOdd(numbers: number[]): { even: number[]; odd: number[] } {
  return numbers.reduce(
    (acc, num) => {
      if (num % 2 === 0) acc.even.push(num);
      else acc.odd.push(num);
      return acc;
    },
    { even: [] as number[], odd: [] as number[] }
  );
}

/**
 * Sort array of objects by property
 */
export function sortByProperty<T>(
  array: T[],
  property: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Find duplicates in array
 */
export function findDuplicates<T>(array: T[]): T[] {
  const seen = new Set<T>();
  const duplicates = new Set<T>();
  for (const item of array) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }
  return Array.from(duplicates);
}

/**
 * Remove duplicates by key in objects
 */
export function removeDuplicatesByKey<T>(
  array: T[],
  keyFn: (item: T) => string | number
): T[] {
  const seen = new Set<string | number>();
  return array.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Convert array of strings to numbers
 */
export function stringsToNumbers(array: string[]): number[] {
  return array.map(Number).filter((n) => !isNaN(n));
}

/**
 * Find common elements among multiple arrays
 */
export function commonElements<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return arrays[0];
  return arrays.reduce((common, arr) => {
    const set = new Set(arr);
    return common.filter((item) => set.has(item));
  });
}

/**
 * Find missing number in sequence (1 to n)
 */
export function missingNumber(numbers: number[]): number | null {
  if (numbers.length === 0) return null;
  const n = numbers.length + 1;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = sum(numbers);
  const missing = expectedSum - actualSum;
  return missing > 0 && missing <= n ? missing : null;
}

/**
 * Binary search in sorted array
 */
export function binarySearch<T>(
  array: T[],
  target: T,
  compareFn?: (a: T, b: T) => number
): number {
  const cmp = compareFn || ((a: T, b: T) => (a as any) - (b as any));
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = cmp(array[mid], target);
    if (comparison === 0) return mid;
    if (comparison < 0) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

/**
 * Linear search in array
 */
export function linearSearch<T>(array: T[], target: T): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) return i;
  }
  return -1;
}

