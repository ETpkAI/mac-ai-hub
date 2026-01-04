# GitHub Setup Guide

Follow these steps to connect your local project to GitHub and enable automatic deployment.

## Prerequisites

- A GitHub account
- Git installed on your Mac (verify with `git --version`)

## Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `mac-ai-hub` (must match `baseUrl` in config)
3. Set to **Public** (required for free GitHub Pages)
4. **Do NOT** initialize with README, .gitignore, or license
5. Click **Create repository**

## Step 2: Push Your Code

Run these commands in your terminal from the project directory:

```bash
# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Mac AI Pilot documentation site"

# Rename branch to main (if needed)
git branch -M main

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mac-ai-hub.git

# Push to GitHub
git push -u origin main
```

## Step 3: Wait for Deployment

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Watch the "Deploy to GitHub Pages" workflow run
4. First deployment takes ~2-3 minutes

## Step 4: Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` (created automatically by the workflow)
   - **Folder**: `/ (root)`
3. Click **Save**

## Step 5: Access Your Site

Your site will be live at:
```
https://YOUR_USERNAME.github.io/mac-ai-hub/
```

It may take a few minutes for the first deployment to propagate.

## Updating Your Site

After the initial setup, simply push changes to `main`:

```bash
git add .
git commit -m "Your update message"
git push
```

The GitHub Action will automatically rebuild and deploy your site.

## Troubleshooting

### "Permission denied" error on push
- Ensure you're authenticated: `gh auth login` (GitHub CLI) or set up SSH keys

### Site shows 404
- Verify `baseUrl` in `docusaurus.config.ts` matches your repo name
- Check that `gh-pages` branch exists
- Wait a few minutes for DNS propagation

### Workflow fails
- Check **Actions** tab for error logs
- Common issues: missing `permissions: contents: write` in workflow

---

🎉 **Congratulations!** Your Mac AI Pilot documentation site is now live!
