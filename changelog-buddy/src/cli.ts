#!/usr/bin/env node

import { generateChangelog } from './changelog-buddy';
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

function getGitCommits(since?: string): string[] {
  try {
    const command = since 
      ? `git log --pretty=format:"%s" ${since}..HEAD`
      : `git log --pretty=format:"%s" -20`;
    const output = execSync(command, { encoding: 'utf-8' });
    return output.split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

function getCurrentVersion(): string {
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
    return packageJson.version || '1.0.0';
  } catch {
    return '1.0.0';
  }
}

const args = process.argv.slice(2);
const outputFile = args.find(arg => arg.startsWith('--output'))?.split('=')[1] || 'CHANGELOG.md';
const since = args.find(arg => arg.startsWith('--since'))?.split('=')[1];

const commits = getGitCommits(since);
const changelog = generateChangelog(commits, getCurrentVersion());

writeFileSync(outputFile, changelog);
console.log(`✅ Changelog generated: ${outputFile}`);

