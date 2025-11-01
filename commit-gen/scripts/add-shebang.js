const fs = require("fs"); const cliPath = "dist/cli.js"; if (fs.existsSync(cliPath)) { const content = fs.readFileSync(cliPath, "utf8"); if (!content.startsWith("#!/usr/bin/env node")) { fs.writeFileSync(cliPath, "#!/usr/bin/env node
" + content); fs.chmodSync(cliPath, "755"); } }
