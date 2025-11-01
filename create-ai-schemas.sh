#!/bin/bash

# Script to create AI-friendly API schema files for all packages

echo "🤖 Creating AI-friendly API schemas for all packages..."

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

for pkg in "${PACKAGES[@]}"; do
  if [ -d "$pkg" ]; then
    echo "📦 Processing $pkg..."
    # Schema will be created by Node script
  fi
done

echo "✅ Done! Run: node scripts/generate-api-schemas.js"

