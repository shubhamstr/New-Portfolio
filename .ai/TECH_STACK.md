# TECH_STACK.md — Technology Stack

## Core Framework & Runtime

| Technology | Version | Role | Why Used |
|------------|---------|------|----------|
| **React** | 19.0.0 | UI framework | Component-based SPA rendering |
| **TypeScript** | ~5.8.2 | Language | Type safety; Nx default |
| **Node.js** | 18+ (recommended) | Runtime (build/dev only) | Required for Nx and webpack |

## Build & Monorepo

| Technology | Version | Role |
|------------|---------|------|
| **Nx** | 21.2.3 | Monorepo build system, task orchestration, caching |
| **Webpack** | ^5.x (via @nx/webpack 21.2.3) | Bundler for the web app |
| **Babel** | ^7.14.5 | JS/TS transpiler (configured via `@nx/react/babel`) |
| **@nx/react** | ^21.2.3 | Nx plugin providing React-specific generators/executors |
| **@nx/webpack** | 21.2.3 | Nx webpack plugin (`NxAppWebpackPlugin`, `NxReactWebpackPlugin`) |
| **esbuild** | ^0.19.2 | Available in workspace but not currently used as primary bundler |

> **Note**: The Nx generator default is set to `bundler: "webpack"` and `compiler: "babel"` — not esbuild or Vite.

## Styling

| Technology | Version | Role |
|------------|---------|------|
| **Tailwind CSS** | 3.4.3 | Utility-first CSS framework — **primary styling approach** |
| **PostCSS** | 8.4.38 | CSS processing pipeline (required by Tailwind) |
| **Autoprefixer** | 10.4.13 | CSS vendor prefixing |
| **Font Awesome** | ^7.0.0 (Free) | Icon library (imported via `@fortawesome/fontawesome-free` CSS) |

Tailwind configuration:
- `darkMode: 'class'` — dark mode is toggled by adding/removing `dark` class on `<html>`
- Content paths scan `src/`, `pages/`, `components/`, `app/` directories
- No custom theme extensions — all colors and spacing use Tailwind defaults

## State Management

| Technology | Version | Role |
|------------|---------|------|
| **Zustand** | ^5.0.12 | Global state for portfolio data (`skillsStore`) |

A single Zustand store holds all fetched portfolio data (`skillsData`) and is consumed by every section component.

## Routing

| Technology | Version | Role |
|------------|---------|------|
| **react-router-dom** | 6.29.0 | Client-side routing (BrowserRouter wraps app) |

> **Current state**: Routing is installed and `BrowserRouter` is active, but **no `<Route>` definitions exist** — the route configuration is commented out. The only active route logic is the `/test` check in `app.tsx`.

## External Services / SDKs

| Technology | Version | Role |
|------------|---------|------|
| **Firebase** | ^12.12.1 | Firestore for contact form persistence |
| **dotenv** | ^17.4.2 | Loads `web/.env` into `process.env` at build time (via webpack config) |

## Testing

| Technology | Version | Role |
|------------|---------|------|
| **Jest** | ^29.7.0 | Unit test runner |
| **jest-environment-jsdom** | ^29.7.0 | Browser-like DOM for React component tests |
| **@testing-library/react** | 16.1.0 | React component rendering utilities |
| **@testing-library/dom** | 10.4.0 | DOM querying utilities |
| **babel-jest** | ^29.7.0 | Babel transform for Jest |
| **ts-jest** | ^29.1.0 | TypeScript transform for Jest |
| **Cypress** | ^14.2.1 | E2E browser testing |

## Code Quality

| Technology | Version | Role |
|------------|---------|------|
| **ESLint** | ^9.8.0 | Linting (flat config via `eslint.config.mjs`) |
| **typescript-eslint** | ^8.29.0 | TypeScript-specific lint rules |
| **eslint-plugin-react** | 7.35.0 | React-specific lint rules |
| **eslint-plugin-react-hooks** | 5.0.0 | Hooks lint rules |
| **eslint-plugin-jsx-a11y** | 6.10.1 | Accessibility lint rules |
| **eslint-plugin-import** | 2.31.0 | Import order/resolution rules |
| **eslint-plugin-cypress** | ^3.5.0 | Cypress-specific lint rules |
| **Prettier** | ^2.6.2 | Code formatting (`singleQuote: true`) |
| **eslint-config-prettier** | ^10.0.0 | Disables ESLint rules conflicting with Prettier |

## TypeScript Configuration

- **Base**: `tsconfig.base.json` — `strict: true`, `target: es2022`, `lib: ["es2022"]`
- **App**: `web/tsconfig.app.json` extends base
- `isolatedModules: true`, `noUnusedLocals: true`, `noImplicitReturns: true`
- `skipLibCheck: true` — skips type checking of `.d.ts` files in node_modules
