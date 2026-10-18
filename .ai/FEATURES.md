# FEATURES.md — Existing Features

## Feature Map

All features are implemented in the `web/` Nx project under `web/src/`.

---

## 1. Dark Mode Toggle

**Status**: ✅ Implemented

**Implementation**:
- State managed in `App` component: `const [isDarkMode, setIsDarkMode] = useState(...)`
- Initialized from `localStorage.getItem("theme")` with fallback to `prefers-color-scheme` media query
- Persisted to `localStorage` on change
- Applied by toggling `dark` class on `document.documentElement`
- CSS uses `html.dark body { ... }` and Tailwind `dark:` variants

**Files**:
- `web/src/app/app.tsx` — state, initialization, persistence
- `web/src/components/Header.tsx` — toggle button UI (sun/moon SVG icons)
- `web/src/styles.css` — base dark mode CSS
- `web/tailwind.config.js` — `darkMode: 'class'`

**Dependencies**: `localStorage`, `window.matchMedia`

---

## 2. Remote Data Loading

**Status**: ✅ Implemented

**Implementation**:
- `App.tsx` calls `fetch(DB_URL)` on mount, stores result in Zustand `skillsStore`
- `DB_URL` is the GitHub raw URL to `web/src/data/db.json` on `main` branch
- Local fallback: if route is `/test`, uses imported `dbData` (the same local JSON)
- No loading state, no error state — components silently render nothing until data arrives

**Files**:
- `web/src/app/app.tsx` — `fetchData()`, `useEffect` orchestration
- `web/src/utils/constants.ts` — `DB_URL`
- `web/src/data/db.json` — local fixture / source of truth
- `web/src/store/skillsStore.ts` — Zustand store

**Dependencies**: All section components depend on `skillsStore` being populated

---

## 3. Hero Section

**Status**: ✅ Implemented

**Implementation**:
- Two-column layout: text left, profile image right
- Profile photo: `web/src/assets/hero_img.png` (local asset, ~1.5MB)
- Social links: 14 platforms rendered from `skillsData?.URLs` (Twitter is commented out)
- Buttons: "View Resume" (links to `skillsData?.URLs?.resumeURL`), "View Projects" (anchor to `#projects`)
- Icons via Font Awesome — configured per social link with hardcoded icon class strings

**Files**: `web/src/components/Hero.tsx`

**Dependencies**: `skillsStore.skillsData.URLs`, `hero_img.png`, Font Awesome CSS

---

## 4. Skills Section

**Status**: ✅ Implemented

- Responsive 2-column grid layout of 6 balanced horizontal category cards (Frontend, Backend, Database, Tools & Workflow, Architecture & Concepts, and Cloud & Infrastructure)
- Horizontal card structure featuring category metadata (icon, title, technology count) on the left and compact interactive skill chips on the right
- "Other Tools & Tech" (`skills.others`) combined directly into the "Tools & Workflow" category card alongside workflow tools
- Visual proficiency level legend (`Advanced`, `Proficient`, `Familiar`) with colored dot indicators matching the compact skill chips
- Informative tooltips on hover displaying skill name, proficiency category, and percentage
- Items with `visible: false` retain `className="hidden"` (still in DOM)

**Files**: `web/src/components/Skills.tsx`

**Dependencies**: `skillsStore.skillsData.skills`

---

## 5. Featured Projects Section

**Status**: ✅ Implemented

**Implementation**:
- Filters `skillsData.projects` where `type === "featured"`, hides others via CSS `hidden`
- Two-column grid
- Shows "In Progress" badge overlay on image and pill in header when `project.inProgress === true`
- "Live Demo" button: disabled (gray) when `demoLink` is empty
- "Code" button: always links to `githubLink`
- `githubLink` is always a string for featured projects

**Files**: `web/src/components/Projects.tsx`

**Dependencies**: `skillsStore.skillsData.projects`

---

## 6. Other Projects Section

**Status**: ✅ Implemented

**Implementation**:
- Filters `skillsData.projects` where `type === "others"`
- 3–4 column grid
- Handles `githubLink` as either `string` or `string[]`:
  - String: single "Code" link
  - Array: CSS hover dropdown showing "Code 1", "Code 2", etc.
- "In Progress" overlay badge on image

**Files**: `web/src/components/OtherProjects.tsx`

**Dependencies**: `skillsStore.skillsData.projects`

---

## 7. Tools Section

**Status**: ✅ Implemented

**Implementation**:
- Filters `skillsData.projects` where `type === "tools"`
- Shows developer tools built by Shubham (npm packages, VSCode extensions, Chrome extensions)
- "View All Projects on GitHub" button at bottom links to `skillsData?.URLs?.githubURL`
- No "In Progress" handling (all tool projects have demo links)

**Files**: `web/src/components/Tools.tsx`

**Dependencies**: `skillsStore.skillsData.projects`, `skillsStore.skillsData.URLs.githubURL`

---

## 8. Contact Form

**Status**: ✅ Implemented (Firebase-dependent)

**Implementation**:
- Controlled form with `useState` for `formData`, `isSubmitting`, `status`
- Fields: `fullName`, `email`, `subject`, `message`
- On submit: writes to Firebase Firestore `contactMessages` collection via `addDoc`
- Graceful degradation: shows config error message if `firebaseReady === false`
- Success/error status displayed below the submit button
- Contact info panel: email address and location (hardcoded)
- Phone number block uses `hidden` class (CSS-hidden, not removed)

**Files**: `web/src/components/Contact.tsx`, `web/src/utils/firebase.ts`

**Dependencies**: Firebase Firestore, `web/.env` vars, `firebaseReady` guard

---

## 9. Header / Navigation

**Status**: ✅ Implemented

**Implementation**:
- Sticky header (`sticky top-0 z-50`) with blur backdrop
- Desktop nav: anchor links to section IDs
- Mobile nav: hamburger toggle button (`useState`), collapses on link click
- Dark mode toggle button passed down as props from `App`
- Brand logo: gradient circle with "SS" initials + "Shubham Sutar" text

**Files**: `web/src/components/Header.tsx`

**Dependencies**: Props `isDarkMode`, `onToggleDarkMode` from `App`

---

## 10. Footer

**Status**: ✅ Implemented

**Implementation**:
- 4-column grid: brand/about, quick links, GitHub streak widget (spans 2 cols)
- GitHub streak: external image from `https://streak-stats.demolab.com?user=shubhamstr&theme=dark`
- No dynamic data — all content is hardcoded
- Copyright year hardcoded as `2025`

**Files**: `web/src/components/Footer.tsx`

**Dependencies**: External streak stats service

---

## Feature Dependency Graph

```
skillsStore (Zustand)
  │
  ├─ populated by: App.tsx (fetch or local import)
  │
  ├─► Hero ────────── skillsData.URLs
  ├─► Skills ─────── skillsData.skills
  ├─► Projects ────── skillsData.projects (type: featured)
  ├─► OtherProjects ─ skillsData.projects (type: others)
  └─► Tools ────────── skillsData.projects (type: tools)

Header ─── App.tsx (isDarkMode, onToggleDarkMode props)
Contact ── Firebase (independent of skillsStore)
Footer ─── No dependencies (static)
```
