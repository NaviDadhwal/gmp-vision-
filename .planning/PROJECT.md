# Project Context — GMP VISION

## Overview
**GMP VISION** is a single-source Turnkey Engineering, Modular Cleanroom (CRP), HVAC, and Industrial MEP Contractor catering to pharmaceutical, biotechnology, healthcare, and chemical sectors across India.
* **Tagline:** *"All Solutions in One Project"*
* **Key Locations:** Head Office (Una, HP) · Assembly & Fabrication Plant (Nalagarh, HP)
* **Master Specification:** [GMP_VISION_PRD.md](file:///home/hackunseen/Downloads/gmp%20vision/docs/GMP_VISION_PRD.md)
* **Services Architecture:** [WEBSITE_SERVICES_AND_CATALOG.md](file:///home/hackunseen/Downloads/gmp%20vision/docs/WEBSITE_SERVICES_AND_CATALOG.md)

## Tech Stack
* **Frontend:** React 19 + TypeScript + Vite + Tailwind/Modern CSS + TanStack Query + React Router + Lucide Icons + Tiptap Editor + @dnd-kit
* **Backend:** Node.js + Express + TypeScript + Zod validation + Mongoose (planned per PRD Section 6)
* **Database:** MongoDB Atlas (collections: `admins`, `leads`, `divisions`, `products`, `filters`, `projects`, `clients`, `settings`)
* **Storage & Media:** Cloudinary (secure media uploads & brochure PDFs)
* **Authentication:** JWT (15-min access token in-memory, 7-day refresh token in HttpOnly cookie)

## Core Architecture Principles
1. **7 Core Divisions:** Modular Cleanroom, HVAC & Air Handling, Air Filtration, Piping & Fabrication, Water Treatment, Electrical/Fire Protection, BMS/EMS & Validation.
2. **Dual Pagination Strategy:** Offset-based for Admin CMS tables; Cursor-based for public "Load More" catalog feeds.
3. **No Standalone Services Route:** Services map directly into `/divisions` and `/products`.
4. **Offline / Resilient Design:** Client-side fallback data with persistence for RFQs and local drafting.
