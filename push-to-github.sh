#!/bin/bash

# Script to push JSLib to GitHub
# Usage: ./push-to-github.sh YOUR_GITHUB_USERNAME

if [ -z "$1" ]; then
  echo "Usage: ./push-to-github.sh YOUR_GITHUB_USERNAME"
  echo "Example: ./push-to-github.sh upendrakumarmanike"
  exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="JSLib"

echo "Setting up GitHub repository..."
echo "Repository will be: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
  echo "Remote 'origin' already exists. Removing it..."
  git remote remove origin
fi

# Add remote
echo "Adding remote origin..."
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# Show status
echo ""
echo "Repository status:"
git status

echo ""
echo "⚠️  IMPORTANT: Create the repository on GitHub first!"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: $REPO_NAME"
echo "3. Make it PUBLIC"
echo "4. DO NOT initialize with README, .gitignore, or license"
echo "5. Click 'Create repository'"
echo ""
read -p "Press Enter after you've created the repository on GitHub..."

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Successfully pushed to GitHub!"
  echo "🔗 Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
else
  echo ""
  echo "❌ Failed to push. Make sure:"
  echo "   1. Repository exists on GitHub"
  echo "   2. You have push access"
  echo "   3. You're logged in to GitHub"
fi

