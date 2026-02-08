# Fix "Unexpected token '<'" Error on GitHub Pages

## The Problem

The error `Uncaught SyntaxError: Unexpected token '<'` means your browser is receiving HTML instead of JavaScript. This happens when:

1. **Wrong publicPath:** The `vue.config.js` has `publicPath: '/ahmad-jamil/'` but your GitHub Pages URL is different
2. **Files not found:** JavaScript files return 404 HTML pages instead of the actual JS files

## Solution: Match publicPath to Your Repository Name

### Step 1: Find Your GitHub Pages URL

Your GitHub Pages URL follows this pattern:
- `https://YOUR_USERNAME.github.io/REPOSITORY_NAME/`

For example:
- If repo is `my-portfolio` → URL is `https://username.github.io/my-portfolio/`
- If repo is `ahmad-jamil` → URL is `https://username.github.io/ahmad-jamil/`

### Step 2: Update vue.config.js

**If your repository name is `ahmad-jamil`:**
```javascript
publicPath: process.env.NODE_ENV === 'production' ? '/ahmad-jamil/' : '/'
```
✅ This is already correct!

**If your repository name is different (e.g., `my-portfolio`):**
```javascript
publicPath: process.env.NODE_ENV === 'production' ? '/my-portfolio/' : '/'
```

**If your repository is the main site (username.github.io):**
```javascript
publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
```

### Step 3: Rebuild and Redeploy

After updating `vue.config.js`:

```bash
# Clean old build
rm -rf dist

# Rebuild with correct paths
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Quick Fix Script

Run this to automatically detect and fix:

```bash
# Get repository name from git
REPO_NAME=$(basename $(git rev-parse --show-toplevel))

# Update vue.config.js (if needed)
# Then rebuild
npm run build
npm run deploy
```

## Verify the Fix

1. **Check built HTML:**
   ```bash
   cat dist/index.html | grep -o 'src="[^"]*\.js"'
   ```
   Should show paths matching your repository name.

2. **Check GitHub Pages:**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Reload page
   - Check if JS files load (status 200) or return 404

3. **Test in browser:**
   - Open your GitHub Pages URL
   - Check console for errors
   - Should see no "Unexpected token" errors

## Alternative: Use Environment Variable

You can also use an environment variable:

1. **Create `.env.production`:**
   ```
   VUE_APP_PUBLIC_PATH=/your-repo-name/
   ```

2. **Update `vue.config.js`:**
   ```javascript
   publicPath: process.env.VUE_APP_PUBLIC_PATH || 
     (process.env.NODE_ENV === 'production' ? '/ahmad-jamil/' : '/')
   ```

## Still Not Working?

1. **Check GitHub Pages settings:**
   - Repository → Settings → Pages
   - Source: Should be `gh-pages` branch or `/docs` folder
   - Custom domain: If using one, publicPath might need to be `/`

2. **Check file paths in browser:**
   - Open DevTools → Network tab
   - See what URLs are being requested
   - Compare with actual file paths in GitHub Pages

3. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or clear cache completely

4. **Verify files exist:**
   - Check `gh-pages` branch on GitHub
   - Verify `js/` and `css/` folders exist
   - Verify file names match what's in `index.html`

