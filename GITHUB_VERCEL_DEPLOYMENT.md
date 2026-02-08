# Deploy Backend to Vercel (Free & Integrated with GitHub)

This guide shows you how to deploy your backend as **free serverless functions on Vercel**, which integrates seamlessly with GitHub.

## Why Vercel?

- ✅ **100% Free** for personal projects
- ✅ **Deploys directly from GitHub** - automatic deployments
- ✅ **Serverless functions** - no server management needed
- ✅ **Works with GitHub Pages** - frontend on GitHub Pages, backend on Vercel
- ✅ **Automatic HTTPS** - secure connections
- ✅ **Global CDN** - fast response times worldwide

## Step-by-Step Deployment

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub repositories

### Step 2: Deploy Your Project

1. **In Vercel Dashboard:**
   - Click **"Add New Project"**
   - Select your `my-portfolio` repository
   - Click **"Import"**

2. **Configure Project:**
   - **Framework Preset:** Other (or leave as default)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** Leave empty (we're only deploying API functions)
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install` (if needed)

3. **Environment Variables:**
   - You don't need any for basic setup
   - Click **"Deploy"**

4. **Wait for Deployment:**
   - Vercel will deploy your project
   - You'll get a URL like: `https://your-project-name.vercel.app`

### Step 3: Update Frontend API Configuration

1. **Get your Vercel deployment URL:**
   - After deployment, Vercel will show you the URL
   - Example: `https://my-portfolio-abc123.vercel.app`

2. **Update `src/config/api.js`:**
   ```javascript
   // Replace the production URL with your Vercel URL
   return process.env.VUE_APP_API_URL || 'https://your-project-name.vercel.app';
   ```

3. **Rebuild and redeploy frontend:**
   ```bash
   npm run build
   npm run deploy
   ```

## How It Works

### File Structure

```
my-portfolio/
├── api/                    # Vercel serverless functions
│   ├── auth.js            # Authentication endpoint
│   └── messages.js        # Messages endpoint (GET & POST)
├── src/
│   ├── backend/
│   │   └── data/         # JSON data files (read by serverless functions)
│   └── config/
│       └── api.js        # API URL configuration
└── vercel.json           # Vercel configuration
```

### API Endpoints

After deployment, your API will be available at:

- **Authentication:** `https://your-project.vercel.app/api/auth`
- **Messages:** `https://your-project.vercel.app/api/messages`

### Automatic Deployments

- Every push to your GitHub repository automatically triggers a new deployment
- Vercel creates a preview deployment for each pull request
- Production deployments happen on pushes to `main` branch

## Testing Your Deployment

1. **Test Authentication:**
   ```bash
   curl -X POST https://your-project.vercel.app/api/auth \
     -H "Content-Type: application/json" \
     -d '{"username":"!Ghost@Cyprus","password":"!Ghost@Cyprus"}'
   ```

2. **Test Messages (GET):**
   ```bash
   curl https://your-project.vercel.app/api/messages
   ```

3. **Test Messages (POST):**
   ```bash
   curl -X POST https://your-project.vercel.app/api/messages \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","message":"Test message","datetime":"2024-01-01 12:00:00"}'
   ```

## Important Notes

### File System Limitations

⚠️ **Important:** Vercel serverless functions have an **ephemeral file system**. Data written to `/tmp` is temporary and may not persist.

**Current Implementation:**
- ✅ Reading from JSON files works
- ⚠️ Writing messages uses `/tmp` directory (temporary storage)
- ⚠️ Data may not persist between function invocations

**For Production (Persistent Storage):**

**Option 1: Vercel KV (Recommended - Free Tier)**
- Sign up for Vercel KV (Redis) - free tier available
- Update `api/messages.js` to use KV instead of file system
- Data persists permanently

**Option 2: MongoDB Atlas (Free Tier)**
- Create free MongoDB Atlas account
- Update functions to use MongoDB
- Data persists permanently

**Option 3: Email Notifications (Simple)**
- Instead of storing messages, send email notifications
- Use services like SendGrid, Mailgun, or Nodemailer
- No storage needed

**For Testing:**
- Current setup works for basic testing
- Consider implementing one of the above for production use

### CORS Configuration

The serverless functions already include CORS headers to work with GitHub Pages.

### Environment Variables (Optional)

If you want to use environment variables:

1. **In Vercel Dashboard:**
   - Go to your project
   - Settings → Environment Variables
   - Add variables as needed

2. **Access in code:**
   ```javascript
   const apiUrl = process.env.VUE_APP_API_URL;
   ```

## Troubleshooting

### Function Not Found (404)

- Check that files are in the `api/` directory
- Verify `vercel.json` configuration
- Check Vercel deployment logs

### CORS Errors

- The functions already include CORS headers
- If issues persist, check browser console for specific errors

### Data Not Persisting

- This is expected with the current file-based approach
- For persistent storage, use a database (see Important Notes above)

### Deployment Fails

- Check Vercel deployment logs
- Ensure all dependencies are in `package.json`
- Verify file paths in serverless functions

## Alternative: Netlify Functions

If you prefer Netlify over Vercel:

1. Create `netlify/functions/auth.js` and `netlify/functions/messages.js`
2. Similar structure, but Netlify uses different exports
3. Deploy to Netlify instead

## Next Steps

1. ✅ Deploy to Vercel (follow steps above)
2. ✅ Update `src/config/api.js` with your Vercel URL
3. ✅ Test the endpoints
4. ✅ Rebuild and redeploy frontend to GitHub Pages
5. ✅ Test the full flow on GitHub Pages

Your backend will now run on Vercel (free) and your frontend on GitHub Pages (free) - both integrated with GitHub! 🎉

