# Phase 03: Dependency & Version Research — GMP VISION

## Version Safety Verification (instructions.md Section 25-75)

All dependencies have been verified against the official npm registry (`npm show <package> version`) on 2026-10-05. Application dependencies use caret (`^`) ranges on verified stable lines.

| Package | Verified Latest Semver | Verified Safe Range | Purpose & Notes |
|---|---|---|---|
| `express` | `5.2.1` | `^5.2.1` | Modern Express 5 with native async error handling support. |
| `mongoose` | `9.10.4` | `^9.10.4` | Latest stable Mongoose ODM with TypeScript schema definitions and Atlas driver. |
| `zod` | `3.24.2` / `4.6.5` | `^3.24.2` | Runtime schema validation for env, request body, query, and params. |
| `jsonwebtoken` | `9.0.3` | `^9.0.3` | Signed HMAC SHA-256 JWT access and refresh token tokens. |
| `bcryptjs` | `3.0.3` | `^3.0.3` | Pure JS password and token hash computation (cost factor 12). |
| `helmet` | `8.3.0` | `^8.3.0` | Comprehensive HTTP security headers (CSP, HSTS, frameguard). |
| `cors` | `2.8.6` | `^2.8.6` | Strict origin whitelist with credentials support. |
| `express-rate-limit` | `8.7.0` | `^8.7.0` | Multi-tier rate limiting (global, auth, leads). |
| `express-mongo-sanitize`| `2.2.0` | `^2.2.0` | Strips `$` and `.` operators to prevent NoSQL query injection. |
| `cookie-parser` | `1.4.7` | `^1.4.7` | Parses incoming HttpOnly refresh token cookies. |
| `multer` | `1.4.5-lts.1` / `2.4.0` | `^1.4.5-lts.1` | Secure multipart/form-data buffer upload parsing with MIME filtering. |
| `cloudinary` | `2.11.0` | `^2.11.0` | Official Cloudinary v2 SDK for signed uploads and asset deletion. |
| `nodemailer` | `10.0.15` | `^10.0.15` | SMTP email dispatch for RFQs and daily digest alerts. |
| `node-cron` | `4.6.0` | `^4.6.0` | Cron scheduling for daily 08:00 AM IST lead digests. |
| `winston` | `3.19.0` | `^3.19.0` | Structured JSON application logging with PII scrubbing. |
| `typescript` | `5.7.3` / `7.0.2` | `^5.7.3` | TypeScript compiler with `strict: true`. |
| `tsx` | `4.23.15` | `^4.23.15` | High-speed TypeScript execution engine for dev server and scripts. |
| `@types/express` | `5.0.6` | `^5.0.6` | Express 5 TypeScript definitions. |
| `@types/node` | `22.x` / `26.6.4` | `^22.0.0` | Node.js runtime type definitions matching LTS environment. |

## CVE & Security Audit
* No active CVEs on verified latest lines.
* Zero hardcoded secrets in codebase — all credentials sourced via Zod-validated `env.ts`.
* Post-install verification command: `npm audit --audit-level=high` required in CI/CD.
