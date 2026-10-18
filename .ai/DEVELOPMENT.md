# DEVELOPMENT.md — Local Development Guide

## Prerequisites

- **Node.js** 18+ (recommended)
- **npm** (comes with Node.js)
- Git

## Initial Setup

```sh
# 1. Clone the repository
git clone https://github.com/shubhamstr/New-Portfolio.git
cd New-Portfolio

# 2. Install all dependencies
npm install

# 3. Set up Firebase environment (optional, for contact form)
cp web/.env.example web/.env
# Edit web/.env and fill in your Firebase project credentials
```

## Environment Variables

Firebase credentials are loaded from `web/.env` at **build/serve time** (not runtime). The file is git-ignored.

```env
# web/.env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

> If you skip this step, the app works fully except the contact form will show a configuration error message.

## Development Commands

### Start Development Server

```sh
npm run ui
# equivalent to: npx nx serve web
```

App available at: **http://localhost:4500**

HMR (Hot Module Replacement) is enabled via `@pmmmwh/react-refresh-webpack-plugin`.

### Test Route (Local Data)

Navigate to `http://localhost:4500/test` to use `web/src/data/db.json` directly (skips remote GitHub fetch).

### Build for Production

```sh
npm run build
# equivalent to: npx nx build web
```

Output: `web/dist/`

Production build enables:
- Output hashing (cache busting)
- Optimization (minification)

### Run Unit Tests

```sh
npm run test
# equivalent to: npx nx test web
```

Test runner: **Jest** with `babel-jest` transform and `jsdom` environment.
Coverage output: `web/test-output/jest/coverage/`

### Run E2E Tests

```sh
npx nx e2e web-e2e
# or to open Cypress UI:
npx nx open-cypress web-e2e
```

> Note: E2E test directory (`web-e2e/src/e2e/`) is a scaffold — no custom test cases have been written yet.

### Lint

```sh
npx nx lint web
```

### Type Check

```sh
npx nx typecheck web
```

### View Nx Project Graph

```sh
npx nx graph
```

## Content Updates (No Code Change Required)

To update portfolio content (skills, projects, social links):

1. Edit `web/src/data/db.json`
2. Commit and push to `main` branch on GitHub
3. The production site fetches updated data on next page load

The production app fetches from:
```
https://raw.githubusercontent.com/shubhamstr/New-Portfolio/refs/heads/main/web/src/data/db.json
```

This means **content changes do not require a rebuild or redeployment**.

## Webpack Dev Server

Configured in `web/webpack.config.js`:
- **Port**: 4500
- **historyApiFallback**: enabled (SPA routing support — serves `index.html` for all routes)
- **Firebase env vars**: injected via `DefinePlugin` from `web/.env`

## Deployment Notes

Deployment configuration is documented separately in `server.md` (referenced in `README.md` but not present in repo — **Needs Review**).

The build output (`web/dist/`) is a static site that can be served by:
- Apache / Nginx (static file serving)
- Any static hosting (e.g., Netlify, Vercel, GitHub Pages, Firebase Hosting, AWS S3 + CloudFront)

> The `README.md` mentions Apache, PM2, and Docker in `server.md`, but that file does not exist in the repo.

## Nx Workspace Notes

This is an **Nx monorepo** with a single active project (`web`). Common Nx commands:

```sh
npx nx serve web          # dev server
npx nx build web          # production build
npx nx test web           # unit tests
npx nx lint web           # ESLint
npx nx typecheck web      # TypeScript type check
npx nx e2e web-e2e        # Cypress E2E
npx nx graph              # project dependency graph
```

Nx Cloud is configured (`nxCloudId` in `nx.json`) for distributed caching — **Needs Review**: ensure the Nx Cloud connection is valid if CI is being used.

## Development Workflow

1. Make code changes in `web/src/`
2. Dev server hot-reloads automatically
3. Test locally at `http://localhost:4500`
4. Use `/test` route to verify with local data
5. Run `npx nx lint web` and `npx nx test web` before committing
6. Push to GitHub — content at `db.json` on `main` is immediately live

## Known Dev Environment Gotchas

| Issue | Notes |
|---|---|
| Unit tests fail | `app.spec.tsx` checks for `'Welcome @new-portfolio/web'` which no longer exists |
| Empty hooks dir | `web/src/hooks/` is empty — do not expect a `useApi` hook to exist |
| `nx-welcome.tsx` in app dir | Unused 31KB file — safe to ignore or delete |
| Firebase required for contact form | Without `web/.env`, form shows error; rest of app is unaffected |
