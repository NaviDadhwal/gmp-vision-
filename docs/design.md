# GMP VISION Frontend Design Specification (`design.md`)
**Theme Paradigm:** 21st.dev High-Contrast Dark & Engineering Bento System  
**Stack:** React 19 + TypeScript + Tailwind CSS v4.0 + shadcn/ui + Vite 8 + Motion  

---

## 1. Executive Summary & Design Philosophy

This document defines the complete architectural and visual design system for recreating the **GMP VISION** web application. 

By synthesizing the high-contrast, distraction-free aesthetic of **21st.dev / Linear / Vercel** with the technical precision required for pharmaceutical cleanrooms and HVAC/MEP engineering, the new frontend creates an authoritative, state-of-the-art digital experience.

### Core Visual Principles
1. **Obsidian Foundation (`#050505` & `#0A0A0A`):**
   - Ground layouts with deep black surfaces rather than washed-out grays.
   - Ultra-subtle border delineations (`border-white/[0.08]` to `border-white/[0.15]`).
   - Cleanroom plenum grid backdrops with microscopic opacity (`3%`).

2. **Surgical Accent Lighting:**
   - **Vibrant Cleanroom Green (`#3DAE2B`):** Denotes ISO validation, certified status, positive differential pressure (+30 Pa), and compliance.
   - **Deep Royal Corporate Blue (`#0A3B85` / `#38BDF8`):** Denotes airflow velocity, HVAC cooling coils, and laminar air streams.
   - **High-Contrast Typography (`#FFFFFF` & `#A3A3A3`):** Tight letter tracking (`tracking-tighter`), balanced text wraps (`text-balance`), and monospaced telemetry headers (`JetBrains Mono`).

3. **Tangible Physicality (Motion & Spring Physics):**
   - macOS-inspired magnification floating docks with spring dynamics (`stiffness: 150, damping: 12`).
   - Interactive Bento elements that simulate real-world cleanroom monitoring terminals and command palettes.

---

## 2. Codebase Prerequisites & Setup Guide

### 2.1 Project Stack Validation
The codebase has been verified and configured for:
- [x] **shadcn/ui Structure:** Standardized `components/ui` folder, `@/lib/utils` with `cn()` utility, and `components.json`.
- [x] **Tailwind CSS v4.0:** Installed via `@tailwindcss/vite` and `tailwindcss@^4.3.3`, imported directly via `@import "tailwindcss";` in `src/index.css`.
- [x] **TypeScript 6.0:** Strict typing with path aliases configured in `tsconfig.app.json` and `vite.config.ts`.
- [x] **Icon Libraries:** `lucide-react` and `@tabler/icons-react`.
- [x] **Physics Engine:** `motion` (`motion/react`) and `framer-motion`.

### 2.2 Default Component Paths & Why `/components/ui` Matters
- **Default Components Path:** `src/components/ui/` (aliased as `@/components/ui/*`).
- **Default Utilities Path:** `src/lib/` (aliased as `@/lib/*`).
- **Default Styles Path:** `src/index.css`.

#### Why the `/components/ui` Directory is Essential:
1. **Clear Separation of Primitives vs Feature Blocks:**
   - `/components/ui/` contains reusable, unstyled or atomic UI building blocks (e.g., `button.tsx`, `floating-dock.tsx`, `modal.tsx`, `badge.tsx`).
   - `/features/` and `/pages/` contain domain-specific business logic (e.g., `LeadsKanban.tsx`, `RFQForm.tsx`, `FiltrationCatalog.tsx`).
2. **Official shadcn CLI Compatibility:**
   - The shadcn CLI (`npx shadcn@latest add <component>`) targets `components/ui` by convention. Having this structure enables adding standard primitives (`dialog`, `dropdown-menu`, `tabs`, `sheet`, `tooltip`) with zero configuration friction.
3. **Preventing Circular Dependencies:**
   - Keeping base primitives leaf-level ensures that high-level page components can freely import UI elements without circular import hazards.

### 2.3 Setup Instructions for New/Existing Projects

If replicating this setup from scratch:

```bash
# 1. Install Tailwind CSS v4 and Vite Plugin
npm install -D @tailwindcss/vite tailwindcss

# 2. Install UI Utilities and Icons
npm install clsx tailwind-merge lucide-react @tabler/icons-react motion

# 3. Create shadcn configuration (components.json)
cat << 'EOF' > components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib"
  },
  "iconLibrary": "lucide"
}
EOF
```

#### Vite Configuration (`vite.config.ts`)
```ts
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
```

#### TypeScript Path Aliases (`tsconfig.app.json`)
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### Class Merging Utility (`src/lib/utils.ts`)
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 3. Analysis & Integration of 21st.dev Components

### 3.1 Component 1: `modern-landing-hero.tsx`

#### Architectural Anatomy
- **Pill Badge:** Linear-inspired micro-announcement banner with border glowing and hover translation.
- **Typography Lockup:** `text-balance`, `tracking-tighter`, high-contrast dual-line heading (`text-white` + `text-neutral-600`).
- **Call-To-Action Pair:** Inverted solid white button with scale micro-interaction (`active:scale-[0.98]`) alongside an outline secondary button.
- **Bento Terminal Preview:** High-contrast macOS/Linux terminal header with dots, Command Palette search bar (`Cmd + K`), and animated pulse deployment status.

#### Component Location:
- Implemented in: `frontend/src/components/ui/modern-landing-hero.tsx`
- Demo in: `frontend/src/components/ui/demo.tsx` & `frontend/src/components/modern-landing-hero-demo.tsx`

---

### 3.2 Component 2: `floating-dock.tsx`

#### Architectural Anatomy
- **Desktop Navbar:** macOS-style magnification dock positioned at the bottom of the viewport.
- **Physics Engine:** Uses `useMotionValue(Infinity)`, `useTransform`, and `useSpring` to dynamically adjust icon container width from `40px` to `80px` based on mouse distance (`[-150, 0, 150]`).
- **Mobile Navbar:** Expandable FAB (Floating Action Button) with animated vertical menu via `AnimatePresence`.

#### Component Location:
- Implemented in: `frontend/src/components/ui/floating-dock.tsx`
- Demo in: `frontend/src/components/floating-dock-demo.tsx` & `frontend/src/components/ui/floating-dock-demo.tsx`

---

## 4. Implementation Guidelines & Q&A

### Q1: What data/props will be passed to this component?
- **For `ModernLandingHero`:**
  - `title`, `highlightedSubtitle`, `badgeText`, `description`, `primaryCta`, `secondaryCta`.
  - In the GMP VISION version (`GMPModernHero`), it integrates real-time cleanroom sensor telemetry:
    - Differential pressure (`+32.4 Pa`), ISO particle counts (`1,420 / m³ @ 0.5µm`), HEPA H14 integrity (`99.997%`), and ACH rate (`52 ACH`).
- **For `FloatingDock`:**
  - An array of `items: { title: string; icon: React.ReactNode; href: string }[]`.
  - Optional `desktopClassName?: string` and `mobileClassName?: string`.

### Q2: Are there any specific state management requirements?
- **Command Palette:** Local search input state (`commandQuery`) for filtering divisions and equipment specs.
- **Interactive Tabs:** State (`terminal` vs `specs`) to toggle between live cleanroom telemetry and HVAC mechanical specifications.
- **Dock Mobile State:** Boolean `open` state controlling the animated mobile radial menu.
- **Global Navigation:** Smooth client-side routing via React Router `Link` or URL anchors.

### Q3: Are there any required assets (images, icons, etc.)?
- **Icons:** `lucide-react` (`Search`, `Command`, `ArrowRight`, `ChevronRight`, `ShieldCheck`, `Activity`, `Wind`, `Layers`, `PhoneCall`) and `@tabler/icons-react` (`IconHome`, `IconBuildingFactory2`, `IconWind`, `IconFilter`, `IconFileCertificate`, `IconFileDollar`, `IconBrandWhatsapp`).
- **Stock Imagery:** Curated high-resolution Unsplash cleanroom stock photos:
  - Cleanroom modular laboratory: `https://images.unsplash.com/photo-1581093458791-9f3c3900df4b`
  - Pharmaceutical production facility: `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b`
  - Sterile biotechnology environment: `https://images.unsplash.com/photo-1532187863486-abf9dbad1b69`
  - Advanced industrial MEP installation: `https://images.unsplash.com/photo-1581092160607-ee22621dd758`

### Q4: What is the expected responsive behavior?
- **Mobile (< 768px):**
  - Hero typography scales from `text-4xl` up to `text-7xl` on desktop.
  - CTA buttons become full-width stack (`w-full` -> `sm:w-auto`).
  - Terminal view switches from 2-column grid to single-column card layout.
  - Floating dock collapses into a bottom-right hamburger FAB with spring expansion.
- **Desktop (>= 768px):**
  - Full horizontal bento terminal preview.
  - Fixed bottom-centered magnification dock with smooth hover scale effects.

### Q5: What is the best place to use this component in the app?
1. **Public Homepage (`HomePage.tsx`):**
   - Place `GMPModernHero` at the top of the homepage as the primary hero experience.
   - Ground the bottom of the public layout (`PublicLayout.tsx`) with `GMPFloatingDock` for instant access to RFQ, Divisions, and WhatsApp.
2. **Catalog & Solutions Pages:**
   - Use the command palette search pattern for filtering 20+ HVAC AHU models and HEPA filter dimensions.

---

## 5. Master Roadmap to Recreate the Entire Frontend

### Phase 1: Foundation & Design Tokens
- [x] Configure Tailwind CSS v4, path aliases (`@/*`), and shadcn utility (`cn`).
- [x] Create base components in `components/ui/` (`modern-landing-hero`, `floating-dock`).
- [x] Create GMP VISION adapted components (`gmp-modern-hero`, `gmp-floating-dock`).

### Phase 2: Public Experience Re-Architecture
1. **New Homepage:**
   - Replace traditional carousel with `GMPModernHero`.
   - **7 Turnkey Divisions Bento Grid:** Modern dark cards with glassmorphism and subtle green/blue ambient glows:
     1. Modular Cleanroom Partitioning & Walkable Ceilings
     2. HVAC & Air Handling Units (Double Skin AHUs, EC Fans)
     3. Advanced Air Filtration (Pre, Fine, HEPA H14, ULPA U15)
     4. Cleanroom Doors, Windows & Vision Panels
     5. Laminar Airflow & Containment Equipment (LAF, Biosafety Cabinets, Dispensing Booths)
     6. Cleanroom Accessories & Pass Boxes (Dynamic & Static)
     7. Automation, BMS & Validation (DQ/IQ/OQ/PQ)
2. **Interactive Cleanroom Calculators:**
   - **CFM & ACH Estimator:** Calculate room volume, target ISO class (ISO 5 to 8), and determine required CFM and number of H14 filters.
   - **ISO 14644-1 vs EU GMP Annex 1 Matrix:** Interactive visual table mapping class limits for 0.5µm and 5.0µm particles.
3. **Interactive Filtration Catalog (`/solutions/air-filtration`):**
   - High-contrast filter comparison with micron filtration sliders and DOP smoke test visualizer.
4. **Persistent Navigation Dock:**
   - Include `GMPFloatingDock` in `PublicLayout.tsx` across all public pages.

### Phase 3: Admin CMS & Leads Experience
- Recreate Admin Dashboard with dark Linear-style Kanban board for RFQ Leads (`New`, `In Review`, `Quoted`, `Closed`).
- High-contrast metric cards with sparkline trends and export-to-CSV actions.

---

## 6. Verification & Build Confirmation

- **TypeScript Compilation:** `tsc -b` passed with 0 errors.
- **Vite Bundler:** Built in < 800ms with production assets generated.
- **Backward Compatibility:** All existing vanilla CSS variables in `index.css` preserved while Tailwind v4 utility engine is fully operational.
