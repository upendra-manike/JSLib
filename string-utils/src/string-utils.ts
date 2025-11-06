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

/**
 * Reverse a string
 */
export function reverseString(str: string): string {
  return Array.from(str).reverse().join('');
}

/**
 * Check if a string is a palindrome (ignores case and non-alphanumerics)
 */
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === reverseString(cleaned);
}

/**
 * Check if two strings are anagrams (ignores case and non-alphanumerics)
 */
export function isAnagram(a: string, b: string): boolean {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
  return normalize(a) === normalize(b);
}

/**
 * Count vowels in a string (a, e, i, o, u)
 */
export function countVowels(str: string): number {
  const match = str.match(/[aeiou]/gi);
  return match ? match.length : 0;
}

/**
 * Remove duplicate characters from a string while preserving order
 */
export function uniqueChars(str: string): string {
  const seen = new Set<string>();
  let out = '';
  for (const ch of str) {
    if (!seen.has(ch)) {
      seen.add(ch);
      out += ch;
    }
  }
  return out;
}

/**
 * Count consonants in a string
 */
export function countConsonants(str: string): number {
  const match = str.match(/[bcdfghjklmnpqrstvwxyz]/gi);
  return match ? match.length : 0;
}

/**
 * Find first non-repeating character in a string
 */
export function firstNonRepeating(str: string): string | null {
  const freq: Record<string, number> = {};
  for (const ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  for (const ch of str) {
    if (freq[ch] === 1) return ch;
  }
  return null;
}

/**
 * Get character frequency map
 */
export function charFrequency(str: string): Record<string, number> {
  const freq: Record<string, number> = {};
  for (const ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  return freq;
}

/**
 * Convert string to Title Case
 */
export function titleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
 * Trim extra spaces (multiple spaces to single space)
 */
export function trimExtraSpaces(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Replace all occurrences of a word/substring
 */
export function replaceAll(str: string, search: string | RegExp, replace: string): string {
  if (search instanceof RegExp) {
    return str.replace(search, replace);
  }
  return str.split(search).join(replace);
}

/**
 * Extract numbers from a string
 */
export function extractNumbers(str: string): number[] {
  const matches = str.match(/-?\d+\.?\d*/g);
  return matches ? matches.map(Number) : [];
}

/**
 * Find the longest word in a sentence
 */
export function longestWord(str: string): string {
  const words = str.split(/\s+/);
  return words.reduce((longest, word) => {
    const cleaned = word.replace(/[^\w]/g, '');
    return cleaned.length > longest.length ? cleaned : longest;
  }, '');
}

/**
 * Reverse each word in a sentence
 */
export function reverseWords(str: string): string {
  return str.split(/\s+/).map(word => reverseString(word)).join(' ');
}

/**
 * Encode string to Base64
 */
export function base64Encode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf8').toString('base64');
  }
  if (typeof btoa !== 'undefined') {
    return btoa(unescape(encodeURIComponent(str)));
  }
  throw new Error('Base64 encoding not available in this environment');
}

/**
 * Decode Base64 to string
 */
export function base64Decode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64').toString('utf8');
  }
  if (typeof atob !== 'undefined') {
    return decodeURIComponent(escape(atob(str)));
  }
  throw new Error('Base64 decoding not available in this environment');
}

/**
 * Check if string contains only alphabets
 */
export function containsOnlyAlphabets(str: string): boolean {
  return /^[a-zA-Z]+$/.test(str);
}

/**
 * Count word occurrences in a string
 */
export function wordOccurrences(str: string): Record<string, number> {
  const words = str.toLowerCase().match(/\b\w+\b/g) || [];
  const freq: Record<string, number> = {};
  for (const word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }
  return freq;
}

/**
 * Check if parentheses are balanced
 */
export function balancedParentheses(str: string): boolean {
  let count = 0;
  for (const ch of str) {
    if (ch === '(') count++;
    if (ch === ')') count--;
    if (count < 0) return false;
  }
  return count === 0;
}

/**
 * Remove HTML tags from string
 */
export function removeHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Find longest substring without repeating characters
 */
export function longestSubstring(str: string): string {
  let longest = '';
  let current = '';
  const seen = new Set<string>();
  
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (seen.has(ch)) {
      const idx = current.indexOf(ch);
      current = current.slice(idx + 1) + ch;
      seen.clear();
      for (const c of current) seen.add(c);
    } else {
      current += ch;
      seen.add(ch);
      if (current.length > longest.length) {
        longest = current;
      }
    }
  }
  
  return longest;
}

