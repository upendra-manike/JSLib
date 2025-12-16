export interface DependencyIssue {
  name: string;
  version: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  suggestion?: string;
}

export interface ScanOptions {
  packageJsonPath?: string;
  lockfilePath?: string;
}

/**
 * Scan dependencies for risky patterns (postinstall scripts, deprecated packages, etc.).
 * Placeholder implementation exporting the API surface.
 */
export async function scanDependencies(options: ScanOptions = {}): Promise<DependencyIssue[]> {
  return [];
}

export const name = '@upendra.manike/secure-deps-scan';
export const description = 'Lightweight supply-chain scanner for Node dependencies.';

export function summarize(): string {
  return `${description} Exposes scanDependencies(options) -> DependencyIssue[].`;
}
