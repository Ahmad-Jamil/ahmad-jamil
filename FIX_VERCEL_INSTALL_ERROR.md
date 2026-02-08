# Fix Vercel "npm install" Error

## The Problem

Vercel is failing with: `Error: Command "npm install" exited with 254`

This usually happens when:
1. `package-lock.json` is out of sync
2. Node version mismatch
3. Dependency conflicts
4. Vercel configuration issues

## Quick Fixes

### Fix 1: Update vercel.json (Already Done)

I've updated `vercel.json` to use `npm ci` instead of `npm install`:
- `npm ci` is faster and more reliable for CI/CD
- Uses exact versions from `package-lock.json`
- Fails fast if there are conflicts

### Fix 2: Update Vercel Project Settings

1. **Go to Vercel Dashboard:**
   - Open your project
   - Settings → General

2. **Update Build & Development Settings:**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave empty)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** Leave **empty** (let Vercel auto-detect) OR set to `npm ci`
   - **Node.js Version:** `18.x` or `20.x` (recommended)

3. **Save Settings**

### Fix 3: Regenerate package-lock.json

If the error persists, regenerate the lock file:

```bash
# Remove old lock file
rm package-lock.json

# Reinstall and regenerate
npm install

# Commit the new lock file
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Fix 4: Check Node Version

Vercel might be using the wrong Node version. Set it explicitly:

1. **In Vercel Dashboard:**
   - Settings → General
   - **Node.js Version:** Select `18.x` or `20.x`

2. **Or create `.nvmrc` file:**
   ```bash
   echo "18" > .nvmrc
   git add .nvmrc
   git commit -m "Set Node version"
   git push
   ```

### Fix 5: Simplify vercel.json

If still failing, try minimal config:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "",
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

Leave `installCommand` empty to let Vercel auto-detect.

## Alternative: Use Vercel Dashboard Settings

Instead of `vercel.json`, configure everything in Vercel Dashboard:

1. **Vercel Dashboard** → Your Project → Settings → General
2. **Build & Development Settings:**
   - Framework: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: (leave empty or `npm ci`)
   - Node Version: `18.x`

3. **Remove or simplify `vercel.json`:**
   ```json
   {
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/api/$1"
       },
       {
         "src": "/(.*)",
         "dest": "/index.html"
       }
     ]
   }
   ```

## Check Deployment Logs

1. **Vercel Dashboard** → Your Project → Deployments
2. Click on failed deployment
3. Check **"Build Logs"** tab
4. Look for specific error messages

Common errors:
- `ENOENT` = File not found
- `EACCES` = Permission denied
- `ENOTFOUND` = Network issue
- Dependency conflicts

## Nuclear Option: Fresh Start

If nothing works:

```bash
# 1. Clean everything
rm -rf node_modules package-lock.json

# 2. Reinstall
npm install

# 3. Test build locally
npm run build

# 4. If build works, commit and push
git add .
git commit -m "Fix dependencies"
git push
```

## Verify package.json

Make sure `package.json` is valid:

```bash
# Check for syntax errors
node -e "JSON.parse(require('fs').readFileSync('package.json'))"
```

## Still Not Working?

1. **Check Vercel deployment logs** for specific error
2. **Try deploying without vercel.json** (use dashboard settings only)
3. **Check if package-lock.json is committed** to Git
4. **Verify Node version** matches locally and on Vercel

The updated `vercel.json` with `npm ci` should fix it. If not, try the dashboard settings approach!

