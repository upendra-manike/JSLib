#!/bin/bash

cd "$(dirname "$0")"

packages=(
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

PUBLISHED=()
FAILED=()

echo "=== Publishing All 22 Packages to npm ==="
echo ""

for package in "${packages[@]}"; do
  echo "========================================"
  echo "📦 $package"
  echo "========================================"
  
  if [ ! -d "$package" ]; then
    echo "❌ Directory not found: $package"
    FAILED+=("$package (not found)")
    continue
  fi
  
  cd "$package"
  
  # Build
  echo "🔨 Building..."
  if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
  else
    echo "❌ Build failed"
    FAILED+=("$package (build failed)")
    cd ..
    continue
  fi
  
  # Get current version
  CURRENT_VERSION=$(node -p "require('./package.json').version")
  echo "📌 Current version: $CURRENT_VERSION"
  
  # Publish
  echo "📤 Publishing to npm..."
  if npm publish --access public > /dev/null 2>&1; then
    echo "✅ Published v$CURRENT_VERSION"
    PUBLISHED+=("$package@$CURRENT_VERSION")
  else
    # Check if already exists (might be fine)
    echo "⚠️  Publish failed (may already exist or version conflict)"
    FAILED+=("$package (publish failed)")
  fi
  
  cd ..
  echo ""
done

echo "========================================"
echo "SUMMARY"
echo "========================================"
echo "✅ Successfully Published: ${#PUBLISHED[@]}"
for item in "${PUBLISHED[@]}"; do
  echo "   - $item"
done

echo ""
echo "⚠️  Issues: ${#FAILED[@]}"
for item in "${FAILED[@]}"; do
  echo "   - $item"
done

echo ""
echo "Total: ${#PUBLISHED[@]}/22 packages published"

