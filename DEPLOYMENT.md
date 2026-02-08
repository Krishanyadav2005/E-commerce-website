# Deployment Guide

This guide covers deploying your e-commerce website to various platforms.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Environment Variables](#environment-variables)
5. [Database Considerations](#database-considerations)

## Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket)
- Accounts on deployment platforms
- Node.js installed locally for building

## Backend Deployment

### Option 1: Render (Recommended for Free Tier)

1. **Create a Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     - **Name**: `ecommerce-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Set Environment Variables**
   - Go to Environment tab
   - Add:
     - `PORT`: `10000` (Render assigns port automatically, but set this)
     - `JWT_SECRET`: (Generate a strong random string)

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the URL (e.g., `https://ecommerce-backend.onrender.com`)

### Option 2: Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Add service → Select `backend` folder

3. **Configure**
   - Railway auto-detects Node.js
   - Set start command: `npm start`
   - Add environment variables:
     - `JWT_SECRET`: (Generate a strong random string)

4. **Deploy**
   - Railway auto-deploys on push
   - Get your URL from the service dashboard

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   cd backend
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 4: Vercel (Serverless)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Create `vercel.json` in backend folder**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

3. **Deploy**
   ```bash
   cd backend
   vercel
   ```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Update API URL**
   - Before deploying, update the backend URL in your frontend code
   - Or use environment variables

3. **Create `vercel.json` in frontend folder** (optional)
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "devCommand": "npm run dev",
     "installCommand": "npm install"
   }
   ```

4. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

5. **Set Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Add: `VITE_API_URL` = your backend URL

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Create `netlify.toml` in frontend folder**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Deploy**
   ```bash
   cd frontend
   netlify deploy --prod
   ```

### Option 3: GitHub Pages

1. **Update `vite.config.js`**
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add to `package.json`**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

## Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
```

**Generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=https://your-backend-url.com/api
```

Update `frontend/src/context/AuthContext.jsx` and other API calls to use:
```js
const API_URL = import.meta.env.VITE_API_URL || '/api'
axios.defaults.baseURL = API_URL
```

## Database Considerations

⚠️ **Important**: The current setup uses file-based JSON storage, which **won't work** in serverless environments or multiple server instances.

### Upgrade to MongoDB (Recommended)

1. **Install MongoDB dependencies**
   ```bash
   cd backend
   npm install mongoose
   ```

2. **Create MongoDB Atlas account** (free tier available)
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get connection string

3. **Update database.js**
   - Replace file operations with MongoDB operations
   - Use Mongoose models

### Upgrade to PostgreSQL

1. **Install PostgreSQL dependencies**
   ```bash
   cd backend
   npm install pg
   ```

2. **Use services like:**
   - Supabase (free tier)
   - Railway PostgreSQL
   - Render PostgreSQL

## Quick Deployment Checklist

### Backend
- [ ] Push code to GitHub
- [ ] Create deployment service account
- [ ] Set environment variables (JWT_SECRET, PORT)
- [ ] Configure build and start commands
- [ ] Test API endpoints
- [ ] Update CORS settings if needed

### Frontend
- [ ] Update API URL to production backend
- [ ] Build production version (`npm run build`)
- [ ] Test build locally
- [ ] Deploy to hosting service
- [ ] Set environment variables
- [ ] Test all features

## CORS Configuration

If your frontend and backend are on different domains, update `backend/server.js`:

```js
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:3000'],
  credentials: true
}))
```

## Production Best Practices

1. **Security**
   - Use strong JWT_SECRET
   - Enable HTTPS
   - Add rate limiting
   - Validate all inputs
   - Sanitize user data

2. **Performance**
   - Enable compression
   - Add caching headers
   - Optimize images
   - Use CDN for static assets

3. **Monitoring**
   - Add error logging (Winston, Morgan)
   - Set up uptime monitoring
   - Monitor API response times

4. **Backup**
   - Regular database backups
   - Version control all code
   - Document API changes

## Troubleshooting

### Backend won't start
- Check PORT environment variable
- Verify all dependencies installed
- Check server logs

### Frontend can't connect to backend
- Verify CORS settings
- Check API URL in frontend
- Ensure backend is running

### Build fails
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Review build logs for errors

## Support

For platform-specific issues, refer to:
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Railway Docs](https://docs.railway.app)



