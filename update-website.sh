#!/bin/bash

# Script to update JSLibUseage website with latest documentation

echo "🚀 Updating JSLibUseage Website..."
echo ""

WEBSITE_DIR="$HOME/Documents/GitHub/JSLibUseage"
SOURCE_DIR="$HOME/Documents/GitHub/JSLib"

if [ ! -d "$WEBSITE_DIR" ]; then
    echo "📁 Cloning website repository..."
    cd "$HOME/Documents/GitHub"
    git clone https://github.com/upendra-manike/JSLibUseage.git
    cd JSLibUseage
else
    echo "📁 Website directory exists, updating..."
    cd "$WEBSITE_DIR"
    git pull
fi

echo ""
echo "📝 Copying documentation files..."

# Copy HTML template
if [ -f "$SOURCE_DIR/website-index.html" ]; then
    cp "$SOURCE_DIR/website-index.html" "$WEBSITE_DIR/index.html"
    echo "✅ Updated index.html"
fi

# Copy markdown documentation
if [ -f "$SOURCE_DIR/WEBSITE_DOCUMENTATION.md" ]; then
    cp "$SOURCE_DIR/WEBSITE_DOCUMENTATION.md" "$WEBSITE_DIR/PACKAGES.md"
    echo "✅ Updated PACKAGES.md"
fi

# Copy update guide
if [ -f "$SOURCE_DIR/website-update-guide.md" ]; then
    cp "$SOURCE_DIR/website-update-guide.md" "$WEBSITE_DIR/UPDATE_GUIDE.md"
    echo "✅ Added UPDATE_GUIDE.md"
fi

echo ""
echo "📦 Website files updated!"
echo ""
echo "Next steps:"
echo "1. Review the changes in $WEBSITE_DIR"
echo "2. Commit and push:"
echo "   cd $WEBSITE_DIR"
echo "   git add ."
echo "   git commit -m 'Update package documentation for all 22 packages'"
echo "   git push origin main"
echo ""
echo "✅ GitHub Pages will automatically deploy the changes"

