# Phase 03: Backend Context — GMP VISION

## Sources of Truth
1. **Master Prompt & Blueprint Standard:** [instructions.md](file:///home/hackunseen/Downloads/gmp%20vision/instructions.md) (Full-Stack Project Blueprint & Prompt Sheet v2.2)
2. **Master Product Specification:** [docs/GMP_VISION_PRD.md](file:///home/hackunseen/Downloads/gmp%20vision/docs/GMP_VISION_PRD.md) (GMP VISION Corporate & Catalog Architecture v2.0)
3. **Services & Scope Reference:** [docs/WEBSITE_SERVICES_AND_CATALOG.md](file:///home/hackunseen/Downloads/gmp%20vision/docs/WEBSITE_SERVICES_AND_CATALOG.md)

## Core Technical Decisions & Rules Locked

### 1. Technology Stack
* **Runtime:** Node.js (Active LTS v26.8.1 local, Node 20/22 on production containers).
* **Language:** TypeScript (`strict: true`, target ES2022/NodeNext, zero unverified `any`).
* **Framework:** Express (`express@^5.2.1`).
* **Database & ODM:** MongoDB Atlas with Mongoose (`mongoose@^9.10.4`).
* **Validation:** Zod (`zod@^3.24.x` / `zod@^4.x` runtime validation).
* **Testing & Documentation:** Postman Collection v2.1 (`backend/postman/collection.json` & `environment.json`).
* **Media Management:** Cloudinary SDK (`cloudinary@^2.11.0`) + Multer memory storage.
* **Email:** Nodemailer (`nodemailer@^10.0.15`).
* **Scheduler:** node-cron (`node-cron@^4.6.0`).

### 2. Architecture Constraints (from instructions.md)
* **Monorepo Separation:** `backend/` and `frontend/` isolated with dedicated `package.json`, `tsconfig.json`, and `.env.example`.
* **Zero Secret Leakage:** `.env`, `.env.*` (except `!.env.example`), `node_modules`, `dist/`, and key files strictly ignored in `.gitignore` and `.cursorignore`.
* **Single Source of Env Truth:** `backend/src/config/env.ts` with Zod schema. Immediate process exit on invalid/missing variables.
* **Strict Middleware Pipeline in `app.ts`:**
  1. Sentry Request Handler
  2. Helmet with tuned CSP
  3. CORS with explicit origin allowlist (never wildcard with credentials)
  4. Body parsing (`express.json({ limit: '10kb' })` and `express.urlencoded({ extended: true })`)
  5. `cookie-parser` for HttpOnly cookies
  6. `express-mongo-sanitize` for NoSQL operator stripping
  7. Morgan logging (development only)
  8. Rate Limiting: Global (`/api`), Auth (`/api/v1/auth`), Leads (`/api/v1/leads`)
  9. Route Mounting (`/api/v1`)
  10. Health Probes: `GET /health` (liveness, 200 without DB call) & `GET /ready` (readiness, `mongoose.connection.readyState === 1`)
  11. Sentry Error Handler
  12. Central RFC 7807 Error Handler (`errorHandler.ts`)
* **Standard Response Envelopes:**
  * Success: `{ success: true, data: { ... } }`
  * Paginated Success: `{ success: true, data: [ ... ], pagination: { total, page, limit, totalPages } }` (Offset) or `{ success: true, data: [ ... ], pagination: { nextCursor, hasMore, limit } }` (Cursor)
  * Error: `{ success: false, error: { code: string, message: string, fields?: Record<string, string[]> } }`
* **Authentication & Cryptography Security:**
  * Access Token: 15-minute validity, returned in JSON body only (never in URL or localStorage).
  * Refresh Token: 7-day validity, set in `HttpOnly; Secure; SameSite=Strict` cookie.
  * Refresh tokens hashed with bcrypt in DB before storage; reused refresh token immediately invalidates all user tokens (breach signal).
  * Cryptographic timing-safe comparison (`crypto.timingSafeEqual`) used for all token checks via `safeCompare()`.
  * Account lockout: 5 consecutive failed login attempts locks account for 15 minutes.
  * Resource ownership helper: `assertOwnership()` throws `404 Not Found` (never 403) so existence is not leaked to attackers.
* **Batch Reordering:** Drag-and-drop `@dnd-kit` updates trigger `PATCH /api/v1/:resource/reorder` executing MongoDB `bulkWrite` with ordered index updates.
* **No Standalone Services Route:** Services route through `divisions` and `products`.

### 3. Postman Standard (from instructions.md Section 10)
* Root pre-request script checks `tokenExpiry` against `Date.now()`. If expired, silently invokes `POST {{baseUrl}}/api/v1/auth/refresh` to rotate tokens before outbound calls.
* Every endpoint tests status, `success: true`, and extracts created IDs into `{{resourceId}}`.
* Full test matrix covering: 200/201 happy path, 400 validation error, 401 unauthorized/expired, 403 forbidden, 404 not found, 429 rate limit exceeded, 409 conflict.
