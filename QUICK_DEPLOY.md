# Quick Deployment Guide

## 🚀 Fastest Way to Deploy

### Step 1: Deploy Backend (Render - Free)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com) and sign up
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     - **Name**: `ecommerce-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Add Environment Variable:
     - **Key**: `JWT_SECRET`
     - **Value**: Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy your backend URL (e.g., `https://ecommerce-backend.onrender.com`)

### Step 2: Deploy Frontend (Vercel - Free)

1. **Update Frontend Environment**
   - Create `frontend/.env` file:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
   (Replace with your actual backend URL)

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Settings:
     - **Root Directory**: `frontend`
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add Environment Variable:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://your-backend-url.onrender.com/api`
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)
   - Your site is live! 🎉

## ✅ That's It!

Your e-commerce site is now live. Visit your Vercel URL to see it in action.

## 🔧 Troubleshooting

**Frontend can't connect to backend?**
- Check CORS settings in `backend/server.js`
- Verify `VITE_API_URL` is set correctly
- Make sure backend URL includes `/api` at the end

**Backend not starting?**
- Check Render logs
- Verify `JWT_SECRET` is set
- Ensure all dependencies are in `package.json`

**Need help?** See `DEPLOYMENT.md` for detailed instructions.



