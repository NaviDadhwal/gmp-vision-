# GMP VISION — Complete REST API & System Architecture Handbook

> **Target Audience:** Frontend Engineers (React, Next.js, Google Stitch, Mobile), Backend Integrators, QA Engineers, and DevOps.  
> **API Version:** `v1.0.0` | **Base URL:** `http://localhost:5000/api/v1` (Local) / `https://<deployed-domain>/api/v1` (Production)  
> **Specification Standard:** RESTful JSON Envelope (`RFC 7807` error compliance) | **Status:** Production Backend Ready

---

## 📋 Table of Contents
1. [Project Status & Architecture Overview](#1-project-status--architecture-overview)
2. [Developer Quickstart & Local Setup](#2-developer-quickstart--local-setup)
3. [Environment Variables Specification](#3-environment-variables-specification)
4. [Global Conventions & Response Formats](#4-global-conventions--response-formats)
5. [Status Codes & Error Dictionary](#5-status-codes--error-dictionary)
6. [Authentication & Session Flow](#6-authentication--session-flow)
7. [Rate Limiting Policies](#7-rate-limiting-policies)
8. [Complete Endpoints Directory](#8-complete-endpoints-directory)
   - [01. System & Health Probes](#01-system--health-probes)
   - [02. Authentication (`/api/v1/auth`)](#02-authentication-apiv1auth)
   - [03. Admin User Accounts (`/api/v1/admins`)](#03-admin-user-accounts-apiv1admins)
   - [04. Turnkey Divisions (`/api/v1/divisions`)](#04-turnkey-divisions-apiv1divisions)
   - [05. Products & Cleanroom Equipment (`/api/v1/products`)](#05-products--cleanroom-equipment-apiv1products)
   - [06. Air Filtration Catalog (`/api/v1/filters`)](#06-air-filtration-catalog-apiv1filters)
   - [07. Projects & Portfolio (`/api/v1/projects`)](#07-projects--portfolio-apiv1projects)
   - [08. Clients Trust Wall (`/api/v1/clients`)](#08-clients-trust-wall-apiv1clients)
   - [09. Site Settings & Metrics (`/api/v1/settings`)](#09-site-settings--metrics-apiv1settings)
   - [10. Leads & RFQ Ingestion (`/api/v1/leads`)](#10-leads--rfq-ingestion-apiv1leads)
   - [11. Media Uploads & Assets (`/api/v1/media`)](#11-media-uploads--assets-apiv1media)
9. [Frontend Integration Blueprint](#9-frontend-integration-blueprint)

---

## 1. Project Status & Architecture Overview

GMP VISION is a turnkey engineering monorepo specializing in modular cleanroom systems, HVAC/AHU design, air filtration cascades, and MEP industrial contracting.

### System Architecture Diagram
```
                     ┌──────────────────────────────────────────────┐
                     │          Clients / Frontend UI               │
                     │  (Web SPA / Google Stitch / Mobile / Curl)   │
                     └──────────────────────┬───────────────────────┘
                                            │ HTTP / HTTPS (JSON)
                                            ▼
                     ┌──────────────────────────────────────────────┐
                     │            Express 5 API Gateway             │
                     │   - Helmet Security & Strict CSP             │
                     │   - CORS Origin Filtering                    │
                     │   - Rate Limit Tiers (Global, Auth, Leads)   │
                     │   - express-mongo-sanitize (NoSQL guard)     │
                     │   - Zod Schema Validation                    │
                     └───────┬──────────────────────────────┬───────┘
                             │                              │
          ┌──────────────────▼──────────┐         ┌────────▼────────────────┐
          │      Mongoose ODM (8.x)     │         │ Third-Party Integrations│
          │  - Dual JWT Auth & Sessions │         │  - Cloudinary CDN       │
          │  - Cursor & Offset Paging   │         │  - Nodemailer Alerts    │
          │  - Cascade Soft Deletions   │         │  - Cron Cleanup Tasks   │
          └──────────────┬──────────────┘         └─────────────────────────┘
                         │
                         ▼
          ┌─────────────────────────────┐
          │    MongoDB Atlas Cluster    │
          │ (Replica Set / SSL Pooled)  │
          └─────────────────────────────┘
```

### Component Status Matrix
| Layer | Current Status | Notes |
|---|---|---|
| **Backend REST API** | ✅ **100% Complete & Tested** | 48 fully validated endpoints with Express 5, TypeScript 5.8, and Zod. |
| **Database & Models** | ✅ **Seeded & Operational** | Seed script provisions superadmin, 7 turnkey divisions, products, filters, projects, client logos, and site settings. |
| **Authentication** | ✅ **Production Ready** | Dual JWT tokens (15m Bearer access token + 7d HTTP-only refresh cookie) with Argon2/Bcrypt hashing. |
| **Media Service** | ✅ **Active** | Cloudinary integration with binary magic-number signature verification to block MIME spoofing. |
| **Email Dispatcher** | ✅ **Active** | Nodemailer async alerts for RFQ submissions with error isolation. |
| **Frontend UI** | 🔄 **Clean Slate** | Legacy frontend removed. Ready to be populated by the new Google Stitch design system. |

---

## 2. Developer Quickstart & Local Setup

### Prerequisites
- **Node.js**: `v20.x` or later
- **npm**: `v10.x` or later
- **MongoDB**: MongoDB Atlas URI or local instance running on `localhost:27017`

### Setup in 3 Commands

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Create `.env` inside `backend/` (or root):
   ```bash
   cp backend/.env.example backend/.env
   ```

3. **Seed Database & Run Development Server:**
   ```bash
   # Seed default superadmin and initial catalog
   npm run seed --prefix backend

   # Start live reload dev server on port 5000
   npm run dev:backend
   ```

4. **Verify Health:**
   ```bash
   curl http://localhost:5000/health
   # Response: {"status":"ok","timestamp":"2026-10-10T..."}
   ```

---

## 3. Environment Variables Specification

Configured in `backend/src/config/env.ts` with strict Zod parsing:

| Variable | Required | Default Value | Description |
|---|---|---|---|
| `NODE_ENV` | No | `development` | Environment mode (`development`, `production`, `test`) |
| `PORT` | No | `5000` | HTTP listening port |
| `MONGODB_URI` | **Yes** | *Configured Cluster URI* | MongoDB Atlas connection string |
| `JWT_ACCESS_SECRET` | **Yes** | *Min 32-char string* | Secret for signing 15-minute access tokens |
| `JWT_REFRESH_SECRET`| **Yes** | *Min 32-char string* | Secret for signing 7-day refresh tokens |
| `JWT_ACCESS_EXPIRES_IN` | No | `15m` | Token validity duration |
| `JWT_REFRESH_EXPIRES_IN`| No | `7d` | Refresh token validity duration |
| `CORS_ORIGINS` | No | `http://localhost:5173,http://localhost:3000` | Comma-separated list of allowed origins (Vercel subdomains auto-allowed) |
| `CLOUDINARY_CLOUD_NAME` | No | `""` (mock fallback) | Cloudinary storage account name |
| `CLOUDINARY_API_KEY` | No | `""` (mock fallback) | Cloudinary API access key |
| `CLOUDINARY_API_SECRET` | No | `""` (mock fallback) | Cloudinary secret |
| `SUPERADMIN_EMAIL` | No | `admin@gmpvision.com` | Seed superadmin username |
| `SUPERADMIN_PASSWORD` | No | `Admin@GMPVision2026!` | Seed superadmin initial password |
| `ADMIN_NOTIFICATION_EMAIL`| No | `gmpvision3@gmail.com` | Destination inbox for new lead notifications |

---

## 4. Global Conventions & Response Formats

### 4.1 Success Response Envelope
All successful requests return HTTP `200 OK` or `201 Created` with a unified JSON envelope:
```json
{
  "success": true,
  "data": { ... }
}
```

### 4.2 Paginated Response Envelopes

#### A. Cursor Pagination (Public Feeds / Infinite Scroll)
Used on `GET /api/v1/products` and `GET /api/v1/projects` when `mode=cursor` (default):
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "limit": 12,
    "hasMore": true,
    "nextCursor": "67f62c0b5f1a2e3d4c5b6a7b"
  }
}
```

#### B. Offset Pagination (Admin Dashboards / Data Tables)
Used when query contains `mode=offset`:
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 145,
    "totalPages": 8,
    "hasPrevPage": false,
    "hasNextPage": true
  }
}
```

### 4.3 Error Response Envelope (RFC 7807)
All errors return a standard machine-readable format:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data. Please check submitted fields.",
    "fields": {
      "email": ["Valid email required"],
      "password": ["Password must be at least 8 characters long"]
    }
  }
}
```

---

## 5. Status Codes & Error Dictionary

| HTTP Code | Error `code` | Description / Resolution |
|---|---|---|
| `200 OK` | — | Request succeeded. Returns requested resource or confirmation. |
| `201 Created` | — | Entity successfully created in the database. |
| `400 Bad Request` | `VALIDATION_ERROR` | Request payload failed Zod schema checks. See `fields` object. |
| `400 Bad Request` | `INVALID_ID` | The supplied URL `:id` is not a valid 24-character hexadecimal MongoDB ObjectId. |
| `400 Bad Request` | `FILE_MISSING` | `multipart/form-data` request did not include a `file` field. |
| `400 Bad Request` | `INVALID_FILE_SIGNATURE` | Uploaded file header failed binary magic number signature test (MIME spoofing prevented). |
| `400 Bad Request` | `FILE_TOO_LARGE` | Uploaded image exceeds 10MB limit. |
| `400 Bad Request` | `INVALID_KEY` | Prohibited prototype key passed to settings endpoint (`__proto__`, `constructor`, `prototype`). |
| `401 Unauthorized` | `UNAUTHORIZED` | Missing `Authorization: Bearer <token>` header or invalid credentials. |
| `401 Unauthorized` | `TOKEN_EXPIRED` | Access token lifetime has elapsed. Call `/api/v1/auth/refresh`. |
| `401 Unauthorized` | `TOKEN_INVALID` | Signature verification failed or token is malformed. |
| `403 Forbidden` | `FORBIDDEN` | Authenticated user lacks permission (e.g. `admin` trying to access `superadmin` routes). |
| `404 Not Found` | `NOT_FOUND` | Target entity with the specified `:id` or `:slug` does not exist or has been disabled. |
| `409 Conflict` | `CONFLICT` | Unique key violation (e.g. email or slug already registered). |
| `429 Too Many Requests`| `RATE_LIMIT_EXCEEDED` | Global rate cap exceeded (100 requests / 60 seconds). |
| `429 Too Many Requests`| `AUTH_RATE_LIMIT` | Too many failed login attempts (10 failed / 60 seconds). |
| `429 Too Many Requests`| `LEAD_RATE_LIMIT` | Lead spam threshold reached (10 submissions / 15 minutes). |
| `500 Server Error` | `INTERNAL_ERROR` | Unhandled exception on server. In production, raw stack traces are masked. |
| `503 Service Unavailable`| `SERVICE_UNAVAILABLE`| Readiness probe failed because MongoDB connection is disconnected. |

---

## 6. Authentication & Session Flow

```
   Client (Frontend)                               Backend API
           │                                            │
           │ 1. POST /api/v1/auth/login                 │
           │    { email, password }                     │
           ├───────────────────────────────────────────>│
           │                                            │ Verify bcrypt hash
           │ 2. Set-Cookie: refreshToken (HttpOnly, 7d) │ Generate JWT pair
           │    JSON Body: { accessToken (15m) }        │
           │<───────────────────────────────────────────┤
           │                                            │
           │ 3. Authenticated API Call                  │
           │    Header: "Authorization: Bearer <token>" │
           ├───────────────────────────────────────────>│ Verify JWT Access Token
           │                                            │
           │ 4. Access Token Expired (401 TOKEN_EXPIRED)│
           │<───────────────────────────────────────────┤
           │                                            │
           │ 5. POST /api/v1/auth/refresh               │
           │    (Cookie or JSON payload)                │
           ├───────────────────────────────────────────>│ Validate refresh token
           │                                            │ Rotate & issue new pair
           │ 6. New accessToken & refreshed cookie      │
           │<───────────────────────────────────────────┤
```

### Roles & Permissions Hierarchy
- **`public`**: Unauthenticated internet users. Can view divisions, products, filters, projects, clients, settings, and submit RFQ inquiries.
- **`admin`**: Content management staff. Can create/update products, case studies, client logos, air filters, site settings, and triage leads.
- **`superadmin`**: System administrators. Everything `admin` has, plus creating/deleting administrative accounts and modifying turnkey core divisions.

---

## 7. Rate Limiting Policies

1. **Global Rate Limit**:
   - Scope: Applied to all `/api/*` endpoints.
   - Limit: **100 requests per 60 seconds** per IP address.
   - Exclusions: `/health` and `/ready` probes are excluded.

2. **Auth Brute-Force Protection**:
   - Scope: Applied to `POST /api/v1/auth/login`.
   - Limit: **10 failed requests per 60 seconds** (`skipSuccessfulRequests: true`).

3. **Lead & RFQ Spam Protection**:
   - Scope: Applied to `POST /api/v1/leads`.
   - Limit: **10 submissions per 15 minutes** per IP address.

---

## 8. Complete Endpoints Directory

### 01. System & Health Probes

---

#### `GET /` & `GET /api`
- **Description:** API root status metadata and endpoint sitemap.
- **Access:** Public
- **Headers:** None required
- **Status Codes:** `200 OK`
- **Curl Example:**
  ```bash
  curl -X GET http://localhost:5000/api
  ```
- **Response `200 OK`:**
  ```json
  {
    "name": "GMP VISION Production API",
    "status": "online",
    "version": "1.0.0",
    "timestamp": "2026-10-10T14:30:00.000Z",
    "endpoints": {
      "health": "/health",
      "ready": "/ready",
      "api": "/api/v1"
    }
  }
  ```

---

#### `GET /health`
- **Description:** Lightweight liveness check for container orchestrators (Kubernetes / Render / Railway).
- **Access:** Public
- **Status Codes:** `200 OK`
- **Curl Example:**
  ```bash
  curl -X GET http://localhost:5000/health
  ```
- **Response `200 OK`:**
  ```json
  {
    "status": "ok",
    "timestamp": "2026-10-10T14:30:00.000Z"
  }
  ```

---

#### `GET /ready`
- **Description:** Verifies database connectivity (Mongoose `readyState === 1`).
- **Access:** Public
- **Status Codes:** `200 OK` (Healthy), `503 Service Unavailable` (Disconnected)
- **Curl Example:**
  ```bash
  curl -X GET http://localhost:5000/ready
  ```
- **Response `200 OK`:**
  ```json
  {
    "status": "ready",
    "database": "connected"
  }
  ```
- **Response `503 Service Unavailable`:**
  ```json
  {
    "status": "unhealthy",
    "database": "disconnected"
  }
  ```

---

### 02. Authentication (`/api/v1/auth`)

---

#### `POST /api/v1/auth/login`
- **Description:** Authenticates administrative credentials, issues 15-min JWT access token and 7-day HTTP-only refresh cookie.
- **Access:** Public (Rate-limited to 10 failed attempts/min)
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  | Field | Type | Required | Description |
  |---|---|---|---|
  | `email` | `string` | Yes | Registered admin email |
  | `password` | `string` | Yes | Minimum 8 characters |
- **Curl Example:**
  ```bash
  curl -X POST http://localhost:5000/api/v1/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@gmpvision.com","password":"Admin@GMPVision2026!"}'
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "67f62c0b5f1a2e3d4c5b6a71",
        "email": "admin@gmpvision.com",
        "role": "superadmin"
      },
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: `{"success":false,"error":{"code":"VALIDATION_ERROR","message":"Invalid request data. Please check submitted fields.","fields":{"email":["Valid email required"]}}}`
  - `401 Unauthorized`: `{"success":false,"error":{"code":"INVALID_CREDENTIALS","message":"Invalid email or password."}}`
  - `429 Too Many Requests`: `{"success":false,"error":{"code":"AUTH_RATE_LIMIT","message":"Too many failed login attempts. Please wait 1 minute."}}`

---

#### `POST /api/v1/auth/refresh`
- **Description:** Exchanges a valid refresh token for a fresh 15-minute access token. Reads from either `refreshToken` HTTP-only cookie or JSON body.
- **Access:** Public with valid refresh token
- **Headers:** `Content-Type: application/json`
- **Request Body (Optional if using cookie):**
  ```json
  { "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
  ```
- **Curl Example:**
  ```bash
  curl -X POST http://localhost:5000/api/v1/auth/refresh \
    -H "Content-Type: application/json" \
    -d '{"refreshToken":"<REFRESH_TOKEN>"}'
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
- **Error Responses:**
  - `401 Unauthorized`: `{"success":false,"error":{"code":"REFRESH_TOKEN_INVALID","message":"Refresh token is invalid or expired. Please re-authenticate."}}`

---

#### `GET /api/v1/auth/me`
- **Description:** Retrieves the authenticated profile and role of the currently logged-in user.
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Curl Example:**
  ```bash
  curl -X GET http://localhost:5000/api/v1/auth/me \
    -H "Authorization: Bearer <accessToken>"
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "id": "67f62c0b5f1a2e3d4c5b6a71",
      "email": "admin@gmpvision.com",
      "role": "superadmin",
      "isActive": true,
      "createdAt": "2026-10-10T00:00:00.000Z"
    }
  }
  ```
- **Error Responses:**
  - `401 Unauthorized`: `{"success":false,"error":{"code":"UNAUTHORIZED","message":"Authentication required."}}`

---

#### `POST /api/v1/auth/logout`
- **Description:** Invalidates the current session and clears the HTTP-only refresh cookie.
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Curl Example:**
  ```bash
  curl -X POST http://localhost:5000/api/v1/auth/logout \
    -H "Authorization: Bearer <accessToken>"
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "message": "Logged out successfully."
    }
  }
  ```

---

### 03. Admin User Accounts (`/api/v1/admins`)

---

#### `GET /api/v1/admins`
- **Description:** Lists all administrative users in the system.
- **Access:** `superadmin` only
- **Headers:** `Authorization: Bearer <accessToken>`
- **Curl Example:**
  ```bash
  curl -X GET http://localhost:5000/api/v1/admins \
    -H "Authorization: Bearer <accessToken>"
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "67f62c0b5f1a2e3d4c5b6a71",
        "email": "admin@gmpvision.com",
        "role": "superadmin",
        "isActive": true,
        "createdAt": "2026-10-10T00:00:00.000Z"
      }
    ]
  }
  ```
- **Error Responses:**
  - `403 Forbidden`: `{"success":false,"error":{"code":"FORBIDDEN","message":"Insufficient permissions."}}`

---

#### `POST /api/v1/admins`
- **Description:** Provisions a new staff administrator or superadmin account.
- **Access:** `superadmin` only
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Request Body:**
  | Field | Type | Required | Description |
  |---|---|---|---|
  | `email` | `string` | Yes | Valid email address |
  | `password` | `string` | Yes | Minimum 8 characters |
  | `role` | `string` | No | `"admin"` (default) or `"superadmin"` |
- **Curl Example:**
  ```bash
  curl -X POST http://localhost:5000/api/v1/admins \
    -H "Authorization: Bearer <accessToken>" \
    -H "Content-Type: application/json" \
    -d '{"email":"engineering@gmpvision.com","password":"SecurePassword123!","role":"admin"}'
  ```
- **Response `201 Created`:**
  ```json
  {
    "success": true,
    "data": {
      "_id": "67f62d105f1a2e3d4c5b6a82",
      "email": "engineering@gmpvision.com",
      "role": "admin",
      "isActive": true,
      "createdAt": "2026-10-10T14:35:00.000Z"
    }
  }
  ```
- **Error Responses:**
  - `409 Conflict`: `{"success":false,"error":{"code":"CONFLICT","message":"An entity with this email already exists."}}`

---

#### `PATCH /api/v1/admins/:id`
- **Description:** Updates status (`isActive`), role, or resets password for an admin account.
- **Access:** `superadmin` only
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Path Parameters:** `:id` (24-hex ObjectId)
- **Request Body (Partial):**
  ```json
  {
    "isActive": false,
    "role": "admin"
  }
  ```
- **Curl Example:**
  ```bash
  curl -X PATCH http://localhost:5000/api/v1/admins/67f62d105f1a2e3d4c5b6a82 \
    -H "Authorization: Bearer <accessToken>" \
    -H "Content-Type: application/json" \
    -d '{"isActive":false}'
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "_id": "67f62d105f1a2e3d4c5b6a82",
      "email": "engineering@gmpvision.com",
      "role": "admin",
      "isActive": false
    }
  }
  ```

---

#### `DELETE /api/v1/admins/:id`
- **Description:** Permanently deletes an administrator account. Self-deletion prevention guard is active.
- **Access:** `superadmin` only
- **Headers:** `Authorization: Bearer <accessToken>`
- **Path Parameters:** `:id` (24-hex ObjectId)
- **Curl Example:**
  ```bash
  curl -X DELETE http://localhost:5000/api/v1/admins/67f62d105f1a2e3d4c5b6a82 \
    -H "Authorization: Bearer <accessToken>"
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": { "message": "Admin removed successfully." }
  }
  ```

---

### 04. Turnkey Divisions (`/api/v1/divisions`)

---

#### `GET /api/v1/divisions`
- **Description:** Retrieves all 7 turnkey engineering divisions ordered by division sequence.
- **Access:** Public
- **Curl Example:**
  ```bash
  curl -X GET http://localhost:5000/api/v1/divisions
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "67f62c0b5f1a2e3d4c5b6a72",
        "number": 1,
        "title": "Cleanroom Infrastructure & Modular Panels",
        "slug": "cleanroom-panels",
        "tagline": "Precision engineered modular cleanroom wall, ceiling, and door systems compliant with cGMP & ISO 14644.",
        "description": "<p>Providing sterile, flush, airtight architectural enclosures...</p>",
        "icon": "Layers",
        "heroImage": "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b",
        "order": 1,
        "isActive": true
      }
    ]
  }
  ```

---

#### `GET /api/v1/divisions/:slug`
- **Description:** Returns full division detail along with all active equipment and products assigned to this division.
- **Access:** Public
- **Path Parameters:** `:slug` (e.g. `cleanroom-panels`, `hvac-ahu-systems`)
- **Curl Example:**
  ```bash
  curl -X GET http://localhost:5000/api/v1/divisions/cleanroom-panels
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "division": {
        "_id": "67f62c0b5f1a2e3d4c5b6a72",
        "number": 1,
        "title": "Cleanroom Infrastructure & Modular Panels",
        "slug": "cleanroom-panels",
        "tagline": "Precision engineered modular cleanroom wall...",
        "icon": "Layers"
      },
      "products": [
        {
          "_id": "67f62c0b5f1a2e3d4c5b6a79",
          "name": "cGMP Modular PUF Insulated Wall Panel",
          "slug": "cgmp-modular-puf-wall-panel",
          "category": "Modular Wall Systems",
          "order": 1
        }
      ]
    }
  }
  ```
- **Error Responses:**
  - `404 Not Found`: `{"success":false,"error":{"code":"NOT_FOUND","message":"Division not found."}}`

---

#### `POST /api/v1/divisions`
- **Description:** Creates a new engineering division.
- **Access:** `superadmin` only
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "number": 8,
    "title": "Cleanroom Validation & Qualification",
    "slug": "cleanroom-validation",
    "tagline": "Comprehensive DQ, IQ, OQ, PQ validation and particle mapping services.",
    "description": "<p>Turnkey third-party qualification according to Schedule M and ISO 14644.</p>",
    "heroImage": "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b",
    "icon": "CheckCircle2",
    "order": 8
  }
  ```
- **Response `201 Created`:** Returns created division object.

---

#### `PATCH /api/v1/divisions/:id`
- **Description:** Updates division description, metadata, tagline, or hero image.
- **Access:** `admin` or `superadmin`
- **Path Parameters:** `:id` (24-hex ObjectId or slug)
- **Response `200 OK`:** Returns updated division object.

---

#### `DELETE /api/v1/divisions/:id`
- **Description:** Soft-deletes a division (`isActive = false`).
- **Access:** `superadmin` only
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": { "message": "Division disabled successfully." }
  }
  ```

---

### 05. Products & Cleanroom Equipment (`/api/v1/products`)

---

#### `GET /api/v1/products`
- **Description:** Products list supporting dual-mode pagination, category filtering, division filtering, and full-text search.
- **Access:** Public
- **Query Parameters:**
  | Parameter | Type | Default | Description |
  |---|---|---|---|
  | `mode` | `string` | `cursor` | `"cursor"` (infinite scroll) or `"offset"` (data tables) |
  | `limit` | `number` | `12` | Items per page (max `100`) |
  | `cursor` | `string` | — | ObjectId cursor from previous response (cursor mode) |
  | `page` | `number` | `1` | Page number (offset mode) |
  | `divisionId` | `string` | — | Filter by 24-hex Division ObjectId |
  | `category` | `string` | — | Filter by category string |
  | `featured` | `boolean`| — | Filter by `true` for homepage showcase items |
  | `search` | `string` | — | MongoDB `$text` search on product name & description |
- **Curl Example (Cursor Feed):**
  ```bash
  curl -X GET "http://localhost:5000/api/v1/products?limit=6&featured=true"
  ```
- **Response `200 OK` (Cursor Mode):**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "67f62c0b5f1a2e3d4c5b6a79",
        "name": "cGMP Modular PUF Insulated Wall Panel",
        "slug": "cgmp-modular-puf-wall-panel",
        "divisionId": "67f62c0b5f1a2e3d4c5b6a72",
        "category": "Modular Wall Systems",
        "specifications": [
          { "key": "Thickness", "value": "50mm / 80mm / 100mm" },
          { "key": "Skin Options", "value": "PPGI / PPGL / SS 304" }
        ],
        "images": ["https://images.unsplash.com/photo-1581093458791-9f3c3900df4b"],
        "isFeatured": true,
        "order": 1,
        "isActive": true
      }
    ],
    "meta": {
      "limit": 6,
      "hasMore": false,
      "nextCursor": null
    }
  }
  ```

---

#### `GET /api/v1/products/:slug`
- **Description:** Retrieves product specifications by URL slug with populated division details.
- **Access:** Public
- **Path Parameters:** `:slug` (e.g. `cgmp-modular-puf-wall-panel`)
- **Curl Example:**
  ```bash
  curl -X GET http://localhost:5000/api/v1/products/cgmp-modular-puf-wall-panel
  ```
- **Response `200 OK`:** Returns single populated product object.
- **Error Responses:** `404 Not Found` if slug does not exist or product is inactive.

---

#### `POST /api/v1/products`
- **Description:** Adds a new product to the engineering catalog.
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "divisionId": "67f62c0b5f1a2e3d4c5b6a72",
    "name": "Heavy Duty Dynamic Pass Box (SS 304)",
    "slug": "dynamic-pass-box-ss304",
    "category": "Transfer & Airlock Systems",
    "description": "Electromagnetically interlocked pass box equipped with Mini-Pleat HEPA filtration (0.3 micron at 99.997%) and UV germicidal tube.",
    "specifications": [
      { "key": "Material", "value": "Stainless Steel 304 / 316L" },
      { "key": "Interlock", "value": "Electromagnetic 12V DC" }
    ],
    "images": ["https://images.unsplash.com/photo-1581093458791-9f3c3900df4b"],
    "tags": ["Pass Box", "ISO Class 5", "cGMP"],
    "isFeatured": true,
    "order": 10
  }
  ```
- **Response `201 Created`:** Returns created product document.

---

#### `PATCH /api/v1/products/reorder`
- **Description:** Bulk updates sequence ordering for product catalog display.
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "items": [
      { "id": "67f62c0b5f1a2e3d4c5b6a79", "order": 1 },
      { "id": "67f62c0b5f1a2e3d4c5b6a80", "order": 2 }
    ]
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": { "message": "Product display orders updated successfully." }
  }
  ```

---

#### `PATCH /api/v1/products/:id`
- **Description:** Updates product specifications, images, or brochure links.
- **Access:** `admin` or `superadmin`
- **Path Parameters:** `:id` (24-hex ObjectId)
- **Response `200 OK`:** Returns modified product document.

---

#### `DELETE /api/v1/products/:id`
- **Description:** Soft-deletes a product item (`isActive = false`).
- **Access:** `admin` or `superadmin`
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": { "message": "Product disabled successfully." }
  }
  ```

---

### 06. Air Filtration Catalog (`/api/v1/filters`)

---

#### `GET /api/v1/filters`
- **Description:** Complete industrial filtration catalog sorted by category and order.
- **Access:** Public
- **Query Parameters:**
  | Parameter | Type | Description |
  |---|---|---|
  | `category` | `string` | Optional filter: `pre-filter`, `fine-filter`, `pocket-bag`, `gel-seal-hepa`, `standard-hepa`, `high-flow-hepa`, `semi-hepa`, `wire-mesh` |
- **Curl Example:**
  ```bash
  curl -X GET "http://localhost:5000/api/v1/filters?category=gel-seal-hepa"
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "67f62c0b5f1a2e3d4c5b6a73",
        "category": "gel-seal-hepa",
        "name": "Gel-Seal Mini-Pleat Terminal HEPA Filter",
        "micronRating": "0.3 Micron at 99.997%",
        "mediaConstruction": "Borosilicate micro-glass fiber with hot-melt pleat separators",
        "frame": "Extruded Anodized Aluminum with Polyurethane Gel Channel",
        "applications": ["Sterile Injectable Filling Lines", "LAF Workstations"],
        "keyFeature": "Zero-leakage fluid seal prevents bypass without mechanical torquing",
        "images": ["https://images.unsplash.com/photo-1504307651254-35680f356dfd"],
        "order": 1,
        "isActive": true
      }
    ]
  }
  ```

---

#### `GET /api/v1/filters/:id`
- **Description:** Fetches technical parameters for a specific air filter item.
- **Access:** Public
- **Path Parameters:** `:id` (24-hex ObjectId)
- **Response `200 OK`:** Returns single filter object.

---

#### `POST /api/v1/filters`
- **Description:** Creates an air filter catalog item.
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Request Body:** Follows `createFilterSchema` definition.
- **Response `201 Created`:** Returns created air filter document.

---

#### `PATCH /api/v1/filters/reorder`
- **Description:** Bulk updates sequence ordering for air filtration catalog.
- **Access:** `admin` or `superadmin`
- **Request Body:** `{ "items": [ { "id": "...", "order": 1 } ] }`
- **Response `200 OK`:** `{ "success": true, "data": { "message": "Filter display orders updated successfully." } }`

---

#### `PATCH /api/v1/filters/:id`
- **Description:** Updates technical attributes of an air filter item.
- **Access:** `admin` or `superadmin`
- **Response `200 OK`:** Returns modified filter document.

---

#### `DELETE /api/v1/filters/:id`
- **Description:** Soft-deletes a filter item (`isActive = false`).
- **Access:** `admin` or `superadmin`
- **Response `200 OK`:** `{ "success": true, "data": { "message": "Filter catalog item disabled successfully." } }`

---

### 07. Projects & Portfolio (`/api/v1/projects`)

---

#### `GET /api/v1/projects`
- **Description:** Turnkey cleanroom project portfolio and client case studies feed.
- **Access:** Public
- **Query Parameters:**
  | Parameter | Type | Default | Description |
  |---|---|---|---|
  | `mode` | `string` | `cursor` | `"cursor"` or `"offset"` |
  | `limit` | `number` | `9` | Results per page |
  | `cursor` | `string` | — | ObjectId cursor from previous response |
  | `division` | `string` | — | Filter by division title (e.g. `"Cleanroom Infrastructure"`) |
  | `featured` | `boolean`| — | Filter for homepage highlight projects (`true`) |
- **Curl Example:**
  ```bash
  curl -X GET "http://localhost:5000/api/v1/projects?featured=true"
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "67f62c0b5f1a2e3d4c5b6a74",
        "clientName": "Wallace Pharmaceuticals Pvt Ltd",
        "scope": "Turnkey ISO Class 6 Sterile Liquid Formulation Facility",
        "location": "Baddi Industrial Area, Himachal Pradesh",
        "division": ["Cleanroom Infrastructure & Modular Panels", "HVAC Systems, AHUs & Dehumidifiers"],
        "completionYear": 2024,
        "description": "Executed complete turnkey modular cleanroom enclosure with 10,000 CFM AHU system...",
        "images": ["https://images.unsplash.com/photo-1581093458791-9f3c3900df4b"],
        "isFeatured": true,
        "testimonial": {
          "quote": "GMP VISION delivered on schedule with flawless validation testing.",
          "author": "Dr. R. K. Sharma",
          "designation": "VP Operations"
        },
        "order": 1,
        "isActive": true
      }
    ],
    "meta": { "limit": 9, "hasMore": false, "nextCursor": null }
  }
  ```

---

#### `GET /api/v1/projects/:id`
- **Description:** Case study detail including full project scope and challenges.
- **Access:** Public
- **Path Parameters:** `:id` (24-hex ObjectId)
- **Response `200 OK`:** Returns single project document.

---

#### `POST /api/v1/projects`
- **Description:** Adds a new client project reference.
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Request Body:** Follows `createProjectSchema`.
- **Response `201 Created`:** Returns created project.

---

#### `PATCH /api/v1/projects/reorder`
- **Description:** Bulk updates sequence ordering for portfolio case studies.
- **Access:** `admin` or `superadmin`
- **Response `200 OK`:** `{ "success": true, "data": { "message": "Project display orders updated successfully." } }`

---

#### `PATCH /api/v1/projects/:id`
- **Description:** Updates project scope, photos, or client testimonial.
- **Access:** `admin` or `superadmin`
- **Response `200 OK`:** Returns modified project document.

---

#### `DELETE /api/v1/projects/:id`
- **Description:** Soft-deletes a project reference (`isActive = false`).
- **Access:** `admin` or `superadmin`
- **Response `200 OK`:** `{ "success": true, "data": { "message": "Project reference disabled successfully." } }`

---

### 08. Clients Trust Wall (`/api/v1/clients`)

---

#### `GET /api/v1/clients`
- **Description:** Returns all verified pharmaceutical, biotech, and hospital client partner logos.
- **Access:** Public
- **Curl Example:**
  ```bash
  curl -X GET http://localhost:5000/api/v1/clients
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "67f62c0b5f1a2e3d4c5b6a75",
        "name": "Wallace Pharmaceuticals",
        "logoUrl": "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b",
        "sector": "Pharmaceutical",
        "isFeatured": true,
        "order": 1,
        "isActive": true
      }
    ]
  }
  ```

---

#### `POST /api/v1/clients`
- **Description:** Registers a new partner client logo.
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "Cipla Therapeutics",
    "logoUrl": "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b",
    "sector": "Pharmaceutical",
    "website": "https://www.cipla.com",
    "isFeatured": true,
    "order": 5
  }
  ```
- **Response `201 Created`:** Returns created client document.

---

#### `PATCH /api/v1/clients/reorder`
- **Description:** Reorders client logo display grid.
- **Access:** `admin` or `superadmin`
- **Response `200 OK`:** `{ "success": true, "data": { "message": "Client logo wall display order updated." } }`

---

#### `PATCH /api/v1/clients/:id`
- **Description:** Modifies client partner logo, URL, or sector.
- **Access:** `admin` or `superadmin`
- **Response `200 OK`:** Returns modified client document.

---

#### `DELETE /api/v1/clients/:id`
- **Description:** Soft-deletes a client logo (`isActive = false`).
- **Access:** `admin` or `superadmin`
- **Response `200 OK`:** `{ "success": true, "data": { "message": "Client logo disabled successfully." } }`

---

### 09. Site Settings & Metrics (`/api/v1/settings`)

---

#### `GET /api/v1/settings`
- **Description:** Retrieves all global dynamic configuration values as a flat key-value map.
- **Access:** Public
- **Curl Example:**
  ```bash
  curl -X GET http://localhost:5000/api/v1/settings
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "contact_phone": "+91-9817343117",
      "contact_email": "info@gmpvision.com",
      "experience_years": 15,
      "projects_completed": 250,
      "clients_served": 180,
      "cleanroom_sqft_installed": 1500000,
      "whatsapp_hotline": "+91-9817343117",
      "company_address": "Plot No. 42, Industrial Area Phase II, Panchkula, Haryana 134113"
    }
  }
  ```

---

#### `PATCH /api/v1/settings/:key`
- **Description:** Updates or upserts a specific global site setting. Prototype pollution protected.
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Path Parameters:** `:key` (e.g. `projects_completed`, `contact_phone`)
- **Request Body:**
  ```json
  {
    "value": 260,
    "description": "Total turnkey cleanroom projects commissioned across India"
  }
  ```
- **Curl Example:**
  ```bash
  curl -X PATCH http://localhost:5000/api/v1/settings/projects_completed \
    -H "Authorization: Bearer <accessToken>" \
    -H "Content-Type: application/json" \
    -d '{"value":260}'
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "_id": "67f62c0b5f1a2e3d4c5b6a76",
      "key": "projects_completed",
      "value": 260,
      "updatedAt": "2026-10-10T14:40:00.000Z"
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: If `:key` is `__proto__`, `constructor`, or `prototype` (`INVALID_KEY`).

---

### 10. Leads & RFQ Ingestion (`/api/v1/leads`)

---

#### `POST /api/v1/leads`
- **Description:** Ingests public RFQ submissions, website contact forms, and WhatsApp inquiry clicks. Asynchronously dispatches email notification to `ADMIN_NOTIFICATION_EMAIL`.
- **Access:** Public (Rate-limited to 10 submissions / 15 minutes per IP)
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  | Field | Type | Required | Description |
  |---|---|---|---|
  | `companyName` | `string` | No | Client company name (default: `"Direct WhatsApp Visitor"`) |
  | `contactName` | `string` | No | Lead contact person (default: `"WhatsApp Lead"`) |
  | `designation` | `string` | No | Contact designation |
  | `email` | `string` | No | Valid email address |
  | `phone` | `string` | **Yes** | Contact phone or WhatsApp number (8–25 digits) |
  | `location` | `string` | No | Project site location |
  | `divisions` | `string[]`| No | Requested turnkey division titles |
  | `roomDimensions`| `string`| No | E.g. `"40ft x 60ft x 10ft"` |
  | `cfm` | `number` | No | Estimated HVAC airflow requirement |
  | `message` | `string` | **Yes** | Technical requirements or scope summary |
  | `source` | `string` | **Yes** | `"rfq_form"`, `"contact_form"`, or `"whatsapp"` |
- **Curl Example:**
  ```bash
  curl -X POST http://localhost:5000/api/v1/leads \
    -H "Content-Type: application/json" \
    -d '{
      "companyName": "Sun Pharma Laboratories",
      "contactName": "Anand Mehta",
      "email": "a.mehta@sunpharma.com",
      "phone": "+919876543210",
      "divisions": ["Cleanroom Infrastructure & Modular Panels", "HVAC Systems, AHUs & Dehumidifiers"],
      "roomDimensions": "50ft x 80ft x 12ft (ISO Class 7)",
      "cfm": 15000,
      "message": "Looking for complete HVAC + Modular panel solution for our new OSD facility in Baddi.",
      "source": "rfq_form"
    }'
  ```
- **Response `201 Created`:**
  ```json
  {
    "success": true,
    "data": {
      "id": "67f62e8a5f1a2e3d4c5b6a95",
      "message": "Inquiry received. A GMP VISION engineering consultant will review your specifications."
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: `{"success":false,"error":{"code":"VALIDATION_ERROR","fields":{"phone":["Required"]}}}`
  - `429 Too Many Requests`: `{"success":false,"error":{"code":"LEAD_RATE_LIMIT","message":"Inquiry limit reached. Please contact us directly at +91-9817343117."}}`

---

#### `GET /api/v1/leads`
- **Description:** Paginated administrative inquiry list with date range, status, and division filters.
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Query Parameters:**
  | Parameter | Type | Default | Description |
  |---|---|---|---|
  | `status` | `string` | — | Filter: `new`, `contacted`, `quoted`, `converted`, `closed` |
  | `source` | `string` | — | Filter: `rfq_form`, `contact_form`, `whatsapp` |
  | `division` | `string` | — | Filter by division title |
  | `startDate`| `string` | — | ISO Date string (`2026-01-01`) |
  | `endDate` | `string` | — | ISO Date string (`2026-12-31`) |
  | `page` | `number` | `1` | Page number |
  | `limit` | `number` | `20`| Items per page |
- **Curl Example:**
  ```bash
  curl -X GET "http://localhost:5000/api/v1/leads?status=new&limit=10" \
    -H "Authorization: Bearer <accessToken>"
  ```
- **Response `200 OK`:** Returns offset paginated leads array with meta total counts.

---

#### `GET /api/v1/leads/export`
- **Description:** Generates and streams a CSV export of all inquiries. Features CSV formula injection mitigation (`CWE-1236`).
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Response Headers:** `Content-Type: text/csv`, `Content-Disposition: attachment; filename="gmp_vision_leads_....csv"`
- **Curl Example:**
  ```bash
  curl -X GET http://localhost:5000/api/v1/leads/export \
    -H "Authorization: Bearer <accessToken>" \
    -o leads_export.csv
  ```
- **Response `200 OK`:** Raw CSV file stream.

---

#### `GET /api/v1/leads/:id`
- **Description:** Complete inquiry detail by ObjectId.
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Path Parameters:** `:id` (24-hex ObjectId)
- **Response `200 OK`:** Returns single lead object.

---

#### `PATCH /api/v1/leads/:id/status`
- **Description:** Updates the pipeline stage and administrative follow-up notes for an inquiry.
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "status": "quoted",
    "notes": "Sent techno-commercial offer for 15,000 CFM Double Skin AHU and 50mm PUF panels on 10-Oct-2026."
  }
  ```
- **Curl Example:**
  ```bash
  curl -X PATCH http://localhost:5000/api/v1/leads/67f62e8a5f1a2e3d4c5b6a95/status \
    -H "Authorization: Bearer <accessToken>" \
    -H "Content-Type: application/json" \
    -d '{"status":"quoted","notes":"Proposal delivered."}'
  ```
- **Response `200 OK`:** Returns updated lead object.

---

### 11. Media Uploads & Assets (`/api/v1/media`)

---

#### `POST /api/v1/media/upload`
- **Description:** Streams images (JPEG, PNG, WebP) or technical PDF documents to Cloudinary CDN. Validates binary magic-number signatures to eliminate MIME spoofing attacks (`CWE-434`).
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`, `Content-Type: multipart/form-data`
- **Limits:** Images `<= 10MB`, PDFs `<= 25MB`.
- **Form Data:**
  - `file`: Binary file upload
- **Curl Example:**
  ```bash
  curl -X POST http://localhost:5000/api/v1/media/upload \
    -H "Authorization: Bearer <accessToken>" \
    -F "file=@/path/to/cleanroom-drawing.png"
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "url": "https://res.cloudinary.com/gmp-vision/image/upload/v1728567890/gmp-vision/sample_asset.png",
      "publicId": "gmp-vision/sample_asset",
      "format": "png",
      "bytes": 245890
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: `{"success":false,"error":{"code":"FILE_MISSING","message":"No file provided for upload."}}`
  - `400 Bad Request`: `{"success":false,"error":{"code":"INVALID_FILE_SIGNATURE","message":"File content does not match the declared MIME type. Malicious or corrupted file detected."}}`
  - `400 Bad Request`: `{"success":false,"error":{"code":"FILE_TOO_LARGE","message":"Image size exceeds 10MB limit."}}`

---

#### `DELETE /api/v1/media/*` (`DELETE /api/v1/media/:publicId`)
- **Description:** Permanently deletes an asset from Cloudinary CDN by its public ID.
- **Access:** `admin` or `superadmin`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Path Parameters:** `publicId` (Supports slashes, e.g. `gmp-vision/sample_asset`)
- **Curl Example:**
  ```bash
  curl -X DELETE http://localhost:5000/api/v1/media/gmp-vision/sample_asset \
    -H "Authorization: Bearer <accessToken>"
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": { "result": "ok" }
  }
  ```

---

## 9. Frontend Integration Blueprint

When building the new frontend using Google Stitch, Next.js, or Vite + React:

### 1. HTTP Client / Axios Interceptor Template
Use this pattern to automatically handle 15-minute access token expiry:

```typescript
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // Sends HTTP-only refreshToken cookie
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.response?.data?.error?.code === 'TOKEN_EXPIRED' && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = data.data.accessToken;
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        failedQueue.forEach((p) => p.resolve(newAccessToken));
        failedQueue = [];
        return api(originalRequest);
      } catch (refreshErr) {
        failedQueue.forEach((p) => p.reject(refreshErr));
        failedQueue = [];
        window.location.href = '/admin/login';
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
```

### 2. Form Submission for Leads / RFQ
```typescript
export async function submitRFQ(formData: {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  divisions: string[];
  message: string;
}) {
  const response = await api.post('/leads', {
    ...formData,
    source: 'rfq_form',
  });
  return response.data; // { success: true, data: { id, message } }
}
```

### 3. Media Upload Helper
```typescript
export async function uploadMedia(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data; // { url, publicId, format, bytes }
}
```

---

## 10. Summary Checklist for Frontend Builders

- [ ] Connect to `http://localhost:5000/api/v1` for local development.
- [ ] Read `/settings` on initial application mount to populate contact hotline, email, and social links.
- [ ] Call `/divisions` to render navigation mega-menus and division cards.
- [ ] Connect RFQ forms and WhatsApp CTA buttons to `POST /leads` with appropriate `source`.
- [ ] For admin features, store `accessToken` in memory and let the browser store the HTTP-only `refreshToken` cookie.
- [ ] Display error feedback using `error.fields` for precise validation error highlighting.
