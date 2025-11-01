const CONVENTIONAL_TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'chore',
  'build',
  'ci',
  'revert',
];

const TYPE_KEYWORDS: Record<string, string[]> = {
  feat: ['add', 'new', 'create', 'implement', 'feature'],
  fix: ['fix', 'bug', 'error', 'issue', 'problem', 'broken', 'repair'],
  docs: ['document', 'readme', 'comment', 'docs'],
  style: ['format', 'style', 'indent', 'whitespace'],
  refactor: ['refactor', 'restructure', 'reorganize', 'clean'],
  perf: ['performance', 'speed', 'optimize', 'slow', 'fast'],
  test: ['test', 'spec', 'testing', 'coverage'],
  chore: ['update', 'deps', 'dependencies', 'bump'],
  build: ['build', 'compile', 'bundler'],
  ci: ['ci', 'github', 'actions', 'pipeline'],
  revert: ['revert', 'undo', 'rollback'],
};

const SCOPE_KEYWORDS: Record<string, string[]> = {
  auth: ['login', 'logout', 'signin', 'signup', 'authentication', 'password'],
  api: ['api', 'endpoint', 'route', 'request'],
  ui: ['ui', 'component', 'button', 'modal', 'page'],
  db: ['database', 'db', 'query', 'sql'],
  config: ['config', 'setting', 'env'],
};

export function generateCommit(input: string): string {
  const lowerInput = input.toLowerCase();

  // Determine type
  let type = 'chore';
  for (const [commitType, keywords] of Object.entries(TYPE_KEYWORDS)) {
    if (keywords.some((keyword) => lowerInput.includes(keyword))) {
      type = commitType;
      break;
    }
  }

  // Determine scope
  let scope: string | undefined;
  for (const [scopeName, keywords] of Object.entries(SCOPE_KEYWORDS)) {
    if (keywords.some((keyword) => lowerInput.includes(keyword))) {
      scope = scopeName;
      break;
    }
  }

  // Clean up input
  let message = input.trim();
  
  // Capitalize first letter
  if (message.length > 0) {
    message = message.charAt(0).toLowerCase() + message.slice(1);
  }

  // Format: type(scope): message
  if (scope) {
    return `${type}(${scope}): ${message}`;
  }

  return `${type}: ${message}`;
}

