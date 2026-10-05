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

### Phase 3: Backend Foundation, MongoDB Schemas, REST API & Postman (COMPLETED)
- [x] Initialize Express + TypeScript server in `backend/`
- [x] Zod environment validation (`src/config/env.ts`)
- [x] Security stack (Helmet CSP, CORS, express-mongo-sanitize, rate limiters)
- [x] Database connection lifecycle with Mongoose (`src/config/db.ts`)
- [x] Implement Mongoose models (admins, leads, divisions, products, filters, projects, clients, settings)
- [x] Implement dual pagination (offset & cursor) and batch reordering (`PATCH /:resource/reorder`)
- [x] Implement Cloudinary upload and media management
- [x] Database seeder script (`src/scripts/seed.ts`)
- [x] Comprehensive Postman test collection & environment (`backend/postman/`)
- [x] Implement full module controller suite: Auth (JWT rotation + lockout), Admins, Divisions, Products, Filters, Projects, Clients, Settings, Leads (CSV export + email notifications), Media
- [x] Cron service (daily 08:00 AM IST lead digest) and Nodemailer transporter
- [x] Health and readiness probes (`/health`, `/ready`)

### Phase 4: Frontend API Integration & Admin Panel Wire-up (NEXT)
- [ ] Implement `frontend/src/lib/api/client.ts` with Axios, `withCredentials: true`, and queued single-flight refresh
- [ ] Connect `AdminLoginPage.tsx` to `POST /api/v1/auth/login` and Auth context
- [ ] Connect Admin CMS tables & forms (Products, Filters, Projects, Clients, Settings, Leads) to backend endpoints
- [ ] Wire `@dnd-kit` drag-and-drop sortable list reordering to `PATCH /api/v1/:resource/reorder`
- [ ] Wire `GalleryManager.tsx` media uploader to `POST /api/v1/media/upload`
- [ ] Connect public division, product, filter, project, and lead inquiry forms to API endpoints with mock fallback option

### Phase 5: Production Verification, Full Seed & Deployment (PLANNED)
- [ ] Seed database with default 7 divisions, filtration items, and sample projects
- [ ] Run end-to-end UAT and Postman collection against local/staging server
- [ ] Verification, UAT, and production deployment configuration
