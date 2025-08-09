#!/bin/bash

# This script deploys the claim form to GitHub Pages

# Check if repository URL is provided
if [ -z "$1" ]; then
  echo "Usage: ./deploy.sh <github-repository-url>"
  echo "Example: ./deploy.sh https://github.com/username/claim-form.git"
  exit 1
fi

REPO_URL=$1

# Add the remote repository
git remote add origin $REPO_URL

# Push to the main branch
echo "Pushing to main branch..."
git push -u origin main

# Create and switch to gh-pages branch
echo "Creating gh-pages branch..."
git checkout -b gh-pages

# Push the gh-pages branch
echo "Pushing to gh-pages branch..."
git push -u origin gh-pages

echo "Deployment complete!"
echo "Your form should be available at: https://[username].github.io/[repository-name]/"
echo "Note: It may take a few minutes for the site to be available."