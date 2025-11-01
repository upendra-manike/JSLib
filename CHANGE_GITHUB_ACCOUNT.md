# Change GitHub Account

## Current Configuration
- **Remote URL:** https://github.com/upendrakumarmanike/JSLib.git
- **Current Account:** upendrakumarmanike

## To Change GitHub Account

### Step 1: Update Remote URL

Replace `NEW_USERNAME` with your new GitHub username:

```bash
git remote set-url origin https://github.com/NEW_USERNAME/JSLib.git
```

### Step 2: Verify Change

```bash
git remote -v
```

### Step 3: Create Repository on New Account

1. Go to: https://github.com/new
2. Repository name: `JSLib`
3. Description: "A collection of 22 modern, production-ready JavaScript/TypeScript libraries"
4. Visibility: 🔒 Private (or Public)
5. **DO NOT** check any boxes
6. Click "Create repository"

### Step 4: Push Code

```bash
git push -u origin main
```

## Or Use SSH (if configured)

```bash
git remote set-url origin git@github.com:NEW_USERNAME/JSLib.git
git push -u origin main
```

## Authentication

When pushing, you'll need:
- **Username:** Your new GitHub username
- **Password:** Personal Access Token from the new account
  - Create at: https://github.com/settings/tokens
  - Select `repo` scope

