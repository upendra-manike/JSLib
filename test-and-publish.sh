#!/bin/bash

cd "$(dirname "$0")"

projects=(
  "env-checker"
  "commit-gen"
  "changelog-buddy"
  "cacheable-fetch"
  "smart-storage"
  "ai-mini"
  "motion-kit"
  "react-skeletons"
  "form-genie"
  "fetch-plus"
)

PUBLISHED=()
FAILED=()

for project in "${projects[@]}"; do
  echo "========================================"
  echo "Testing & Publishing: $project"
  echo "========================================"
  
  if [ ! -d "$project" ]; then
    echo "❌ Directory not found: $project"
    FAILED+=("$project (not found)")
    continue
  fi
  
  cd "$project"
  
  # Install
  echo "📦 Installing dependencies..."
  npm install --silent > /dev/null 2>&1
  
  # Build
  echo "🔨 Building..."
  if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
  else
    echo "❌ Build failed"
    FAILED+=("$project (build failed)")
    cd ..
    continue
  fi
  
  # Publish
  echo "📤 Publishing to npm..."
  if npm publish --access public --silent > /dev/null 2>&1; then
    echo "✅ Published successfully!"
    PUBLISHED+=("$project")
  else
    echo "❌ Publish failed (may already exist)"
    FAILED+=("$project (publish failed)")
  fi
  
  cd ..
  echo ""
done

echo "========================================"
echo "SUMMARY"
echo "========================================"
echo "✅ Published: ${#PUBLISHED[@]}"
for item in "${PUBLISHED[@]}"; do
  echo "   - $item"
done

echo ""
echo "❌ Failed: ${#FAILED[@]}"
for item in "${FAILED[@]}"; do
  echo "   - $item"
done

