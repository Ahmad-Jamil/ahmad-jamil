# Vercel Deployment Checklist - Changes Not Showing

## Quick Checklist

### ✅ Step 1: Verify Changes Are Committed

```bash
# Check if changes are committed
git status

# If not, commit them:
git add .
git commit -m "Update Vercel configuration"
git push
```

### ✅ Step 2: Check Vercel Dashboard

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select your `ahmad-jamil` project

2. **Check Deployments Tab:**
   - Look for latest deployment
   - Check status:
     - ✅ **Ready** = Deployed successfully
     - ⏳ **Building** = Still deploying
     - ❌ **Error** = Deployment failed (check logs)

3. **Check Build Logs:**
   - Click on latest deployment
   - Go to **"Build Logs"** tab
   - Look for errors or warnings

### ✅ Step 3: Verify Vercel is Connected to GitHub

1. **Vercel Dashboard** → Your Project → Settings → Git
2. **Check:**
   - Repository is connected
   - Production Branch: `main` or `master` (your default branch)
   - Auto-deployments: Enabled

### ✅ Step 4: Trigger Manual Deployment

If auto-deploy isn't working:

1. **Vercel Dashboard** → Your Project → Deployments
2. Click **"..."** on any deployment
3. Click **"Redeploy"**
4. Or click **"Redeploy"** button at top

### ✅ Step 5: Check Build Configuration

**Vercel Dashboard** → Settings → General:

- **Framework Preset:** Other
- **Root Directory:** `./` (empty)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm ci` or leave empty
- **Node.js Version:** `18.x` or `20.x`

### ✅ Step 6: Verify Files Are Built

Check that `dist/` folder exists and has files:

```bash
# Check dist folder
ls -la dist/

# Should see:
# - index.html
# - js/ folder
# - css/ folder
```

### ✅ Step 7: Clear Cache

1. **Browser Cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or use incognito/private window

2. **Vercel Cache:**
   - Vercel Dashboard → Deployments
   - Click **"Redeploy"** with **"Use existing Build Cache"** unchecked

### ✅ Step 8: Check Deployment URL

Make sure you're checking the correct URL:

- **Production:** `https://ahmad-jamil.vercel.app`
- **Preview:** Each deployment gets a unique preview URL

Check which URL you're using!

## Common Issues

### Issue 1: Changes Not Pushed to GitHub

**Symptom:** Built locally but Vercel doesn't see changes

**Fix:**
```bash
git add .
git commit -m "Your changes"
git push
```

Vercel only deploys when you push to GitHub!

### Issue 2: Wrong Branch

**Symptom:** Changes on different branch

**Fix:**
1. Check which branch you're on: `git branch`
2. Push to main/master: `git push origin main`
3. Or update Vercel settings to deploy from your branch

### Issue 3: Build Failing Silently

**Symptom:** No errors but site not updating

**Fix:**
1. Check Vercel deployment logs
2. Look for warnings or failed steps
3. Check if `dist/` folder is being created

### Issue 4: Cached Old Version

**Symptom:** Changes deployed but old version showing

**Fix:**
1. Clear browser cache
2. Hard refresh
3. Check Vercel deployment - make sure latest is "Ready"
4. Wait 1-2 minutes for CDN to update

### Issue 5: vercel.json Not Being Used

**Symptom:** Configuration not applying

**Fix:**
1. Make sure `vercel.json` is in root directory
2. Check it's committed: `git ls-files | grep vercel.json`
3. Verify syntax is valid JSON

## Debugging Steps

### Step 1: Check Git Status

```bash
git status
git log --oneline -5
```

### Step 2: Verify Files Are Committed

```bash
# Check if vercel.json is tracked
git ls-files | grep vercel.json

# Check if dist is in .gitignore (it should be)
cat .gitignore | grep dist
```

### Step 3: Test Build Locally

```bash
# Clean build
rm -rf dist
npm run build

# Verify dist exists
ls -la dist/
```

### Step 4: Check Vercel Logs

1. Vercel Dashboard → Your Project → Deployments
2. Click on latest deployment
3. Check:
   - **Build Logs** - See what happened during build
   - **Functions** - Check if API functions are deployed
   - **Runtime Logs** - See runtime errors

## Quick Fix Commands

```bash
# 1. Ensure everything is committed
git add .
git commit -m "Update for Vercel deployment"
git push

# 2. Wait for Vercel to detect (usually 30 seconds)
# 3. Check Vercel Dashboard for new deployment
# 4. If no deployment, trigger manually in dashboard
```

## Still Not Working?

1. **Check Vercel Dashboard:**
   - Is there a new deployment?
   - What's the status?
   - Any errors in logs?

2. **Verify GitHub Connection:**
   - Vercel Dashboard → Settings → Git
   - Is repository connected?
   - Are webhooks working?

3. **Try Manual Deploy:**
   - Vercel Dashboard → Deployments → "Redeploy"

4. **Check Branch:**
   - Make sure you're pushing to the branch Vercel is watching
   - Usually `main` or `master`

## Expected Flow

```
1. You: git push
   ↓
2. GitHub: Receives push
   ↓
3. Vercel: Detects push (via webhook)
   ↓
4. Vercel: Starts deployment
   ↓
5. Vercel: Runs npm ci (or npm install)
   ↓
6. Vercel: Runs npm run build
   ↓
7. Vercel: Deploys dist/ folder
   ↓
8. Vercel: Deploys api/ functions
   ↓
9. Site: Live at https://ahmad-jamil.vercel.app
```

If any step fails, check the logs!

