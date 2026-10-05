# Milestone & Phase Roadmap — GMP VISION

## Active Milestone: v1.0 Production Launch

### Phase 1: File Organization & Workspace Hygiene (COMPLETED)
- [x] Group client reference documents, brochures, and Word catalogs into `docs/catalogs/`
- [x] Relocate raw media & mockups to `docs/reference-media/`
- [x] Standardize PRD and catalog docs in `docs/` with root symlink
- [x] Ensure public assets (`Broucher.pdf`) exist in `frontend/public/`
- [x] Scaffold `backend/` directory structure per PRD Section 3
- [x] Establish `.planning/` persistent context

### Phase 2: Frontend Catalog Polish & Rich UI (IN PROGRESS / ACTIVE)
- [x] Core public pages (Home, Solutions, DivisionDetail, Products, ProductDetail, Filtration, Validation, Projects, About, Contact, RFQ)
- [x] Sliding Navigation Drawer and MegaMenu
- [x] Admin CMS screens with Tiptap Editor & @dnd-kit Sortable Lists
- [ ] Connect TanStack Query hooks to API client with mock/API toggle
- [ ] Final visual regression check and responsive layout audit

### Phase 3: Backend Foundation, MongoDB Schemas, REST API & Postman (PLANNED & READY)
- [ ] Initialize Express + TypeScript server in `backend/`
- [ ] Zod environment validation (`src/config/env.ts`)
- [ ] Security stack (Helmet CSP, CORS, express-mongo-sanitize, rate limiters)
- [ ] Database connection lifecycle with Mongoose (`src/config/db.ts`)
- [ ] Implement Mongoose models (admins, leads, divisions, products, filters, projects, clients, settings)
- [ ] Implement dual pagination (offset & cursor) and batch reordering (`PATCH /:resource/reorder`)
- [ ] Implement Cloudinary upload and media management
- [ ] Database seeder script (`src/scripts/seed.ts`)
- [ ] Comprehensive Postman test collection & environment (`backend/postman/`)

### Phase 4: Authentication, Admin Management & Cloudinary Media (PLANNED)
- [ ] Admin model, JWT access/refresh lifecycle, HttpOnly cookie rotation
- [ ] Route guards (`requireAuth.ts`, `roleGuard.ts`)
- [ ] Admin account provisioning endpoints (`/api/v1/admins`)
- [ ] Cloudinary media upload & deletion endpoints (`/api/v1/media`)

### Phase 5: Business Models, CRUD & Dual Pagination Endpoints (PLANNED)
- [ ] Mongoose schemas for Divisions, Products, Filters, Projects, Clients, Settings, Leads
- [ ] Public read endpoints with cursor-based pagination
- [ ] Admin CRUD endpoints with offset pagination and batch reordering (`PATCH /:resource/reorder`)
- [ ] Leads ingestion with email alerting & WhatsApp beacon tracking

### Phase 6: Full Integration, Seed Data & Production Verification (PLANNED)
- [ ] Seed database with default 7 divisions, filtration items, and sample projects
- [ ] Wire frontend API client (`client.ts`) to backend endpoints
- [ ] Verification, UAT, and production deployment configuration
