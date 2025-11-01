/**
 * Convert string to camelCase
 */
export function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * Convert string to snake_case
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Convert string to kebab-case
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert string to PascalCase
 */
export function pascalCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, '');
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalize each word
 */
export function capitalizeWords(str: string): string {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Convert string to URL-friendly slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Remove BOM (Byte Order Mark) from string
 */
export function removeBOM(str: string): string {
  if (str.charCodeAt(0) === 0xfeff) {
    return str.slice(1);
  }
  return str;
}

/**
 * Normalize line endings to \n
 */
export function normalizeLineEndings(str: string, target: 'unix' | 'windows' = 'unix'): string {
  const normalized = str.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  if (target === 'windows') {
    return normalized.replace(/\n/g, '\r\n');
  }
  return normalized;
}

/**
 * Convert CSV string to array of objects
 */
export function csvToArray(csv: string, headers?: string[]): Record<string, string>[] {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length === 0) return [];

  const headerRow = headers || lines[0].split(',').map((h) => h.trim());
  const startIndex = headers ? 0 : 1;

  return lines.slice(startIndex).map((line) => {
    const values = line.split(',').map((v) => v.trim());
    const obj: Record<string, string> = {};
    headerRow.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    return obj;
  });
}

/**
 * Convert array of objects to CSV string
 */
export function arrayToCsv(data: Record<string, any>[]): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const rows = data.map((obj) =>
    headers.map((header) => {
      const value = obj[header] ?? '';
      return String(value).includes(',') ? `"${value}"` : value;
    })
  );

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

