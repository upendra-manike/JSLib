export interface HookIssue {
  file: string;
  line: number;
  column: number;
  message: string;
  rule: string;
}

export interface HooksCheckOptions {
  rootDir?: string;
  reactVersion?: string;
}

/**
 * Analyze .astro/.tsx files for invalid React hook usage and React/Astro integration issues.
 * This is a placeholder API surface for future static analysis implementation.
 */
export async function analyzeHooks(
  entryGlobs: string | string[],
  options: HooksCheckOptions = {}
): Promise<HookIssue[]> {
  return [];
}

export const name = '@upendra.manike/react-astro-hooks-check';
export const description = 'Static analyzer for React hook usage in Astro + React hybrid apps.';

export function summarize(): string {
  return `${description} Exposes analyzeHooks(entryGlobs, options) -> HookIssue[].`;
}
