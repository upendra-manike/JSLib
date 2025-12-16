export type RuleSeverity = 'info' | 'warning' | 'error';

export interface CodeIssue {
  file: string;
  line: number;
  column: number;
  message: string;
  rule: string;
  severity: RuleSeverity;
}

export interface GuardOptions {
  rootDir?: string;
  configFile?: string;
}

/**
 * Analyze JS/TS files for common AI-generated code issues.
 * Placeholder implementation exporting the API surface.
 */
export async function analyzeCode(
  entryGlobs: string | string[],
  options: GuardOptions = {}
): Promise<CodeIssue[]> {
  return [];
}

export const name = '@upendra.manike/ai-code-guard';
export const description = 'Heuristic linter for AI-generated JavaScript/TypeScript code.';

export function summarize(): string {
  return `${description} Exposes analyzeCode(entryGlobs, options) -> CodeIssue[].`;
}
