# GMP VISION

Turnkey Cleanroom & HVAC/MEP Engineering Systems.

GMP VISION is an enterprise web application designed for turnkey pharmaceutical cleanroom contracting, filtration solutions, HVAC/AHU engineering, and validation services.

---

## 🚀 Key Features

- **Solutions & Services Showcase**: Modular cleanroom panels, HVAC/AHU systems, terminal filtration, and validation documentation (DQ/IQ/OQ/PQ).
- **Interactive Multi-Step RFQ Estimator**: Dynamic form allowing prospective clients to specify room dimensions, class, CFM requirements, and project scope.
- **Admin Control Panel**:
  - Leads management (filtering, status pipeline, search, and CSV export)
  - Project portfolio manager
  - Client logos & trust showcase
  - Interactive Rich-Text Editor (TipTap) for content updates
- **WhatsApp Direct Connect**: Automated lead pre-formatting for instant WhatsApp consultations.
- **Modern Cleanroom Theme**: High-performance UI built with React 19, TypeScript, Tailwind/modern styling, and Framer Motion.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: TypeScript
- **Styling & Icons**: Vanilla CSS / Tailwind tokens + [Lucide React](https://lucide.dev/)
- **State & Routing**: React Router v7
- **Animations**: Framer Motion
- **Linting & Tooling**: Oxlint

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm / pnpm / yarn

### Installation & Development

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
cd frontend
npm run build
```

---

## 📁 Repository Structure & Use Cases

```
gmp-vision/
├── frontend/                  # React 19 + TypeScript + Vite Single-Page Application
│   ├── public/                # Static assets (logo, icons, Broucher.pdf)
│   └── src/                   # Pages, features (RFQ, admin, filtration), components, data
├── backend/                   # Node.js + Express + TypeScript API Server (Scaffolded)
│   ├── src/                   # Modular architecture (auth, leads, divisions, products, etc.)
│   └── postman/               # API collection & environment specifications
├── docs/                      # Project Specifications & Reference Materials
│   ├── GMP_VISION_PRD.md      # Master Product Requirements Document (PRD v2.0)
│   ├── WEBSITE_SERVICES_AND_CATALOG.md # Master Services Catalog & Scope
│   ├── catalogs/              # Client brochures, specs, and Word documents
│   └── reference-media/       # Brand cards, design mockups, and client site photos
└── .planning/                 # GSD tracking, roadmap, and project state
```

---

## 📄 License
Private & Confidential — GMP VISION.
