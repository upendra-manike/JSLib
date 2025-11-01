const TYPE_EMOJI: Record<string, string> = {
  feat: '✨',
  fix: '🐛',
  docs: '📚',
  style: '💅',
  refactor: '♻️',
  perf: '⚡',
  test: '✅',
  chore: '🔧',
  build: '📦',
  ci: '👷',
  revert: '⏪',
};

const TYPE_LABEL: Record<string, string> = {
  feat: 'Features',
  fix: 'Bug Fixes',
  docs: 'Documentation',
  style: 'Code Style',
  refactor: 'Refactoring',
  perf: 'Performance',
  test: 'Tests',
  chore: 'Chores',
  build: 'Build System',
  ci: 'CI/CD',
  revert: 'Reverts',
};

interface CommitGroup {
  type: string;
  commits: string[];
}

function parseCommit(message: string): { type: string; scope?: string; message: string } {
  const match = message.match(/^(\w+)(?:\(([^)]+)\))?:\s*(.+)$/);
  if (match) {
    return {
      type: match[1],
      scope: match[2],
      message: match[3],
    };
  }
  return { type: 'chore', message };
}

function groupCommits(commits: string[]): CommitGroup[] {
  const groups: Record<string, string[]> = {};

  commits.forEach((commit) => {
    const parsed = parseCommit(commit);
    const type = parsed.type.toLowerCase();
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(parsed.message);
  });

  return Object.entries(groups).map(([type, commits]) => ({
    type,
    commits,
  }));
}

function calculateVersion(currentVersion: string, groups: CommitGroup[]): string {
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  const hasBreaking = groups.some(g => g.type === 'revert' || g.commits.some(c => c.includes('BREAKING')));
  const hasFeat = groups.some(g => g.type === 'feat');
  const hasFix = groups.some(g => g.type === 'fix');

  if (hasBreaking) {
    return `${major + 1}.0.0`;
  } else if (hasFeat) {
    return `${major}.${minor + 1}.0`;
  } else if (hasFix) {
    return `${major}.${minor}.${patch + 1}`;
  }

  return `${major}.${minor}.${patch + 1}`;
}

export function generateChangelog(commits: string[], currentVersion: string): string {
  const groups = groupCommits(commits);
  const newVersion = calculateVersion(currentVersion, groups);
  const date = new Date().toISOString().split('T')[0];

  let changelog = `# Changelog\n\n`;
  changelog += `## [${newVersion}] - ${date}\n\n`;

  // Order by priority
  const typeOrder = ['feat', 'fix', 'perf', 'refactor', 'docs', 'test', 'chore', 'build', 'ci', 'revert'];

  typeOrder.forEach((type) => {
    const group = groups.find(g => g.type === type);
    if (group && group.commits.length > 0) {
      const emoji = TYPE_EMOJI[type] || '📝';
      const label = TYPE_LABEL[type] || type;
      changelog += `### ${emoji} ${label}\n\n`;
      group.commits.forEach((commit) => {
        changelog += `- ${commit}\n`;
      });
      changelog += '\n';
    }
  });

  changelog += `---\n\n`;
  changelog += `[Full Changelog](https://github.com/yourusername/yourrepo/compare/v${currentVersion}...v${newVersion})\n`;

  return changelog;
}

