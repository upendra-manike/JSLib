#!/bin/bash
# Add shebang to CLI file
if [ -f dist/cli.js ]; then
  if ! head -1 dist/cli.js | grep -q '#!/usr/bin/env node'; then
    echo '#!/usr/bin/env node' > dist/cli.js.tmp
    cat dist/cli.js >> dist/cli.js.tmp
    mv dist/cli.js.tmp dist/cli.js
    chmod +x dist/cli.js
  fi
fi

