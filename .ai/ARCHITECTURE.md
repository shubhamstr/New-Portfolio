# ARCHITECTURE.md — Application Architecture

## Overview

This is a **frontend-only, single-page application (SPA)** with no backend server. There is no Express/Node server running alongside the React app. External services (Firebase Firestore, GitHub raw content) are accessed directly from the browser.

```
Browser
  │
  ├─► React SPA (webpack-dev-server / static build)
  │     │
  │     ├─► Remote JSON (GitHub raw) — portfolio content
  │     └─► Firebase Firestore — contact form submissions
  │
  └─► External Embeds (GitHub Streak stats image)
```

## Monorepo Structure (Nx Workspace)

```
New-Portfolio/                    ← Nx workspace root
├── .ai/                          ← AI context documentation (this folder)
├── web/                          ← Main React application (sole active project)
│   ├── src/
│   │   ├── app/                  ← Root App component
│   │   │   ├── app.tsx           ← App shell, data fetching, dark mode logic
│   │   │   ├── app.spec.tsx      ← Unit tests (currently outdated)
│   │   │   └── nx-welcome.tsx    ← UNUSED — leftover from Nx scaffold
│   │   ├── components/           ← UI section components (flat, no subdirs)
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── OtherProjects.tsx
│   │   │   ├── Tools.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   ├── store/                ← Zustand global state
│   │   │   └── skillsStore.ts    ← Single store for all portfolio data
│   │   ├── data/                 ← Local data fixture
│   │   │   └── db.json           ← Local copy of portfolio content (used in /test)
│   │   ├── hooks/                ← EMPTY — was planned for useApi hook
│   │   ├── assets/               ← Static assets
│   │   │   └── hero_img.png      ← Hero section profile image (~1.5MB)
│   │   ├── utils/
│   │   │   ├── constants.ts      ← DB_URL for remote JSON source
│   │   │   └── firebase.ts       ← Firebase app/firestore initialization
│   │   ├── main.tsx              ← React entry point, BrowserRouter wrapper
│   │   ├── styles.css            ← Global CSS (Tailwind + Font Awesome imports)
│   │   └── index.html            ← HTML shell
│   ├── .env                      ← Firebase secrets (git-ignored)
│   ├── .env.example              ← Template for Firebase env vars
│   ├── webpack.config.js         ← Webpack config + env injection via DefinePlugin
│   └── tailwind.config.js        ← Tailwind CSS config (darkMode: 'class')
├── web-e2e/                      ← Cypress E2E tests (scaffold only, no tests written)
├── package.json                  ← Root workspace scripts + dependencies
├── nx.json                       ← Nx configuration + plugin definitions
├── tsconfig.base.json            ← Shared TypeScript base config
└── eslint.config.mjs             ← Root ESLint config (Nx flat config)
```

## Frontend Architecture

### Component Hierarchy

```
main.tsx
  └── BrowserRouter
        └── App (app.tsx)
              ├── Header           ← sticky nav, dark mode toggle, mobile hamburger
              ├── Hero             ← profile image, bio, resume/project CTAs, socials
              ├── Skills           ← 6 category cards with progress bars + Others tags
              ├── Projects         ← filters type="featured" from projects array
              ├── OtherProjects    ← filters type="others" from projects array
              ├── Tools            ← filters type="tools" from projects array
              ├── Contact          ← controlled form → Firebase Firestore
              └── Footer           ← quick links + GitHub streak image
```

### Data Flow

```
App.tsx (mount)
  │
  ├── if route === '/test'
  │     └── import db.json → setSkillsData()
  │
  └── else
        └── fetch(DB_URL) → res.json() → setSkillsData()
                                               │
                                               ▼
                                    Zustand skillsStore
                                               │
                          ┌────────────────────┼────────────────────┐
                          ▼                    ▼                    ▼
                        Hero              Skills           Projects / OtherProjects / Tools
                   (skillsData.URLs)  (skillsData.skills)  (skillsData.projects)
```

### State Management

- **Zustand** (`web/src/store/skillsStore.ts`) — single global store
- Shape: `{ skillsData: any | null, setSkillsData: (data) => void }`
- All data is loaded once at app mount and shared across all components via `useSkillsStore`

### Routing

- `react-router-dom` v6 is installed and `BrowserRouter` wraps the app
- **No actual routes are defined** — the `Routes`/`Route` code in `app.tsx` is commented out
- Only route logic present: `location.pathname === '/test'` to switch data source
- `historyApiFallback` is configured in webpack for SPA routing support

## External Services / Integrations

| Service | Purpose | Config |
|---------|---------|--------|
| **GitHub Raw** | Remote portfolio data source | `web/src/utils/constants.ts` → `DB_URL` |
| **Firebase Firestore** | Contact form submission storage | `web/.env` + `web/src/utils/firebase.ts` |
| **GitHub Streak Stats** | Embedded image in Footer | Hardcoded URL in `Footer.tsx` |
| **Unsplash** | Project card images | Hardcoded URLs in `db.json` |
| **Font Awesome 7** | Social and UI icons | npm package imported in `styles.css` |

## Build & Bundler

- **Webpack** with `NxAppWebpackPlugin` and `NxReactWebpackPlugin`
- Babel compiler (not SWC) for transpilation
- SVGR is available for SVG-as-components (not currently used)
- `DefinePlugin` injects Firebase env vars at build time as `process.env.*`
- Output: `web/dist/`
- Dev server port: **4500**
- Production: output hashing enabled; optimization enabled
