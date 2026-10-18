# API.md — API Architecture

## Overview

This project has **no custom backend API**. All data interactions are with external services accessed directly from the browser (client-side only).

---

## External Data Sources

### 1. Remote JSON Data (Portfolio Content)

| Attribute | Detail |
|-----------|--------|
| **Type** | Public HTTP GET (no auth) |
| **URL** | `https://raw.githubusercontent.com/shubhamstr/New-Portfolio/refs/heads/main/web/src/data/db.json` |
| **Defined in** | `web/src/utils/constants.ts` → `DB_URL` |
| **Called from** | `web/src/app/app.tsx` → `fetchData()` |
| **Method** | `fetch(DB_URL)` → `res.json()` |
| **When called** | On component mount, unless route is `/test` |
| **Response** | Full JSON object; stored in Zustand `skillsStore` |
| **Error handling** | **None** — no try/catch around the fetch in `app.tsx` (tech debt) |

**Fetch logic in `app.tsx`**:
```typescript
const fetchData = async () => {
  const res = await fetch(DB_URL);
  const data = await res.json();
  setSkillsData(data);
};

useEffect(() => {
  if (isTestRoute) {
    setSkillsData(dbData);  // local JSON import
    return;
  }
  fetchData();
}, [isTestRoute, setSkillsData]);
```

> ⚠️ **Risk**: If the GitHub raw URL is unavailable or rate-limited, the app will silently fail to populate content (no loading state, no error boundary).

---

### 2. Firebase Firestore (Contact Form Write)

| Attribute | Detail |
|-----------|--------|
| **SDK** | `firebase` v12 (client SDK) |
| **Operation** | `addDoc` — write only |
| **Collection** | `contactMessages` |
| **Called from** | `web/src/components/Contact.tsx` → `handleSave()` |
| **Auth** | None (anonymous write; relies on Firestore security rules in Firebase Console) |
| **Failure handling** | try/catch — sets `status.type = "error"` with UI message |

**Write pattern**:
```typescript
const resp = await addDoc(collection(firestore, "contactMessages"), {
  fullName: ...,
  email: ...,
  subject: ...,
  message: ...,
  createdAt: serverTimestamp(),
  source: "portfolio-contact-form",
});
```

The `firebaseReady` guard in `firebase.ts` prevents SDK calls when env vars are missing.

---

## Previously Removed API (Technical Context)

Comment remnants throughout the codebase reference a `useApi` hook and an API server:

```typescript
// Former pattern (now removed):
// const { data, loading, callApi } = useApi();
// callApi({ url: "/get/skills", method: "GET" });
// callApi({ url: "/get/projects", method: "GET" });
// callApi({ url: "/get/URLs", method: "GET" });
```

This suggests there was previously a **local Express/Node.js backend server** with these endpoints:
- `GET /get/skills`
- `GET /get/projects`
- `GET /get/URLs`

That server has been **removed** in favor of the GitHub raw JSON approach. The `hooks/` directory is now empty.

---

## Request/Response Patterns

### Portfolio Data Response Shape

```typescript
// Successful fetch of DB_URL returns:
{
  skills: {
    frontend: Array<{ name: string; level: number; visible: boolean }>;
    backend:  Array<{ name: string; level: number; visible: boolean }>;
    database: Array<{ name: string; level: number; visible: boolean }>;
    tools:    Array<{ name: string; level: number; visible: boolean }>;
    concepts: Array<{ name: string; level: number; visible: boolean }>;
    cloud:    Array<{ name: string; level: number; visible: boolean }>;
    others:   string[];
  };
  URLs: Record<string, string>;
  projects: Array<{
    title: string;
    description: string;
    image: string;
    techStacks: string[];
    demoLink: string;
    githubLink: string | string[];
    inProgress?: boolean;
    type: "featured" | "others" | "tools";
  }>;
}
```

---

## Authentication

- **None** on the portfolio site itself
- Firebase Firestore: anonymous client-side writes (no Firebase Auth)
- Firestore security rules must be configured in the Firebase Console (not in this repo)

---

## Error Handling Summary

| Interaction | Error Handling |
|-------------|---------------|
| Remote JSON fetch | ❌ None — unhandled promise rejection possible |
| Firebase Firestore write | ✅ try/catch with UI feedback |
| Firebase unconfigured | ✅ Guarded by `firebaseReady` flag |
