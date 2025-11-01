/**
 * Chunks an array into smaller arrays of specified size
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) return [];
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Removes duplicate values from an array
 */
export function uniq<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Removes duplicate values by a key function
 */
export function uniqBy<T>(array: T[], keyFn: (item: T) => any): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Groups array items by a key function
 */
export function groupBy<T>(
  array: T[],
  keyFn: (item: T) => string | number
): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const key = String(keyFn(item));
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Flattens an array one level deep
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  return array.flat() as T[];
}

/**
 * Flattens an array recursively
 */
export function flattenDeep<T>(array: any[]): T[] {
  return array.flat(Infinity);
}

/**
 * Returns the difference between two arrays
 */
export function difference<T>(array1: T[], array2: T[]): T[] {
  const set2 = new Set(array2);
  return array1.filter((item) => !set2.has(item));
}

/**
 * Returns intersection of two arrays
 */
export function intersection<T>(array1: T[], array2: T[]): T[] {
  const set2 = new Set(array2);
  return array1.filter((item) => set2.has(item));
}

/**
 * Returns union of two arrays
 */
export function union<T>(array1: T[], array2: T[]): T[] {
  return uniq([...array1, ...array2]);
}

