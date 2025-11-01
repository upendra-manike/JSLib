#!/bin/bash

# Publishing script for all 5 projects
# Make sure you're logged in: npm login

echo "Publishing all 5 projects to npm..."
echo ""

# Project 1: smart-date
echo "📦 Publishing smart-date..."
cd smart-date
npm publish --access public
if [ $? -eq 0 ]; then
  echo "✅ smart-date published successfully!"
else
  echo "❌ Failed to publish smart-date"
fi
cd ..

# Project 2: api-chain
echo ""
echo "📦 Publishing api-chain..."
cd api-chain
npm publish --access public
if [ $? -eq 0 ]; then
  echo "✅ api-chain published successfully!"
else
  echo "❌ Failed to publish api-chain"
fi
cd ..

# Project 3: tiny-utils
echo ""
echo "📦 Publishing tiny-utils..."
cd tiny-utils
npm publish --access public
if [ $? -eq 0 ]; then
  echo "✅ tiny-utils published successfully!"
else
  echo "❌ Failed to publish tiny-utils"
fi
cd ..

# Project 4: lite-fetcher
echo ""
echo "📦 Publishing lite-fetcher..."
cd lite-fetcher
npm publish --access public
if [ $? -eq 0 ]; then
  echo "✅ lite-fetcher published successfully!"
else
  echo "❌ Failed to publish lite-fetcher"
fi
cd ..

# Project 5: react-motion-kit
echo ""
echo "📦 Publishing react-motion-kit..."
cd react-motion-kit
npm publish --access public
if [ $? -eq 0 ]; then
  echo "✅ react-motion-kit published successfully!"
else
  echo "❌ Failed to publish react-motion-kit"
fi
cd ..

echo ""
echo "🎉 Publishing complete!"

