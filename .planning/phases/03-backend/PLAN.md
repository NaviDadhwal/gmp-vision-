---
phase: 03
title: Backend Foundation, MongoDB Schemas, REST API Endpoints & Postman Test Suite
status: planned
depends_on: [01-file-organization]
target_date: 2026-10-06
files_modified:
  - backend/package.json
  - backend/tsconfig.json
  - backend/.env.example
  - backend/src/server.ts
  - backend/src/app.ts
  - backend/src/config/env.ts
  - backend/src/config/db.ts
  - backend/src/config/cloudinary.ts
  - backend/src/middleware/errorHandler.ts
  - backend/src/middleware/requireAuth.ts
  - backend/src/middleware/roleGuard.ts
  - backend/src/middleware/validate.ts
  - backend/src/middleware/upload.ts
  - backend/src/modules/auth/*
  - backend/src/modules/admins/*
  - backend/src/modules/leads/*
  - backend/src/modules/divisions/*
  - backend/src/modules/products/*
  - backend/src/modules/filters/*
  - backend/src/modules/projects/*
  - backend/src/modules/clients/*
  - backend/src/modules/settings/*
  - backend/src/modules/media/*
  - backend/src/utils/jwt.ts
  - backend/src/utils/pagination.ts
  - backend/src/scripts/seed.ts
  - backend/postman/collection.json
  - backend/postman/environment.json
---

# Phase 03: Backend Foundation, MongoDB Schemas, REST Endpoints & Postman Suite

## 1. Executive Summary & PRD Tech Stack Verification

As mandated by [docs/GMP_VISION_PRD.md](file:///home/hackunseen/Downloads/gmp%20vision/docs/GMP_VISION_PRD.md#L83-L160), the backend is built as an enterprise-grade RESTful API service:

* **Programming Language:** **TypeScript** (`strict: true`, target ES2022/NodeNext, zero unverified `any`).
* **Runtime:** **Node.js** (v18+ LTS).
* **Framework:** **Express**.
* **Database & ODM:** **MongoDB Atlas** with **Mongoose** (typed schemas, compound & unique indexes, timestamps).
* **Request Validation:** **Zod** schemas for environment variables, request bodies, queries, and path params.
* **Security & Hardening:**
  * `helmet` with tuned Content Security Policy.
  * `cors` with explicit domain allowlist.
  * `express-rate-limit` (layered: Global 100/min, Auth 10/min, RFQ/WhatsApp 10/15min).
  * `express-mongo-sanitize` for NoSQL injection prevention.
  * `bcryptjs` (12 rounds) for password hashing and refresh token storage.
  * `jsonwebtoken` for 15-minute access tokens and 7-day refresh tokens via `HttpOnly; Secure; SameSite=Strict` cookies.
* **Asset Storage:** **Cloudinary** SDK + **Multer** stream for images (max 10MB) and PDF brochures (max 25MB).
* **API Testing & Specification:** **Postman** (`backend/postman/collection.json` & `backend/postman/environment.json`) covering all 32 endpoints.

---

## 2. Work Breakdown Structure (Execution Tasks)

### Task 1: Backend Scaffolding & Dependencies Initialization
* Initialize `backend/package.json` with scripts:
  * `build`: `tsc`
  * `start`: `node dist/server.js`
  * `dev`: `tsx watch src/server.ts` or `ts-node-dev`
  * `seed`: `tsx src/scripts/seed.ts`
* Initialize `backend/tsconfig.json` with strict mode, module resolution `node`, and output directory `dist`.
* Create `backend/.env.example` defining:
  `PORT`, `NODE_ENV`, `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `CORS_ORIGINS`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `SUPERADMIN_EMAIL`, `SUPERADMIN_PASSWORD`.

### Task 2: Core Server & Database Lifecycle
* Implement `src/config/env.ts` with Zod schema validation that crashes process immediately on missing/malformed configuration.
* Implement `src/config/db.ts` managing Mongoose connection lifecycle, reconnect logic, error listeners, and graceful shutdown on `SIGINT`/`SIGTERM`.
* Implement `src/app.ts` configuring:
  * Sentry request handler (if configured).
  * Helmet security headers.
  * CORS origin allowlist.
  * `express.json({ limit: '10kb' })` and `cookieParser()`.
  * `express-mongo-sanitize`.
  * Rate limiters.
  * Health probes (`GET /health` and `GET /ready`).
  * RFC 7807 formatted central error handler (`src/middleware/errorHandler.ts`).
* Implement `src/server.ts` establishing DB connection, starting cron services, and binding HTTP listener.

### Task 3: Authentication & Admin Management Module
* Implement Mongoose `AdminModel` (`src/modules/admins/admin.model.ts`):
  * Fields: `email` (unique), `passwordHash`, `role` (`admin` | `superadmin`), `isActive`, `failedLoginAttempts`, `lockUntil`, `refreshTokenHash`.
* Implement JWT utilities (`src/utils/jwt.ts`):
  * Access Token: 15-minute validity signed with `JWT_ACCESS_SECRET`.
  * Refresh Token: 7-day validity signed with `JWT_REFRESH_SECRET`.
  * Cryptographic timing-safe comparison wrapper for refresh token verification.
* Implement Middleware:
  * `requireAuth.ts`: Decodes access token and populates `req.user`.
  * `roleGuard.ts`: Restricts administrative routes by role (`superadmin` vs `admin`).
* Implement Routes & Controllers (`src/modules/auth/` and `src/modules/admins/`):
  * `POST /api/v1/auth/login`: Email/password verification, account lockout check, issues access token + sets HttpOnly refresh cookie.
  * `POST /api/v1/auth/refresh`: Validates refresh token cookie, rotates token hash in DB, sets new cookie, returns new access token.
  * `POST /api/v1/auth/logout`: Revokes refresh token in DB, clears cookie.
  * `GET /api/v1/auth/me`: Returns profile of authenticated admin.
  * `GET /api/v1/admins`: Lists admin accounts (superadmin only).
  * `POST /api/v1/admins`: Provisions admin user (superadmin only).
  * `PATCH /api/v1/admins/:id`: Updates admin profile/status (superadmin only).
  * `DELETE /api/v1/admins/:id`: Deactivates admin user (superadmin only).

### Task 4: Core Business Schemas & Models (Mongoose)
Implement typed schemas with compound & text indexes matching PRD Section 5:
1. `divisions.model.ts`: 7 turnkey contracting divisions (`number`, `title`, `slug`, `tagline`, `description`, `heroImage`, `icon`, `metaTitle`, `metaDescription`, `order`, `isActive`).
2. `products.model.ts`: Equipment catalog (`divisionId`, `category`, `subcategory`, `name`, `slug`, `description`, `specifications` array, `images` array, `tags`, `isFeatured`, `order`, `isActive`).
3. `filters.model.ts`: Air filtration items (`category`, `name`, `micronRating`, `mediaConstruction`, `frame`, `applications`, `keyFeature`, `images`, `specSheetUrl`, `order`, `isActive`).
4. `projects.model.ts`: Completed client references (`clientName`, `scope`, `location`, `division` array, `completionYear`, `description`, `images`, `testimonial`, `isFeatured`, `order`, `isActive`).
5. `clients.model.ts`: Client logos & sector categorization (`name`, `logoUrl`, `sector`, `website`, `isFeatured`, `order`, `isActive`).
6. `settings.model.ts`: Site-wide key-value dictionary (`hero_headline`, `metric_years_exp`, `metric_projects_count`, `brochure_pdf`, `whatsapp_number`, `admin_notification_email`).
7. `leads.model.ts`: RFQs, inquiries, and WhatsApp beacons (`companyName`, `contactName`, `designation`, `email`, `phone`, `location`, `projectType`, `message`, `roomDimensions`, `cfm`, `source`, `status`, `referrerUrl`).

### Task 5: Business Endpoints, Dual Pagination & Reordering
* Implement dual pagination helper (`src/utils/pagination.ts`):
  * Mode A: Offset pagination (`page`, `limit`, `total`, `totalPages`) for Admin CMS tables.
  * Mode B: Cursor pagination (`cursor`, `limit`, `nextCursor`, `hasMore`) for public feeds.
* Implement Controllers & Routes for each resource module:
  * Public Read routes:
    * `GET /api/v1/divisions`, `GET /api/v1/divisions/:slug`
    * `GET /api/v1/products`, `GET /api/v1/products/:slug`
    * `GET /api/v1/filters`, `GET /api/v1/filters/:id`
    * `GET /api/v1/projects`, `GET /api/v1/projects/:id`
    * `GET /api/v1/clients`
    * `GET /api/v1/settings`
  * Admin CRUD & Batch Reorder routes:
    * `POST`, `PATCH`, `DELETE` for each catalog resource.
    * Batch reordering endpoints: `PATCH /api/v1/:resource/reorder` executing MongoDB `bulkWrite` for array of `{ id: string; order: number }`.
  * Leads & WhatsApp Ingestion routes:
    * `POST /api/v1/leads`: Ingests RFQ submissions and WhatsApp click beacons, triggers email notification.
    * `GET /api/v1/leads`: Admin list with filters & pagination.
    * `PATCH /api/v1/leads/:id/status`: Updates lead pipeline status.
    * `GET /api/v1/leads/export`: Streams leads as CSV.

### Task 6: Cloudinary Media Upload Service
* Implement `src/config/cloudinary.ts` with Cloudinary SDK credentials.
* Implement `src/middleware/upload.ts` with Multer memory storage and strict MIME checking (`image/jpeg`, `image/png`, `image/webp`, `application/pdf`).
* Implement `POST /api/v1/media/upload`: Streams buffer to Cloudinary `gmp-vision` folder, returns `{ url, publicId, format, size }`.
* Implement `DELETE /api/v1/media/:publicId`: Removes asset from Cloudinary storage.

### Task 7: Database Seeding Script
* Implement `src/scripts/seed.ts`:
  * Provisions default Superadmin account from environment variables.
  * Populates the 7 Turnkey Divisions with descriptions and icons from `WEBSITE_SERVICES_AND_CATALOG.md`.
  * Populates sample products, filtration items, and initial portfolio case studies.
  * Populates default site settings dictionary.
  * Ensures idempotent execution (`upsert`).

### Task 8: Postman Collection & Testing Environment
* Create `backend/postman/collection.json`:
  * Structured folders: `System Health`, `Auth`, `Admins`, `Leads`, `Divisions`, `Products`, `Filters`, `Projects`, `Clients`, `Settings`, `Media`.
  * Pre-request scripts and test scripts for automated token capture (`pm.environment.set("accessToken", ...)`).
  * Request test assertions checking HTTP status codes, RFC 7807 error envelopes, and data schemas.
* Create `backend/postman/environment.json`:
  * `baseUrl`: `http://localhost:5000/api/v1`
  * `accessToken`: ``
  * `testAdminEmail`, `testAdminPassword`.

---

## 3. Post-Backend: Frontend Changes Required

Once the backend is operational, the frontend (`frontend/`) will be updated to transition from static/mock data to the live API:

1. **API Client & Refresh Interceptor (`frontend/src/lib/api/`):**
   * Implement `client.ts`: Axios instance with request interceptor attaching `Authorization: Bearer <token>` from `tokenStore.ts`.
   * Implement single-flight refresh queue on `401 Unauthorized`: Calls `POST /api/v1/auth/refresh` via isolated `refreshClient.ts`.
2. **Authentication Integration (`frontend/src/auth/`):**
   * Wire `AdminLoginPage.tsx` to `POST /api/v1/auth/login`.
   * Update `AuthProvider.tsx` to verify session via `GET /api/v1/auth/me` on initial page load.
3. **Data Fetching with TanStack Query:**
   * Replace static imports from `src/data/*.ts` with custom query hooks:
     * `useProducts()` / `useProduct(slug)`
     * `useDivisions()` / `useDivision(slug)`
     * `useFilters()`
     * `useProjects()` (using cursor `useInfiniteQuery`)
     * `useClients()`
     * `useSettings()`
     * `useLeads()` (with offset pagination and filtering in Admin CMS)
4. **Interactive Form Wiring:**
   * Wire `RFQMultiStepForm.tsx` to emit `POST /api/v1/leads` and clear session draft on success.
   * Wire WhatsApp floating CTA to call `initiateWhatsAppInquiry()` which pings `POST /api/v1/leads` beacon in background before opening WhatsApp Web.
5. **Admin CMS Drag-and-Drop Reordering:**
   * In `SortableList.tsx`, attach `onDragEnd` mutation to trigger `PATCH /api/v1/:resource/reorder`.
6. **Cloudinary Asset Upload in Admin:**
   * Wire `GalleryManager.tsx` and file input to `POST /api/v1/media/upload`.

---

## 4. Quality Gates & Verification Checklist

- [ ] `npm run build` in `backend/` compiles with 0 TypeScript errors under `strict: true`.
- [ ] `GET /health` and `GET /ready` return `200 OK` with valid database connectivity status.
- [ ] Authentication suite in Postman passes:
  * Admin login returns access token and sets HttpOnly cookie.
  * Token refresh rotates cookie and issues new access token.
  * Route guards reject requests with invalid/missing token (`401`) or insufficient role (`403`).
- [ ] Database seeder (`npm run seed`) runs idempotently and populates 7 divisions.
- [ ] Postman collection executes 100% of endpoints without uncaught exceptions.
- [ ] Frontend compiles cleanly (`npm run build` in `frontend/`) with 0 errors.
