export interface ModuleIssue {
  file: string;
  importPath: string;
  message: string;
  suggestion?: string;
}

export interface AnalyzeOptions {
  tsconfigPath?: string;
  rootDir?: string;
}

/**
 * Analyze a TypeScript file or project for common module resolution problems.
 * NOTE: This is a placeholder implementation exporting types and a stubbed API.
 */
export async function analyzeModules(
  entryGlobs: string | string[],
  options: AnalyzeOptions = {}
): Promise<ModuleIssue[]> {
  // Real implementation would:
  // - Load tsconfig.json
  // - Use TypeScript compiler API to resolve imports
  // - Return structured issues
  return [];
}

export const name = '@upendra.manike/ts-module-doctor';
export const description = 'Diagnose and explain TypeScript/Node module resolution errors.';

export function summarize(): string {
  return `${description} Exposes analyzeModules(entryGlobs, options) -> ModuleIssue[].`;
}
