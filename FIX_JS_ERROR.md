# Fix "Unexpected token '<'" JavaScript Error

## The Problem

The error `Uncaught SyntaxError: Unexpected token '<'` means your browser is receiving HTML (a 404 page) instead of JavaScript files. This happens when the JavaScript files can't be found on GitHub Pages.

## Quick Fix

### Step 1: Rebuild Your Project

```bash
# Clean the old build
rm -rf dist

# Rebuild with correct paths
npm run build
```

### Step 2: Verify the Build

Check that `dist/index.html` has correct paths:

```bash
cat dist/index.html | grep -o 'src="[^"]*\.js"'
```

Should show paths like:
- `/ahmad-jamil/js/chunk-vendors.xxxxx.js`
- `/ahmad-jamil/js/app.xxxxx.js`

### Step 3: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build the project
2. Deploy to `gh-pages` branch
3. Make files available on GitHub Pages

### Step 4: Wait and Clear Cache

1. **Wait 1-2 minutes** for GitHub Pages to update
2. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or clear cache in browser settings

### Step 5: Verify Files Exist

1. Go to your GitHub repository
2. Switch to `gh-pages` branch
3. Verify these folders exist:
   - `js/` folder with `.js` files
   - `css/` folder with `.css` files
   - `index.html` in root

## If Still Not Working

### Check GitHub Pages Settings

1. Go to: `https://github.com/Ahmad-Jamil/ahmad-jamil/settings/pages`
2. **Source:** Should be `gh-pages` branch
3. **Folder:** Should be `/ (root)`

### Check Browser Console

1. Open your site: `https://ahmad-jamil.github.io/ahmad-jamil/`
2. Open DevTools (F12)
3. Go to **Network** tab
4. Reload page
5. Check if JS files return:
   - ✅ **200 OK** = Files found
   - ❌ **404 Not Found** = Files missing (need to redeploy)

### Manual Verification

Check if files exist at:
- `https://ahmad-jamil.github.io/ahmad-jamil/js/chunk-vendors.xxxxx.js`
- `https://ahmad-jamil.github.io/ahmad-jamil/js/app.xxxxx.js`

If you get 404, the files weren't deployed correctly.

## Common Issues

### Issue 1: Wrong Branch
- Make sure `gh-pages` branch exists
- Make sure it has the `dist/` contents

### Issue 2: Wrong publicPath
- Your `vue.config.js` has: `publicPath: '/ahmad-jamil/'`
- This matches your repo name ✅
- Don't change it unless repo name changes

### Issue 3: Cached Old Build
- Browser cached old broken files
- Clear cache and hard refresh

### Issue 4: Files Not Committed
- Make sure `dist/` is in `.gitignore` (it should be)
- `npm run deploy` handles this automatically
- Don't manually commit `dist/` folder

## Still Having Issues?

1. **Check deployment logs:**
   ```bash
   npm run deploy
   ```
   Look for errors

2. **Check gh-pages branch:**
   - Go to GitHub → Switch to `gh-pages` branch
   - Verify files are there

3. **Try accessing files directly:**
   - Open: `https://ahmad-jamil.github.io/ahmad-jamil/js/app.xxxxx.js`
   - Should see JavaScript code, not HTML

4. **Rebuild from scratch:**
   ```bash
   rm -rf dist node_modules
   npm install
   npm run build
   npm run deploy
   ```

