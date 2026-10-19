# 🌐 Complete Step-by-Step Free Deployment Guide

This guide provides three 100% free options to deploy your **TalentAI - AI Recruitment Platform** to the internet with HTTPS, custom URLs, and cloud database persistence.

---

## 🏆 Option 1: All-In-One Full-Stack on Render.com (Recommended)

Render gives you a free web service that hosts both the **React Frontend** and **Node.js Express Backend** together under a single URL with zero CORS configuration.

### Prerequisites
1. A free GitHub account ([github.com](https://github.com))
2. A free Render account ([render.com](https://render.com))

---

### Step 1: Push Your Code to GitHub

Open a terminal (or VS Code terminal) in the project folder:
```powershell
# 1. Initialize git
git init

# 2. Stage all files
git add .

# 3. Commit
git commit -m "Initial commit: TalentAI recruitment platform"

# 4. Create a new repository on github.com (e.g., ai-recruitment-platform)
# 5. Link and push:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-recruitment-platform.git
git push -u origin main
```

---

### Step 2: Deploy on Render.com

1. Go to [dashboard.render.com](https://dashboard.render.com/) and click **"New +"** &rarr; **"Web Service"**.
2. Connect your GitHub account and select your `ai-recruitment-platform` repository.
3. Configure the following fields:

| Field | Value |
|---|---|
| **Name** | `talentai-recruitment` *(or any unique name)* |
| **Region** | `Singapore` or `Frankfurt` *(pick closest to you)* |
| **Branch** | `main` |
| **Root Directory** | *(leave blank)* |
| **Runtime** | `Node` |
| **Build Command** | `npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` ($0/month) |

4. Click **"Deploy Web Service"**.
5. Render will automatically:
   - Install frontend and backend packages.
   - Compile the React application into production assets.
   - Start the Express server on port `PORT`.
6. Once the build finishes (about 2–3 minutes), your public HTTPS URL will be live:
   ```
   https://talentai-recruitment.onrender.com
   ```

---

### Step 3: (Optional) Connect Free Cloud PostgreSQL via Neon.tech

If you want a hosted cloud SQL database instead of local SQLite:

1. Sign up for free at [neon.tech](https://neon.tech/) (no credit card required).
2. Create a project named `talentai-db`.
3. In the Neon dashboard, copy your **Postgres Connection String**:
   ```
   postgres://username:password@ep-sample-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
4. Open the **SQL Editor** tab in Neon, copy the contents of [`backend/database/schema.sql`](./backend/database/schema.sql) and [`backend/database/seed.sql`](./backend/database/seed.sql), and click **"Run"**.
5. In your Render Dashboard, go to **"Environment"** &rarr; **"Add Environment Variable"**:
   - **Key**: `DATABASE_URL`
   - **Value**: *(Paste your Neon Postgres connection string)*
6. Click **"Save Changes"**. Render will redeploy automatically with cloud PostgreSQL active!

---

## ⚡ Option 2: Decoupled Deployment (Vercel Frontend + Render Backend)

If you prefer deploying the frontend and backend on separate specialized platforms:

### 1. Backend on Render:
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- Copy your Render backend URL (e.g. `https://talentai-api.onrender.com`).

### 2. Frontend on Vercel ([vercel.com](https://vercel.com)):
- Click **"Add New"** &rarr; **"Project"** &rarr; Import your GitHub repo.
- **Root Directory**: `frontend`
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- Click **"Deploy"**.

---

## 🚀 Option 3: Instant 60-Second Demo Deployment (Vercel / GitHub Pages)

Because TalentAI includes complete built-in offline mock data and client-side semantic matching, you can deploy the frontend as an instant static web app:

### Via Vercel:
1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Import the repository, select `frontend` as the Root Directory.
3. Click **"Deploy"**.
4. You get an instant URL (e.g. `https://talentai.vercel.app`) with zero server maintenance.

### Via GitHub Pages:
1. In your GitHub repository, go to **Settings** &rarr; **Pages**.
2. Select **Source**: `Deploy from a branch` &rarr; `main` &rarr; `/ (root)`.
3. Because [`index.html`](./index.html) is pre-compiled with local vanilla JavaScript, GitHub Pages serves the entire platform immediately at:
   ```
   https://YOUR_USERNAME.github.io/ai-recruitment-platform/
   ```

---

## 🛠️ Verification Checklist After Deployment

- [ ] Open the live URL in your browser and verify the clean white UI.
- [ ] Check the **Easwari Engineering College** logo in the header and footer.
- [ ] Navigate through tabs: **Dashboard**, **AI Screening & Ranking**, **Candidate ATS (Kanban)**, **Smart Scheduler**, and **SQL Database**.
- [ ] Test the **Resume Test Bench** by clicking *"Run Screening Match"*.
- [ ] Click **"Google Meet (Live)"** to confirm an instant meeting room launches.
