const fs = require('fs');
const path = require('path');

// Find CLI file (could be cli.js, cli.mjs, or cli.cjs)
const distPath = path.join(__dirname, '..', 'dist');
const cliFiles = ['cli.js', 'cli.mjs', 'cli.cjs'].map(f => path.join(distPath, f));

for (const cliPath of cliFiles) {
  if (fs.existsSync(cliPath)) {
    let content = fs.readFileSync(cliPath, 'utf8');
    if (!content.startsWith('#!/usr/bin/env node')) {
      fs.writeFileSync(cliPath, '#!/usr/bin/env node\n' + content);
    }
    fs.chmodSync(cliPath, '755');
    
    // If it's .mjs, also create .js version
    if (cliPath.endsWith('.mjs')) {
      const jsPath = path.join(distPath, 'cli.js');
      fs.copyFileSync(cliPath, jsPath);
      fs.chmodSync(jsPath, '755');
    }
    break;
  }
}
