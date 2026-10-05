# Project State — GMP VISION

## Current Context
* **Current Phase:** Phase 4 (Frontend API Integration & Admin Panel Wire-up)
* **Completed Phase:** Phase 3 (Backend Foundation, MongoDB Schemas, REST Endpoints & Postman Test Suite)
* **Status:** Phase 3 Complete, Clean TypeScript Compiles, Postman Suite Generated
* **Frontend Verification:** `npm run build` in `frontend/` passes with 0 TypeScript/bundler errors.
* **Backend Verification:** `npm run build` in `backend/` passes with 0 TypeScript errors.
* **Workspace Hygiene:** Clean structure across `backend/` and `frontend/`. Secrets strictly excluded.

## Architectural Decisions Recorded
* `ADR-001`: Client reference catalogs and brochures moved to `docs/catalogs/`.
* `ADR-002`: Brochure PDF placed in `frontend/public/Broucher.pdf` to satisfy all direct download links on public pages.
* `ADR-003`: Master PRD placed in `docs/GMP_VISION_PRD.md` with relative symlink at workspace root.
* `ADR-004`: Backend scaffolded as modular directory per Section 3 of PRD.
* `ADR-005`: Express 5 + Mongoose 9 + Zod stack strictly typed with timing-safe crypto comparison, dual pagination, RFC 7807 error envelopes, and single-flight JWT refresh.
* `ADR-006`: Complete 32-endpoint Postman suite with pre-request JWT refresh logic created at `backend/postman/`.
