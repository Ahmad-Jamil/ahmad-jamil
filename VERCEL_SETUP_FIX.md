# Fix Vercel "package.json not found" Error

## The Problem

Vercel is trying to run `npm install` but can't find `package.json`. This happens when Vercel's project settings are misconfigured.

## Solution: Configure Vercel Project Settings

### Option 1: Update Vercel Dashboard Settings (Recommended)

1. **Go to Vercel Dashboard:**
   - Open your project: `ahmad-jamil`
   - Click **Settings** → **General**

2. **Update Build & Development Settings:**
   - **Framework Preset:** Select **"Other"** or **"None"**
   - **Root Directory:** Leave empty (or set to `./`)
   - **Build Command:** Leave **empty** or set to `echo "No build needed"`
   - **Output Directory:** Leave **empty**
   - **Install Command:** Leave **empty** or set to `echo "No install needed"`

3. **Save Settings**

4. **Redeploy:**
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

### Option 2: Use vercel.json (Already Updated)

The `vercel.json` file has been updated to skip builds. Make sure it's committed:

```json
{
  "version": 2,
  "builds": [],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ]
}
```

### Option 3: Create Minimal package.json for Vercel (If Needed)

If Vercel absolutely requires a package.json, create a minimal one in the root (you already have one, but make sure it's committed):

```json
{
  "name": "portfolio-api",
  "version": "1.0.0",
  "private": true
}
```

But this shouldn't be necessary since you already have `package.json` in the root.

## Step-by-Step Fix

### Step 1: Verify package.json Exists

```bash
ls -la package.json
```

Should show the file exists in root directory.

### Step 2: Check Vercel Project Settings

1. Vercel Dashboard → Your Project → Settings → General
2. Verify:
   - **Root Directory:** Empty or `./`
   - **Framework:** Other/None
   - **Build Command:** Empty
   - **Output Directory:** Empty

### Step 3: Commit and Push vercel.json

```bash
git add vercel.json
git commit -m "Fix Vercel configuration"
git push
```

### Step 4: Redeploy in Vercel

- Vercel Dashboard → Deployments → Redeploy

## Why This Happens

Vercel tries to:
1. Detect the framework (Vue.js in your case)
2. Run `npm install` to install dependencies
3. Run build commands

But for **serverless functions only**, you don't need:
- Framework detection
- npm install (functions use built-in Node.js modules)
- Build process

## Verification

After fixing, check deployment logs:
- Should see: "No build command found, skipping build"
- Should see: Functions detected in `api/` folder
- Should NOT see: npm install errors

## Alternative: Deploy Only API Folder

If the above doesn't work, you could:

1. Create a separate Vercel project
2. Point it to a subdirectory: `api/`
3. But this is more complex and not recommended

The dashboard settings fix should work!

