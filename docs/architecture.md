# Rajal Realty — Architecture & Production Guide

This document describes the technical architecture, project structure, environment setup, and production readiness checklist for the Rajal Realty website.

---

## Stack Overview

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 16 + React 19 | Frontend pages and server runtime |
| CMS | Payload CMS v3 | Content management, admin panel, REST API |
| Database | Neon (PostgreSQL) | Persistent data storage |
| Media | Cloudinary | Image/file hosting and CDN |
| Hosting | Vercel | Deployment and serverless functions |
| Styling | Tailwind CSS v4 + shadcn/ui | UI components and design system |

Payload and the Next.js frontend run in the **same repository** — a single deployable app with shared types and no separate CMS server.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js App (single deploy)               │  │
│  │                                                        │  │
│  │  ┌──────────────────┐    ┌──────────────────────────┐ │  │
│  │  │  (my-app)        │    │  (payload)               │ │  │
│  │  │  Public website  │    │  /admin — CMS panel      │ │  │
│  │  │  /, /about, etc. │    │  /api/* — REST API       │ │  │
│  │  └────────┬─────────┘    └────────────┬─────────────┘ │  │
│  │           │                           │                │  │
│  │           └───────────┬───────────────┘                │  │
│  │                       │                                │  │
│  └───────────────────────┼────────────────────────────────┘  │
└──────────────────────────┼───────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌────────────┐  ┌────────────┐  ┌────────────┐
    │ Neon       │  │ Cloudinary │  │ Vercel CDN │
    │ PostgreSQL │  │ (images)   │  │ (pages)    │
    └────────────┘  └────────────┘  └────────────┘
```

### Request flow

1. **Public pages** — User visits `/` → Next.js renders React pages from `(my-app)` route group.
2. **Admin** — Editor visits `/admin` → Payload admin UI loads from `(payload)` route group.
3. **Content API** — Frontend fetches data via Payload REST API at `/api/*`.
4. **Media** — Uploads go to Cloudinary; URLs are served from `res.cloudinary.com`.

---

## Project Structure

```
rajal-realestate/
├── payload.config.ts          # Payload CMS configuration
├── next.config.ts             # Next.js config (withPayload plugin)
├── .env.example               # Environment variable template
│
├── src/
│   ├── app/
│   │   ├── (my-app)/          # Public frontend (your website)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   │
│   │   └── (payload)/         # Payload CMS (do not edit generated files)
│   │       ├── layout.tsx
│   │       ├── admin/[[...segments]]/
│   │       └── api/[...slug]/route.ts
│   │
│   ├── collections/           # Payload content models
│   │   ├── Users.ts           # Admin users (auth)
│   │   └── Media.ts           # Images/files (Cloudinary)
│   │
│   ├── migrations/            # Drizzle/Payload DB migrations
│   │
│   ├── storage/               # Cloudinary integration
│   │   ├── cloudinaryAdapter.ts
│   │   └── cloudinaryStorage.ts
│   │
│   ├── components/            # React UI components
│   ├── lib/                   # Utilities
│   └── payload-types.ts       # Auto-generated TypeScript types
│
└── docs/
    ├── architecture.md        # This file
    └── rebuild-content-guide.md
```

### Route groups

| Route group | URL prefix | Purpose |
|-------------|------------|---------|
| `(my-app)` | `/` | Public marketing site |
| `(payload)` | `/admin`, `/api` | CMS admin panel and REST API |

Route group folder names `(my-app)` and `(payload)` do not appear in URLs.

---

## Key Configuration Files

### `payload.config.ts`

Central Payload configuration:

- **Database** — `postgresAdapter` with `DATABASE_URL`
- **Collections** — `Users`, `Media` (more to be added)
- **Storage** — Cloudinary plugin for the `media` collection
- **Types** — Generated to `src/payload-types.ts`

### `next.config.ts`

- Wrapped with `withPayload()` for Payload compatibility
- `images.remotePatterns` allows `next/image` to load from `res.cloudinary.com`

### `tsconfig.json`

- `@/*` → `./src/*`
- `@payload-config` → `./payload.config.ts`

---

## Environment Variables

Copy `.env.example` to `.env` and fill in real values locally. **Never commit secrets.**

Committed files are audited for secrets. `.gitignore` blocks `.env*`, key files, and credential JSON. Only `.env.example` (placeholder values) is tracked.

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |
| `PAYLOAD_SECRET` | Yes | Random string for JWT/session signing (32+ chars) |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `CLOUDINARY_FOLDER` | No | Upload folder prefix (default: `rajal-realestate`) |

### Example `.env`

```bash
# Local dev — direct Neon connection is fine
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require

PAYLOAD_SECRET=generate-a-long-random-string-here

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=rajal-realestate
```

### Neon on Vercel

Use the **pooled** connection string (hostname contains `-pooler`):

```
postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require
```

Direct connections exhaust serverless connection limits on Vercel.

---

## Collections

### Users

- Admin authentication collection
- Used by Payload admin at `/admin`
- Editors log in here to manage content

### Media

- Upload collection backed by Cloudinary
- `disableLocalStorage: true` — files are not stored on Vercel disk
- Public read access (`read: () => true`) for use on the marketing site
- Requires `alt` text field for accessibility

---

## Cloudinary Integration

Payload has no official `@payloadcms/storage-cloudinary` package. This project uses:

1. `@payloadcms/plugin-cloud-storage` — official cloud storage plugin
2. Custom adapter in `src/storage/cloudinaryAdapter.ts` — upload, delete, URL generation
3. Wrapper in `src/storage/cloudinaryStorage.ts` — plugin configuration

### Upload flow

```
Admin uploads file
    → Payload receives file on Vercel server
    → cloudinaryAdapter.handleUpload()
    → File streamed to Cloudinary
    → Public URL stored in Neon (metadata only)
```

### Important: Vercel upload limit

Vercel serverless functions have a **~4.5 MB request body limit**. Uploads larger than this will fail unless client-side uploads (direct browser → Cloudinary) are implemented.

For property photos, plan upload sizes or add client uploads before launch.

---

## Development

### Prerequisites

- Node.js 20.9+ (see `.nvmrc`)
- pnpm (see `packageManager` in `package.json`)
- Neon database (free tier works for dev)
- Cloudinary account

### Commands

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Open admin panel
open http://localhost:3000/admin

# Generate TypeScript types after schema changes
pnpm run generate:types

# Regenerate admin import map after plugin/field changes
pnpm run generate:importmap

# Generate Drizzle DB schema (Postgres)
pnpm run generate:db-schema

# Create a new migration after collection/schema changes
pnpm run migrate:create -- <name>
```

### Local database

Payload auto-pushes schema changes to Postgres in development (`push: true` by default). No manual migrations needed locally while iterating on collections.

---

## Production Deployment (Vercel)

### Build pipeline

`package.json` runs migrations before the Next.js build:

```json
{
  "scripts": {
    "migrate": "payload migrate",
    "build": "payload migrate && next build"
  }
}
```

Vercel uses `pnpm` automatically via the `packageManager` field. The build connects to Neon using `DATABASE_URL`, applies pending migrations in `src/migrations/`, then runs `next build`.

### Vercel environment variables

Set all variables from the [Environment Variables](#environment-variables) table in the Vercel project dashboard for Production, Preview, and Development environments.

### Deploy steps

1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables
4. Deploy — Vercel runs `next build` automatically

---

## API Reference

Payload exposes a REST API (GraphQL is intentionally not enabled).

| Endpoint | Description |
|----------|-------------|
| `GET /api/users` | List users (auth required) |
| `GET /api/media` | List media files |
| `GET /api/media/:id` | Single media item |
| `POST /api/media` | Upload media (auth required) |

Full API docs are available in the Payload admin under each collection's API tab.

### Fetching content in Next.js

```typescript
import type { Media } from '@/payload-types'

const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/media`, {
  next: { revalidate: 60 },
})

const data = await res.json()
const media: Media[] = data.docs
```

---

## Production Checklist

### Before first deploy

- [x] Set up Neon production database
- [x] Use **pooled** `DATABASE_URL` on Vercel
- [x] Set strong `PAYLOAD_SECRET` (32+ random characters)
- [x] Configure all Cloudinary env vars on Vercel
- [x] Add `payload migrate` to build pipeline
- [x] Create and commit initial database migration

### Before launch

- [ ] Define content collections (Pages, Properties, Site Settings)
- [ ] Add access control rules per collection
- [ ] Plan large image upload strategy (client uploads or size limits)
- [ ] Set up error monitoring (e.g. Sentry)
- [ ] Configure staging environment (separate Neon branch)
- [ ] Test admin login and media upload on production URL

### Nice to have

- [ ] CI pipeline (lint, typecheck, migrate, build)
- [x] Switch from Bun to pnpm for Vercel alignment
- [ ] CDN caching headers for public pages
- [ ] Draft/preview workflow for editors

---

## Production Readiness Scorecard

| Area | Status | Notes |
|------|--------|-------|
| Architecture | ✅ Ready | Correct stack and structure |
| Payload integration | ✅ Ready | Admin + REST API wired |
| Neon PostgreSQL | ✅ Ready | Adapter configured |
| Cloudinary storage | ⚠️ Partial | Works; watch Vercel 4.5 MB upload limit |
| DB migrations | ✅ Ready | `src/migrations/` + `payload migrate` in build |
| Secrets management | ✅ Ready | `.env*` gitignored; only `.env.example` committed |
| Access control | ⚠️ Partial | Only Users + Media; expand with new collections |
| Content model | ❌ Todo | Marketing content collections not built |
| CI/CD & monitoring | ❌ Todo | Not configured |

---

## Package Manager

This project uses **pnpm** (`pnpm-lock.yaml`, `packageManager` in `package.json`). Vercel detects pnpm automatically from the lockfile and `packageManager` field.

```bash
pnpm install
pnpm dev
```

Use Node 20 LTS locally (see `.nvmrc`). Payload CLI commands such as `migrate:create` require Node 20 — Node 22+ can fail with a `tsx` loader error.

---

## Related Documentation

- [Payload Installation](https://payloadcms.com/docs/getting-started/installation)
- [Payload Postgres Adapter](https://payloadcms.com/docs/database/postgres)
- [Payload Storage Adapters](https://payloadcms.com/docs/upload/storage-adapters)
- [Neon + Vercel](https://neon.tech/docs/guides/vercel)
- [Rebuild Content Guide](./rebuild-content-guide.md) — site content and copy reference

---

## Changelog

| Date | Change |
|------|--------|
| 2025-06-25 | Initial architecture doc — Payload v3, Neon, Cloudinary, Vercel stack |
| 2025-06-25 | Production prep — pnpm, DB migrations in build, secrets hardening |
