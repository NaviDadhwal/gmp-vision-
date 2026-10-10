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

### Phase 4: Google Stitch Frontend Rebuild & REST API Integration (ACTIVE)
- [ ] Initialize `frontend/` with Vite + React 19 + TypeScript + Tailwind CSS
- [ ] Configure `GMP Cleanroom HUD` design tokens (palette `#051522`, `#10B981`, `#38BDF8`, `#1F56A8`)
- [ ] Bundle Stitch architectural photography (`hvac-ahu-plant.jpg`, `aseptic-filling-suite.jpg`, etc.)
- [ ] Implement `CleanroomHeader.tsx`, `CleanroomFooter.tsx`, and `TelemetryBadge.tsx`
- [ ] Implement Home Page (`/`) from Stitch Screen `cba18b4c2c9b4a519f41284fa03ac7c2`
- [ ] Implement Turnkey Divisions Index & Detail (`/divisions`, `/divisions/:slug`) from Stitch Screen `ba8aa97b45d84467a22a177695d735e7`
- [ ] Implement Products & Filtration Catalog (`/products`, `/filters`) from Stitch Screens `dd91869db7d54ff5903c0527aa4da04e` / `f2715e940e0441beb9d3adad1bc376b2`
- [ ] Implement Projects Portfolio & Case Studies (`/projects`) from Stitch Screen `bdd8483518a04d4c9bc3528f4fbbac35`
- [ ] Implement Contact & RFQ Estimator (`/rfq`, `/contact`) from Stitch Screen `0a3c71e1274b4a579ac4a9a837607623`
- [ ] Build matching About Us (`/about`) and 404 Quarantine (`*`) pages
- [ ] Implement Admin Gateway (`/admin/login`) from Stitch Screen `f09c70808162421786bf5f1619ec10b1`
- [ ] Wire all 48 backend endpoints with automated token refresh in `frontend/src/lib/api/client.ts`

### Phase 5: Production Verification, Full Seed & Deployment (PLANNED)
- [ ] Seed database with default 7 divisions, filtration items, and sample projects
- [ ] Run end-to-end UAT and Postman collection against local/staging server
- [ ] Verification, UAT, and production deployment configuration
