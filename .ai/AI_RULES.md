# AI_RULES.md — Permanent Rules for AI Coding Agents

> **Scope**: These rules apply to every AI agent working on this repository.
> Rules labeled **[EXISTING]** are derived from the actual codebase.
> Rules labeled **[RECOMMENDED]** are improvements not yet adopted — follow them for new work unless they conflict with an existing pattern that the user wants to preserve.

---

## 0. Before Writing Any Code

1. **Read the `.ai/` docs first.** Always read all relevant files in `.ai/` before making changes. Treat them as project context, but verify important details against the actual source files.
2. **Search before creating.** Before adding a new component, hook, utility, service, constant, or store, search the codebase for existing equivalents (`components/`, `store/`, `utils/`, `hooks/`, `data/`). Do not duplicate existing functionality.
3. **Read before editing.** Read the full content of any file you intend to modify before making changes.
4. **Plan before coding.** For non-trivial changes: outline affected files, data flow, and potential side effects. Confirm the plan before writing code when working interactively with the user.
5. **Never touch unrelated code.** Only modify files that are directly required for the task. Do not refactor, rename, or reformat unrelated files.

---

## 1. Architecture

**[EXISTING]**

- This is a **frontend-only SPA** with no custom backend server. There is no Express or Node.js API server — do not introduce one without explicit discussion.
- All external data access is done **client-side directly from the browser**:
  - Portfolio content: `fetch()` from a GitHub raw JSON URL (`DB_URL` in `utils/constants.ts`)
  - Contact form: Firebase Firestore `addDoc` (write-only)
- The project is an **Nx monorepo** with a single active project: `web`. The `web-e2e` project is a scaffold with no written tests.
- The app shell is assembled in `web/src/app/app.tsx`. Section components are rendered directly in sequence — there is no dynamic routing or lazy loading.
- Global state is a **single Zustand store** (`skillsStore`). All fetched portfolio data lives there.
- `BrowserRouter` from `react-router-dom` wraps the app, but **no `<Route>` definitions exist** — only a `/test` path check in `app.tsx`.

**[RECOMMENDED]**

- If a backend server is ever introduced, document it in `.ai/ARCHITECTURE.md` and `.ai/API.md` before writing code.
- If real routing is added, uncomment or replace the commented `<Routes>` block in `app.tsx` — do not add a second router.

---

## 2. Folder Structure

**[EXISTING]**

```
web/src/
├── app/          ← Root App component only (app.tsx, app.spec.tsx)
├── components/   ← UI section components — FLAT (no subdirectories), one file per section
├── store/        ← One file per Zustand store
├── data/         ← Static JSON fixture (db.json)
├── utils/        ← Pure utilities and SDK wrappers — NO UI code here
├── hooks/        ← Currently empty; intended for custom hooks
└── assets/       ← Images and static files
```

- `components/` is **flat** — do not create subdirectories inside it.
- `utils/` contains only non-UI modules (`constants.ts`, `firebase.ts`). Keep it that way.
- There are **no barrel `index.ts` files**. Import files directly by path.
- New custom hooks go in `hooks/`. New SDK wrappers go in `utils/`.

---

## 3. Naming Conventions

**[EXISTING]**

| Artifact | Convention | Examples |
|---|---|---|
| Component files | PascalCase `.tsx` | `Header.tsx`, `OtherProjects.tsx` |
| Utility / store files | camelCase `.ts` | `skillsStore.ts`, `firebase.ts`, `constants.ts` |
| React component functions | PascalCase | `const Header = ...` |
| Variables and functions | camelCase | `isDarkMode`, `fetchData`, `handleSave` |
| Prop type definitions | PascalCase suffix `Props` | `HeaderProps` |
| Zustand store types | PascalCase suffix `State` | `SkillState` |
| Zustand hook exports | camelCase with `use` prefix | `useSkillsStore` |
| Constants (module-level) | UPPER_SNAKE_CASE | `DB_URL` |
| CSS/HTML section ids | kebab-case | `id="home"`, `id="other-projects"` |

---

## 4. Component Creation

**[EXISTING]**

- All components are **functional components** using arrow function syntax assigned to a `const`, with a **default export**:
  ```tsx
  const MySection = () => {
    // ...
  };
  export default MySection;
  ```
- Components with props define a local `type` directly above the component:
  ```tsx
  type MyProps = {
    isDarkMode: boolean;
    onToggle: () => void;
  };
  const MySection = ({ isDarkMode, onToggle }: MyProps) => { ... };
  ```
- Only `Header.tsx` currently receives props. All other section components read from the Zustand store.
- Components are imported directly in `app.tsx` — no barrel files. Add new section components to the render sequence in `app.tsx`.
- Each section component **must have a unique `id` attribute** matching its nav anchor (e.g., `id="contact"`). Update `Header.tsx` and `Footer.tsx` nav links if adding a new section.

**[RECOMMENDED]**

- Replace `any` event types with proper React event types (`React.ChangeEvent<HTMLInputElement>`, `React.FormEvent<HTMLFormElement>`) in new components.
- Do not disable `@typescript-eslint/no-explicit-any` in new files. The existing suppressions in older components are tech debt.

---

## 5. Data Access (No Backend API)

**[EXISTING]**

- There is **no API server**. Do not write `fetch('/api/...')` calls.
- Portfolio content is fetched once on mount from `DB_URL` (defined in `utils/constants.ts`) and stored in Zustand.
- All components read from the store using optional chaining to handle the initial `null` state:
  ```tsx
  const skillsData = useSkillsStore((state) => state.skillsData);
  // Use as: skillsData?.skills?.frontend
  ```
- **Never add a second `fetch` call for portfolio data**. Extend `skillsData` or `db.json` instead.
- The `/test` route in `app.tsx` serves `data/db.json` locally (bypasses the remote fetch). Use this during development.

**[RECOMMENDED]**

- Wrap the `fetchData()` call in `app.tsx` in a `try/catch` block and set a loading/error state. Currently, a failed fetch silently leaves the app blank.
- If a loading state is added, use a dedicated `useState` in `app.tsx` and pass it down or expose it via the store.

---

## 6. Database Changes (Portfolio Content)

**[EXISTING]**

- The "database" for portfolio content is `web/src/data/db.json`. This is the single source of truth.
- To change displayed content (skills, projects, links), **only edit `db.json`** — no code changes needed.
- After pushing `db.json` changes to the `main` branch, the production site automatically reflects them on next page load.
- The `db.json` schema has three top-level keys: `skills`, `URLs`, `projects`. Do not rename or remove these.
- Skill items: `{ name: string, level: number (0-100), visible: boolean }`. The `level` is a CSS `width` percentage.
- Project items: `{ title, description, image, techStacks, demoLink, githubLink, type: "featured"|"others"|"tools", inProgress? }`.
- The `type` field determines which component renders the project — do not omit it.

**[RECOMMENDED]**

- Add proper TypeScript types for `skillsData` in `skillsStore.ts` (currently typed as `any`). This prevents silent schema drift.

---

## 7. Firebase / Firestore

**[EXISTING]**

- Firebase is initialized in `utils/firebase.ts`. Do not call `initializeApp` anywhere else.
- Always check `firebaseReady` before calling any Firestore SDK function:
  ```ts
  if (!firebaseReady || !firestore) { /* handle gracefully */ return; }
  ```
- The `getApps()` guard in `firebase.ts` prevents double initialization during HMR — do not remove it.
- The only Firestore collection is `contactMessages`. Write-only from the client. Never read from it in the frontend.
- All Firebase credentials come from environment variables — never hardcode them.

---

## 8. Environment Variables

**[EXISTING]**

- All environment variables are defined in `web/.env` (git-ignored). **Never commit this file.**
- The template is `web/.env.example` — update it when adding new env vars, but never put real values there.
- Variables are injected at **build time** by webpack `DefinePlugin` as `process.env.FIREBASE_*` references.
- Supported variables: `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID`.
- When adding a new environment variable:
  1. Add to `web/.env.example` with a placeholder value.
  2. Add to `webpack.config.js` `DefinePlugin` block.
  3. Document in `.ai/SECURITY.md` and `.ai/DEVELOPMENT.md`.

**[NEVER DO]**

- Never hardcode credentials, API keys, or environment-specific URLs in source files.
- Never commit `web/.env`.
- Never expose secrets in comments, logs, or error messages.

---

## 9. Styling

**[EXISTING]**

- **Tailwind CSS utility classes** are the sole styling mechanism. Do not use CSS modules, styled-components, or inline `style={{}}` (except for dynamic values like skill bar widths).
- Dark mode is controlled by the `dark` class on `<html>`. Use `dark:` prefix variants for dark styles.
- The sole exception to inline styles: `style={{ width: \`${skill.level}%\` }}` in `Skills.tsx` for dynamic progress bar widths.
- Conditional classes use template literals with ternaries:
  ```tsx
  className={`base-class ${condition ? 'class-a' : 'class-b'}`}
  ```
- Use the `hidden` CSS class (not conditional rendering) to hide items that should remain in the DOM (e.g., `visible: false` skills, phone number block in Contact).
- Dark mode preference is persisted to `localStorage` under the key `"theme"` in `app.tsx`. Do not store it elsewhere.

---

## 10. State Management

**[EXISTING]**

- **One Zustand store** (`skillsStore.ts`) holds all global state. Do not create a second store without strong justification.
- Store shape: `{ skillsData: any | null, setSkillsData: (data) => void }`.
- Add new fields to the existing store rather than creating parallel stores, unless the state is truly independent.
- Local component state uses `useState`. `useEffect` and `useState` are imported directly from `'react'`.

---

## 11. TypeScript Conventions

**[EXISTING]**

- `strict: true` is enforced globally via `tsconfig.base.json`. Never disable strict mode.
- `isolatedModules: true`, `noUnusedLocals: true`, `noImplicitReturns: true` are also enforced.
- File extensions: `.tsx` for React components, `.ts` for non-UI modules.
- Use `type` (not `interface`) for local prop and state types — this matches the existing codebase.
- `any` is suppressed with `/* eslint-disable @typescript-eslint/no-explicit-any */` at the file level in several existing files. This is tech debt — do not add new suppressions.

**[RECOMMENDED]**

- Type event handlers explicitly in new code:
  ```tsx
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... };
  ```
- Define a proper `PortfolioData` type for `skillsData` in `skillsStore.ts` based on the documented `db.json` schema in `DATABASE.md`.

---

## 12. React Conventions

**[EXISTING]**

- Use **functional components** only — no class components.
- `StrictMode` is currently **commented out** in `main.tsx`. Do not uncomment it without testing for double-effect issues.
- External links always use both `target="_blank"` and `rel="noopener noreferrer"`.
- Icon-only interactive elements use `aria-label`. Emoji icons use `role="img"` with `aria-label`.
- Section anchors (`id="..."`) must match the `href="#..."` values in `Header.tsx` and `Footer.tsx`.
- Do not use `dangerouslySetInnerHTML` anywhere. React's default escaping is sufficient.

---

## 13. ESLint & Formatting

**[EXISTING]**

- ESLint flat config: `eslint.config.mjs` at root (workspace-level) and `web/eslint.config.mjs` (project-level).
- Prettier config: `singleQuote: true` only — all other options are defaults.
- Run linting before committing: `npx nx lint web`.
- Run type checking before committing: `npx nx typecheck web`.
- Do not disable lint rules globally in new files. The existing `/* eslint-disable */` comments are tech debt.
- `react-hooks/exhaustive-deps` is suppressed in `app.tsx` for the `fetchData` dependency — do not extend this pattern.

---

## 14. Authentication & Authorization

**[EXISTING]**

- There is **no authentication** system. The site is fully public.
- Firebase Firestore is accessed **anonymously** — no Firebase Auth is used.
- Do not add authentication without explicit user approval and an architecture discussion.
- Firestore security rules must be configured in the **Firebase Console** (not in this codebase). Ensure write-only access is enforced for `contactMessages`.

---

## 15. Validation & Security

**[EXISTING]**

- Input validation on the contact form is **browser-only** (`type="email"` on the email field). There is no server-side validation.
- React's default escaping prevents XSS. Never use `dangerouslySetInnerHTML`.
- All external links use `rel="noopener noreferrer"`.

**[RECOMMENDED / MUST-DO for new features]**

- Add `required` attributes to contact form fields and client-side validation before new form submissions.
- Remove `console.log` statements that log user-submitted form data before any production deployment (`Contact.tsx` lines 26 and 49 are known offenders).
- Never log sensitive user data (form values, credentials) to the console.
- Never expose secrets or credentials in source code, comments, or error messages.
- Validate env vars are present before using them — follow the `firebaseReady` pattern in `firebase.ts`.

---

## 16. Error Handling

**[EXISTING]**

- Firebase Firestore writes in `Contact.tsx` use `try/catch` with UI feedback via `status` state. Follow this pattern for any new async operations that write data.
- The `fetchData()` call in `app.tsx` has **no error handling** (tech debt). Do not replicate this pattern.
- The `firebaseReady` guard prevents SDK calls when Firebase is not configured — preserve this pattern.

**[RECOMMENDED]**

- Wrap `fetchData()` in `app.tsx` in a `try/catch` and expose a loading/error state to the UI.
- Do not use unhandled promise rejections. Always catch errors from `async` functions called inside `useEffect`.

---

## 17. Logging

**[EXISTING]**

- `console.log` is used in `Contact.tsx` for debugging (known tech debt — see Security section).
- `console.error` is used in `Contact.tsx` for caught errors.

**[RECOMMENDED]**

- Remove `console.log` calls before production. Use `console.error` only for genuine errors.
- Do not log user-provided data (form inputs, tokens) at any log level.

---

## 18. Testing

**[EXISTING]**

- Unit test runner: **Jest** with `@testing-library/react` and `jsdom` environment.
- Test files are co-located with the component they test using the `.spec.tsx` suffix (e.g., `app.spec.tsx`).
- Run tests: `npx nx test web` (or `npm run test`).
- Coverage output: `web/test-output/jest/coverage/` (git-ignored).
- E2E: Cypress scaffolded in `web-e2e/` — **no custom tests written yet**.
- `app.spec.tsx` is currently broken (tests for text that no longer exists in the app) — do not rely on it as a green baseline.

**[RECOMMENDED]**

- Fix `app.spec.tsx` to test for content that actually exists in the rendered app.
- Write new unit tests for any new utility functions in `utils/`.
- When adding a new component, add a `.spec.tsx` alongside it with at least a smoke-render test.
- Mock Firebase and `fetch` in tests — do not make real network calls from tests.

---

## 19. Git Practices

**[EXISTING]**

- `web/.env` is git-ignored — never commit it.
- `dist/`, `tmp/`, `build/`, `node_modules/`, `test-output/`, `.nx/cache`, `.nx/workspace-data` are git-ignored.
- The `.vscode/` directory is partially tracked: `settings.json`, `tasks.json`, `launch.json`, and `extensions.json` are allowed.

**[RECOMMENDED]**

- Never commit secrets, credentials, or real environment values.
- Write meaningful commit messages that describe what changed and why.
- Run `npx nx lint web` and `npx nx typecheck web` before committing.
- Do not commit knowingly broken tests — fix or skip with a documented reason.

---

## 20. Dependency Management

**[EXISTING]**

- Dependencies are managed at the **workspace root** `package.json`. The `web/package.json` contains no dependencies (it is an Nx workspace member).
- Install new packages with `npm install <package>` from the workspace root.
- Current runtime dependencies: `react`, `react-dom`, `react-router-dom`, `zustand`, `firebase`, `dotenv`, `@fortawesome/fontawesome-free`.

**[RECOMMENDED]**

- Before adding any new dependency, verify that existing packages do not already provide the functionality:
  - State management → Zustand (already installed)
  - Routing → react-router-dom (already installed)
  - Icons → Font Awesome (already installed)
  - HTTP → native `fetch` (no library needed)
  - Firestore → Firebase SDK (already installed)
- Prefer smaller, well-maintained packages. Avoid packages with no recent releases.
- Document the purpose of any new dependency in a commit message or PR description.

---

## 21. Performance

**[EXISTING]**

- All portfolio data is fetched once on mount and cached in the Zustand store — no redundant requests.
- Project filtering is done via CSS `hidden` class rather than conditional rendering. This keeps all items in the DOM (known inefficiency — acceptable for the current data size).
- Production builds enable output hashing and minification via webpack.

**[RECOMMENDED]**

- If the projects list grows significantly, replace the CSS-hidden filtering with proper array filtering in each component.
- The hero image (`hero_img.png`, ~1.5MB) should be compressed or served as WebP if performance becomes a concern.
- Avoid importing large libraries for small utilities — prefer native browser APIs.

---

## 22. Backward Compatibility

**[EXISTING]**

- The public API surface of this project is the `db.json` schema (consumed by the production app). Any change to top-level keys (`skills`, `URLs`, `projects`) or their field names/types is a **breaking change** that will blank-out sections of the live site.
- The Zustand store shape (`skillsData`, `setSkillsData`) is consumed by multiple components. Changes must be reflected in all consuming components simultaneously.
- Section `id` attributes are used by anchor links in `Header.tsx` and `Footer.tsx`. Renaming them breaks in-page navigation.

**[RECOMMENDED]**

- When changing `db.json` schema, update `DATABASE.md` and `API.md` in the same commit.
- Prefer additive changes (new fields with optional types) over renaming or removing existing fields.

---

## 23. Documentation Maintenance

**[REQUIRED]**

Whenever any of the following changes, update the corresponding `.ai/` documentation **in the same commit or PR**:

| Change | Files to Update |
|---|---|
| New component or section added | `ARCHITECTURE.md` (component hierarchy) |
| New external service integrated | `ARCHITECTURE.md`, `API.md` |
| `db.json` schema change | `DATABASE.md`, `API.md` |
| New environment variable | `SECURITY.md`, `DEVELOPMENT.md`, `web/.env.example` |
| New npm dependency | `TECH_STACK.md` |
| New dev command or workflow change | `DEVELOPMENT.md` |
| New security risk or mitigation | `SECURITY.md` |
| Architecture changes | `ARCHITECTURE.md` |

Do **not** invent conventions in `.ai/` docs that the project does not follow. Clearly label any recommendations vs. existing behavior.

---

## 24. Dev Commands Reference

```sh
npm run ui              # Start dev server at http://localhost:4500
npm run build           # Production build → web/dist/
npm run test            # Run Jest unit tests
npx nx lint web         # ESLint
npx nx typecheck web    # TypeScript type check
npx nx e2e web-e2e      # Cypress E2E (scaffold only)
npx nx graph            # Nx project dependency graph
```

Use `http://localhost:4500/test` during development to load `data/db.json` locally instead of the remote GitHub raw URL.
