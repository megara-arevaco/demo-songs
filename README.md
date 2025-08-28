# Demo Songs

The approach for this demo has been to maintain a simple yet scalable architecture. This lays a solid foundation for future iterations, as it already addresses most of the essential requirements for a growing project, specially the unit test infrastructure, which is in place and ready to expand.

**Lightweight monorepo-like setup:** leveraging **PNPM workspaces** to keep dependencies synchronized and streamline the management of code within the same domain.

### Regarding the codebase:

- **Backend:** I chose **Fastify** for its simplicity and seamless integration with validators — in this case, **Zod**.

- **Frontend:** I opted for **React + Vite**, supported by a small set of dependencies that I consider core to modern React development, such as **React Query** and **TailwindCSS**.

Although I evaluated introducing a route handler (like **TanStack Router**), the simplicity of this demo made it unnecessary at this stage.

For **state management**, I went with **Zustand**. It follows a paradigm of **global state with subscriptions to changes**, similar to Redux, but offers a **much simpler API with less boilerplate**.

An important design decision is in the implementation of `handleIssueInvoice`. Instead of passing the entire `Song` object, I chose to send only its **ID**. While passing the full object might be more performant for an MVP, I prefer to ensure that the **source of truth** for each `Song` resides in the **store**, not in the component. Using an intermediate **Map** enables **fast lookups** without iterating over the entire array. However, as potentially the dataset sent by the API could be much bigger, **performance optimizations** may become necessary. Strategies like **pagination** and other scaling techniques can be applied when needed.

## Overview

- API: Fastify v5 + Zod type providers, serves songs on `/api/v1/songs`.
- Frontend: React 19 + Vite 7 + Tailwind/DaisyUI.
- Schemas: Shared Zod schemas (`SongSchema`, `SongsResponseSchema`) consumed by both API and frontend.
- Monorepo: pnpm workspaces under `packages/*`.

## Tech Stack

- Node 20, pnpm, TypeScript, Fastify, Vite, React, Zod, Tailwind, DaisyUI.

## Packages

- `packages/api`: Fastify server (dev on port `3000`).
- `packages/frontend`: Vite dev server (dev on port `5173`), preview on `4173`.
- `packages/schemas`: Shared Zod models and types.

## Docker (Dev) - Recommended

Development via Docker with hot reload is supported:

- `docker compose up --build`
- Frontend (Vite): `http://localhost:5173`
- API (Fastify): `http://localhost:3000/api/v1/songs`

## Without Docker

### Prerequisites

- Node `>=20`
- pnpm `>=9` (recommended via `corepack enable`)

### Install

- `pnpm install`

### Development

- Run both API and frontend in dev mode:
  - `pnpm dev`
  - API: `http://localhost:3000`
  - Frontend: `http://localhost:5173`

### Build (Local)

- Build everything at once:
  - `pnpm build` (alias for `pnpm build:all`)

Artifacts:

- API -> `packages/api/dist/`
- Frontend -> `packages/frontend/dist/`
- Schemas -> `packages/schemas/dist/`

### Serve Built Artifacts (Local)

- After `pnpm build`, run:
  - `pnpm serve`
  - API: `http://localhost:3000`
  - Frontend (static preview): `http://localhost:4173`
