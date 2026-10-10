# Project State — GMP VISION

## Current Context
* **Current Phase:** Phase 4 (Google Stitch Frontend Rebuild & Full REST API Integration)
* **Completed Phase:** Phase 3 (Backend Foundation, MongoDB Schemas, REST Endpoints & Postman Test Suite)
* **Status:** Phase 4 Convergence Plan established in .planning/phases/04-stitch-frontend/PLAN.md
* **Backend Verification:** `npm run build` in `backend/` passes with 0 TypeScript errors.
* **Workspace Hygiene:** Clean structure across `backend/` and `docs/`. Secrets strictly excluded.

## Architectural Decisions Recorded
* `ADR-001`: Client reference catalogs and brochures moved to `docs/catalogs/`.
* `ADR-002`: Brochure PDF placed in `frontend/public/Broucher.pdf` to satisfy all direct download links on public pages.
* `ADR-003`: Master PRD placed in `docs/GMP_VISION_PRD.md` with relative symlink at workspace root.
* `ADR-004`: Backend scaffolded as modular directory per Section 3 of PRD.
* `ADR-005`: Express 5 + Mongoose 9 + Zod stack strictly typed with timing-safe crypto comparison, dual pagination, RFC 7807 error envelopes, and single-flight JWT refresh.
* `ADR-006`: Complete Postman suite with pre-request JWT refresh logic created at `backend/postman/`.
* `ADR-007`: Adopt Google Stitch design project `8216385452603579885` (`GMP Cleanroom HUD` palette `#051522`, `#10B981`, `#38BDF8`, `#1F56A8`) as the authoritative visual blueprint.
* `ADR-008`: Bundle high-resolution industrial photography generated in Stitch directly into client assets.
