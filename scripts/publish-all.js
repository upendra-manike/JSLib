#!/usr/bin/env node

/**
 * Publish all packages to npm
 * Builds, version bumps, and publishes each package
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packagesDir = path.join(__dirname, '..');

const packages = [
  'tiny-utils',
  'smart-date',
  'react-motion-kit',
  'api-chain',
  'lite-fetcher',
  'fetch-plus',
  'form-genie',
  'cacheable-fetch',
  'motion-kit',
  'ai-mini',
  'smart-storage',
  'commit-gen',
  'env-checker',
  'react-skeletons',
  'changelog-buddy',
  'string-utils',
  'array-helpers',
  'object-helpers',
  'validators',
  'dom-helpers',
  'id-generator',
  'dev-utils',
];

let success = 0;
let failed = 0;
const results = [];

function exec(cmd, options = {}) {
  try {
    return execSync(cmd, {
      stdio: options.silent ? 'ignore' : 'inherit',
      cwd: options.cwd || process.cwd(),
    });
  } catch (error) {
    if (!options.silent) {
      console.error(error.message);
    }
    throw error;
  }
}

console.log('🚀 Publishing all 22 packages to npm...\n');

for (const pkg of packages) {
  const pkgPath = path.join(packagesDir, pkg);
  
  if (!fs.existsSync(pkgPath)) {
    console.log(`⚠️  ${pkg}: Directory not found, skipping...`);
    failed++;
    continue;
  }

  try {
    console.log(`📦 Processing ${pkg}...`);
    
    // Build
    console.log(`  🔨 Building...`);
    try {
      exec('npm run build', { cwd: pkgPath, silent: true });
    } catch (error) {
      console.log(`  ❌ Build failed for ${pkg}`);
      failed++;
      results.push({ pkg, status: 'build-failed' });
      continue;
    }
    
    // Get current version
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(pkgPath, 'package.json'), 'utf8')
    );
    const oldVersion = packageJson.version;
    
    // Bump version
    console.log(`  📈 Bumping version (current: ${oldVersion})...`);
    try {
      exec('npm version patch --no-git-tag-version', { cwd: pkgPath, silent: true });
      
      // Read new version
      const newPackageJson = JSON.parse(
        fs.readFileSync(path.join(pkgPath, 'package.json'), 'utf8')
      );
      const newVersion = newPackageJson.version;
      
      // Publish
      console.log(`  📤 Publishing v${newVersion} to npm...`);
      try {
        exec('npm publish --access public', { cwd: pkgPath, silent: true });
        console.log(`  ✅ Published ${pkg}@${newVersion} successfully!`);
        success++;
        results.push({ pkg, status: 'success', version: newVersion });
      } catch (error) {
        const errorMsg = error.message || '';
        if (errorMsg.includes('403') || errorMsg.includes('EPERM') || errorMsg.includes('E403')) {
          console.log(`  ⚠️  ${pkg}: Version ${newVersion} may already exist or permission issue`);
          results.push({ pkg, status: 'version-exists', version: newVersion });
        } else {
          console.log(`  ❌ Failed to publish ${pkg}`);
          failed++;
          results.push({ pkg, status: 'publish-failed', version: newVersion });
        }
      }
    } catch (error) {
      console.log(`  ❌ Failed to bump version for ${pkg}`);
      failed++;
      results.push({ pkg, status: 'version-failed' });
    }
    
  } catch (error) {
    console.log(`  ❌ Error processing ${pkg}:`, error.message);
    failed++;
    results.push({ pkg, status: 'error' });
  }
  
  console.log('');
}

// Summary
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 Publishing Summary:');
console.log(`  ✅ Successfully published: ${success} packages`);
console.log(`  ❌ Failed: ${failed} packages`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

if (success > 0) {
  console.log('\n✅ Successfully published:');
  results
    .filter(r => r.status === 'success')
    .forEach(r => console.log(`   - ${r.pkg}@${r.version}`));
}

if (failed > 0) {
  console.log('\n❌ Failed packages:');
  results
    .filter(r => r.status !== 'success')
    .forEach(r => console.log(`   - ${r.pkg} (${r.status})`));
}

console.log('');

