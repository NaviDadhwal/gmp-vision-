# GMP VISION — Production Deployment Guide (Vercel & Cloud)

This guide provides end-to-end instructions for deploying **GMP VISION** (Frontend SPA and REST API backend) to **Vercel**, **Render**, or **Railway** with 100% production readiness.

---

## 🏗️ Architecture Overview

| Layer | Technology | Recommended Host | Routing / Ingress |
|---|---|---|---|
| **Frontend** | React 18 + Vite + TypeScript | **Vercel** | SPA rewrites to `/index.html` via `vercel.json` |
| **Backend API** | Node.js + Express + Mongoose | **Render** / **Railway** / **Vercel Serverless** | `/api/v1/*` routes |
| **Database** | MongoDB Atlas M0/M10 Cluster | **MongoDB Atlas** | Connection caching with pooled socket reuse |
| **Media Assets**| Cloudinary CDN | **Cloudinary** | Secure media upload & delivery |

---

## 🚀 Part 1: Deploying Frontend to Vercel

### Step 1: Connect GitHub Repository
1. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
2. Select your repository: `NaviDadhwal/gmp-vision-`.

### Step 2: Configure Project Settings
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend` *(or leave as `./` — root `vercel.json` will automatically build `frontend`)*
- **Build Command**: `npm run build`
- **Output Directory**: `dist` (or `frontend/dist` if root directory is `./`)

### Step 3: Configure Environment Variables
In the **Environment Variables** section on Vercel, add:

| Key | Example Value | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `https://api.yourdomain.com` (or local `http://localhost:5000` for testing) | Full URL of your deployed backend API (omit trailing slash) |
| `VITE_SITE_URL` | `https://gmpvision.com` | Production canonical site domain |
| `VITE_WHATSAPP_NUMBER` | `919817343117` | Direct WhatsApp technical hotline number |

### Step 4: Deploy & Verify
1. Click **"Deploy"**.
2. Once deployment completes, test:
   - **SPA Deep Linking**: Directly open `/products/cleanroom-panels`, `/rfq`, or `/admin`. The page will render cleanly without 404s due to `vercel.json` rewrites.
   - **Admin Portal**: Navigate to `/admin`.
     - **Live Backend Mode**: Log in with `admin@gmpvision.com` and your seeded password.
     - **Standalone Offline Mode**: Log in with `gmpvision3@gmail.com` / `admin123`.

---

## ⚙️ Part 2: Deploying Backend

### Option A: Long-Running Service (Render / Railway) — *Recommended*
*Best for full background cron jobs (`node-cron`), persistent WebSocket connections, and fixed outbound IP capabilities.*

1. **New Web Service**: Connect `NaviDadhwal/gmp-vision-` on [Render](https://render.com) or [Railway](https://railway.app).
2. **Root Directory**: `backend`
3. **Build Command**: `npm install && npm run build`
4. **Start Command**: `npm start`
5. **Health Check Path**: `/health` (returns `{"status": "ok"}`)
6. **Readiness Probe**: `/ready` (returns `{"status": "ready", "database": "connected"}`)

---

### Option B: Vercel Serverless Function
*Best if you prefer an all-in-one Vercel hosting setup.*

1. In Vercel, create a second project from the same repo.
2. Set **Root Directory** to `backend`.
3. Vercel automatically routes all requests through `backend/api/index.ts` via `backend/vercel.json`.
4. Add the backend environment variables listed below.

---

## 🔐 Backend Environment Variables

Configure these variables in your backend hosting dashboard:

| Variable | Required | Example / Default | Description |
|---|:---:|---|---|
| `NODE_ENV` | **Yes** | `production` | Enables production security, strict CSP, and cookies |
| `PORT` | No | `5000` | Injected automatically by Render/Railway |
| `MONGODB_URI` | **Yes** | `mongodb+srv://user:pass@cluster0.mongodb.net/gmp_vision` | MongoDB Atlas cluster connection string |
| `JWT_ACCESS_SECRET` | **Yes** | `64+ char random hex string` | Secret used to sign short-lived access tokens (min 32 chars) |
| `JWT_REFRESH_SECRET` | **Yes** | `64+ char random hex string` | Secret used to sign long-lived refresh tokens (min 32 chars) |
| `JWT_ACCESS_EXPIRES_IN`| No | `15m` | Token lifetime |
| `JWT_REFRESH_EXPIRES_IN`| No | `7d` | Refresh token lifetime |
| `CORS_ORIGINS` | **Yes** | `https://gmp-vision.vercel.app,https://gmpvision.com` | Comma-separated frontend domains (all `*.vercel.app` domains are automatically supported) |
| `SUPERADMIN_EMAIL` | No | `admin@gmpvision.com` | Seed superadmin email |
| `SUPERADMIN_PASSWORD` | No | `Admin@GMPVision2026!` | Seed superadmin password |
| `ADMIN_NOTIFICATION_EMAIL`| No | `gmpvision3@gmail.com` | Target recipient for RFQ inquiry alerts |
| `CLOUDINARY_CLOUD_NAME` | No | *(optional)* | Cloudinary cloud name for media library |
| `CLOUDINARY_API_KEY` | No | *(optional)* | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | No | *(optional)* | Cloudinary API secret |
| `SMTP_HOST` | No | `smtp.gmail.com` | SMTP email gateway host |
| `SMTP_PORT` | No | `465` | SMTP port (465 SSL or 587 TLS) |
| `SMTP_USER` | No | `gmpvision3@gmail.com` | SMTP username |
| `SMTP_PASS` | No | *(app password)* | SMTP app password |

---

## 🛡️ Critical MongoDB Atlas Configuration for Cloud Deployments

1. Open your **MongoDB Atlas Console** at [cloud.mongodb.com](https://cloud.mongodb.com/).
2. In the left navigation, open **Network Access**.
3. Click **Add IP Address**:
   - If deploying to **Render / Railway / Vercel**: Add `0.0.0.0/0` (Allow Access from Anywhere) because cloud serverless instances use dynamic outbound IPs.
   - Note: Secure your cluster with a strong database user password and restrict user privileges to your specific database.
4. In **Database Access**, verify your database user has `readWrite` access to the `gmp_vision` database.

---

## 🗄️ Initial Database Seeding in Production

To seed the 7 Turnkey Divisions, Equipment Catalog, Filters, Projects, Clients, and initial SuperAdmin account on your production MongoDB Atlas cluster:

```bash
# From backend directory with your production MONGODB_URI set:
MONGODB_URI="mongodb+srv://..." npm run seed
```

---

## ✅ Production Readiness Checklist

- [x] **0 Build Regressions**: Frontend compiles cleanly (`tsc -b && vite build`), Backend compiles cleanly (`tsc`).
- [x] **85/85 Automated Tests Passed**: All authentication, division, product, filter, project, client, setting, lead, and media endpoints verified.
- [x] **CORS Support**: Whitelisted for `CORS_ORIGINS` and all dynamic `*.vercel.app` preview branches.
- [x] **Mongoose Connection Pooling**: Serverless-safe connection caching to prevent connection exhaustion.
- [x] **RFC 7807 Standard Error Responses**: Structured JSON responses for client stability.
- [x] **Security Hardening**:
  - Scoped test bypass to test environments only.
  - HTML entity escaping and CRLF header injection neutralization.
  - Binary magic byte validation on uploads.
  - Formula injection sanitization on CSV exports.
  - Constant-time bcrypt protection against user-enumeration timing attacks.
  - HS256 algorithm enforcement on JWT sign & verify.
- [x] **Graceful Offline Fallback**: Frontend functions seamlessly in both live API mode and standalone offline preview mode.
