# Vercel 404 Error Troubleshooting Guide

## Quick Fixes

### 1. Fixed Issues
- ✅ Removed double `https://` from API URL
- ✅ Simplified `vercel.json` configuration
- ✅ Added test endpoint for debugging

### 2. Test Your Deployment

**Step 1: Test the test endpoint**
```
https://ahmad-jamil.vercel.app/api/test
```

If this works, your serverless functions are deployed correctly.

**Step 2: Test authentication endpoint**
```bash
curl -X POST https://ahmad-jamil.vercel.app/api/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"!Ghost@Cyprus","password":"!Ghost@Cyprus"}'
```

**Step 3: Test messages endpoint**
```bash
curl https://ahmad-jamil.vercel.app/api/messages
```

## Common 404 Causes & Solutions

### Issue 1: Functions Not Deployed

**Check:**
1. Go to Vercel Dashboard → Your Project → Functions tab
2. You should see `api/auth.js` and `api/messages.js` listed

**If not listed:**
- Make sure `api/` folder is in the **root** of your repository
- Files must be named exactly: `auth.js` and `messages.js`
- Redeploy: Vercel Dashboard → Deployments → Redeploy

### Issue 2: Wrong API URL

**Check your frontend config:**
- Open `src/config/api.js`
- Make sure URL is: `https://ahmad-jamil.vercel.app` (no trailing slash, no double https)

**Current correct format:**
```javascript
return process.env.VUE_APP_API_URL || 'https://ahmad-jamil.vercel.app';
```

### Issue 3: File Path Issues

**If you see "Authentication configuration not found":**

The serverless function can't find `authentication.json`. Check:

1. **File exists in repository:**
   ```bash
   ls -la src/backend/data/authentication.json
   ```

2. **File is committed to Git:**
   - Make sure `authentication.json` is NOT in `.gitignore`
   - Commit and push the file

3. **File path in code:**
   - The path in `api/auth.js` should be: `src/backend/data/authentication.json`
   - This is relative to the project root

### Issue 4: Vercel Configuration

**Current `vercel.json`:**
```json
{}
```

This is correct - Vercel auto-detects the `api/` folder. If you had a complex config before, the empty object should fix it.

### Issue 5: Build Settings in Vercel

**Check Vercel Dashboard:**
1. Go to Project Settings → General
2. **Root Directory:** Should be empty or `./`
3. **Build Command:** Can be empty (we're not building, just deploying functions)
4. **Output Directory:** Can be empty

### Issue 6: Deployment Logs

**Check deployment logs:**
1. Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Check the "Functions" tab for errors
4. Check the "Logs" tab for runtime errors

## Step-by-Step Debugging

### Step 1: Verify Test Endpoint
```
https://ahmad-jamil.vercel.app/api/test
```

**Expected:** JSON response with message "Vercel serverless function is working!"

**If 404:**
- Functions aren't deployed
- Check Vercel Dashboard → Functions tab
- Redeploy the project

### Step 2: Check File Structure

Your repository should have:
```
my-portfolio/
├── api/
│   ├── auth.js          ✅ Must exist
│   ├── messages.js      ✅ Must exist
│   └── test.js          ✅ Test endpoint
├── src/
│   ├── backend/
│   │   └── data/
│   │       └── authentication.json  ✅ Must exist and be committed
│   └── config/
│       └── api.js
└── vercel.json          ✅ Should be {} or minimal config
```

### Step 3: Verify Git Commit

Make sure all files are committed:
```bash
git status
```

You should commit:
- `api/auth.js`
- `api/messages.js`
- `api/test.js`
- `vercel.json`
- `src/backend/data/authentication.json` (if not in .gitignore)

### Step 4: Force Redeploy

1. **In Vercel Dashboard:**
   - Go to Deployments
   - Click "..." on latest deployment
   - Click "Redeploy"

2. **Or push a new commit:**
   ```bash
   git commit --allow-empty -m "Trigger Vercel redeploy"
   git push
   ```

## Still Getting 404?

### Check These:

1. **Vercel Project Name:**
   - Is your Vercel project actually named `ahmad-jamil`?
   - Check the URL in Vercel Dashboard
   - Update `src/config/api.js` if different

2. **Branch Deployment:**
   - Make sure you're deploying from the correct branch (usually `main` or `master`)
   - Check Vercel Settings → Git → Production Branch

3. **Function Runtime:**
   - Vercel should auto-detect Node.js
   - Check Functions tab in deployment logs

4. **CORS Issues:**
   - If you see CORS errors (not 404), that's different
   - The functions already include CORS headers

## Quick Test Commands

```bash
# Test 1: Test endpoint
curl https://ahmad-jamil.vercel.app/api/test

# Test 2: Auth endpoint
curl -X POST https://ahmad-jamil.vercel.app/api/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"!Ghost@Cyprus","password":"!Ghost@Cyprus"}'

# Test 3: Messages GET
curl https://ahmad-jamil.vercel.app/api/messages

# Test 4: Messages POST
curl -X POST https://ahmad-jamil.vercel.app/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","message":"Test message","datetime":"2024-01-01 12:00:00"}'
```

## Still Need Help?

If you're still getting 404 after trying all above:

1. **Share your Vercel deployment logs** (Functions tab)
2. **Share the exact error message** you're seeing
3. **Verify the test endpoint works** (`/api/test`)
4. **Check if functions appear in Vercel Dashboard** → Functions tab

The test endpoint (`/api/test`) is the easiest way to verify your serverless functions are working!

