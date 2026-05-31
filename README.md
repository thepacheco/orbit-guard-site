# Orbit Guard Website

Marketing and e-commerce site for **Orbit Guard** — soft caster guards for office chairs. Built with Next.js (App Router), React, TypeScript, and a Three.js-powered 3D product viewer. The site is mobile-first and includes a configurator/shop, a set of campaign landing pages, and an admin panel for editing product data without touching code.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router, React Server Components) |
| UI | React 18 + TypeScript |
| Styling | Inline styles + a global stylesheet (`src/app/globals.css`) with CSS media queries |
| 3D | Three.js via `@react-three/fiber` and `@react-three/drei` |
| Icons / FX | `lucide-react`, `canvas-confetti` |
| Analytics | Vercel Analytics (`@vercel/analytics`) |

---

## Project Layout

```
orbit-guard-site/
├── README.md            ← this file
└── site/                ← the actual Next.js app (run all commands here)
    ├── package.json
    ├── public/assets/   ← images, fonts, 3D models, wordmarks
    └── src/
        ├── app/         ← routes (App Router)
        ├── components/  ← shared React components
        └── config/      ← editable product config (products.ts)
```

> **Important:** the Next.js app lives in the `site/` subfolder. All `npm` commands run from `site/`, but the git repository root is `orbit-guard-site/`.

---

## Prerequisites

- **Node.js 18.17+** (Next.js 14 requirement)
- **npm** (ships with Node)

---

## Getting Started

```bash
cd site
npm install        # install dependencies (first time only)
npm run dev        # start the dev server at http://localhost:3000
```

Other scripts (all run from `site/`):

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint` | Run the Next.js/ESLint checks |

---

## Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage — hero, 3D viewer, color/pack selectors |
| `/shop` | Product configurator: single-color or **Mix & Match** multi-guard packs, add to cart |
| `/about` | Brand story |
| `/contact` | Contact info |
| `/faq` | Frequently asked questions |
| `/press` | Press kit / brand assets / color reference |
| `/admin` | Admin landing (utility for opening all pages to test layout) |

### Campaign landing pages (`/lp/*`)

`back-to-school`, `desk`, `gamer`, `gifting`, `launch`, `meet-orbit`, `office`, `pets`, plus the two **interactive 3D experiences** `orbit-intro` and `meeting-orbit`.

> The two interactive 3D LPs (`/lp/orbit-intro`, `/lp/meeting-orbit`) are intentionally kept separate and should not be edited as part of routine UI changes.

---

## Key Components (`src/components/`)

| File | Role |
|------|------|
| `Header.tsx` | Site navigation |
| `Hero.tsx` | Homepage hero with color + pack pickers |
| `ShopPage.tsx` | Full configurator incl. Mix & Match bottom sheet |
| `Product3DViewer.tsx` | Three.js product model viewer |
| `ColorDropdown.tsx` | Mobile-friendly color selector (replaces wrapping swatch pills on phones) |
| `CartContext.tsx` / `CartPopup.tsx` | Cart state + floating cart UI |
| `Sections.tsx` | Reusable page sections (incl. footer CTA) |
| `Faq.tsx` | FAQ accordion/card |
| `data.ts` | Derives `PRODUCT_VARIANTS` (colors) and `PACK_SIZES` from the central config |
| `types.ts` | Shared TypeScript types (e.g. `Variant`) |

---

## Editing Products & Site Content (config file)

All editable site content — brand name, taglines, links, contact emails, Kickstarter stats, launch date, and pack pricing — lives in one human-editable config file:

**`site/src/config/products.ts`** (exports `SITE_CONFIG`)

`src/components/data.ts` reads `SITE_CONFIG` to build the color variants and pack options used across the whole site. To change prices, packs, emails, or stats, **edit `products.ts` directly in code** and save — the dev server hot-reloads, or rebuild for production. Every field is commented in the file. Example:

```ts
export const SITE_CONFIG = {
  productName: 'Orbit',
  companyName: 'OrbitGuard',
  emailGeneral: 'hello@orbitguards.com',
  packPricing: [
    { count: 1,  price: 6,  label: '', tag: null },
    { count: 5,  price: 24, label: '', tag: null },
    // ...
  ],
} as const;
```

> There is no admin web form for this — it is intentionally a code-edited config document, so changes are reviewable in version control.

---

## Mobile-Friendly Architecture

The site is mobile-first. Desktop and mobile layouts are controlled through `globals.css` media queries (breakpoints at **768px** and **480px**) plus visibility helper classes:

- `og-show-on-mobile` — visible only ≤768px
- `og-hide-on-mobile` — hidden ≤768px

This lets the same component render a swatch pill on desktop and a compact dropdown on mobile without duplicating logic. When adjusting mobile layout, prefer adding/adjusting a class rule in `globals.css` over changing inline styles, so desktop stays untouched.

---

## Assets & Fonts

Static assets (images, fonts, 3D models, wordmarks) live in `site/public/assets/` and are referenced with root-relative paths, e.g. `/assets/orbit-wordmark-white.png`.

---

## Known Dependency Advisories

`npm audit` reports pre-existing advisories that require a **major** framework upgrade to clear:

- **Next.js** (high) — DoS, SSRF, RSC cache poisoning, and i18n middleware bypass issues fixed in later majors.
- **postcss** (moderate) — XSS advisory.

Resolving these means upgrading to a newer major of Next.js (a breaking change) and should be done as a dedicated, separately tested task.

---

## Deployment Notes

- Run `npm run build` then `npm run start` for a production server, or deploy to a Next.js-compatible host.
- Because `/api/config` writes to the local filesystem, the admin/config workflow is for authoring content locally; review how (or whether) it should be exposed before deploying publicly.
- **Analytics:** `<Analytics />` (from `@vercel/analytics/next`) is rendered in `src/app/layout.tsx`. It collects page views automatically when deployed on Vercel — data only appears in production, not in local dev.
