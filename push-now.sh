#!/bin/bash

echo "🚀 Pushing code to GitHub..."
echo ""

cd "$(dirname "$0")"

# Try to push
if git push -u origin main 2>&1; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "Repository: https://github.com/upendrakumarmanike/JSLib"
else
    echo ""
    echo "❌ Push failed. Common reasons:"
    echo "   1. Repository doesn't exist yet - Create it at: https://github.com/new"
    echo "   2. Authentication needed - Use Personal Access Token"
    echo "   3. Wrong repository URL - Check remote with: git remote -v"
    echo ""
    echo "After creating repository, run this script again."
fi

