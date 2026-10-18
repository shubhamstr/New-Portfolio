# SECURITY.md — Security Overview

## Authentication & Authorization

- **No authentication** system exists on the portfolio site
- **No authorization** — the site is fully public
- Firebase Firestore is accessed **anonymously** from the browser (no Firebase Auth)

## Secrets Management

### Firebase Credentials

Firebase configuration values are **secrets** and must never be committed to version control.

| Env Variable | Description |
|---|---|
| `FIREBASE_API_KEY` | Firebase Web API Key |
| `FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `FIREBASE_PROJECT_ID` | Firestore project ID |
| `FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID |
| `FIREBASE_APP_ID` | Firebase App ID |

**Storage**:
- Development: `web/.env` (listed in `.gitignore` — **must not be committed**)
- Template: `web/.env.example` (safe to commit, contains placeholder values)

**Injection at build time**: webpack `DefinePlugin` replaces `process.env.FIREBASE_*` references with literal string values in the bundle. These values **will be visible in the compiled JS bundle** — this is expected behavior for Firebase client SDKs.

> ⚠️ **Firebase Web API keys are not secret** in the traditional sense — they are public identifiers. Security is enforced by Firebase Security Rules, not by keeping the key hidden.

### `.gitignore` Coverage

The following are correctly excluded from git:
- `web/.env` — Firebase credentials
- `node_modules/`
- `dist/`, `tmp/`, `build/`
- `test-output/`
- `.nx/cache`, `.nx/workspace-data`

## Input Validation

### Contact Form (`web/src/components/Contact.tsx`)

| Field | Validation |
|---|---|
| `fullName` | None (HTML `type="text"`, no `required` attribute) |
| `email` | HTML `type="email"` only (browser-level validation) |
| `subject` | None |
| `message` | None |

> ⚠️ **Risk**: No server-side validation exists. All Firestore write operations are gated only by Firestore Security Rules configured in the Firebase Console (not in this codebase). Any user can submit arbitrary data.

**Recommended Firestore Security Rules** (Needs Review — configure in Firebase Console):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contactMessages/{docId} {
      allow write: if request.resource.data.keys().hasAll(['fullName', 'email', 'message'])
                   && request.resource.data.fullName is string
                   && request.resource.data.email is string
                   && request.resource.data.message is string;
      allow read: if false;
    }
  }
}
```

## Data Exposure

- **Portfolio content** (`db.json`) is fully public — hosted on GitHub raw URL, no auth required. This is intentional.
- **Contact submissions** are write-only from the client — the portfolio never reads back from Firestore
- **Firebase config** is embedded in the JS bundle (expected, acceptable for client SDK)
- **Hero image** is a local asset served with the bundle
- **Project images** are linked from Unsplash CDN (external dependency)

## External Content Risks

| Source | Risk | Status |
|---|---|---|
| Unsplash (project images) | CDN availability, URL rot | Needs Review |
| GitHub raw URL (data source) | Rate limiting, availability | Needs Review |
| GitHub Streak Stats image | External service availability | Accepted |
| Font Awesome CDN | None — loaded from npm package | ✅ Safe |

## Cross-Site Scripting (XSS)

- React escapes dynamic content by default — no use of `dangerouslySetInnerHTML` anywhere
- All user-facing dynamic data comes from the trusted `db.json` (not from user input)
- Contact form data is never rendered back to the page

## Link Security

All external links correctly use:
```tsx
target="_blank"
rel="noopener noreferrer"
```

This prevents tab-napping attacks on third-party links.

## Console Logging

`Contact.tsx` contains `console.log` statements that log form data on submit — **remove before production**:
```typescript
console.log("Submitting contact form with data:", formData);
console.log("Contact message saved with ID:", resp);
```

## Summary of Security Risks

| Risk | Severity | Notes |
|---|---|---|
| No Firestore security rules in repo | **High** | Must be set in Firebase Console |
| No contact form validation | **Medium** | Browser-only validation |
| Console.log of form data | **Low** | Minor info disclosure |
| Remote JSON fetch — no error handling | **Low** | Availability risk, not security risk |
| Firebase API key in bundle | **Informational** | Expected for Firebase client SDK |
