# Fix White Page on Vercel - JavaScript Not Loading

## The Problem

You see a white page with: *"We're sorry but my-portfolio doesn't work properly without JavaScript enabled."*

This means JavaScript files aren't loading. The HTML is there, but the JS files can't be found.

## Quick Diagnosis

### Step 1: Check Browser Console

1. **Open your site:** `https://ahmad-jamil.vercel.app`
2. **Open DevTools** (F12) → **Console** tab
3. **Look for errors:**
   - ❌ `Failed to load resource` = Files not found
   - ❌ `404` errors = Wrong paths
   - ❌ `CORS` errors = Different issue

### Step 2: Check Network Tab

1. **DevTools** → **Network** tab
2. **Reload page**
3. **Check JS files:**
   - Look for `.js` files
   - Status should be **200 OK**
   - If **404**, files aren't being served

## Common Causes & Fixes

### Issue 1: Wrong publicPath for Vercel

**Problem:** `vue.config.js` might still be using `/ahmad-jamil/` path instead of `/`

**Check:**
```bash
cat vue.config.js
```

**Should see:**
```javascript
// For Vercel, should return '/'
publicPath: getPublicPath()
```

**Fix:** The config should auto-detect Vercel. If not working, check:

1. **Verify Vercel environment:**
   - Vercel sets `VERCEL=1` automatically
   - Or check if detection is working

2. **Force root path for Vercel:**
   ```javascript
   // In vue.config.js
   const getPublicPath = () => {
     // Force root for Vercel
     if (process.env.VERCEL || process.env.VERCEL_ENV) {
       return '/'
     }
     // For GitHub Pages
     return process.env.NODE_ENV === 'production' ? '/ahmad-jamil/' : '/'
   }
   ```

### Issue 2: Build Output Not Correct

**Problem:** `dist/` folder might not have correct paths

**Check Vercel Build Logs:**
1. Vercel Dashboard → Deployments → Latest
2. Check **Build Logs** tab
3. Look for:
   - ✅ `npm run build` completed
   - ✅ Files in `dist/` folder
   - ❌ Any errors during build

**Verify Build:**
```bash
# Check what was built
cat dist/index.html | grep -o 'src="[^"]*\.js"'
```

Should show paths like:
- ✅ `/js/app.xxxxx.js` (root path - correct for Vercel)
- ❌ `/ahmad-jamil/js/app.xxxxx.js` (wrong - GitHub Pages path)

### Issue 3: Files Not Deployed

**Problem:** `dist/` folder not being deployed to Vercel

**Check:**
1. Vercel Dashboard → Deployments → Latest
2. Go to **"Functions"** or **"Source"** tab
3. Should see `dist/` folder contents

**Verify vercel.json:**
```json
{
  "outputDirectory": "dist"  // Should be set
}
```

### Issue 4: Routes Configuration

**Problem:** Vercel not serving files correctly

**Check vercel.json routes:**
```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"  // Should catch all routes
    }
  ]
}
```

## Step-by-Step Fix

### Fix 1: Update vue.config.js (If Needed)

If the auto-detection isn't working, force root path:

```javascript
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VERCEL || process.env.VERCEL_ENV 
    ? '/'  // Root path for Vercel
    : (process.env.NODE_ENV === 'production' ? '/ahmad-jamil/' : '/')  // GitHub Pages
})
```

### Fix 2: Rebuild and Redeploy

```bash
# Clean build
rm -rf dist

# Rebuild
npm run build

# Check paths in built HTML
cat dist/index.html | grep js

# Commit and push
git add .
git commit -m "Fix Vercel publicPath"
git push
```

### Fix 3: Check Vercel Settings

1. **Vercel Dashboard** → Your Project → Settings → General
2. **Verify:**
   - **Output Directory:** `dist`
   - **Build Command:** `npm run build`
   - **Install Command:** `npm ci` or empty

### Fix 4: Check Deployment Logs

1. **Vercel Dashboard** → Deployments → Latest
2. **Build Logs** tab:
   - Check if `npm run build` succeeded
   - Check if `dist/` folder was created
   - Look for any errors

3. **Functions** tab:
   - Should see API functions
   - Should see static files from `dist/`

## Quick Test

### Test 1: Check Built HTML

After build, check:
```bash
cat dist/index.html
```

Look for script tags:
```html
<script src="/js/app.xxxxx.js"></script>  <!-- ✅ Root path -->
```

NOT:
```html
<script src="/ahmad-jamil/js/app.xxxxx.js"></script>  <!-- ❌ Wrong -->
```

### Test 2: Check File Access

Try accessing JS file directly:
- `https://ahmad-jamil.vercel.app/js/app.xxxxx.js`
- Should return JavaScript code
- If 404, file path is wrong

### Test 3: Check Vercel Deployment

1. Vercel Dashboard → Deployments → Latest
2. Click **"Visit"** or check URL
3. Open DevTools → Network tab
4. See what files are being requested
5. Check if they return 200 or 404

## Most Likely Fix

The issue is probably the `publicPath` in `vue.config.js`. The auto-detection might not be working.

**Quick fix - Update vue.config.js:**

```javascript
const { defineConfig } = require('@vue/cli-service')

// Simple: Use root path if VERCEL env var exists, otherwise use GitHub Pages path
const publicPath = process.env.VERCEL || process.env.VERCEL_ENV
  ? '/'
  : (process.env.NODE_ENV === 'production' ? '/ahmad-jamil/' : '/')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: publicPath
})
```

Then rebuild and redeploy.

## Still Not Working?

1. **Share Vercel build logs** - What errors do you see?
2. **Share browser console errors** - What's failing?
3. **Check Network tab** - Are JS files returning 404?
4. **Verify dist/index.html** - What paths are in the script tags?

The key is: **JavaScript files need to be at root path `/js/...` not `/ahmad-jamil/js/...` for Vercel!**

