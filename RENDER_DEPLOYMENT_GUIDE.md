# Render Blueprint Deployment Guide 🚀
## Airbnb Clone (Full Stack: Next.js Frontend + Node/Express Backend)

This repository includes a ready-to-deploy **Render Blueprint Specification** (`render.yaml`) that configures and provisions both the frontend and backend services automatically in a single click.

---

## 🏗️ Architecture Overview

When you deploy via Render Blueprint, Render automatically provisions two linked web services:

1. **`airbnb-backend` (Web Service)**:
   - **Runtime**: Node.js
   - **Root Directory**: `backend/`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Endpoints**:
     - `GET /api/health` (Render automated health check)
     - `GET /api/listing` (Listing metadata & pricing)
     - `GET /api/similar-listings` (Nearby stays)
     - `POST /api/reserve` (Instant booking handler)

2. **`airbnb-frontend` (Web Service)**:
   - **Runtime**: Node.js
   - **Root Directory**: `airbnb-app/`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variable**: `NEXT_PUBLIC_API_URL` dynamically injected from `airbnb-backend` host.

---

## 📋 Step-by-Step Instructions to Deploy on Render

### Step 1: Push Code to GitHub / GitLab
Make sure your project (including `render.yaml`, `backend/`, and `airbnb-app/`) is pushed to your Git repository:

```bash
git add .
git commit -m "Add Render blueprint and backend service"
git push origin main
```

*(Note: Your repository can be **Public** or **Private**; Render supports both).*

---

### Step 2: Sign In to Render
1. Open [https://dashboard.render.com](https://dashboard.render.com) in your browser.
2. Log in using your GitHub or GitLab account.

---

### Step 3: Create a New Blueprint Instance
1. In the Render Dashboard, click the **"New +"** button at the top right of the navigation bar.
2. In the dropdown menu, select **"Blueprint"** (or go to [https://dashboard.render.com/blueprints](https://dashboard.render.com/blueprints)).

---

### Step 4: Connect Your Repository
1. Select your Git provider (**GitHub** / **GitLab**).
2. Find your repository (e.g. `PlayPower` or `airbnb-clone`) and click **"Connect"**.
   - *If you don't see your repository, click "Configure access" on GitHub to grant Render permissions for the repo.*

---

### Step 5: Review the Blueprint Configuration
1. Give your Blueprint instance a name (e.g. `airbnb-clone-stack`).
2. Render will automatically scan the root of your repo, detect `render.yaml`, and parse the 2 services:
   - ✅ **`airbnb-backend`**: Web Service (Node)
   - ✅ **`airbnb-frontend`**: Web Service (Node / Next.js)
3. Both services will show the Free tier plan.

---

### Step 6: Click "Apply" to Deploy
1. Click the **"Apply"** button at the bottom of the page.
2. Render will now automatically:
   - Provision the build environments for both services.
   - Run `npm install` and start `airbnb-backend`.
   - Resolve the backend host and pass it as `NEXT_PUBLIC_API_URL` to `airbnb-frontend`.
   - Run `npm install && npm run build` for `airbnb-frontend` and launch `npm start`.

---

### Step 7: Verify Live Deployments
Once both services show a green **"Live"** badge:
1. **Backend Verification**:
   - Click on `airbnb-backend`.
   - Click its generated URL: `https://airbnb-backend-<hash>.onrender.com/api/health`
   - You should see:
     ```json
     {
       "status": "healthy",
       "service": "airbnb-clone-backend",
       "uptime": 12.34
     }
     ```

2. **Frontend Verification**:
   - Click on `airbnb-frontend`.
   - Click its generated URL: `https://airbnb-frontend-<hash>.onrender.com`
   - Browse the responsive listing page, open the photo tour, lightbox, and click **"Reserve"** in the sticky booking widget to test live booking confirmation!

---

## ⚙️ Blueprint Configuration (`render.yaml`)

```yaml
version: "1"

services:
  - type: web
    name: airbnb-backend
    runtime: node
    plan: free
    region: oregon
    rootDir: backend
    buildCommand: npm install
    startCommand: npm start
    healthCheckPath: /api/health
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000

  - type: web
    name: airbnb-frontend
    runtime: node
    plan: free
    region: oregon
    rootDir: airbnb-app
    buildCommand: npm install && npm run build
    startCommand: npm start
    healthCheckPath: /
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
      - key: NEXT_PUBLIC_API_URL
        fromService:
          type: web
          name: airbnb-backend
          property: host
```

---

## 💡 Key Tips & Troubleshooting

1. **Free Tier Cold Starts**:
   - On Render's Free tier, services spin down after 15 minutes of inactivity. The first request after sleep may take ~30–50 seconds to spin up.
2. **Internal API Fallback**:
   - `airbnb-app` is built with dual-mode resilience. If the standalone backend is waking up or `NEXT_PUBLIC_API_URL` is omitted, the Next.js internal API routes (`/api/reserve` and `/api/listing`) serve the requests immediately with zero downtime.
3. **Custom Domains**:
   - You can add custom domains (e.g. `myairbnb.com`) to `airbnb-frontend` directly in the Render dashboard under **Settings -> Custom Domains**. Free SSL certificates are auto-provisioned via Let's Encrypt.
