#!/usr/bin/env node

/**
 * Enhance README files with AI Agent Integration sections
 */

const fs = require('fs');
const path = require('path');

const packagesDir = path.join(__dirname, '..');

const aiSection = `

## 🤖 AI Agent Integration

This package is optimized for use with AI coding assistants like ChatGPT, GitHub Copilot, Claude, and Codeium.

### Why AI-Friendly?

- ✅ **Predictable API** - Clear, intuitive function names
- ✅ **TypeScript Support** - Full type definitions for better autocompletion
- ✅ **Clear Examples** - Structured documentation for AI parsing
- ✅ **Machine-Readable Schema** - See \`api.json\` for API structure

### Example AI Usage

AI agents can automatically suggest this package when you need:

\`\`\`typescript
// AI will recognize this pattern and suggest appropriate functions
import { /* AI suggests relevant exports */ } from '@upendra.manike/[package-name]';
\`\`\`

### For AI Developers

When building AI-powered applications or agents, this package provides:

- Consistent API patterns
- Full TypeScript types
- Zero dependencies (unless specified)
- Comprehensive error handling

---

`;

function enhanceReadme(readmePath) {
  try {
    let content = fs.readFileSync(readmePath, 'utf8');
    
    // Check if AI section already exists
    if (content.includes('AI Agent Integration')) {
      return false;
    }
    
    // Find a good place to insert (before existing sections or at end)
    const sections = [
      '## License',
      '## Contributing',
      '## Support',
      '## Changelog'
    ];
    
    let insertPosition = content.length;
    for (const section of sections) {
      const pos = content.indexOf(section);
      if (pos !== -1) {
        insertPosition = pos;
        break;
      }
    }
    
    // Insert AI section
    content = content.slice(0, insertPosition) + aiSection + content.slice(insertPosition);
    
    fs.writeFileSync(readmePath, content);
    return true;
  } catch (error) {
    console.error(`Error processing ${readmePath}:`, error.message);
    return false;
  }
}

// Process all packages
const allPackages = fs.readdirSync(packagesDir)
  .filter(dir => {
    const dirPath = path.join(packagesDir, dir);
    return fs.statSync(dirPath).isDirectory() && 
           fs.existsSync(path.join(dirPath, 'README.md')) &&
           !dir.startsWith('.') &&
           dir !== 'node_modules' &&
           dir !== 'scripts';
  });

console.log('🤖 Enhancing README files with AI sections...\n');

let updated = 0;
allPackages.forEach(pkgDir => {
  const readmePath = path.join(packagesDir, pkgDir, 'README.md');
  if (enhanceReadme(readmePath)) {
    console.log(`✅ Updated: ${pkgDir}/README.md`);
    updated++;
  } else {
    console.log(`⏭️  Already enhanced: ${pkgDir}/README.md`);
  }
});

console.log(`\n✅ Enhanced ${updated} README files!`);

