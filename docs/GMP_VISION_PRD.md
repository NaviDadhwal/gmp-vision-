# Product Requirements Document
# GMP VISION — Corporate & Catalog Website
**Version:** 2.0 (Production-Ready Architecture)  
**Stack:** React + Vite (Frontend) · Node.js + Express + TypeScript (Backend) · MongoDB Atlas (Database)  
**IDE:** Antigravity  
**Blueprint Standard:** Full-Stack Project Blueprint v2.2 (instructions.md)  
**Last Updated:** September 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Repository Structure](#3-repository-structure)
4. [Environment Variables](#4-environment-variables)
5. [MongoDB Data Models & TypeScript Interfaces](#5-mongodb-data-models--typescript-interfaces)
6. [Backend API Specification](#6-backend-api-specification)
7. [Frontend Architecture & SEO](#7-frontend-architecture--seo)
8. [Feature Specifications](#8-feature-specifications)
9. [Admin CMS Dashboard](#9-admin-cms-dashboard)
10. [Security Checklist](#10-security-checklist)
11. [Design System & UI Direction](#11-design-system--ui-direction)
12. [Page-by-Page Content Architecture](#12-page-by-page-content-architecture)
13. [Deployment](#13-deployment)
14. [Master Build Prompts (Sequenced & Gated)](#14-master-build-prompts-sequenced--gated)
15. [Appendix A: MCP Configuration](#appendix-a-mcp-configuration)
16. [Appendix B: API Testing (Postman)](#appendix-b-api-testing-postman)

---

## 1. Project Overview

### 1.1 Brand

| Field | Value |
|---|---|
| **Company** | GMP VISION |
| **Tagline** | "All Solutions in One Project" |
| **Registered Office** | Ground Floor, Building No. 01, Amb Daultpur Road, Bhanjal, Distt. Una, Himachal Pradesh – 177213 |
| **Manufacturing / Assembly** | Khasra No. 231, Near MND Hub Biotech, Village Dadhi Harnam, Nalagarh, Distt. Solan, HP – 174101 |
| **Phone** | +91-9817343117 · +91-9317343117 |
| **Email** | gmpvision3@gmail.com |
| **GSTIN** | 02CZKPK1192C2ZQ |
| **Leadership** | Mr. Parveen Kumar (CEO, 15+ Yrs Exp) · Mr. Sachin Thakur (Projects Head, 21 Yrs Exp) |

### 1.2 Business Description

GMP VISION is a single-source **Turnkey Engineering, Cleanroom (CRP), and Industrial MEP Contractor** serving pharmaceutical, biotechnology, healthcare, chemical, and advanced manufacturing sectors across India. The company operates across **7 integrated service divisions**:

1. Cleanroom Infrastructure & Modular Panel Systems (PUF Panels, Doors, Covings, Epoxy Flooring)
2. HVAC & Air Handling Systems (AHU, DAHU Desiccant Rotors, DX, Chilled Water Coils, SMACNA GI Ducting)
3. Air Purification & Cleanroom Filtration (Pre, Fine, Pocket, Gel-Seal HEPA H13/H14, Terminal Housings)
4. MS & SS Process Piping & Structural Fabrication (Sanitary SS 304/316L Orbital Welded PW/WFI, MS Piping)
5. Industrial Water Treatment (Multi-stage RO Plants, Turnkey ETP Plants, ZLD Evaporators)
6. Electrical Panels & Fire Plant Systems (MCC/PCC, VFD Automation, Addressable Fire Alarm, Suppression)
7. Automation, BMS/EMS & Regulatory Validation (21 CFR Part 11 EMS, DQ/IQ/OQ/PQ, DOP/PAO, Thermal Mapping)

### 1.3 Website Goals

- Present the full 7-division service & product catalog with deep engineering detail.
- Generate qualified B2B leads via an interactive RFQ/Quote Builder with persistent session state.
- Attribute and capture high-intent leads generated through WhatsApp direct interactions.
- Establish technical credibility through verified client portfolios, compliance credentials (cGMP, WHO-TRS, USFDA, ISO 14644-1), and project case studies.
- Provide an intuitive, full-featured Admin CMS (Tiptap rich text, `@dnd-kit` drag-to-reorder, Cloudinary gallery management) so non-technical leadership can manage the site without developer intervention.
- Guarantee search engine visibility through structured data (JSON-LD), canonical tags, dynamic meta tags, and sitemaps.

### 1.4 User Types

| Role | Description |
|---|---|
| **Visitor** | Pharma/industrial procurement manager, consultant, or plant engineer browsing anonymously |
| **Lead** | Visitor who submitted an RFQ form or initiated WhatsApp inquiry — stored in DB, triggers notifications |
| **Admin** | GMP VISION staff who log into the CMS to manage content, view leads, and update catalog |
| **Super Admin** | Full system access including admin user provisioning and global site configuration |

---

## 2. Tech Stack & Architecture

> ⚠️ **Version Safety Rule (from instructions.md):** Never hardcode version numbers from this document. Before writing `package.json`, web-search each package for its current latest version and any active CVEs. Use `npm show <package> version` in the terminal to confirm. Use `^` ranges for application deps. State what you verified in code comments.

### 2.1 Stack Table

| Layer | Choice | Notes |
|---|---|---|
| **Runtime** | Node.js (Active LTS) | Verify current LTS on nodejs.org |
| **Backend Framework** | Express + TypeScript | Strict mode enabled |
| **Language** | TypeScript | `strict: true` in tsconfig — no `any` without explicit justification |
| **Database** | MongoDB Atlas | Cloud-hosted with strict indexing and IP allowlist |
| **ODM** | Mongoose | Typed schemas with explicit Mongoose document interfaces |
| **Validation** | Zod | All env vars, request bodies, and queries validated |
| **Auth** | JWT (access + refresh) + Email/Password | Admin-only auth; public site is unauthenticated |
| **JWT Library** | jsonwebtoken | Access: 15m (body) · Refresh: 7d (HttpOnly cookie) |
| **Password Hashing** | bcryptjs | Cost factor: 12 rounds |
| **Security Headers** | helmet | Custom Content Security Policy for React SPA + Cloudinary |
| **CORS** | cors | Explicit origin allowlist — never `*` with credentials |
| **Rate Limiting** | express-rate-limit | Global (100/min), Auth (10/min), RFQ & WhatsApp (5/15min) |
| **NoSQL Sanitize** | express-mongo-sanitize | Strips `$` and `.` from all inputs |
| **Email** | nodemailer | RFQ notifications + admin alerts (SMTP via Resend or SendGrid) |
| **File Upload** | multer + Cloudinary | Product images, brochure PDF, project photos (signed uploads) |
| **Rich Text Editor** | Tiptap (`@tiptap/react`) | Headless, modern, outputs clean HTML sanitized with DOMPurify |
| **Drag & Drop** | `@dnd-kit/core` + `@dnd-kit/sortable` | Accessible reordering of projects, products, and gallery images |
| **SEO & Meta** | `react-helmet-async` | Dynamic `<head>` management, Open Graph, and JSON-LD injection |
| **Logging** | winston | Structured JSON logs; no PII or credentials in logs |
| **Monitoring** | @sentry/node | Error tracking with sensitive data scrubbing |
| **Job Scheduling** | node-cron | Daily lead digest email to admin at 08:00 AM IST |
| **Frontend Framework**| React + Vite | SPA architecture with fast HMR |
| **Routing** | react-router-dom | Nested layouts and protected admin routes |
| **Server State** | TanStack Query | Caching, retries, optimistic updates, cursor infinite scroll |
| **HTTP Client** | Axios | Request interceptors + separate `refreshClient` for token refresh |
| **Forms** | React Hook Form + Zod | Client-side schema validation with inline error states |
| **HTML Sanitize** | DOMPurify | Wraps every rich text value rendered from the database |
| **Animations** | Framer Motion | Minimal, purposeful motion (hero entrance, tab transitions) |
| **Icons** | lucide-react | Consistent, modern stroke icon set |
| **Deploy: Frontend** | Vercel | Automatic CI/CD with production SPA routing rules |
| **Deploy: Backend** | Render or Railway | Containerized Node.js service with `/health` probe |
| **Deploy: DB** | MongoDB Atlas | Dedicated M10+ cluster, automated backups |

### 2.2 Architecture Pattern

```
Browser (React SPA on Vercel)
        │  HTTPS · REST · JSON
        ▼
Express API (Node.js on Render/Railway)
        │
        ├── Middleware Stack:
        │     1. Sentry Request Handler
        │     2. Helmet (tuned CSP for React SPA + Cloudinary)
        │     3. CORS (strict origin allowlist)
        │     4. express.json({ limit: '10kb' })
        │     5. express-mongo-sanitize
        │     6. Rate Limiters (Global, Auth, RFQ/WhatsApp)
        │
        ├── API Routes (/api/v1):
        │     ├── /auth          (admin login, refresh, logout, me)
        │     ├── /admins        (superadmin user management)
        │     ├── /leads         (public RFQ & WhatsApp beacon; admin read/export)
        │     ├── /divisions     (7 core business divisions; public read, admin CRUD)
        │     ├── /products      (manufactured equipment & components; public read, admin CRUD)
        │     ├── /filters       (dedicated filtration catalog; public read, admin CRUD)
        │     ├── /projects      (client portfolio references; public read, admin CRUD)
        │     ├── /clients       (client logo wall; public read, admin CRUD)
        │     ├── /media         (Cloudinary upload signed params & deletion)
        │     └── /settings      (public site metrics/text; admin CRUD)
        │
        ├── Health Probes:
        │     ├── /health        (liveness: HTTP 200)
        │     └── /ready         (readiness: MongoDB connectionState === 1)
        │
        └── Central Error Handler (Sentry error handler + RFC 7807 formatted JSON)
        │
        ▼
MongoDB Atlas
        ├── Collections: admins, leads, divisions, products,
        │                filters, projects, clients, settings
        └── Indexes: Compound, unique, and text indexes configured
```

> **Note on Services Architecture:** GMP VISION operates as a unified 7-division turnkey contractor. All engineering services (Cleanroom Erection, HVAC Validation, Piping, Water Treatment, etc.) are canonically modeled under the `divisions` collection and their associated `products` / capabilities. There is no separate `services` collection or `/api/v1/services` route; all service-related queries route through `/api/v1/divisions` and `/api/v1/products`.

---

## 3. Repository Structure

```
gmp-vision/
├── backend/
│   ├── src/
│   │   ├── server.ts                  # DB connect → cron start → HTTP listen
│   │   ├── app.ts                     # Middleware stack + route mounting
│   │   ├── config/
│   │   │   ├── env.ts                 # Zod-validated environment config
│   │   │   ├── db.ts                  # Mongoose connection lifecycle
│   │   │   └── cloudinary.ts          # Cloudinary SDK credentials & helpers
│   │   ├── middleware/
│   │   │   ├── requireAuth.ts         # JWT verification → attaches req.user
│   │   │   ├── validate.ts            # Zod validation factory for body/query/params
│   │   │   ├── roleGuard.ts           # 'admin' vs 'superadmin' authorization
│   │   │   └── errorHandler.ts        # Central error handling with standard envelope
│   │   ├── modules/
│   │   │   ├── auth/                  # Admin auth lifecycle (JWT, cookies)
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.schema.ts
│   │   │   ├── admins/                # Superadmin management of admin accounts
│   │   │   │   ├── admin.routes.ts
│   │   │   │   ├── admin.controller.ts
│   │   │   │   ├── admin.service.ts
│   │   │   │   ├── admin.model.ts
│   │   │   │   └── admin.schema.ts
│   │   │   ├── leads/                 # RFQ submissions + WhatsApp lead tracking
│   │   │   │   ├── lead.routes.ts
│   │   │   │   ├── lead.controller.ts
│   │   │   │   ├── lead.service.ts
│   │   │   │   ├── lead.model.ts
│   │   │   │   └── lead.schema.ts
│   │   │   ├── divisions/            # The 7 turnkey contracting divisions
│   │   │   │   ├── division.routes.ts
│   │   │   │   ├── division.controller.ts
│   │   │   │   ├── division.service.ts
│   │   │   │   ├── division.model.ts
│   │   │   │   └── division.schema.ts
│   │   │   ├── products/             # Equipment & component catalog
│   │   │   │   ├── product.routes.ts
│   │   │   │   ├── product.controller.ts
│   │   │   │   ├── product.service.ts
│   │   │   │   ├── product.model.ts
│   │   │   │   └── product.schema.ts
│   │   │   ├── filters/              # Dedicated air filtration catalog
│   │   │   │   ├── filter.routes.ts
│   │   │   │   ├── filter.controller.ts
│   │   │   │   ├── filter.service.ts
│   │   │   │   ├── filter.model.ts
│   │   │   │   └── filter.schema.ts
│   │   │   ├── projects/             # Completed project case studies & portfolio
│   │   │   │   ├── project.routes.ts
│   │   │   │   ├── project.controller.ts
│   │   │   │   ├── project.service.ts
│   │   │   │   ├── project.model.ts
│   │   │   │   └── project.schema.ts
│   │   │   ├── clients/              # Client logo wall & sector tagging
│   │   │   │   ├── client.routes.ts
│   │   │   │   ├── client.controller.ts
│   │   │   │   ├── client.service.ts
│   │   │   │   ├── client.model.ts
│   │   │   │   └── client.schema.ts
│   │   │   ├── settings/             # Dynamic site-wide configuration & metrics
│   │   │   │   ├── setting.routes.ts
│   │   │   │   ├── setting.controller.ts
│   │   │   │   ├── setting.service.ts
│   │   │   │   ├── setting.model.ts
│   │   │   │   └── setting.schema.ts
│   │   │   └── media/                # Cloudinary upload endpoints & asset cleanup
│   │   │       ├── media.routes.ts
│   │   │       ├── media.controller.ts
│   │   │       └── media.service.ts
│   │   ├── services/
│   │   │   ├── email.service.ts       # Nodemailer: RFQ alerts & daily digest
│   │   │   └── cron.service.ts        # Node-cron automated jobs
│   │   ├── utils/
│   │   │   ├── jwt.ts                 # Access & refresh signing and verification
│   │   │   ├── tokenCompare.ts        # crypto.timingSafeEqual comparison wrapper
│   │   │   └── pagination.ts          # Offset & cursor pagination helpers
│   │   ├── scripts/
│   │   │   ├── seed.ts                # Idempotent DB seeder
│   │   │   └── generate-sitemap.ts    # Build-time XML sitemap generator
│   │   └── types/
│   │       └── express.d.ts           # Augments Request with req.user: IAdminPayload
│   ├── postman/
│   │   ├── collection.json            # Full API test suite
│   │   └── environment.json           # Environment variables template
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json                  # strict: true
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx                   # ReactDOM render with HelmetProvider & QueryClient
│   │   ├── App.tsx                    # Route definitions & layout wrappers
│   │   ├── lib/
│   │   │   ├── env.ts                 # VITE_* Zod validation
│   │   │   ├── whatsapp.ts            # WhatsApp deep-link & beacon tracking helper
│   │   │   └── api/
│   │   │       ├── client.ts          # Axios base with single-flight refresh interceptor
│   │   │       └── refreshClient.ts   # Interceptor-free Axios instance for token renewal
│   │   ├── auth/
│   │   │   ├── AuthProvider.tsx       # Auth context (user, login, logout)
│   │   │   └── tokenStore.ts          # In-memory access token storage (never localStorage)
│   │   ├── components/
│   │   │   ├── RequireAuth.tsx        # Admin route guard
│   │   │   ├── ErrorBoundary.tsx      # Global React error boundary with fallback UI
│   │   │   ├── seo/
│   │   │   │   ├── SEOHead.tsx        # Dynamic react-helmet-async metadata wrapper
│   │   │   │   └── JsonLd.tsx         # Structured data injector (LocalBusiness, Product)
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx         # Sticky header with top utility strip
│   │   │   │   ├── Footer.tsx         # Comprehensive dual-address footer
│   │   │   │   └── MegaMenu.tsx       # 7-division desktop navigation drawer
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       ├── Badge.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Modal.tsx
│   │   │       └── skeletons/         # Component-specific shimmer loaders
│   │   │           ├── FilterCardSkeleton.tsx
│   │   │           ├── ProjectCardSkeleton.tsx
│   │   │           ├── DivisionHeroSkeleton.tsx
│   │   │           └── ProductGridSkeleton.tsx
│   │   ├── features/
│   │   │   ├── rfq/
│   │   │   │   ├── hooks/useRFQPersistence.ts  # sessionStorage draft sync with TTL
│   │   │   │   └── components/RFQMultiStepForm.tsx
│   │   │   ├── filtration/
│   │   │   ├── projects/
│   │   │   └── admin/
│   │   │       ├── components/
│   │   │       │   ├── TiptapEditor.tsx        # Rich text editor with toolbar & sanitization
│   │   │       │   ├── SortableList.tsx        # @dnd-kit drag-and-drop container
│   │   │       │   └── GalleryManager.tsx      # Multi-image upload & reorder component
│   │   │       └── pages/                      # Individual CMS screens
│   │   └── pages/                             # Public pages
│   │       ├── HomePage.tsx
│   │       ├── SolutionsPage.tsx
│   │       ├── DivisionDetailPage.tsx
│   │       ├── ProductsPage.tsx
│   │       ├── ProductDetailPage.tsx
│   │       ├── FiltrationCatalogPage.tsx
│   │       ├── ValidationPage.tsx
│   │       ├── ProjectsPage.tsx
│   │       ├── AboutPage.tsx
│   │       ├── ContactPage.tsx
│   │       ├── RFQPage.tsx
│   │       └── NotFoundPage.tsx
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
│
└── docs/
    └── GMP_VISION_PRD.md              # Master Specification (This file)
```

---

## 4. Environment Variables

### 4.1 Backend `.env.example`

```env
# ── Server ───────────────────────────────────────────────────────────────
NODE_ENV=development
PORT=5000
SITE_URL=https://gmpvision.com

# ── Database ──────────────────────────────────────────────────────────────
MONGODB_URI=mongodb://localhost:27017/gmp_vision_dev
# Production: mongodb+srv://<user>:<pass>@cluster0.mongodb.net/gmp_vision?retryWrites=true&w=majority

# ── JWT Secrets ───────────────────────────────────────────────────────────
# Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_ACCESS_SECRET=replace_with_64_char_hex_value_for_access_token
JWT_REFRESH_SECRET=replace_with_different_64_char_hex_value_for_refresh_token
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# ── Frontend URL & CORS ───────────────────────────────────────────────────
CLIENT_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173,https://gmpvision.com

# ── Encryption Key ────────────────────────────────────────────────────────
# Generate with: openssl rand -hex 32
ENCRYPTION_KEY=replace_with_64_char_hex_value

# ── Email (Nodemailer SMTP) ───────────────────────────────────────────────
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USER=resend
SMTP_PASS=re_your_api_key_here
EMAIL_FROM=no-reply@gmpvision.com
ADMIN_EMAIL=gmpvision3@gmail.com

# ── Cloudinary Media Storage ──────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ── Monitoring ────────────────────────────────────────────────────────────
SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
```

### 4.2 Frontend `.env.example`

```env
# ── API & Site ────────────────────────────────────────────────────────────
VITE_API_BASE_URL=http://localhost:5000
VITE_SITE_URL=https://gmpvision.com

# ── Feature & Tracking Variables ──────────────────────────────────────────
VITE_WHATSAPP_NUMBER=919817343117
```

### 4.3 Backend Zod Env Schema (`src/config/env.ts`)

```typescript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('5000'),
  SITE_URL: z.string().url().default('https://gmpvision.com'),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 chars'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 chars'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  CLIENT_URL: z.string().url('CLIENT_URL must be a valid URL'),
  CORS_ORIGINS: z.string().min(1, 'CORS_ORIGINS is required'),
  ENCRYPTION_KEY: z.string().length(64, 'ENCRYPTION_KEY must be a 64-character hex string'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().email().optional().default('no-reply@gmpvision.com'),
  ADMIN_EMAIL: z.string().email('ADMIN_EMAIL must be a valid email'),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, 'CLOUDINARY_CLOUD_NAME is required'),
  CLOUDINARY_API_KEY: z.string().min(1, 'CLOUDINARY_API_KEY is required'),
  CLOUDINARY_API_SECRET: z.string().min(1, 'CLOUDINARY_API_SECRET is required'),
  SENTRY_DSN: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ FATAL: Invalid backend environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
```

---

## 5. MongoDB Data Models & TypeScript Interfaces

All models are defined with distinct TypeScript interfaces extending Mongoose `Document`, accompanied by explicit Schema definitions, index creation, and automatic timestamps.

### 5.1 `admins` Collection

```typescript
import { Schema, model, Document } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'superadmin';
  refreshTokenHash: string | null;
  lastLoginAt: Date | null;
  failedLoginAttempts: number;
  lockoutUntil: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
    refreshTokenHash: { type: String, default: null },
    lastLoginAt: { type: Date, default: null },
    failedLoginAttempts: { type: Number, default: 0 },
    lockoutUntil: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Indexes
AdminSchema.index({ email: 1 }, { unique: true });

export const AdminModel = model<IAdmin>('Admin', AdminSchema);
```

### 5.2 `leads` Collection

```typescript
import { Schema, model, Document } from 'mongoose';

export interface ILead extends Document {
  companyName: string;
  contactName: string;
  designation?: string;
  email: string;
  phone: string;
  location?: string;
  projectType: string[];
  message: string;
  divisions?: string[];
  roomDimensions?: string;
  cfm?: number;
  targetDate?: string;
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed';
  source: 'rfq_form' | 'contact_form' | 'whatsapp';
  referrerUrl?: string;
  ipAddressHash: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const LeadSchema = new Schema<ILead>(
  {
    companyName: { type: String, required: true, trim: true },
    contactName: { type: String, required: true, trim: true },
    designation: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    projectType: { type: [String], default: [] },
    message: { type: String, required: true, trim: true },
    divisions: { type: [String], default: [] },
    roomDimensions: { type: String, default: null },
    cfm: { type: Number, default: null },
    targetDate: { type: String, default: null },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'converted', 'closed'],
      default: 'new',
    },
    source: {
      type: String,
      enum: ['rfq_form', 'contact_form', 'whatsapp'],
      required: true,
    },
    referrerUrl: { type: String, default: null },
    ipAddressHash: { type: String, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

// Indexes
LeadSchema.index({ status: 1, createdAt: -1 });
LeadSchema.index({ email: 1 });
LeadSchema.index({ source: 1, createdAt: -1 });
LeadSchema.index({ createdAt: -1 });

export const LeadModel = model<ILead>('Lead', LeadSchema);
```

### 5.3 `divisions` Collection

```typescript
import { Schema, model, Document } from 'mongoose';

export interface IDivision extends Document {
  slug: string;
  number: number;
  title: string;
  tagline: string;
  description: string; // Sanitized HTML
  heroImage: string;   // Cloudinary URL
  icon: string;        // Lucide icon identifier or SVG string
  metaTitle: string;
  metaDescription: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const DivisionSchema = new Schema<IDivision>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    number: { type: Number, required: true, unique: true, min: 1, max: 7 },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    heroImage: { type: String, required: true },
    icon: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Indexes
DivisionSchema.index({ slug: 1 }, { unique: true });
DivisionSchema.index({ number: 1 }, { unique: true });
DivisionSchema.index({ isActive: 1, number: 1 });

export const DivisionModel = model<IDivision>('Division', DivisionSchema);
```

### 5.4 `products` Collection

```typescript
import { Schema, model, Document, Types } from 'mongoose';

export interface IProductSpecification {
  key: string;
  value: string;
}

export interface IProduct extends Document {
  divisionId: Types.ObjectId;
  category: string;
  subcategory?: string | null;
  name: string;
  slug: string;
  description: string;
  specifications: IProductSpecification[];
  images: string[]; // Cloudinary URLs; first item is cover image
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema = new Schema<IProduct>(
  {
    divisionId: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
    category: { type: String, required: true, trim: true },
    subcategory: { type: String, default: null, trim: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    specifications: [
      {
        key: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
      },
    ],
    images: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Indexes
ProductSchema.index({ slug: 1 }, { unique: true });
ProductSchema.index({ divisionId: 1, isActive: 1, order: 1 });
ProductSchema.index({ isFeatured: 1, isActive: 1 });
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

export const ProductModel = model<IProduct>('Product', ProductSchema);
```

### 5.5 `filters` Collection (Dedicated Filtration Catalog)

```typescript
import { Schema, model, Document } from 'mongoose';

export type FilterCategory =
  | 'pre-filter'
  | 'fine-filter'
  | 'pocket-bag'
  | 'gel-seal-hepa'
  | 'standard-hepa'
  | 'high-flow-hepa'
  | 'semi-hepa'
  | 'wire-mesh';

export interface IFilter extends Document {
  category: FilterCategory;
  name: string;
  micronRating: string;
  mediaConstruction: string;
  frame: string;
  applications: string[];
  keyFeature: string;
  images: string[];
  specSheetUrl?: string | null;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export const FilterSchema = new Schema<IFilter>(
  {
    category: {
      type: String,
      enum: [
        'pre-filter',
        'fine-filter',
        'pocket-bag',
        'gel-seal-hepa',
        'standard-hepa',
        'high-flow-hepa',
        'semi-hepa',
        'wire-mesh',
      ],
      required: true,
    },
    name: { type: String, required: true, trim: true },
    micronRating: { type: String, required: true, trim: true },
    mediaConstruction: { type: String, required: true },
    frame: { type: String, required: true, trim: true },
    applications: { type: [String], default: [] },
    keyFeature: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },
    specSheetUrl: { type: String, default: null },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Indexes
FilterSchema.index({ category: 1, isActive: 1, order: 1 });
FilterSchema.index({ isActive: 1, order: 1 });

export const FilterModel = model<IFilter>('Filter', FilterSchema);
```

### 5.6 `projects` Collection (Portfolio Case Studies)

```typescript
import { Schema, model, Document } from 'mongoose';

export interface ITestimonial {
  quote: string;
  author: string;
  designation: string;
}

export interface IProject extends Document {
  clientName: string;
  scope: string;
  location: string;
  division: string[]; // Division slugs or titles
  description: string; // Narrative in HTML
  images: string[];   // Cloudinary URLs
  completionYear: number;
  isFeatured: boolean;
  testimonial?: ITestimonial | null;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export const ProjectSchema = new Schema<IProject>(
  {
    clientName: { type: String, required: true, trim: true },
    scope: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    division: { type: [String], required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    completionYear: { type: Number, required: true },
    isFeatured: { type: Boolean, default: false },
    testimonial: {
      quote: { type: String },
      author: { type: String },
      designation: { type: String },
    },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Indexes
ProjectSchema.index({ isActive: 1, isFeatured: 1, order: 1 });
ProjectSchema.index({ division: 1, isActive: 1 });
ProjectSchema.index({ completionYear: -1 });

export const ProjectModel = model<IProject>('Project', ProjectSchema);
```

### 5.7 `clients` Collection (Logo Wall)

```typescript
import { Schema, model, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  logoUrl: string;
  website?: string | null;
  sector: string; // Pharma, Biotech, Healthcare, Engineering
  isFeatured: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true, trim: true },
    logoUrl: { type: String, required: true },
    website: { type: String, default: null },
    sector: { type: String, required: true, trim: true },
    isFeatured: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Indexes
ClientSchema.index({ isActive: 1, isFeatured: 1, order: 1 });

export const ClientModel = model<IClient>('Client', ClientSchema);
```

### 5.8 `settings` Collection (Site Configuration)

```typescript
import { Schema, model, Document } from 'mongoose';

export interface ISetting extends Document {
  key: string;
  value: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'json';
  updatedAt: Date;
}

export const SettingSchema = new Schema<ISetting>(
  {
    key: { type: String, required: true, unique: true, trim: true },
    value: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, enum: ['text', 'number', 'boolean', 'json'], default: 'text' },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

// Indexes
SettingSchema.index({ key: 1 }, { unique: true });

export const SettingModel = model<ISetting>('Setting', SettingSchema);
```

### 5.9 MongoDB Indexes Master Reference Table

| Collection | Index Definition | Purpose |
|---|---|---|
| `admins` | `{ email: 1 }` (unique) | Fast authentication lookup, duplicate prevention |
| `leads` | `{ status: 1, createdAt: -1 }` (compound) | Lead dashboard filtering by status and date |
| `leads` | `{ email: 1 }` | Fast lead history and duplicate detection |
| `leads` | `{ source: 1, createdAt: -1 }` | Attribution tracking (RFQ vs WhatsApp) |
| `leads` | `{ createdAt: -1 }` | Date range export filtering |
| `divisions` | `{ slug: 1 }` (unique) | Fast public lookup by URL slug |
| `divisions` | `{ number: 1 }` (unique) | Strict sequential ordering (1 to 7) |
| `divisions` | `{ isActive: 1, number: 1 }` | Navigation drawer rendering |
| `products` | `{ slug: 1 }` (unique) | Public product detail page routing |
| `products` | `{ divisionId: 1, isActive: 1, order: 1 }` | Filtered division catalog queries |
| `products` | `{ isFeatured: 1, isActive: 1 }` | Homepage featured products query |
| `products` | `{ name: 'text', description: 'text', tags: 'text' }` | Full-text catalog search |
| `filters` | `{ category: 1, isActive: 1, order: 1 }` | Filtration catalog tab filtering |
| `filters` | `{ isActive: 1, order: 1 }` | Full filtration catalog ordering |
| `projects` | `{ isActive: 1, isFeatured: 1, order: 1 }` | Homepage portfolio showcase |
| `projects` | `{ division: 1, isActive: 1 }` | Division-specific project references |
| `clients` | `{ isActive: 1, isFeatured: 1, order: 1 }` | Logo wall queries |
| `settings` | `{ key: 1 }` (unique) | O(1) configuration retrieval by key |

---

## 6. Backend API Specification

### 6.1 Middleware Execution Order (`app.ts`)

```typescript
// 1. Sentry Request Handler (Must be very first)
app.use(Sentry.Handlers.requestHandler());

// 2. Helmet Security Headers with Custom CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "https://res.cloudinary.com", "https://api.web3forms.com"],
    }
  }
}));

// 3. CORS with Explicit Allowlist
app.use(cors({
  origin: env.CORS_ORIGINS.split(',').map(o => o.trim()),
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// 4. Request Body Limiters
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. NoSQL Injection Prevention
app.use(mongoSanitize());

// 6. Morgan Logging (Development Only)
if (env.NODE_ENV === 'development') app.use(morgan('dev'));

// 7. Global Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { success: false, error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests' } }
});
app.use('/api', globalLimiter);

// 8. Auth Limiter
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
  message: { success: false, error: { code: 'AUTH_RATE_LIMIT', message: 'Too many failed login attempts' } }
});
app.use('/api/v1/auth/login', authLimiter);

// 9. Lead Generation & RFQ Limiter
const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, error: { code: 'LEAD_RATE_LIMIT', message: 'Submission limit reached. Please call us directly.' } }
});
app.use('/api/v1/leads', leadLimiter);

// 10. API Route Mounts
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/leads', leadRouter);
app.use('/api/v1/divisions', divisionRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/filters', filterRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/settings', settingRouter);
app.use('/api/v1/media', mediaRouter);

// 11. Health Probes
app.get('/health', (_, res) => res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() }));
app.get('/ready', (_, res) => {
  const isReady = mongoose.connection.readyState === 1;
  res.status(isReady ? 200 : 503).json({ status: isReady ? 'ready' : 'unhealthy' });
});

// 12. Sentry Error Handler
app.use(Sentry.Handlers.errorHandler());

// 13. Central Application Error Handler
app.use(errorHandler);
```

### 6.2 Dual Pagination Strategy: Offset vs Cursor

To balance administrative random access with seamless public browsing, the API explicitly splits pagination strategies:

#### Mode A: Offset-based Pagination (Admin & Management Tables)
Used for Admin Leads, Admin Products, and Admin Projects. Enables random access to specific pages, column sorting, and accurate total counts.

* **Request Query:** `?page=2&limit=20&sortBy=createdAt&sortOrder=desc`
* **Response Envelope:**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "total": 142,
    "page": 2,
    "limit": 20,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": true
  }
}
```

#### Mode B: Cursor-based Pagination (Public Catalogs & "Load More" Feeds)
Used for public Product Grids (`/products`) and Projects Portfolio (`/projects`). Eliminates duplicate or skipped items when items are added while the user is actively browsing.

* **Request Query:** `?cursor=65bad0e1f42a9&limit=12`
* **Response Envelope:**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "nextCursor": "65bad149f42b0",
    "hasMore": true,
    "limit": 12
  }
}
```

### 6.3 Auth Endpoints (`/api/v1/auth`)

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/login` | None | Email + password verification. Returns user data + access token in body, sets 7d refresh token in `HttpOnly; Secure; SameSite=Strict` cookie. |
| `POST` | `/refresh` | Cookie | Reads refresh token cookie, checks bcrypt hash in DB, issues new access token + rotates refresh cookie. |
| `POST` | `/logout` | JWT | Invalidates refresh token hash in DB, clears cookie with `Max-Age=0`. |
| `GET` | `/me` | JWT | Returns current authenticated administrator profile. |

### 6.4 Leads & WhatsApp Endpoints (`/api/v1/leads`)

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/` | None (+ Rate Limit) | Submit RFQ, contact inquiry, or background WhatsApp click beacon. |
| `GET` | `/` | JWT Admin | List leads with offset pagination, status filter, division filter, and date range. |
| `GET` | `/:id` | JWT Admin | Get full lead details including technical specifications and referrer context. |
| `PATCH` | `/:id/status` | JWT Admin | Update lead status (`new` → `contacted` → `quoted` → `converted` → `closed`). |
| `GET` | `/export` | JWT Admin | Stream filtered leads as downloadable CSV file. |

#### Zod Lead Ingestion Schema:
```typescript
export const createLeadSchema = z.object({
  companyName: z.string().min(1).max(200).default('Direct WhatsApp Visitor'),
  contactName: z.string().min(1).max(100).default('WhatsApp Lead'),
  designation: z.string().max(100).optional(),
  email: z.string().email().or(z.literal('')).default('inquiry@placeholder.gmpvision.com'),
  phone: z.string().regex(/^\+?[0-9\s\-]{8,20}$/, 'Valid phone number required'),
  location: z.string().max(200).optional(),
  projectType: z.array(z.string()).default(['General Turnkey Inquiry']),
  message: z.string().min(1).max(3000),
  divisions: z.array(z.string()).optional().default([]),
  roomDimensions: z.string().max(100).optional(),
  cfm: z.number().positive().optional(),
  targetDate: z.string().max(50).optional(),
  source: z.enum(['rfq_form', 'contact_form', 'whatsapp']),
  referrerUrl: z.string().url().optional(),
});
```

### 6.5 Public Read Endpoints

| Method | Path | Pagination | Description |
|---|---|---|---|
| `GET` | `/api/v1/divisions` | None | Returns all 7 active divisions sorted by `number: 1`. Cached. |
| `GET` | `/api/v1/divisions/:slug` | None | Single division by slug with populated products. |
| `GET` | `/api/v1/products` | Cursor or Offset | Browse products by `?divisionId=&category=&featured=true`. |
| `GET` | `/api/v1/products/:slug` | None | Single product detail with full specifications array. |
| `GET` | `/api/v1/filters` | Ordered list | Air filtration products sorted by `category` and `order`. |
| `GET` | `/api/v1/projects` | Cursor or Offset | Completed projects portfolio with `?division=&featured=true`. |
| `GET` | `/api/v1/projects/:id` | None | Single project case study with image gallery. |
| `GET` | `/api/v1/clients` | Ordered list | Client logo wall entries where `isActive: true`. |
| `GET` | `/api/v1/settings` | None | Public configuration dictionary (hero headline, ticker metrics). |

### 6.6 Admin CRUD & Reordering Endpoints

All require `Authorization: Bearer <token>` and role `admin` or `superadmin`.

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/divisions` | Create new division (superadmin only). |
| `PATCH` | `/api/v1/divisions/:id` | Update division content, tagline, or hero image. |
| `POST` | `/api/v1/products` | Create product with specifications table and gallery. |
| `PATCH` | `/api/v1/products/:id` | Update product details. |
| `DELETE` | `/api/v1/products/:id` | Soft delete (`isActive: false`). |
| `PATCH` | `/api/v1/products/reorder` | Bulk update display orders: `[{ id, order }]`. |
| `POST` | `/api/v1/filters` | Create filtration catalog product. |
| `PATCH` | `/api/v1/filters/:id` | Update filtration product. |
| `DELETE` | `/api/v1/filters/:id` | Soft delete filter item. |
| `PATCH` | `/api/v1/filters/reorder` | Bulk reorder filtration items: `[{ id, order }]`. |
| `POST` | `/api/v1/projects` | Create project reference case study. |
| `PATCH` | `/api/v1/projects/:id` | Update project reference. |
| `DELETE` | `/api/v1/projects/:id` | Soft delete project. |
| `PATCH` | `/api/v1/projects/reorder` | Bulk reorder projects: `[{ id, order }]`. |
| `POST` | `/api/v1/clients` | Add client logo to portfolio. |
| `PATCH` | `/api/v1/clients/:id` | Update client details or logo. |
| `DELETE` | `/api/v1/clients/:id` | Soft delete client. |
| `PATCH` | `/api/v1/clients/reorder` | Bulk reorder clients: `[{ id, order }]`. |
| `PATCH` | `/api/v1/settings/:key` | Update site setting value. |
| `POST` | `/api/v1/media/upload` | Upload image/PDF to Cloudinary; returns URL and publicId. |
| `DELETE` | `/api/v1/media/:publicId` | Remove asset from Cloudinary storage. |

---

## 7. Frontend Architecture & SEO

### 7.1 Client Routing Setup (`App.tsx`)

```tsx
<Routes>
  {/* Public Website Routes */}
  <Route path="/" element={<HomePage />} />
  <Route path="/solutions" element={<SolutionsPage />} />
  <Route path="/solutions/:divisionSlug" element={<DivisionDetailPage />} />
  <Route path="/products" element={<ProductsPage />} />
  <Route path="/products/:slug" element={<ProductDetailPage />} />
  <Route path="/filtration-catalog" element={<FiltrationCatalogPage />} />
  <Route path="/validation-services" element={<ValidationPage />} />
  <Route path="/projects" element={<ProjectsPage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/contact" element={<ContactPage />} />
  <Route path="/request-quote" element={<RFQPage />} />

  {/* Admin CMS Routes */}
  <Route path="/admin/login" element={<AdminLoginPage />} />
  <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
    <Route index element={<AdminDashboard />} />
    <Route path="leads" element={<LeadsPage />} />
    <Route path="projects" element={<ProjectsAdminPage />} />
    <Route path="clients" element={<ClientsAdminPage />} />
    <Route path="products" element={<ProductsAdminPage />} />
    <Route path="filtration" element={<FiltrationAdminPage />} />
    <Route path="divisions" element={<DivisionsAdminPage />} />
    <Route path="settings" element={<SettingsAdminPage />} />
    <Route path="admins" element={<AdminUsersPage />} />
  </Route>

  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

### 7.2 In-Memory Auth & Interceptor Flow

Access tokens reside exclusively in JavaScript closure memory (`tokenStore.ts`) — never in `localStorage` or `sessionStorage`.

```typescript
// src/auth/tokenStore.ts
let inMemoryToken: string | null = null;

export const tokenStore = {
  get: () => inMemoryToken,
  set: (token: string) => { inMemoryToken = token; },
  clear: () => { inMemoryToken = null; },
};
```

* `client.ts` attaches `Authorization: Bearer <tokenStore.get()>` to outbound requests.
* When a `401 Unauthorized` response is intercepted:
  1. Queues incoming requests in a retry backlog.
  2. Issues a single refresh request via `refreshClient.ts` to `POST /api/v1/auth/refresh`.
  3. Updates `tokenStore` and flushes queued requests with the new access token.
  4. If refresh fails, redirects to `/admin/login` and clears session state.

### 7.3 Comprehensive B2B SEO & Structured Data

#### A. Head Management (`SEOHead.tsx`)
Utilizes `react-helmet-async` for runtime meta updates:

```tsx
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  type?: 'website' | 'article' | 'product';
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  ogImage = 'https://res.cloudinary.com/gmp-vision/image/upload/v1/brand/og-banner.jpg',
  type = 'website'
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://gmpvision.com';
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const fullTitle = `${title} | GMP VISION Turnkey Cleanroom & MEP`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:site_name" content="GMP VISION" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
```

#### B. JSON-LD Schemas (`JsonLd.tsx`)
Injected on critical public routes for enhanced search engine rich snippets:

1. **Organization / LocalBusiness (Global / Home):**
```json
{
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "name": "GMP VISION",
  "url": "https://gmpvision.com",
  "logo": "https://res.cloudinary.com/gmp-vision/image/upload/v1/brand/logo.png",
  "image": "https://res.cloudinary.com/gmp-vision/image/upload/v1/brand/factory.jpg",
  "description": "Turnkey Engineering, Cleanroom (CRP), HVAC, and Industrial MEP Contractor serving pharma and biotech.",
  "telephone": "+91-9817343117",
  "email": "gmpvision3@gmail.com",
  "taxID": "02CZKPK1192C2ZQ",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Ground Floor, Building No. 01, Amb Daultpur Road, Bhanjal",
      "addressLocality": "Una",
      "addressRegion": "Himachal Pradesh",
      "postalCode": "177213",
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Khasra No. 231, Near MND Hub Biotech, Village Dadhi Harnam",
      "addressLocality": "Nalagarh",
      "addressRegion": "Himachal Pradesh",
      "postalCode": "174101",
      "addressCountry": "IN"
    }
  ],
  "openingHours": "Mo-Sa 09:00-18:00"
}
```

2. **Product Schema (Product & Filtration Pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Mini Pleat Gel Seal HEPA Filter",
  "description": "Ultra-fine micro-glass fiber HEPA filter with silicone fluid seal for Grade A sterile suites.",
  "brand": {
    "@type": "Brand",
    "name": "GMP VISION"
  },
  "manufacturer": "GMP VISION",
  "category": "Air Filtration",
  "image": "https://res.cloudinary.com/gmp-vision/image/upload/v1/filters/gel-seal-hepa.jpg"
}
```

3. **Service Schema (Division Pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "HVAC & Air Handling Systems",
  "provider": {
    "@type": "Organization",
    "name": "GMP VISION"
  },
  "areaServed": "India",
  "description": "Design, supply, and erection of Double Skin AHUs, desiccant dehumidifiers, and cleanroom ducting."
}
```

### 7.4 Component-Level Loading & Error States

#### Skeletons Specification:
1. **`FilterCardSkeleton`**: Rendered in a grid of 6 during filtration catalog queries. Displays shimmering blocks for Category badge, 24px title line, 4-row spec table (Alternating row backgrounds), and action buttons.
2. **`ProjectCardSkeleton`**: Rendered during portfolio browsing. Displays a 16:9 aspect-ratio image placeholder with pulsing gradient, followed by a client name tag, 2-line scope summary, and division badge pills.
3. **`DivisionHeroSkeleton`**: Full-viewport height container with centered placeholder title, subtitle block, and dual CTA button boxes.
4. **`ProductGridSkeleton`**: 3-column responsive card skeleton featuring square image placeholder, product name, and bulleted feature placeholder lines.

#### Error States & Empty States:
* **Empty State**: Rendered when catalog filters yield zero results. Features a custom engineering blueprint illustration, "No products found matching these criteria", and a "Clear Filters" reset button.
* **Network Error Card**: Inline retry component with "Unable to load data. [Retry Request]" that triggers `refetch()` on the active TanStack Query.
* **Inline Form Errors**: All inputs use `aria-invalid="true"` and display red warning messages with `role="alert"`.
* **Root Error Boundary**: `ErrorBoundary.tsx` traps runtime rendering exceptions, reports the stack trace to Sentry, and renders a fallback UI with an emergency call button and home redirect.

### 7.5 RFQ Multi-Step Form State Persistence

To eliminate lead drop-off caused by tab closures or accidental navigation:
* **Storage Medium:** `window.sessionStorage` (scoped to user session, automatically cleared on tab close, immune to cross-user leakage on shared industrial terminals).
* **Storage Key:** `gmp_rfq_draft_v1`
* **Draft Data Shape:**
```typescript
interface IRFQDraft {
  step: number;
  formData: {
    companyName: string;
    contactName: string;
    designation: string;
    email: string;
    phone: string;
    location: string;
    projectType: string[];
    divisions: string[];
    roomDimensions: string;
    cfm: number | null;
    targetDate: string;
    message: string;
  };
  savedAt: number; // Timestamp
}
```
* **Expiration TTL:** 24 hours. If `Date.now() - draft.savedAt > 24 * 60 * 60 * 1000`, the draft is purged.
* **Auto-Save:** Synchronized on every step change and debounced across text fields (500ms).
* **Restoration UX:** When the user returns to `/request-quote`, the draft is auto-populated and a subtle notification banner appears: *"Draft restored from your recent session. [Clear Draft]"*.
* **Purge on Submit:** On receiving an HTTP 201/200 success response from `POST /api/v1/leads`, `sessionStorage.removeItem('gmp_rfq_draft_v1')` is immediately executed.

### 7.6 WhatsApp Lead Attribution & Capture Hook

In Indian industrial procurement, engineers frequently bypass web forms to chat directly via WhatsApp. To capture and attribute these high-intent leads:

1. Whenever a user clicks any WhatsApp CTA (Navbar strip, floating button, footer link, or product detail page button), the application executes a background beacon:

```typescript
// src/lib/whatsapp.ts
export const initiateWhatsAppInquiry = (context: {
  divisionOrProduct?: string;
  sourcePage: string;
}) => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919817343117';
  const defaultText = encodeURIComponent(
    `Hello GMP VISION, I am inquiring about ${context.divisionOrProduct || 'Turnkey Cleanroom & MEP services'} via your website (${context.sourcePage}).`
  );
  
  // 1. Fire non-blocking lead beacon
  const payload = JSON.stringify({
    companyName: 'Direct WhatsApp Visitor',
    contactName: 'WhatsApp Lead',
    phone: '+91-WHATSAPP',
    email: 'whatsapp-inquiry@placeholder.gmpvision.com',
    source: 'whatsapp',
    message: `WhatsApp direct conversation initiated from: ${context.sourcePage}. Context: ${context.divisionOrProduct || 'General'}`,
    projectType: context.divisionOrProduct ? [context.divisionOrProduct] : ['General Turnkey'],
    referrerUrl: window.location.href,
  });

  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1/leads`;
  
  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    navigator.sendBeacon(apiUrl, blob);
  } else {
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => { /* silent fail on beacon */ });
  }

  // 2. Open WhatsApp Web / App
  window.open(`https://wa.me/${whatsappNumber}?text=${defaultText}`, '_blank', 'noopener,noreferrer');
};
```

---

## 8. Feature Specifications

### 8.1 Homepage Layout

1. **Hero Section:**
   * Full-viewport height cleanroom/AHU facility visual background.
   * CMS headline (`hero_headline`): *"All Solutions in One Project: Turnkey Cleanroom, HVAC, Piping & Industrial Utilities"*.
   * Dual CTAs: *"Explore Services"* (`/solutions`) & *"Request Technical Audit"* (`/request-quote`).
2. **Metrics Ticker Bar:** Full-width strip highlighting 15+ Years Industry Experience, 100+ Completed Turnkey Projects, 100% cGMP & ISO 14644-1 Compliance, 24x7 Emergency Site Support.
3. **7 Divisions Grid:** 7 interactive cards featuring large stencil number badges (01–07), lucide icons, title, tagline, and hover reveal of capabilities.
4. **Interactive Air Filtration Catalog Preview:** Filter tabs (Pre-Filter, Fine Filter, Bag Filter, Gel-Seal HEPA) displaying live 4-column spec table and *"View Full Catalog"* CTA.
5. **Regulatory Compliance Badge Bar:** Static, non-scrolling credibility bar: cGMP, WHO-TRS 961, USFDA 21 CFR Part 11, ISO 14644-1, Schedule M, ISHRAE/ASHRAE.
6. **Turnkey Workflow (Concept to Commissioning):** Step-by-step horizontal/vertical roadmap: *Consultation & URS → 3D Layout & Heat Load → In-House Fabrication → Installation & Piping → Testing & Balancing → IQ/OQ/PQ Validation*.
7. **Client Trust Portfolio:** 12+ verified client logos (Zeon Healthcare, Windlas Biotech, Wallace Pharma, BioMarq/Mankind Group) in grayscale, switching to brand color on hover.
8. **Interactive RFQ Estimator (Abbreviated):** Fast 4-field inquiry card for instant quotes.
9. **Footer:** Two operational addresses (Una Office + Nalagarh Plant), phone, email, GSTIN, WhatsApp CTA, Google Maps embed, and Brochure PDF download.

### 8.2 Solutions Pages (Division Detail — `/solutions/:divisionSlug`)

Dynamic route rendering deep engineering details for any of the 7 divisions:
* Division Hero image + title + tagline.
* Rich text narrative detailing engineering scope.
* Associated equipment & components grid from `products` collection where `divisionId` matches.
* Regulatory compliance badges applicable to the division.
* Related completed client projects from `projects` collection.
* Sticky CTA button: *"Enquire for This Division"* pre-populating division in RFQ form.

### 8.3 Air Filtration Catalog (`/filtration-catalog`)

* Category filter tabs: All · Pre-Filter · Fine Filter · Pocket/Bag · Gel-Seal HEPA · Standard HEPA · High-Flow HEPA · Semi-HEPA · Wire Mesh.
* Filter cards displaying micron rating badge (e.g. `H14 (99.997% @ 0.3µ)`), media construction details, aluminum/SS frame options, and application chips.
* *"Download Spec Sheet"* button linking directly to Cloudinary-hosted PDF.
* Cleanroom Air Distribution section: Terminal Housings, SS 304 Grills, Static/Dynamic Pass Boxes, Air Showers, LAF Benches, RLAF Booths.

### 8.4 Validation & Compliance Page (`/validation-services`)

* **BMS & EMS:** Centralized SCADA/PLC architecture, 21 CFR Part 11 electronic records, audit trails, digital signatures.
* **Validation Protocols:** Detailed breakdown of DQ, IQ, OQ, and PQ methodologies.
* **Testing Services Grid:** Air Velocity & ACPH, Differential Pressure Cascading, In-situ DOP/PAO HEPA Filter Integrity, Airborne Particle Counting (ISO Class 5–8), Temperature/RH Mapping, Pure Steam & Compressed Gas Quality Testing.

### 8.5 Projects & Client Portfolio (`/projects`)

* Filter pills: All · Cleanroom Panels · HVAC · Piping · Water Treatment · Electrical/Fire.
* Cursor-based "Load More" project cards displaying client name, scope of work, industrial plant location, completion year, and site photography.
* Click to open detailed case study modal with full equipment schedule and client testimonial.

### 8.6 Interactive RFQ Multi-Step Form (`/request-quote`)

* **Step 1 — Company & Contact:** Company Name, Contact Name, Designation, Phone, Email, Project Location.
* **Step 2 — Project Scope:** Multi-select grid across the 7 divisions.
* **Step 3 — Technical Parameters:** Cleanroom dimensions (L x W x H in meters), Required Airflow (CFM), Target RH% range, Target ISO classification.
* **Step 4 — Bill of Quantities / Message:** Detailed project notes and notification that BOQ drawings can be emailed to `gmpvision3@gmail.com`.
* **Step 5 — Submission & Verification:** Submits data, triggers Nodemailer email alert to leadership, clears `sessionStorage` draft, and renders confirmation card with WhatsApp follow-up link.

### 8.7 Floating Action Buttons (Global)

* **WhatsApp CTA (Bottom-Right):** Triggers `initiateWhatsAppInquiry()` beacon and opens conversation with pre-filled page context.
* **Call Button (Bottom-Left, Mobile Only):** Direct dial `tel:+919817343117`.
* **Request Quote CTA (Navbar):** High-contrast orange button linking directly to `/request-quote`.

---

## 9. Admin CMS Dashboard

### 9.1 Rich Text Editor Specification (Tiptap)

To guarantee clean, secure, and semantic HTML without iframe overhead:
* **Library:** `@tiptap/react` + `@tiptap/starter-kit` + `@tiptap/extension-link` + `@tiptap/extension-underline`
* **Toolbar Controls:** Bold, Italic, Underline, Strike, H2, H3, Bullet List, Ordered List, Blockquote, Link, Clear Formatting.
* **Storage Format:** Clean HTML string stored in MongoDB.
* **Sanitization:** All rendered rich text runs through `DOMPurify.sanitize(html, { ALLOWED_TAGS: ['p', 'b', 'i', 'u', 'strong', 'em', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'blockquote'], ALLOWED_ATTR: ['href', 'target', 'rel'] })`.

### 9.2 Drag-to-Reorder Architecture (`@dnd-kit`)

Used for reordering Projects, Products, Filter items, and Gallery images:
* **Libraries:** `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
* **Implementation Flow:**
  1. User drags item using visual grip handle (`GripVertical` icon).
  2. UI updates optimistically using `arrayMove`.
  3. On drop end (`onDragEnd`), fires a debounced API request: `PATCH /api/v1/:resource/reorder` with payload `items: Array<{ id: string; order: number }>`.
  4. Database executes `bulkWrite` to persist the updated order integers.

### 9.3 Image Gallery Management UI (`GalleryManager.tsx`)

* Direct multi-file dropzone powered by Multer and Cloudinary signed uploads.
* Grid of uploaded thumbnails with:
  * Drag handle for changing display order.
  * "Cover Image" badge indicator (index 0 is always the primary cover).
  * Direct delete button (prompts confirmation, deletes Cloudinary asset, updates Mongoose document).
  * Maximum image upload size: 10MB per image. Formats: JPEG, PNG, WebP.

### 9.4 Page-by-Page CMS Form Field Specifications

#### A. Leads Management Screen (`/admin/leads`)
* **List View:** Table displaying Company, Contact, Phone, Email, Division tags, Status badge, and Received Date.
* **Filters:** Status dropdown, Division filter, Start Date, End Date.
* **Actions:**
  * Quick Status Selector: `new` | `contacted` | `quoted` | `converted` | `closed`.
  * Detail Drawer: Displays full technical parameters (dimensions, CFM, message, referrer URL).
  * Direct WhatsApp Button: Opens chat pre-filled with: *"Hello [ContactName], regarding your inquiry for [Company] with GMP VISION..."*.
  * "Export CSV" Button: Downloads current filtered view as CSV.

#### B. Projects Management Screen (`/admin/projects`)
* **Fields:**
  * `clientName`: Text input (required, max 200 chars).
  * `scope`: Text input (required, max 300 chars).
  * `location`: Text input (required, e.g. "Baddi, HP").
  * `division`: Multi-checkbox selector (the 7 divisions).
  * `completionYear`: Number input (e.g. 2024).
  * `description`: Tiptap rich text editor.
  * `images`: `GalleryManager` component (upload, reorder, delete).
  * `isFeatured`: Switch toggle (display on homepage).
  * `testimonial`: Sub-form with `quote` (textarea), `author` (text), `designation` (text).
  * `order`: Auto-managed by `@dnd-kit` reorder list.

#### C. Divisions Management Screen (`/admin/divisions`)
* **Fields:**
  * `number`: Read-only integer (1 to 7).
  * `title`: Text input (required).
  * `tagline`: Text input (required).
  * `slug`: Read-only / auto-generated from title.
  * `icon`: Icon picker from `lucide-react`.
  * `heroImage`: Single image uploader.
  * `description`: Tiptap rich text editor.
  * `metaTitle`: Text input (max 60 chars).
  * `metaDescription`: Textarea (max 160 chars).

#### D. Products Management Screen (`/admin/products`)
* **Fields:**
  * `divisionId`: Dropdown selector (populates from `divisions`).
  * `category`: Text input with autocomplete suggestions.
  * `subcategory`: Text input (optional).
  * `name`: Text input (required).
  * `slug`: Auto-generated slug with manual override.
  * `description`: Tiptap rich text editor.
  * `specifications`: Dynamic Key-Value table builder with *"Add Specification"* row action.
  * `images`: `GalleryManager` component.
  * `tags`: Chip input (comma-separated tags: e.g. "Pharma", "HEPA", "Grade A").
  * `isFeatured`: Switch toggle.
  * `metaTitle` & `metaDescription`: SEO inputs.

#### E. Filtration Catalog Screen (`/admin/filtration`)
* **Fields:**
  * `category`: Dropdown enum (`pre-filter`, `fine-filter`, `pocket-bag`, `gel-seal-hepa`, `standard-hepa`, `high-flow-hepa`, `semi-hepa`, `wire-mesh`).
  * `name`: Text input (required).
  * `micronRating`: Text input (required, e.g. "H14 (99.997% @ 0.3µ)").
  * `mediaConstruction`: Textarea.
  * `frame`: Text input (e.g. "Extruded Anodized Aluminum / SS 304").
  * `applications`: Chip input.
  * `keyFeature`: Text input (callout badge text, e.g. "Zero Bypass Air Leakage").
  * `images`: Multi-image uploader.
  * `specSheetUrl`: PDF file uploader (Uploads to Cloudinary as raw/PDF, displays download link).

#### F. Clients (Logo Wall) Screen (`/admin/clients`)
* **Fields:**
  * `name`: Client company name.
  * `logoUrl`: Single image uploader (transparent PNG/SVG recommended).
  * `sector`: Dropdown (`Pharmaceutical`, `Biotechnology`, `Healthcare`, `Chemical`, `Advanced Manufacturing`).
  * `website`: URL input (optional).
  * `isFeatured`: Switch toggle.
  * Reorder via `@dnd-kit`.

#### G. Site Settings Screen (`/admin/settings`)
* **Fields:**
  * `hero_headline`: Textarea.
  * `metric_years_exp`: Text input ("15+").
  * `metric_projects_count`: Text input ("100+").
  * `brochure_pdf`: PDF upload button (updates Cloudinary PDF URL).
  * `whatsapp_number`: Phone number input.
  * `admin_notification_email`: Email address for RFQ alerts.

---

## 10. Security Checklist

### 10.1 Backend Hardening
- [ ] Zod environment validation crashes process immediately if any secret or URL is missing or malformed.
- [ ] Helmet configured with strict Content Security Policy allowing only trusted scripts, Cloudinary media, and Google Fonts.
- [ ] CORS enforces strict domain allowlist from `CORS_ORIGINS` — never wildcard with credentials.
- [ ] `express-mongo-sanitize` strips `$` and `.` operators on every request to prevent operator injection.
- [ ] Layered Rate Limiting: Global (100 req/min), Auth (10 attempts/min), RFQ & WhatsApp beacon (10 per 15 min).
- [ ] JWT Access tokens strictly 15-minute lifetime; Refresh tokens 7-day lifetime stored in `HttpOnly; Secure; SameSite=Strict` cookies.
- [ ] Refresh token hashes stored with bcrypt in DB; rotated on every renewal; old tokens immediately revoked.
- [ ] Account Lockout: 5 consecutive failed login attempts locks the admin account for 30 minutes.
- [ ] Timing-safe comparison (`crypto.timingSafeEqual`) used for all sensitive token checks.
- [ ] JSON body parsing capped at `10kb` to protect against Denial of Service memory exhaustion.
- [ ] File uploads strictly restricted by Multer MIME filter (`image/jpeg`, `image/png`, `image/webp`, `application/pdf`) and 10MB size limit.
- [ ] Winston logging configured with automated redaction of passwords, hashes, tokens, and PII.
- [ ] Sentry error handler scrubs `authorization` header, `password`, and `refreshTokenHash` before transmission.

### 10.2 Frontend Hardening
- [ ] Access token stored in-memory in closure only (`tokenStore.ts`) — never in `localStorage` or `sessionStorage`.
- [ ] Single-flight refresh token interceptor queues parallel API requests during token renewal to prevent race conditions.
- [ ] `refreshClient.ts` operates as a isolated Axios instance without interceptors to prevent infinite refresh loops.
- [ ] DOMPurify sanitizes every rich text HTML string before rendering via `dangerouslySetInnerHTML`.
- [ ] React Hook Form + Zod validates all inputs client-side before any network request is emitted.
- [ ] Root `ErrorBoundary.tsx` catches React rendering exceptions and renders fallback recovery UI.
- [ ] `RequireAuth` higher-order component redirects unauthorized visitors to `/admin/login`.
- [ ] `npm audit` executed with zero high or critical CVEs before production build.

---

## 11. Design System & UI Direction

### 11.1 Visual Identity
GMP VISION serves procurement heads, cleanroom engineering consultants, and industrial plant directors. The UI communicates **engineering precision, clinical cleanliness, and industrial scale**.

### 11.2 Palette Tokens

| Token | Hex | Role |
|---|---|---|
| `--color-industrial-orange` | `#E85C1E` | Primary brand accent, CTA buttons, active state tabs |
| `--color-deep-navy` | `#0F1F3D` | Primary typography, header bar, dark footer surface |
| `--color-steel-grey` | `#4A5568` | Secondary body text, specification labels |
| `--color-light-fog` | `#F5F6F8` | Page background, alternating spec table rows |
| `--color-pure-white` | `#FFFFFF` | Card surfaces, modal containers |
| `--color-success-green` | `#1A7F5A` | "Quoted" & "Converted" status badges |
| `--color-alert-amber` | `#D97706` | "New" lead status badge |

*Forbidden AI Colors:* Avoid generic AI-generated purples, neon cyan, or sterile `#000000` pitch black.

### 11.3 Typography Rules
* **Headings (H1–H3):** `DM Sans` (Google Fonts, weights 600/700). Tight letter spacing, clean geometric engineering aesthetic.
* **Body Text:** `Inter` (Google Fonts, weights 400/500). High legibility for dense technical catalogs.
* **Technical Specifications & Monospace:** `JetBrains Mono`. Used for micron ratings, dimensions, CFM calculations, and model numbers.

---

## 12. Page-by-Page Content Architecture

### 12.1 Header & Navigation

* **Top Utility Strip:** Phone (`+91-9817343117`), Email (`gmpvision3@gmail.com`), GSTIN (`02CZKPK1192C2ZQ`), Quick WhatsApp button, and *"Request a Quote"* CTA.
* **Main Navigation Bar:**
  * Solutions ▾ (Mega Menu with 7 Divisions)
  * Products ▾ (AHUs, Filters, Equipment)
  * Validation & Compliance (`/validation-services`)
  * Projects & Clients (`/projects`)
  * About Us (`/about`)
  * Contact (`/contact`)
  * **[Request a Quote]** (Industrial Orange button)

### 12.2 Solutions Mega Menu Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│ TURNKEY CONTRACTING DIVISIONS                                          │
├──────────────────────────┬──────────────────────────┬──────────────────┤
│ 01. Cleanroom Systems    │ 02. HVAC & AHUs          │ 03. Filtration   │
│ 04. Piping & Fabrication │ 05. Water Treatment (RO) │ 06. Electrical   │
│ 07. Automation & BMS     │                          │                  │
└──────────────────────────┴──────────────────────────┴──────────────────┘
```

---

## 13. Deployment

### 13.1 Frontend (Vercel)
* Deploy from GitHub repository `main` branch.
* Build Command: `npm run build`
* Output Directory: `dist`
* Environment Variables configured in Vercel project settings (`VITE_API_BASE_URL`, `VITE_SITE_URL`, `VITE_WHATSAPP_NUMBER`).
* SPA rewrite rule configured in `vercel.json` to route all traffic to `/index.html`.

### 13.2 Backend (Render or Railway)
* Node.js Web Service running Active LTS.
* Build Command: `npm run build`
* Start Command: `npm run start` (executes `node dist/server.js`)
* Health Check Path: `/health`
* All secrets injected via platform dashboard.

### 13.3 MongoDB Atlas
* Production M10+ replica set cluster.
* Network Access: IP allowlist restricted to Render/Railway static outbound IPs and authorized administrator bastion.
* Automated continuous backups with point-in-time recovery.

---

## 14. Master Build Prompts (Sequenced & Gated)

Follow this 9-phase gated implementation order. **Do not proceed to Phase N+1 until Phase N passes all verification gates.**

### Phase 1: Environment, Foundations & Shared Types
```
Prompt:
Initialize the Node.js + Express + TypeScript backend and shared types for GMP VISION.
1. Configure tsconfig.json with strict: true.
2. Implement src/config/env.ts using Zod to validate all environment variables. It must crash the process with clear error messages if any variable is missing.
3. Setup src/config/db.ts to manage Mongoose connections with reconnect handlers.
4. Implement src/config/cloudinary.ts verifying credentials.
5. Create src/types/express.d.ts augmenting Request with user.
Gate to verify before proceeding:
- Run 'npm run build' — must compile with 0 TypeScript errors.
- Run node with missing env vars — verify process crashes with expected validation error.
```

### Phase 2: Authentication, Security Middleware & Rate Limiting
```
Prompt:
Implement the core security layer and authentication module.
1. Implement middleware stack in src/app.ts exactly per PRD Section 6.1: Sentry, Helmet with CSP, CORS, express.json(10kb), express-mongo-sanitize, RateLimiters (global, auth, lead).
2. Implement src/modules/admins/admin.model.ts with Mongoose schema, interfaces, and indexes from PRD Section 5.1.
3. Implement src/utils/jwt.ts for signing and verifying 15m access tokens and 7d refresh tokens.
4. Implement src/modules/auth/ routes, controllers, and services: /login, /refresh, /logout, /me. Store refresh token bcrypt hash in DB; rotate on refresh; set HttpOnly cookie.
5. Implement src/middleware/requireAuth.ts and roleGuard.ts.
Gate to verify before proceeding:
- Execute automated tests or Postman collection verifying:
  a. Login returns access token and sets HttpOnly cookie.
  b. /refresh rotates token.
  c. 5 failed attempts locks account.
```

### Phase 3: Media Subsystem & Cloudinary Integration
```
Prompt:
Build the media upload and asset management service.
1. Setup Multer in src/middleware/upload.ts validating file types (JPEG, PNG, WebP, PDF) and max size (10MB images, 25MB PDFs).
2. Implement src/modules/media/ routes and controllers:
   - POST /api/v1/media/upload (streams to Cloudinary in 'gmp-vision' folder, returns { url, publicId }).
   - DELETE /api/v1/media/:publicId (removes asset from Cloudinary).
Gate to verify before proceeding:
- Upload sample product image and verify Cloudinary returns valid URL with publicId.
- Test rejection of non-allowed MIME types (e.g. .exe or .sh).
```

### Phase 4: Database Models, Mongoose Schemas & CRUD Endpoints
```
Prompt:
Implement all business collections and API endpoints following Section 5 and Section 6.
1. Create models and schemas with exact TypeScript interfaces and indexes:
   - divisions.model.ts
   - products.model.ts
   - filters.model.ts
   - projects.model.ts
   - clients.model.ts
   - settings.model.ts
   - leads.model.ts (supporting rfq_form, contact_form, and whatsapp sources)
2. Implement CRUD routes and controllers for all modules with Zod validation.
3. Implement dual pagination helper supporting offset and cursor pagination.
4. Implement batch reordering endpoint: PATCH /api/v1/:resource/reorder.
5. Create src/scripts/seed.ts populating the 7 divisions, 12 featured projects, filter categories, and superadmin.
Gate to verify before proceeding:
- Execute 'npx ts-node src/scripts/seed.ts' — confirms idempotent population of all default data.
- Query GET /api/v1/divisions and GET /api/v1/products with cursor pagination to confirm envelope shape.
```

### Phase 5: Frontend Scaffolding, Design Tokens & Auth Store
```
Prompt:
Scaffold the React + Vite + TypeScript frontend.
1. Setup Vite with react-router-dom, TanStack Query, Axios, lucide-react.
2. Configure index.css with design tokens from Section 11 (DM Sans, Inter, JetBrains Mono, industrial-orange, deep-navy).
3. Implement src/auth/tokenStore.ts storing access token in-memory only.
4. Implement src/lib/api/client.ts with single-flight refresh interceptor and src/lib/api/refreshClient.ts.
5. Implement AuthProvider.tsx and RequireAuth.tsx.
6. Create App.tsx routing skeleton and ErrorBoundary.tsx.
Gate to verify before proceeding:
- 'npm run dev' starts with 0 console warnings.
- Test login with superadmin credentials; verify tokenStore receives token and protected route renders.
```

### Phase 6: Public Catalog Pages, Skeletons & SEO Suite
```
Prompt:
Build the public customer-facing website pages and SEO capabilities.
1. Implement SEOHead.tsx and JsonLd.tsx using react-helmet-async.
2. Implement skeleton components: FilterCardSkeleton, ProjectCardSkeleton, DivisionHeroSkeleton, ProductGridSkeleton.
3. Build public pages with TanStack Query:
   - HomePage with all 8 sections.
   - SolutionsPage & DivisionDetailPage (/solutions/:slug).
   - FiltrationCatalogPage (/filtration-catalog) with category tabs.
   - ValidationPage (/validation-services).
   - ProjectsPage (/projects) with cursor "Load More" pagination.
   - AboutPage & ContactPage.
4. Add XML sitemap generation script: src/scripts/generate-sitemap.ts.
Gate to verify before proceeding:
- Verify Google Structured Data testing tool validates LocalBusiness and Product JSON-LD without errors.
- Confirm skeleton loaders display while network is throttled in DevTools.
```

### Phase 7: Interactive RFQ Builder, State Persistence & WhatsApp Attribution
```
Prompt:
Implement the lead generation and attribution systems.
1. Implement src/features/rfq/hooks/useRFQPersistence.ts:
   - Syncs form state to window.sessionStorage with key 'gmp_rfq_draft_v1'.
   - Validates 24-hour TTL; notifies user on restoration; clears on submit.
2. Build 5-step RFQ form (/request-quote) with React Hook Form and Zod.
3. Implement src/lib/whatsapp.ts initiateWhatsAppInquiry() helper using navigator.sendBeacon to POST lead context before redirecting to wa.me.
4. Integrate WhatsApp beacon on floating button, header strip, and product detail buttons.
Gate to verify before proceeding:
- Fill Steps 1–3 of RFQ, refresh page — confirm draft state restores automatically.
- Submit RFQ — confirm sessionStorage is cleared and lead appears in DB.
- Click WhatsApp button — verify POST /api/v1/leads with source='whatsapp' is logged in MongoDB.
```

### Phase 8: Admin CMS Dashboard (Tiptap, @dnd-kit, Gallery Manager)
```
Prompt:
Build the full administrative CMS suite.
1. Implement TiptapEditor.tsx using @tiptap/react and DOMPurify with toolbar controls.
2. Implement SortableList.tsx using @dnd-kit/core and @dnd-kit/sortable for drag-to-reorder.
3. Implement GalleryManager.tsx with Cloudinary multi-upload, drag reorder, and delete actions.
4. Implement all CMS screens per Section 9:
   - LeadsPage with status dropdown, filters, and CSV export.
   - ProjectsAdminPage with project form and @dnd-kit reorder.
   - ProductsAdminPage with specification table builder.
   - FiltrationAdminPage with PDF spec sheet uploader.
   - ClientsAdminPage with logo upload.
   - SettingsAdminPage for hero text and metrics.
Gate to verify before proceeding:
- Edit a project narrative using Tiptap, save, and confirm clean HTML renders on public page.
- Drag to reorder projects; refresh page; verify new order persisted via API.
```

### Phase 9: Security Audit, Testing & Production Pre-flight
```
Prompt:
Audit and certify the entire system against Section 10 checklist.
1. Verify Sentry scrubs authorization headers and passwords.
2. Test CSP headers to confirm no script-src violations.
3. Verify account lockout after 5 invalid attempts.
4. Confirm rate limits trigger on excess submissions.
5. Run 'npm audit' on both backend and frontend to verify 0 vulnerabilities.
Gate to verify before proceeding:
- Full Postman test suite executes with 100% pass rate.
- Ready for deployment to Vercel (frontend) and Render/Railway (backend).
```

---

## 15. Appendix A: MCP Configuration

For Antigravity IDE, Cursor, and Claude Code — configure local MongoDB and Postman integrations in `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "MongoDB": {
      "command": "npx",
      "args": [
        "-y",
        "mongodb-mcp-server",
        "--connectionString",
        "mongodb+srv://<username>:<password>@cluster0.mongodb.net/gmp_vision_dev"
      ]
    },
    "Postman": {
      "url": "https://mcp.postman.com/mcp"
    }
  }
}
```

> **Security Rule:** Never commit real database passwords to Git. Use environment placeholders or local config files ignored by `.gitignore`.

---

## 16. Appendix B: API Testing (Postman)

The `backend/postman/collection.json` contains complete integration tests with automatic JWT token capture in the Login test script:

```javascript
// Post-response script for POST /api/v1/auth/login
if (pm.response.code === 200) {
  var jsonData = pm.response.json();
  pm.environment.set("access_token", jsonData.data.accessToken);
}
```

### Test Coverage Suites:
1. **Auth Suite:** Login Success, Invalid Credentials (timing check), Account Lockout, Refresh Token Rotation, Logout.
2. **Leads Suite:** RFQ Public Submit, WhatsApp Beacon Tracking, Admin Status Update, Filtered Query, CSV Export.
3. **Divisions & Products:** 7 Divisions Retrieval, Cursor Pagination on Products, Text Search, Admin Batch Reorder.
4. **Filtration Suite:** Category Filter Query, PDF Spec Sheet Download link.
5. **Projects & Clients:** Featured Queries, Case Study Retrieval, Reorder Verification.
6. **Media Suite:** Upload Validation (Reject executables, Accept WebP/PDF), Cloudinary signed deletion.

---

*PRD Version 2.0 — GMP VISION Corporate & Catalog Master Specification*  
*Standard Compliance: Full-Stack Project Blueprint v2.2 (instructions.md)*
