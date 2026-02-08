# Fix: Set Vercel Environment Variable

## The Problem

The build is using `/ahmad-jamil/` path instead of `/` because Vercel environment detection isn't working.

## Solution: Set Environment Variable in Vercel

### Step 1: Add Environment Variable in Vercel Dashboard

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select your `ahmad-jamil` project

2. **Go to Settings:**
   - Click **Settings** → **Environment Variables**

3. **Add New Variable:**
   - **Name:** `VUE_APP_DEPLOY_TARGET`
   - **Value:** `vercel`
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

### Step 2: Redeploy

After adding the environment variable:

1. **Vercel Dashboard** → Deployments
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger deployment

### Step 3: Verify

After redeployment:

1. **Check build logs:**
   - Should see environment variable being used
   - Build should use root path `/`

2. **Check deployed site:**
   - Visit: `https://ahmad-jamil.vercel.app`
   - Open DevTools → Network tab
   - JS files should load from `/js/...` (not `/ahmad-jamil/js/...`)

## Alternative: Simpler Fix

If environment variable doesn't work, we can simplify `vue.config.js` to always use root path for production builds, and only use `/ahmad-jamil/` when explicitly building for GitHub Pages.

But the environment variable approach is cleaner and allows both deployments to work.

## Quick Commands

After setting the environment variable, you can also trigger a rebuild by:

```bash
# Make a small change and push
git commit --allow-empty -m "Trigger Vercel rebuild with env var"
git push
```

The environment variable will ensure Vercel builds with the correct path!

