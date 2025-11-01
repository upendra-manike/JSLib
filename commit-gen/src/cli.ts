#!/usr/bin/env node

import { generateCommit } from './commit-gen';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: commit-gen "your natural language description"');
  console.log('Example: commit-gen "fix login bug on Safari"');
  console.log('Output: fix(auth): login bug on Safari');
  process.exit(1);
}

const input = args.join(' ');
const result = generateCommit(input);
console.log(result);

