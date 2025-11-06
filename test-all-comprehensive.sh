#!/bin/bash
set -e

SUCCESS=()
FAILED=()
SKIPPED=()

for dir in */; do
  if [ ! -f "$dir/package.json" ]; then
    continue
  fi
  
  if ! grep -q '"test"' "$dir/package.json"; then
    SKIPPED+=("$dir")
    continue
  fi
  
  echo "========================================"
  echo "Testing: ${dir%/}"
  echo "========================================"
  
  cd "$dir"
  
  if npm test -- --run 2>&1 | tee /tmp/test-output.log; then
    echo "✅ ${dir%/} - Tests passed"
    SUCCESS+=("${dir%/}")
  else
    if grep -q "No test files found" /tmp/test-output.log; then
      echo "⚠️  ${dir%/} - No tests found (skipped)"
      SKIPPED+=("${dir%/}")
    else
      echo "❌ ${dir%/} - Tests failed"
      FAILED+=("${dir%/}")
    fi
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
echo "⚠️  Skipped (no tests): ${#SKIPPED[@]}"
for item in "${SKIPPED[@]}"; do
  echo "   - $item"
done

echo ""
echo "❌ Failed: ${#FAILED[@]}"
for item in "${FAILED[@]}"; do
  echo "   - $item"
done

if [ ${#FAILED[@]} -gt 0 ]; then
  exit 1
fi
