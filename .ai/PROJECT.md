# PROJECT.md — Project Overview

## Purpose

A personal developer portfolio website for **Shubham Sutar**, a Full Stack Developer with 5+ years of experience. The portfolio acts as a professional online presence and showcase for skills, projects, developer tools, and a contact form.

## Business Domain

- **Type**: Static/semi-dynamic personal portfolio website
- **Owner**: Shubham Sutar (Full Stack Developer)
- **Target Audience**: Recruiters, hiring managers, potential collaborators, fellow developers

## Major Functionality

| Section            | Description                                                                         |
|--------------------|-------------------------------------------------------------------------------------|
| **Hero**           | Intro with name, title, bio, resume link, and 14 social profile links               |
| **Skills**         | Categorized skill bars: Frontend, Backend, Database, Tools, Concepts, Cloud, Others |
| **Projects**       | Featured projects grid (type: `"featured"`)                                         |
| **Other Projects** | Secondary projects grid (type: `"others"`)                                          |
| **Tools**          | Developer tools built by Shubham (type: `"tools"`)                                  |
| **Contact**        | Contact form that writes submissions to Firebase Firestore                          |
| **Footer**         | Quick links + GitHub streak stats widget (external image)                           |
| **Dark Mode**      | Toggle between light/dark themes, persisted via `localStorage`                      |

## Content Source Strategy

All portfolio content (skills, URLs, projects) is loaded from a **remote JSON file** hosted on the same GitHub repository:

- **Production source**: `https://raw.githubusercontent.com/shubhamstr/New-Portfolio/refs/heads/main/web/src/data/db.json`
- **Local fallback** (test mode): `web/src/data/db.json`
- Switching to test mode: navigate to the `/test` route — forces local data, skips remote fetch

This means **updating `web/src/data/db.json` and pushing to `main`** is the primary content update workflow.

## Current Status

- **Active / Functional** — portfolio is operational
- Firebase contact form integration is **optional**; gracefully degrades when unconfigured
- `BrowserRouter` is wired up but **no client-side routes are active** (routing code is commented out in `app.tsx`)
- `StrictMode` is intentionally commented out in `main.tsx`

## Known Technical Debt / Areas Needing Review

| Issue | Location |
|-------|----------|
| Unit test checks for removed text | `web/src/app/app.spec.tsx` — test for `'Welcome @new-portfolio/web'` will fail |
| `any` types used broadly | All components — suppressed with eslint-disable comments |
| Unused file (31KB) | `web/src/app/nx-welcome.tsx` — still exists, never rendered |
| Empty directory | `web/src/hooks/` — was intended for `useApi`, now unused |
| Hidden UI via CSS | Phone number in `Contact.tsx`, some Footer social icons use `hidden` class instead of removal |
| No form validation | `Contact.tsx` — no client-side validation beyond HTML `type="email"` |
| Console logs in production | `Contact.tsx` — `console.log` on form submit |
