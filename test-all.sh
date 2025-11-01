#!/bin/bash

# Test all projects
cd "$(dirname "$0")"

projects=(
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
)

SUCCESS=()
FAILED=()

for project in "${projects[@]}"; do
  echo "========================================"
  echo "Testing: $project"
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
  
  # Test
  echo "🧪 Running tests..."
  if npm test > /dev/null 2>&1; then
    echo "✅ Tests passed"
    SUCCESS+=("$project")
  else
    echo "⚠️  Tests failed or no tests"
    FAILED+=("$project (tests failed)")
  fi
  
  cd ..
  echo ""
done

echo "========================================"
echo "SUMMARY"
echo "========================================"
echo "✅ Successful: ${#SUCCESS[@]}"
for item in "${SUCCESS[@]}"; do
  echo "   - $item"
done

echo ""
echo "❌ Failed: ${#FAILED[@]}"
for item in "${FAILED[@]}"; do
  echo "   - $item"
done

