# DATABASE.md — Data Storage

## Overview

There is **no traditional database**. Portfolio data is stored as a static JSON file; contact form submissions are persisted to **Firebase Firestore** (NoSQL).

---

## 1. Portfolio Content — Static JSON

### Source File
- **Local**: `web/src/data/db.json`
- **Remote** (production): `https://raw.githubusercontent.com/shubhamstr/New-Portfolio/refs/heads/main/web/src/data/db.json`

The file is the single source of truth for all displayable portfolio content.

### Top-Level Schema

```json
{
  "skills": { ... },
  "URLs":   { ... },
  "projects": [ ... ]
}
```

### `skills` Object

```json
{
  "skills": {
    "frontend":  [ { "name": string, "level": number (0–100), "visible": boolean } ],
    "backend":   [ { "name": string, "level": number, "visible": boolean } ],
    "database":  [ { "name": string, "level": number, "visible": boolean } ],
    "tools":     [ { "name": string, "level": number, "visible": boolean } ],
    "concepts":  [ { "name": string, "level": number, "visible": boolean } ],
    "cloud":     [ { "name": string, "level": number, "visible": boolean } ]
  }
}
```

- `level`: integer 0–100, determines proficiency classification (Advanced: 80%+, Proficient: 65–79%, Familiar: <65%)
- `visible`: boolean — items with `visible: false` are rendered with `class="hidden"` (DOM is present but not shown)
- `tools`: contains all developer workflow, build, container, and editor tooling (migrated from legacy `others` array)

### `URLs` Object

```json
{
  "URLs": {
    "resumeURL": string,
    "githubURL": string,
    "linkedInURL": string,
    "twitterURL": string,
    "codepenURL": string,
    "stackOverFlowURL": string,
    "mediumURL": string,
    "freeCodeCampURL": string,
    "soloLearnURL": string,
    "devToURL": string,
    "leetcodeURL": string,
    "dockerURL": string,
    "hackerEarthURL": string,
    "hackerRankURL": string,
    "bitbucketURL": string,
    "gitlabURL": string,
    "streamlitURL": string
  }
}
```

URLs are consumed by `Hero.tsx` (social icons) and `Tools.tsx` (GitHub link).

### `projects` Array

```json
[
  {
    "title":       string,
    "description": string,
    "image":       string (URL — currently Unsplash images),
    "techStacks":  string[],
    "demoLink":    string | "",
    "githubLink":  string | string[],    ← can be array for multi-repo projects
    "inProgress":  boolean (optional),
    "type":        "featured" | "others" | "tools"
  }
]
```

**`type` field** drives display routing:
- `"featured"` → rendered in `Projects.tsx`
- `"others"` → rendered in `OtherProjects.tsx`
- `"tools"` → rendered in `Tools.tsx`

All three components **iterate the full projects array** and use CSS `hidden` class to filter — this is a known inefficiency (tech debt).

**`githubLink` as array**: `OtherProjects.tsx` handles both `string` and `string[]` — when array, it renders a CSS hover dropdown with multiple "Code N" links.

---

## 2. Firebase Firestore — Contact Form Submissions

### Configuration

Credentials are injected at build time from `web/.env` via webpack `DefinePlugin`:

| Env Variable | Firestore Config Field |
|---|---|
| `FIREBASE_API_KEY` | `apiKey` |
| `FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `FIREBASE_PROJECT_ID` | `projectId` |
| `FIREBASE_STORAGE_BUCKET` | `storageBucket` |
| `FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
| `FIREBASE_APP_ID` | `appId` |

See `web/src/utils/firebase.ts` for initialization logic. The app checks if all env values are present; if not, `firebaseReady = false` and the form shows a configuration error.

### Collection: `contactMessages`

Documents are created via `addDoc` with the following fields:

| Field | Type | Notes |
|---|---|---|
| `fullName` | string | From form input |
| `email` | string | From form input |
| `subject` | string | From form input; defaults to `"Portfolio contact"` |
| `message` | string | From textarea |
| `createdAt` | Timestamp | `serverTimestamp()` |
| `source` | string | Hardcoded: `"portfolio-contact-form"` |

No Firestore security rules are defined in this repo — **Needs Review**: ensure Firestore rules are configured in the Firebase console to allow only writes (not reads) from the portfolio domain.

### Firebase Initialization Pattern

```typescript
// web/src/utils/firebase.ts
const isConfigured = Object.values(firebaseConfig).every(
  (value) => value && !String(value).startsWith("REPLACE_WITH_")
);

export const firebaseReady = isConfigured;
export const firebaseApp = isConfigured ? initializeApp(...) : null;
export const firestore = firebaseApp ? getFirestore(firebaseApp) : null;
```

Guards against `getApps()` to avoid double-initialization (important in dev with HMR).

---

## Data Update Workflow

To update any portfolio content (skills, projects, social links):

1. Edit `web/src/data/db.json`
2. Commit and push to the `main` branch on GitHub
3. The production site fetches the new data on next page load (no build/deploy needed for content changes)
