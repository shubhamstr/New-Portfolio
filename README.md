# New Portfolio

A personal portfolio website for **Shubham Sutar**, built as an **Nx workspace** with a React front end. The site showcases skills, projects, tools, social links, and a resume, with content driven from a JSON data source.

## Overview

The portfolio is structured as a single-page experience with these sections:

- Hero / intro
- Skills
- Featured projects
- Other projects
- Tools
- Contact
- Footer

Portfolio content is loaded from `web/src/data/db.json` in test mode, and from the remote JSON source configured in `web/src/utils/constants.ts` during normal usage.

## Tech Stack

- Nx
- React 19
- TypeScript
- Tailwind CSS
- React Router
- Zustand
- Font Awesome

## Workspace Structure

- `web/` - main portfolio web app
- `api/` - backend/service workspace area
- `packages/` - shared packages and utilities
- `web-e2e/` - end-to-end tests
- `server.md` - server, Docker, and deployment notes

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install dependencies

```sh
npm install
```

### Run the web app

```sh
npm run ui
```

This starts the portfolio app through Nx.

### Build the web app

```sh
npm run build
```

### Run tests

```sh
npm run test
```

## Data Flow

The UI reads portfolio data from the `skills` store and populates it from a JSON payload.

- Normal runtime: fetches data from the remote URL defined in `web/src/utils/constants.ts`
- Test route: uses the local fixture in `web/src/data/db.json`

This setup makes it easy to test the app locally without depending on the remote JSON file.

## Deployment Notes

Server, Apache, PM2, and Docker commands are documented in `server.md`.

## Useful Commands

```sh
npx nx graph
npx nx serve web
npx nx build web
npx nx test web
```

## Customization

To update the portfolio content, edit:

- `web/src/data/db.json`
- `web/src/utils/constants.ts` if the remote JSON source changes

To enable contact form persistence in Firebase, update:

- `web/.env`
- `web/src/utils/firebase.ts`

The form writes new submissions to the `contactMessages` Firestore collection.

To adjust the UI sections, check the components under `web/src/components/`.
