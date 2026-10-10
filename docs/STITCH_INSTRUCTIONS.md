# GMP VISION — Frontend Build Instructions for Google Stitch
> **Purpose:** Generate a fully responsive, animated, production-grade marketing + catalog website for GMP VISION, a turnkey cleanroom engineering company (modular cleanrooms, HVAC/AHU, air filtration, MEP contracting for pharma).
> **Brand Identity (MANDATORY):** Light, white-first theme using the official GMP VISION logo colors — corporate blue + fresh green + deep navy on white. The logo is attached; every color, gradient, and accent in this document derives from it.
> **Backend:** REST API v1.0.0 — Base URL: `http://localhost:5000/api/v1` (dev) / `https://<domain>/api/v1` (prod). All public data comes from this API (see Section 13 — API Wiring Reference).
> **Deliverable:** A multi-page, responsive, animated frontend. Prioritize: cinematic hero animations, buttery scroll-triggered reveals, a clean clinical blue/green aesthetic, and pixel-perfect mobile layouts.

---

## 1. Global Design System (Apply to Every Page)

### 1.1 Brand Personality
- **Feel:** Precision engineering × sterile cleanroom technology × premium industrial trust.
- **Mood:** Bright, clinical, confident, pharmaceutical-grade cleanliness. Think "a spotless ISO-5 cleanroom in daylight" — white surfaces, glass, blue accents, green vitality touches. NOT a dark cyberpunk theme.
- **Motion philosophy:** Every section enters with intent. Nothing pops in abruptly; everything glides, fades, or sweeps — like laminar airflow: smooth, directional, controlled.

### 1.2 Color Tokens (extracted from the GMP VISION logo)
| Token | Hex | Usage |
|---|---|---|
| `bg-primary` | `#FFFFFF` | Main page background — the default everywhere |
| `bg-soft` | `#F4F7FC` | Alternating light-blue section backgrounds |
| `bg-mint` | `#F3F9EE` | Light-green tint for success/ eco / certification sections |
| `bg-card` | `#FFFFFF` | Cards (on soft sections) with soft shadow |
| `border-subtle` | `#E2E8F2` | Card borders, dividers, inputs |
| `brand-blue` | `#1F56A8` | **Primary brand color** — logo blue. Headline accents, primary buttons, links, active states |
| `brand-blue-deep` | `#16386E` | Gradient deep end, icon backgrounds, footer |
| `brand-navy` | `#1B2B4B` | Headings, primary text |
| `brand-green` | `#79B82E` | **Secondary brand color** — logo green. Highlights, badges, success, CTA hovers, chart accents |
| `brand-green-deep` | `#4E8A1C` | Green gradient end, hover darken |
| `text-primary` | `#22314F` | Body text |
| `text-secondary` | `#5A6B87` | Captions, metadata |
| `text-muted` | `#8A97AD` | Footer, legal, timestamps |
| `status-amber` | `#F59E0B` | Warnings, featured badges |
| `status-red` | `#DC2626` | Validation errors |

**Gradient signatures (max 2 per page — blue→green echoing the logo sweep):**
- Primary CTA: `linear-gradient(90deg, #1F56A8 0%, #3E7CC9 60%, #79B82E 130%)` — button hover slides the gradient position (`background-position` animation).
- Hero/section glow: `radial-gradient(closest-side, #1F56A814, transparent)`.
- Green accent bar: `linear-gradient(90deg, #79B82E, #1F56A8)`.

### 1.3 Typography
- **Display / Headings:** `Space Grotesk` (500, 600, 700) — geometric, engineering feel.
- **Body / UI:** `Inter` (400, 500, 600).
- **Mono accents (specs, metrics, labels):** `JetBrains Mono` (400, 500) — numbers like "99.997% HEPA", "1,500,000 sqft", kickers like `// LABEL`.
- **Scale (desktop):** H1 `clamp(2.5rem, 6vw, 5rem)` · H2 `clamp(2rem, 4vw, 3.25rem)` · H3 `1.4rem` · Body `1.0625rem` · Caption `0.875rem`.
- Letter-spacing: headings `-0.02em`; mono labels `+0.08em`, uppercase, small, colored `brand-blue`.

### 1.4 Spacing & Layout
- Max content width: `1280px`, horizontal padding `clamp(1rem, 5vw, 3rem)`.
- Section vertical rhythm: `clamp(5rem, 10vw, 8.5rem)`. Alternate white / `bg-soft` sections.
- Card radius: `16px`; buttons/pills: `999px`; images: `12–16px`.
- Shadows: cards use `0 2px 12px #1B2B4B0A, 0 8px 32px #1B2B4B08` — soft, never heavy.
- Grid: 12-col desktop → 8-col tablet → 4-col mobile.

### 1.5 Logo Usage
- **Navbar:** Logo image (use the provided file) at height `40px` desktop / `32px` mobile, inside a white pill with subtle border. Keep clear space = logo height ÷ 2.
- **Footer:** Larger logo version (up to 160px wide) on the deep navy footer — provide/use a white-text variant if available, otherwise place the original logo inside a white rounded card.
- **Favicon:** The "G" sweep mark cropped square.
- **Page loader:** Logo with a blue→green scanning-line animation on white.

### 1.6 Iconography & Imagery
- Icons: **Lucide** outline style, 1.5px stroke, `brand-blue` by default, `brand-green` for success/validations.
- Product/division imagery: cleanroom panels, AHUs, HEPA filters, pharma labs, bright industrial corridors with natural/white light. Images must be treated with a subtle white bottom overlay `linear-gradient(180deg, transparent 50%, #FFFFFF 100%)` when text sits on them, so text stays legible on the light theme.
- Never use generic stock-photo smiles/handshakes. Use technical, architectural, sterile imagery.

---

## 2. Global Animation System

Use **Framer Motion** (React) or equivalent. All animation patterns below are mandatory.

### 2.1 Core Motion Primitives
| Name | Spec | Where used |
|---|---|---|
| `fadeUp` | `opacity 0→1, y 24→0, duration 0.7s, ease [0.22, 1, 0.36, 1]` | Default reveal for cards, headings, text blocks |
| `fadeIn` | `opacity 0→1, duration 0.9s` | Images, backgrounds |
| `staggerContainer` | Children stagger `0.08s`, `delayChildren 0.1s` | Grids, nav links, stat counters |
| `scaleIn` | `scale 0.92→1, opacity 0→1, duration 0.6s` | Modals, featured cards |
| `slideFromLeft/Right` | `x ±40→0, opacity, duration 0.8s` | Split hero sections, alternating layouts |
| `countUp` | Number tween `0→value, duration 1.8s, ease out`, mono font | Metrics (projects, sqft, years) |

### 2.2 Scroll-Triggered Behavior
- Every below-fold section animates **only when it enters the viewport** (`whileInView`, `viewport: { once: true, margin: "-80px" }`).
- Never animate the same element twice on a single page visit.

### 2.3 Hero Entrance Sequence (every page)
Staged, 4-step timeline on page load (total ~1.6s):
1. `t=0.0s` — Background image scales from `1.08 → 1.0` over `1.4s` (slow Ken Burns zoom-out).
2. `t=0.2s` — Kicker label (mono, `brand-blue`) fades up.
3. `t=0.4s` — H1 headline: line-mask reveal — each line slides up from behind an `overflow: hidden` mask, staggered `0.06s` per line.
4. `t=0.7s` — Subtext + CTA buttons fade up; a gradient blue→green underline draws itself under the H1 (`scaleX 0→1, origin left`).

### 2.4 Micro-interactions (mandatory)
- **Buttons (primary, gradient blue→green):** hover → gradient position slides, `y: -2px`, `box-shadow 0 10px 30px #1F56A833`, `transition 0.25s`. Active → `scale 0.97`.
- **Buttons (secondary/outline):** white bg, `1.5px brand-blue border`, blue text → hover: bg `#F4F7FC` + border `brand-green` + green text.
- **Cards:** hover → `translateY(-6px)`, shadow deepens, border color → `brand-blue` at 30% opacity, inner image scales `1.03`, duration `0.35s`.
- **Nav links:** hover → gradient blue→green underline draws from left (`scaleX 0→1`).
- **Magnetic effect (desktop only):** primary CTAs subtly track cursor within a 20px radius.
- **Scroll progress bar:** 2px gradient bar (`brand-green → brand-blue`) fixed at top of viewport, driven by scroll position.
- **Cursor glow (desktop only):** a soft 300px radial blob (`#1F56A8` at 6% opacity) follows the cursor with `mix-blend-multiply`. Disabled on touch devices.
- **WhatsApp float button:** green (#25D366) circle, gentle pulse glow.

### 2.5 Performance Rules
- All scroll animations GPU-accelerated (`transform`/`opacity` only).
- Respect `prefers-reduced-motion`: disable Ken Burns, cursor glow, magnetic, stagger — render final states instantly.
- Lazy-load all below-fold images with a blurred 20px placeholder (`loading="lazy"`).

---

## 3. Responsive Breakpoints (Mandatory Behavior)

| Breakpoint | Width | Key rules |
|---|---|---|
| Mobile | `< 640px` | Single column; hamburger → full-screen white overlay nav with staggered link reveal; hero H1 min 2.4rem; CTAs full-width; touch targets ≥ 44px; disable cursor glow & magnetic |
| Tablet | `640–1024px` | 2-col grids; sticky nav condenses |
| Desktop | `> 1024px` | Full multi-col layouts; hover states active; mega-menu in nav |

**Mobile nav overlay spec:** full-screen `rgba(255,255,255,0.97)` with `backdrop-blur`, links stack vertically with `fadeUp` stagger `0.07s`, logo top-left, close (X) top-right, large gradient "Get a Quote" CTA pinned to bottom. Body scroll locked while open.

---

## 4. Shared Components (Build Once, Reuse Everywhere)

1. **Navbar** — Fixed; transparent over hero → past 40px scroll becomes `rgba(255,255,255,0.85)` + `backdrop-blur-xl` + `border-bottom: 1px solid border-subtle` + soft shadow. Left: **GMP VISION logo image** (Section 1.5). Center (desktop): Home, Divisions (dropdown mega-menu listing all 7 divisions from `GET /divisions`), Products, Filtration, Projects, Contact. Right: phone number in mono blue + "Get a Quote" gradient pill. Active route: gradient underline.
2. **Footer** — Deep navy `#16386E` background, white text: 4 columns — logo in white card + tagline + socials (LinkedIn, YouTube, WhatsApp icon-buttons with white/10 rings); Quick Links; Divisions list (API-driven); Contact block (phone, email, address from `GET /settings`). Bottom bar: `© 2026 GMP VISION · All Rights Reserved` + "ISO 9001 · cGMP Compliant" mono badges in white/20 outline pills.
3. **WhatsApp Floating Button** — Fixed bottom-right, `#25D366` circle, WhatsApp icon, gentle pulse glow, `z-50`. Links to `https://wa.me/<whatsapp_hotline from settings>` (strip +91 → country code). On click also fire `POST /leads`: `source: "whatsapp"`, `companyName: "Direct WhatsApp Visitor"`, `contactName: "WhatsApp Lead"`, `message: "User clicked WhatsApp hotline from <page>"`.
4. **SectionHeading** — Reusable: mono blue kicker (`// LABEL`), H2 with line-mask reveal, optional right-aligned description. A 48px gradient blue→green tick/rule above the kicker.
5. **StatCounter** — Animated count-up (mono font, `brand-blue` number, green `+` suffix) + label below. Values from `/settings`.
6. **ProductCard / FilterCard / ProjectCard / ClientCard** — Consistent card system per Section 2.4 hover specs.
7. **PageLoader** — White screen, GMP VISION logo center with a blue→green scanning-line sweep, fades/slides away after ~1s (or when data ready). First navigation per session only.
8. **Breadcrumbs** — All detail pages: mono font, `Home / <Parent> / <Current>`, current in `brand-green`.
9. **CTABand** — Reusable closing section on every page: `bg-soft` panel with gradient border card, H2 "Ready to engineer your cleanroom?", gradient "Get a Free Consultation" button → `/contact`.

---

## 5. Page 1 — Home (`/`)

**Goal:** Bright, cinematic first impression. Convert visitors via RFQ form and WhatsApp.

### Sections (in order):
1. **Hero (full viewport, white/bright):** Background: bright cleanroom/AHU imagery or slow-motion video loop, Ken Burns zoom-out, with a very subtle animated field of drifting blue+green dots (canvas, 40 particles max, 12% opacity) and a soft radial blue glow top-right + green glow bottom-left (echoing logo). Line-mask reveal headline: **"Engineering Sterile Futures"** (H1, two lines, `brand-navy`). Subtext (`text-secondary`): "Turnkey modular cleanroom systems, HVAC/AHU design, and air filtration cascades — engineered to cGMP & ISO 14644 standards." Two CTAs: [Get a Free Quote →] (gradient primary) and [Explore Divisions] (outline). Bottom: thin animated scroll-indicator. 
2. **Trust Metrics Bar** (`GET /settings`) on `bg-soft`: 4 count-up stats in a row with hairline dividers: Years of Experience (`experience_years`), Projects Completed (`projects_completed`), Clients Served (`clients_served`), SqFt Installed (`cleanroom_sqft_installed`, formatted "1.5M+"). `fadeUp` stagger. Green `+` suffixes.
3. **Divisions Grid** (`GET /divisions`): SectionHeading "// WHAT WE ENGINEER" + H2 "Seven Turnkey Divisions". 7 cards in a bento grid (first card spans 2 cols on desktop). Each card: division Lucide `icon` in a blue-tinted rounded square, mono blue `number` (01–07), `title`, `tagline`, hover → `heroImage` fades in at low opacity behind + blue border. Click → `/divisions/<slug>`.
4. **Featured Products Rail** (`GET /products?featured=true&limit=6`): Horizontal scroll-snap carousel (desktop) / stacked (mobile). SectionHeading "// SIGNATURE EQUIPMENT". Card: image, `category` mono green badge, `name`, first 2 `specifications` as mono key/value rows. "View Full Catalog →" link (blue) to `/products`.
5. **Featured Projects** (`GET /projects?featured=true&limit=3`): 3 large cards, alternating `slideFromLeft/Right`. Client name, scope, location, year. If `testimonial` exists → italic quote with green left rule. CTA → `/projects`.
6. **Filtration Strip** (`GET /filters`, pick 4 categories): Compact horizontal band, 4 mini-cards (Pre-Filters → HEPA), micron rating in mono blue ("0.3µm @ 99.997%"). Hover lift. CTA → `/filters`.
7. **Clients Trust Wall** (`GET /clients`): "Trusted by Industry Leaders" on `bg-soft` — grayscale logo marquee (infinite CSS scroll, pause on hover, `mask-image` fade at edges). Featured first; hover → full color.
8. **Lead Capture / RFQ Form:** Split — left: H2 "Request a Techno-Commercial Proposal" + checklist bullets (green check icons): Free consultation · ISO 14644 compliant design · Pan-India execution + phone/WhatsApp from `/settings`; right: white card form → `POST /leads`, `source: "rfq_form"`. Fields: Company Name, Contact Name, Phone* (required), Email, Division(s) (multi-select chips from `/divisions` titles), Message*. Submit → spinner → success state (animated green check draw, "Inquiry received..."). Map API `error.fields` to per-field red underlines/messages; show friendly message on 429.
9. **CTABand + Footer.**

---

## 6. Page 2 — Divisions Index (`/divisions`)

1. **Hero (50vh, white):** Line-mask H1 "Turnkey Engineering Divisions", mono kicker "// 07 INTEGRATED VERTICALS", tagline about single-accountability EPC delivery.
2. **Sticky Category Nav (desktop):** Pill tabs of division titles; scroll-spy highlights active pill (blue pill, white text); click smooth-scrolls.
3. **Alternating Feature Rows (×7, API-driven):** Image side + content side, alternating L/R on desktop, stacked on mobile. Content: big mono blue number ("01"), `title`, `tagline`, `description` (render HTML), Lucide `icon`, equipment count (nested `products` length) as a green mono chip, CTA "View Division →". Entrance: `slideFromLeft/Right` matching alternation.
4. **CTABand + Footer.**

---

## 7. Page 3 — Division Detail (`/divisions/[slug]`)

**Data:** `GET /divisions/:slug` → `{ division, products[] }`.

1. **Hero:** Full-width bright `heroImage` with white gradient overlay bottom 60%; mono breadcrumbs; huge mono division `number` watermark ("03" at 8% opacity blue, right side); `title` line-mask; `tagline` (`text-secondary`).
2. **Overview:** Two-col — left: `description` (HTML), right: sticky panel (icon, compliance pills: "cGMP", "ISO 14644", "Schedule M" in `bg-mint` with green text and green check icon).
3. **Division Equipment Grid (`products[]`):** SectionHeading "// EQUIPMENT & SYSTEMS". Card per product: image, `category` badge, `name`, first 3 `specifications`. Empty state: "Equipment catalog being updated" panel with icon.
4. **Related Projects strip:** `GET /projects?division=<title>` — 2–3 mini case cards.
5. **CTABand + Footer.**

---

## 8. Page 4 — Products Catalog (`/products`)

**Data:** `GET /products` (cursor pagination), filters: `divisionId`, `category`, `search`.

1. **Hero (40vh, white):** H1 "Cleanroom Equipment Catalog", kicker "// CGMP COMPLIANT SYSTEMS".
2. **Filter Bar** (sticky under nav on desktop, collapsible sheet on mobile): Division dropdown (from `/divisions`), category chips, debounced search input (300ms → `search` param). Active filters = removable blue pills with green `×`.
3. **Product Grid:** Cursor/infinite scroll, 3→2→1 cols. Card: image carousel if multiple `images`, `category` mono badge, `name`, 2 spec rows, "View Details →". Skeleton shimmer loaders (`#EDF2F9 → #E2E8F2`) while fetching (`nextCursor` in `meta`). Load-more button desktop / auto-load mobile.
4. **Empty state:** icon + "No equipment matches these filters."
5. **CTABand + Footer.**

---

## 9. Page 5 — Product Detail (`/products/[slug]`)

**Data:** `GET /products/:slug`.

1. **Hero:** Breadcrumbs; `category` mono badge (green); H1 `name` line-mask; division chip linking back to division.
2. **Gallery + Specs split:** Left: large image + thumbnail strip (click to swap, crossfade). Right: spec table — `specifications[]` as mono key/value rows with hairline dividers; `tags[]` as blue outline pills.
3. **Description block:** `description` full-width HTML in readable measure.
4. **CTA:** Desktop — sticky side "Request Quote for this Equipment" gradient button; Mobile — sticky bottom bar. Pre-fills `/contact` message with product name + division.
5. **Related Products:** same-division, 3 cards.
6. **Footer.**

---

## 10. Page 6 — Filtration Catalog (`/filters`)

**Data:** `GET /filters?category=<slug>`.

1. **Hero (40vh):** H1 "Air Filtration Cascade", kicker "// ISO 16890 · EN 1822 RATED MEDIA", background: bright macro shot of pleated HEPA media with white overlay.
2. **Category Tabs:** All · Pre-Filters · Fine Filters · Pocket/Bag · Gel-Seal HEPA · Standard HEPA · High-Flow HEPA · Semi-HEPA · Wire Mesh. Animated sliding underline (`layoutId`), active tab blue.
3. **Filter Cards Grid:** Card: image, `category` badge, `name`, `micronRating` (mono, blue — hero stat), `mediaConstruction`, `frame`, expandable "Applications" list, `keyFeature` in `bg-mint` callout with green check. `fadeUp` stagger + layout animation (FLIP) on tab switch.
4. **Filtration Explainer Strip:** 4-step horizontal diagram (Pre → Fine → HEPA → Terminal) with connecting gradient line that draws itself on scroll; nodes pulse once in view.
5. **CTABand + Footer.**

---

## 11. Page 7 — Projects / Portfolio (`/projects`)

**Data:** `GET /projects` (cursor pagination), filters: `division`, `featured`.

1. **Hero (45vh):** H1 "Executed Turnkey Projects", kicker "// PAN-INDIA DELIVERY RECORD".
2. **Filter Chips:** by division title + "Featured" toggle (active = blue pill).
3. **Case Study Feed:** Editorial alternating cards (image 60% / text 40%). `clientName`, `scope` (H3), mono meta row (`location` · `completionYear`), division tags, 1-line `description`, "Read Case Study →". `slideFromLeft/Right` alternation on scroll.
4. **Testimonial Marquee (if data):** infinite horizontal scroll of project `testimonial` quotes — large quotation glyph in green, italic.
5. **Infinite scroll** via `nextCursor`; skeletons.
6. **CTABand + Footer.**

---

## 12. Page 8 — Project Detail (`/projects/[id]`)

**Data:** `GET /projects/:id`.

1. **Hero:** Full-bleed image with white gradient bottom; mono meta bar: `clientName` · `location` · `completionYear`.
2. **Scope Section:** H2 `scope`; `description` (HTML) max-width column; `division[]` pills.
3. **Gallery:** 2–3 col masonry, lightbox (click → full-screen, arrows, ESC, `scaleIn`).
4. **Testimonial (if present):** Centered quote block, big green quotation glyph, `author` + `designation`, gradient top rule.
5. **CTA:** "Start a Similar Project" → `/contact`.
6. **Footer.**

---

## 13. Page 9 — Contact / RFQ (`/contact`)

1. **Hero (35vh):** H1 "Let's Engineer Your Facility", kicker "// RESPONSE WITHIN 24 HOURS".
2. **Split Layout:**
   - **Left (sticky info panel):** rows with Lucide icons in blue-tinted squares — phone (`contact_phone`, tel: link), email (`contact_email`, mailto:), address (`company_address`), green WhatsApp button, mono hours block "Mon–Sat · 09:00–18:30 IST". `fadeUp` stagger.
   - **Right:** White card form → `POST /leads`, `source: "contact_form"` (or `"rfq_form"` if divisions/dimensions filled). Fields: Company Name, Contact Name*, Designation, Email, Phone* (required, 8–25 digits), Location, Divisions (multi-select chips from `/divisions`), Room Dimensions (placeholder "e.g. 40ft × 60ft × 10ft"), CFM (number), Message* (textarea). Per-field errors from `error.fields` (red underline + message). Submit → spinner → success card (animated green check draw + summary). 429 → show API's friendly rate-limit message.
3. **Map Placeholder:** stylized light map panel with blue pin + soft green radius circle.
4. **Footer.**

---

## 14. Page 10 — Admin Login (`/admin/login`) *(minimal — gateway only)*

> Build last; keep minimal. Full admin dashboard = separate pass.

1. Centered white card on light background (soft blue gradient + subtle particle dots).
2. Logo, "Admin Console" mono kicker, email + password fields, gradient "Sign In" → `POST /auth/login`.
3. Success: store `accessToken` in memory (never localStorage); refresh cookie is HTTP-only. Redirect `/admin`.
4. Errors: `INVALID_CREDENTIALS` → shake animation + red inline message; `AUTH_RATE_LIMIT` → amber warning box.
5. "← Back to Site" link.

---

## 15. API Wiring Reference (Quick Map)

| Page | Endpoint(s) |
|---|---|
| Global (nav/footer/WhatsApp) | `GET /settings`, `GET /divisions` |
| Home | `/settings` (stats), `/divisions`, `/products?featured=true&limit=6`, `/projects?featured=true&limit=3`, `/filters`, `/clients`, `POST /leads` |
| Divisions index | `GET /divisions` |
| Division detail | `GET /divisions/:slug` (+ `/projects?division=`) |
| Products | `GET /products` (+ `divisionId`, `category`, `search`, `cursor`) |
| Product detail | `GET /products/:slug` |
| Filters | `GET /filters?category=` |
| Projects | `GET /projects` (+ `division`, `featured`, `cursor`) |
| Project detail | `GET /projects/:id` |
| Contact | `POST /leads`, `GET /settings` |
| Admin login | `POST /auth/login`, `POST /auth/refresh` |

**Client conventions:** Responses `{ success, data, meta? }`; errors `error.code` + `error.fields`. Attach `Authorization: Bearer <accessToken>` on admin routes only. On `401 TOKEN_EXPIRED` → call `/auth/refresh` once, retry (queue concurrent requests). Cache `/settings`, `/divisions`, `/filters`, `/clients` for 5 min (global rate limit: 100 req/min/IP).

---

## 16. SEO, Accessibility & Polish Checklist

- [ ] Semantic HTML5 (`header`, `main`, `section`, `article`, `footer`), one `h1` per page.
- [ ] Meta title/description per page ("GMP VISION — Turnkey Cleanroom Engineering | <Page>").
- [ ] All images `alt`; decorative `alt=""`.
- [ ] Focus-visible: 2px `brand-green` outline on all interactive elements; full keyboard nav (mega-menu, lightbox, tabs, mobile nav).
- [ ] Contrast ≥ 4.5:1 body text on white (`text-primary` #22314F passes; use `text-secondary` only for large/secondary text).
- [ ] `prefers-reduced-motion` respected (Section 2.5).
- [ ] 404 page: on-brand light page — "Containment Breach — 404" with dispersing blue/green particles animation + link home.
- [ ] Loading skeletons for every API grid (shimmer `#EDF2F9 → #E2E8F2`, 1.5s loop).
- [ ] Favicon: the "G" sweep from the logo, blue on white.

---

## 17. Build Order (for Stitch prompting)

1. Design system + shared components (Navbar w/ logo, Footer, SectionHeading, cards, CTABand, WhatsApp button).
2. Home page (all 9 sections, fully animated).
3. Division detail template → Divisions index.
4. Products catalog + detail.
5. Filters catalog.
6. Projects + detail.
7. Contact.
8. 404 + Admin login.
9. Final pass: responsive QA at 360px / 768px / 1440px, motion QA, API integration QA.

---

*End of instructions. Generate the strongest possible visual quality — treat every section as a portfolio piece. Motion is the signature of this site: laminar, precise, never gimmicky. The brand is WHITE + LOGO BLUE (#1F56A8) + LOGO GREEN (#79B82E) — keep it bright, clean, clinical.*
