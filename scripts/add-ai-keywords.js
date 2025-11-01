#!/usr/bin/env node

/**
 * Add AI-friendly keywords to all package.json files
 */

const fs = require('fs');
const path = require('path');

const packagesDir = path.join(__dirname, '..');

const aiKeywords = [
  'ai-agent',
  'llm',
  'openai',
  'chatgpt',
  'claude',
  'copilot',
  'autonomous-agent',
  'ai-integration',
  'code-generation',
  'ai-friendly'
];

function addKeywords(packageJsonPath) {
  try {
    const content = fs.readFileSync(packageJsonPath, 'utf8');
    const pkg = JSON.parse(content);
    
    if (!pkg.keywords) {
      pkg.keywords = [];
    }
    
    // Add AI keywords if not already present
    let updated = false;
    aiKeywords.forEach(keyword => {
      if (!pkg.keywords.includes(keyword)) {
        pkg.keywords.push(keyword);
        updated = true;
      }
    });
    
    if (updated) {
      // Sort keywords for consistency
      pkg.keywords = [...new Set(pkg.keywords)].sort();
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${packageJsonPath}:`, error.message);
    return false;
  }
}

// Process all packages
const allPackages = fs.readdirSync(packagesDir)
  .filter(dir => {
    const dirPath = path.join(packagesDir, dir);
    return fs.statSync(dirPath).isDirectory() && 
           fs.existsSync(path.join(dirPath, 'package.json')) &&
           !dir.startsWith('.') &&
           dir !== 'node_modules' &&
           dir !== 'scripts';
  });

console.log('🤖 Adding AI-friendly keywords to packages...\n');

let updated = 0;
allPackages.forEach(pkgDir => {
  const packageJsonPath = path.join(packagesDir, pkgDir, 'package.json');
  if (addKeywords(packageJsonPath)) {
    console.log(`✅ Updated: ${pkgDir}`);
    updated++;
  } else {
    console.log(`⏭️  Already has AI keywords: ${pkgDir}`);
  }
});

console.log(`\n✅ Updated ${updated} packages with AI keywords!`);

