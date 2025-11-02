#!/bin/bash

# Script to build and publish all 22 packages to npm
# This will bump patch versions and publish each package

set -e  # Exit on error

echo "🚀 Publishing all 22 packages to npm..."
echo ""

PACKAGES=(
  "tiny-utils"
  "smart-date"
  "react-motion-kit"
  "api-chain"
  "lite-fetcher"
  "fetch-plus"
  "form-genie"
  "cacheable-fetch"
  "motion-kit"
  "ai-mini"
  "smart-storage"
  "commit-gen"
  "env-checker"
  "react-skeletons"
  "changelog-buddy"
  "string-utils"
  "array-helpers"
  "object-helpers"
  "validators"
  "dom-helpers"
  "id-generator"
  "dev-utils"
)

SUCCESS=0
FAILED=0

for pkg in "${PACKAGES[@]}"; do
  if [ -d "$pkg" ]; then
    echo "📦 Processing $pkg..."
    cd "$pkg"
    
    # Build the package
    echo "  🔨 Building..."
    npm run build > /dev/null 2>&1 || {
      echo "  ❌ Build failed for $pkg"
      FAILED=$((FAILED + 1))
      cd ..
      continue
    }
    
    # Bump version (patch)
    echo "  📈 Bumping version..."
    npm version patch --no-git-tag-version > /dev/null 2>&1
    
    # Publish to npm
    echo "  📤 Publishing to npm..."
    if npm publish --access public > /dev/null 2>&1; then
      echo "  ✅ Published $pkg successfully!"
      SUCCESS=$((SUCCESS + 1))
    else
      echo "  ⚠️  $pkg may already be published or error occurred"
      # Check if it's just a version conflict
      if npm publish --access public 2>&1 | grep -q "403\|EPERM\|E403"; then
        echo "  ⚠️  Version may already exist, skipping..."
      else
        FAILED=$((FAILED + 1))
      fi
    fi
    
    cd ..
    echo ""
  else
    echo "⚠️  Directory $pkg not found, skipping..."
    FAILED=$((FAILED + 1))
  fi
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Publishing Summary:"
echo "  ✅ Successfully published: $SUCCESS packages"
echo "  ❌ Failed: $FAILED packages"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FAILED -eq 0 ]; then
  echo ""
  echo "🎉 All packages published successfully!"
else
  echo ""
  echo "⚠️  Some packages failed to publish. Check the output above."
fi

