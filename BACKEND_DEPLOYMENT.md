# Backend Deployment Guide

## Problem

GitHub Pages only serves static files and cannot run Node.js/Express servers. Therefore, the backend server must be deployed separately to a hosting service that supports Node.js.

## Solution Overview

1. Deploy the backend server to a hosting service (Heroku, Railway, Render, etc.)
2. Update the API URL in `src/config/api.js` with your deployed backend URL
3. Rebuild and redeploy the frontend to GitHub Pages

## Deployment Options

### Option 1: Heroku (Recommended for beginners)

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Or download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create a Heroku app**
   ```bash
   cd src/backend
   heroku create your-app-name
   ```

4. **Create Procfile** (in `src/backend/` directory)
   ```
   web: node index.js
   ```

5. **Set up package.json** (if not exists in backend folder)
   Create `src/backend/package.json`:
   ```json
   {
     "name": "portfolio-backend",
     "version": "1.0.0",
     "main": "index.js",
     "scripts": {
       "start": "node index.js"
     },
     "dependencies": {
       "express": "^4.21.1",
       "body-parser": "^1.20.3",
       "cors": "^2.8.5"
     }
   }
   ```

6. **Deploy**
   ```bash
   git init  # if not already a git repo
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a your-app-name
   git push heroku main
   ```

7. **Your backend URL will be:** `https://your-app-name.herokuapp.com`

### Option 2: Railway

1. **Sign up at** https://railway.app
2. **Create New Project** → **Deploy from GitHub repo**
3. **Select your repository** and point to `src/backend` directory
4. **Add start command:** `node index.js`
5. **Deploy** - Railway will provide a URL like `https://your-app.railway.app`

### Option 3: Render

1. **Sign up at** https://render.com
2. **Create New** → **Web Service**
3. **Connect your GitHub repository**
4. **Settings:**
   - Build Command: `cd src/backend && npm install`
   - Start Command: `cd src/backend && node index.js`
   - Root Directory: Leave empty or set to repository root
5. **Deploy** - Render will provide a URL

### Option 4: Vercel (Serverless Functions)

Vercel requires converting Express routes to serverless functions. This is more complex but free.

## Update Frontend Configuration

After deploying your backend, update `src/config/api.js`:

```javascript
// Replace the production URL with your deployed backend URL
return process.env.VUE_APP_API_URL || 'https://your-backend-url.herokuapp.com';
```

Or use environment variables:

1. Create `.env.production` file in project root:
   ```
   VUE_APP_API_URL=https://your-backend-url.herokuapp.com
   ```

2. Update `src/config/api.js`:
   ```javascript
   return process.env.VUE_APP_API_URL || 'https://your-backend-url.herokuapp.com';
   ```

## Testing

1. **Test your deployed backend:**
   ```bash
   curl https://your-backend-url.herokuapp.com/api/messages
   ```

2. **Rebuild frontend:**
   ```bash
   npm run build
   ```

3. **Test locally with production backend:**
   - Temporarily set the API URL in `src/config/api.js` to your deployed URL
   - Run `npm run serve`
   - Test the contact form and messages page

4. **Deploy frontend:**
   ```bash
   npm run deploy
   ```

## Important Notes

- **CORS:** The backend already has CORS enabled, which should work for GitHub Pages
- **Environment Variables:** Some hosting services require setting environment variables for sensitive data
- **File Storage:** The current implementation uses JSON files. For production, consider using a database (MongoDB, PostgreSQL, etc.)
- **Authentication:** Consider moving credentials to environment variables instead of JSON files

## Troubleshooting

### Backend not responding
- Check hosting service logs
- Verify the start command is correct
- Ensure all dependencies are in `package.json`

### CORS errors
- Verify CORS is enabled in backend (`app.use(cors())`)
- Check if hosting service requires CORS configuration

### 404 errors
- Verify the API routes are correct
- Check if hosting service requires route configuration

