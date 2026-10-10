---
phase: 04
title: Google Stitch Frontend Rebuild & Full REST API Integration
status: planned
depends_on: [03-backend]
target_date: 2026-10-12
stitch_project_id: "8216385452603579885"
stitch_project_title: "GMP Vision Backend Analysis"
design_system: "GMP Cleanroom HUD"
standards_reference:
  - docs/API_DOCUMENTATION.md (Master 48-Endpoint Handbook)
  - docs/GMP_VISION_PRD.md (Master Specification v2.0)
  - docs/WEBSITE_SERVICES_AND_CATALOG.md (Engineering Scope)
files_to_scaffold:
  - frontend/package.json
  - frontend/vite.config.ts
  - frontend/tsconfig.json
  - frontend/tailwind.config.js
  - frontend/index.html
  - frontend/src/index.css
  - frontend/src/main.tsx
  - frontend/src/App.tsx
  - frontend/src/lib/api/client.ts
  - frontend/src/lib/api/*
  - frontend/src/types/api.ts
  - frontend/src/components/layout/*
  - frontend/src/components/hud/*
  - frontend/src/pages/*
  - frontend/src/features/*
---

# Phase 04 Plan: Google Stitch Frontend Integration & Comprehensive HUD Theme Alignment

> **Cross-AI Review Convergence Status:** CONVERGED (0 HIGH issues, all edge cases mitigated)  
> **Source Design Canvas:** Google Stitch Project `projects/8216385452603579885` (`GMP Vision Backend Analysis`) & `docs/STITCH_INSTRUCTIONS.md`  
> **Brand Theme:** Daylight Pharmaceutical Cleanroom (`#FFFFFF` clinical white, `#1F56A8` corporate blue, `#79B82E` leaf green, `#16233F` deep navy, `#F4F7FC` soft light blue, Inter + Public Sans typography).

---

## 1. Design System Architecture & Theme Extraction

Derived from the official GMP VISION logo, Stitch screens, and `docs/STITCH_INSTRUCTIONS.md`:

```
┌────────────────────────────────────────────────────────────────────────┐
│               GMP VISION DAYLIGHT CLEANROOM BRAND PALETTE              │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ Role              │ Hex Code          │ Functional Purpose             │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ Base Background   │ #FFFFFF           │ Pure clinical sterile white    │
│ Soft Section Alt  │ #F4F7FC           │ Alternating soft cleanroom tint│
│ Mint Tint         │ #F3F9EE           │ Eco/GMP compliance highlight   │
│ Primary Brand     │ #1F56A8           │ Corporate logo blue (primary)  │
│ Deep Brand Navy   │ #16233F / #1B2B4B │ Headings, high-contrast text   │
│ Secondary Green   │ #79B82E           │ Fresh GMP green (badges, CTAs) │
│ Muted Typography  │ #5B6B82           │ Secondary metadata, specs      │
│ Technical Border  │ #E4E9F1           │ Crisp 1px modular grid borders │
│ WhatsApp Hotline  │ #25D366           │ Technical consultation action  │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

### Typography Hierarchy
- **Headlines & Display:** `Public Sans`, `Space Grotesk`
- **Body & Specifications:** `Inter`, `Geist`
- **Technical Telemetry & Code:** `ui-monospace`, `SFMono-Regular`, `Menlo`, `monospace`
- **Compliance Badges:** Bold uppercase tracking (`0.06em` letter-spacing, e.g., `● ISO 14644-1 CLASS 5`, `cGMP VALIDATED`)

---

## 2. Screen Mapping: Stitch Designs to Application Routes

| Route | Page Name | Stitch Source Screen ID & Title | Data Integration (`docs/API_DOCUMENTATION.md`) |
|---|---|---|---|
| `/` | **Home / Showcase** | `cba18b4c2c9b4a519f41284fa03ac7c2` *(Interactive Animated Showcase)* | `GET /settings`, `GET /divisions`, `GET /products?featured=true`, `GET /clients` |
| `/divisions` | **Turnkey Divisions** | `ba8aa97b45d84467a22a177695d735e7` *(Interactive Turnkey Divisions Index)* | `GET /divisions` |
| `/divisions/:slug` | **Division Detail** | *Themed complement matching Divisions Index* | `GET /divisions/:slug` (Includes associated equipment) |
| `/products` | **Products Catalog** | `dd91869db7d54ff5903c0527aa4da04e` *(Product Detail & Air Filtration)* | `GET /products` (Cursor/offset pagination + category search) |
| `/products/:slug` | **Product Detail** | `dd91869db7d54ff5903c0527aa4da04e` *(Detail specifications section)* | `GET /products/:slug` (Full specs + brochure download) |
| `/filters` | **Air Filtration** | `f2715e940e0441beb9d3adad1bc376b2` *(Complete Air Filtration Catalog)* | `GET /filters?category=...` |
| `/projects` | **Projects / Portfolio**| `bdd8483518a04d4c9bc3528f4fbbac35` *(Projects: Editorial Visual Grid)* | `GET /projects` (Division filters, case studies) |
| `/projects/:id` | **Case Study Modal** | `bdd8483518a04d4c9bc3528f4fbbac35` *(Case study detail drawer/modal)* | `GET /projects/:id` |
| `/contact` & `/rfq`| **RFQ & Contact Portal**| `0a3c71e1274b4a579ac4a9a837607623` *(Contact & Turnkey Cleanroom RFQ)*| `POST /leads` (Multi-step room dimensions & CFM estimator) |
| `/about` | **About & Compliance** | *Themed complement with ISO 14644 / cGMP audit badges* | `GET /settings` |
| `/admin/login` | **Admin Gateway** | `f09c70808162421786bf5f1619ec10b1` *(Admin Console Gateway)* | `POST /api/v1/auth/login` |
| `/admin/*` | **Admin Portal** | *Themed cleanroom telemetry tables & forms* | `GET/POST/PATCH/DELETE` for all 8 resource modules |
| `*` | **404 Cleanroom Breach**| *Themed sterile quarantine boundary page* | Client-side route fallback |

---

## 3. High-Resolution Stitch Asset Integration

The following verified architectural photography generated in Stitch will be bundled directly into `frontend/src/assets/`:

1. **`hvac-ahu-plant.jpg`** (Stitch Screen `3dfdf3ea1fde4f3eacc5d870e16b37a4`): Double-skin AHU and precision galvanized ducting in technical corridor.
2. **`aseptic-filling-suite.jpg`** (Stitch Screen `35140808a60a46a1a0a98ab227abf0a3`): Sterile liquid filling machinery with technicians in sterile cleanroom bunny suits.
3. **`modular-cleanroom-interior.jpg`** (Stitch Screen `38bb3ff6420a40249f982f28dc09c6e2`): Flush PUF wall panels, viewing windows, and dynamic SS pass box.
4. **`cleanroom-validation-testing.jpg`** (Stitch Screen `16fbc7d529bb4bc58ef84c20cb195c02`): Particle counter probe and smoke study airflow qualification.
5. **`terminal-hepa-module.jpg`** (Stitch Screen `ade4aaa5ef0e4da2be0c87b6046af666`): Terminal gel-seal HEPA filter module with anodized aluminum frame.
6. **`logo.png`**: Restored from `docs/reference-media/ChatGPT Image Aug 4, 2026, 06_14_28 PM.png` (1254x1254 exact binary match).
7. **`Broucher.pdf`**: Restored from `docs/catalogs/Broucher.pdf` (25 MB official engineering brochure).

---

## 4. Cross-AI Review Convergence Analysis & Mitigations

During pre-execution review against the 48-endpoint handbook and PRD specifications, the following architectural challenges were audited and resolved:

### Review Finding 1: Silent JWT Token Rotation Race Conditions
- **Risk:** If a dashboard renders multiple components making concurrent requests when the 15-minute access token expires, multiple calls could hit `POST /auth/refresh` simultaneously, invalidating the refresh cookie.
- **Mitigation:** Implement single-flight queuing in `client.ts` with an `isRefreshing` lock and a callback queue that buffers concurrent calls until the refreshed token is received.

### Review Finding 2: CSV Export Formula Injection & Stream Handling
- **Risk:** Standard Axios JSON parsers break when receiving raw `text/csv` streams from `GET /api/v1/leads/export`.
- **Mitigation:** Create dedicated download helper requesting `responseType: 'blob'`, creating a temporary object URL, and initiating anchor download with proper timestamped filename.

### Review Finding 3: Zod Validation Parity in Leads / RFQ Form
- **Risk:** Discrepancy between client-side validation and backend schema (`createLeadSchema`) causes unhandled 400 errors.
- **Mitigation:** Mirror backend validation on the client with clear field-level error messages matching `error.fields`.

### Review Finding 4: Offline / Development Resilience
- **Risk:** If MongoDB is temporarily unreachable during frontend UI work, blank screens would disrupt development.
- **Mitigation:** Implement React Query fallback mock state for public views, clearly indicating "Demo / Cached Mode" when backend is offline.

---

## 5. Execution Waves & Implementation Plan

### Wave 1: Foundation, Build Stack & Design Tokens
- [ ] Initialize `frontend/` with Vite (`react-ts` template), Tailwind CSS, PostCSS, Lucide React, and React Router v7.
- [ ] Configure `tailwind.config.js` with exact `GMP Cleanroom HUD` color tokens, fonts (Space Grotesk + Geist), and border styles.
- [ ] Copy company assets: `logo.png`, `Broucher.pdf`, and the 5 Stitch cleanroom photos to `frontend/public/`.
- [ ] Configure `frontend/src/lib/api/client.ts` with Axios interceptors and single-flight token refresh.
- [ ] Update root `package.json` to enable monorepo `dev` and `build` commands.

### Wave 2: Shared Cleanroom HUD Components & Layout
- [ ] Build `CleanroomHeader.tsx` (Logo, navigation links, live ISO status badge, WhatsApp hotline button).
- [ ] Build `CleanroomFooter.tsx` (Turnkey divisions list, company address, phone, email, ISO compliance badges).
- [ ] Build `TelemetryBadge.tsx` (`● ISO Class 5`, `ΔP: +45 Pa`, `cGMP Validated`).
- [ ] Build `WhatsAppFloatingAction.tsx` (Pre-formatted technical inquiry launcher).
- [ ] Build `CleanroomEstimatorModal.tsx` (Quick RFQ calculator popup).

### Wave 3: Public Core Pages (Direct Stitch Integration)
- [ ] **Home Page (`/`)**: Implement hero telemetry banner, 7 divisions grid, product highlights, project showcase, and partner trust wall.
- [ ] **Divisions Index & Detail (`/divisions`, `/divisions/:slug`)**: Implement interactive division selector with equipment list.
- [ ] **Products & Filtration Catalog (`/products`, `/filters`)**: Implement dual-tab equipment & air filter directory with search and filter.
- [ ] **Projects Portfolio (`/projects`)**: Implement editorial case study grid with modal inspector.
- [ ] **RFQ & Contact Portal (`/rfq`, `/contact`)**: Implement multi-step cleanroom estimator (L x W x H dimensions, CFM calculator, division checkboxes).
- [ ] **About & Compliance (`/about`)**: Build GMP credentials, certifications, and manufacturing infrastructure page with matching theme.
- [ ] **404 Quarantine Page (`*`)**: Build sterile boundary breach page.

### Wave 4: Administrative Portal & CMS Wire-Up
- [ ] **Admin Login (`/admin/login`)**: Wire form to `POST /api/v1/auth/login`.
- [ ] **Admin Dashboard (`/admin/dashboard`)**: Metric overview cards (Total Leads, Active Products, Projects).
- [ ] **Leads Management (`/admin/leads`)**: Data table with status pipeline filters, CSV download, and status update dialog.
- [ ] **Catalog & Project Managers**: Form dialogs with Cloudinary image upload via `POST /api/v1/media/upload`.

### Wave 5: Quality Gate & Verification
- [ ] Run `npm run build` in `frontend/` to confirm 0 TypeScript / bundling errors.
- [ ] Verify responsive behavior on Mobile (375px), Tablet (768px), and Desktop (1440px).
- [ ] Stage, commit, and push changes to GitHub `origin main`.
