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
# Frontend development
cd frontend
npm install
npm run dev

# Backend API development
cd ../backend
npm install
npm run dev
```

### Automated Testing

Run the full end-to-end API test suite against MongoDB:

```bash
cd backend
npm test
```

### Production Build & Deployment

```bash
# Frontend build
cd frontend
npm run build

# Backend build
cd ../backend
npm run build
```

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for full step-by-step instructions on deploying the frontend and backend to **Vercel**, **Render**, and **Railway**.

---

## 📖 Master Documentation

- 📘 **[REST API & System Architecture Handbook](docs/API_DOCUMENTATION.md)**: Exhaustive reference of all 48 backend endpoints, status codes, RFC 7807 error dictionary, curl test commands, and frontend integration blueprints.
- 🚀 **[Production Deployment Guide](docs/DEPLOYMENT.md)**: Cloud deployment to Vercel, Render, Railway, and MongoDB Atlas.
- 📋 **[Product Requirements Document (PRD v2.0)](docs/GMP_VISION_PRD.md)**: Complete business specifications and technical compliance standards.
- 🏗️ **[Services & Engineering Catalog](docs/WEBSITE_SERVICES_AND_CATALOG.md)**: Cleanroom divisions, HVAC equipment, and filtration specs.

---

## 🛠️ Tech Stack & Current Status

- **Backend**: [Node.js 20+](https://nodejs.org/) + [Express 5](https://expressjs.com/) + [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose 8.x](https://mongoosejs.com/)
- **Security**: Helmet, strict CORS, express-mongo-sanitize, Zod schema validation, Argon2/Bcrypt password hashing
- **Media & File Storage**: Cloudinary CDN with binary magic-number signature verification
- **Status**: Backend REST API is 100% operational with 48 endpoints. Frontend is staged for a fresh build using **Google Stitch**.

---

## 📦 Getting Started

### Prerequisites
- Node.js (`v20.x` or later recommended)
- npm (`v10.x` or later)
- MongoDB instance or Atlas connection string

### Running Backend Locally

```bash
# 1. Install root & backend dependencies
npm install

# 2. Configure environment
cp backend/.env.example backend/.env

# 3. Seed database (creates default superadmin, 7 divisions, products, filters, projects)
npm run seed --prefix backend

# 4. Start live reload dev server on port 5000
npm run dev:backend
```

### Automated Testing

Run the full end-to-end API test suite:

```bash
npm run test --prefix backend
```

### Monorepo Structure

```
gmp-vision/
├── backend/                   # Node.js + Express 5 + TypeScript REST API
│   ├── src/                   # Modular architecture (auth, admins, divisions, products, filters, projects, clients, settings, leads, media)
│   ├── src/scripts/           # Database seeder, endpoint test suite, and Postman generator
│   └── package.json           # Backend scripts and dependencies
├── docs/                      # Architectural & API Documentation
│   ├── API_DOCUMENTATION.md   # ⭐ Complete API Handbook (48 endpoints, status codes, curl examples)
│   ├── DEPLOYMENT.md          # Production deployment guide
│   ├── GMP_VISION_PRD.md      # Master PRD v2.0
│   └── WEBSITE_SERVICES_AND_CATALOG.md # Services catalog
├── postman/                   # Postman collection & environment specifications
├── GEMINI.md                  # Autonomous agent rules & Git push enforcement
└── package.json               # Root monorepo orchestration scripts
```

---

## 📄 License
Private & Confidential — GMP VISION.
