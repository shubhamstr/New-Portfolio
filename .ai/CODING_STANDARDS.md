# CODING_STANDARDS.md — Coding Conventions

## Language & Syntax

- **TypeScript** with `strict: true` enforced via `tsconfig.base.json`
- **TSX** for all React component files
- File extensions: `.tsx` for components, `.ts` for utilities/stores
- **Single quotes** enforced by Prettier (`"singleQuote": true`)

## Component Conventions

### Pattern
All components are **functional components** using arrow function syntax assigned to a `const`:
```tsx
const Header = ({ isDarkMode, onToggleDarkMode }: HeaderProps) => {
  // ...
};

export default Header;
```

### Props
- Inline `type` definition directly above the component when props exist:
  ```tsx
  type HeaderProps = {
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
  };
  ```
- Only `Header.tsx` has typed props — all other components take no props and read from the global store

### Exports
- All components use **default exports**
- All components are imported directly by name in `app.tsx` (no barrel/index files)

### State & Hooks
- `useState` and `useEffect` imported directly from `'react'` (not from a re-export)
- Global state accessed via `useSkillsStore` from Zustand:
  ```tsx
  const skillsData = useSkillsStore((state) => state.skillsData);
  ```

## Data Access Pattern

All components read data from the Zustand store using **optional chaining** throughout:
```tsx
skillsData?.skills?.frontend
skillsData?.URLs?.resumeURL
skillsData?.projects
```

This handles the initial `null` state before data is fetched.

## Styling Conventions

- **Tailwind CSS utility classes** are the exclusive styling approach
- No CSS modules, no styled-components, no inline `style={{}}` (except for dynamic width in skill bars)
- **Dynamic styles** (only used in Skills): `style={{ width: \`${skill.level}%\` }}`
- **Dark mode**: `dark:` prefix variant; toggled via `html.dark` class
- **Conditional class application**: template literals with ternaries:
  ```tsx
  className={`base-classes ${condition ? 'class-a' : 'class-b'}`}
  ```
- **Hidden items**: use `hidden` CSS class (not conditional rendering) for skills with `visible: false` and project type filtering

## Naming Conventions

| Artifact | Convention | Example |
|----------|-----------|---------|
| Components | PascalCase | `OtherProjects.tsx` |
| Variables/functions | camelCase | `isDarkMode`, `handleSave` |
| Type definitions | PascalCase | `HeaderProps`, `SkillState` |
| Constants | UPPER_SNAKE_CASE | `DB_URL` |
| Zustand stores | camelCase exports with `use` prefix | `useSkillsStore` |
| CSS ids | kebab-case | `id="home"`, `id="skills"` |

## File Organization

```
web/src/
├── app/          ← Root component only
├── components/   ← Flat (no subdirectories) — one file per section
├── store/        ← One file per Zustand store
├── data/         ← Static JSON data
├── utils/        ← Pure utilities and SDK wrappers (no UI)
├── hooks/        ← Empty (planned for custom hooks)
└── assets/       ← Images and static files
```

No barrel `index.ts` files are used — all imports are direct file paths.

## Event Handling

Form events use `any` type for the event argument with a destructuring pattern:
```tsx
const handleChange = ({ target }: any) => {
  setFormData((prev: any) => ({ ...prev, [target.name]: target.value }));
};
```

Submit handler prevents default and is `async`:
```tsx
const handleSave = async (e: any) => {
  e.preventDefault();
  // ...
};
```

## ESLint Rules

Key active rules from `eslint.config.mjs`:
- `@nx/enforce-module-boundaries` — enforces library boundaries (not heavily relevant for this single-app workspace)
- `eslint-plugin-react-hooks` — enforces hooks rules
- `eslint-plugin-jsx-a11y` — accessibility checks

**Disabled locally** (via `/* eslint-disable */` comments in components):
- `@typescript-eslint/no-explicit-any` — disabled in most components
- `jsx-a11y/accessible-emoji` — disabled in Skills, OtherProjects, Footer

## Commented-Out Code

Large blocks of commented code exist as historical context for a removed API pattern (`useApi`). This is a convention-by-default (not intentional style). Prefer removal over accumulated comment blocks in future work.

## Accessibility

- `aria-label` used on icon-only buttons (dark mode toggle, social links)
- `rel="noreferrer"` and `target="_blank"` used consistently on external links
- `role="img"` used on emoji icons in Contact section
- **Phone number** in Contact section is hidden via CSS (`hidden` class) — not removed

## Section Anchors

Each section component has an `id` attribute for anchor navigation:
- `id="home"` — Hero
- `id="skills"` — Skills
- `id="projects"` — Projects
- `id="other-projects"` — OtherProjects
- `id="tools"` — Tools
- `id="contact"` — Contact

These match the `href="#..."` values in `Header.tsx` and `Footer.tsx`.
