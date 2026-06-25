<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Rajal Realty (RealtyReach) — Agent Guide

Single-repo Next.js 16 + Payload CMS v3 real estate site for Rajal Realty, Ahmedabad. Follow this file first; use linked docs for detail.

---

## Documentation map

| When you need… | Read |
|----------------|------|
| Phases, routes, CMS model, component map | [`docs/plan.md`](docs/plan.md) |
| Stack, env vars, migrations, deployment | [`docs/architecture.md`](docs/architecture.md) |
| Verbatim marketing copy (home, about, contact) | [`docs/rebuild-content-guide.md`](docs/rebuild-content-guide.md) |
| Colors, typography, component rules | [`docs/design_system.md`](docs/design_system.md) |

**Authority:** `design_system.md` overrides legacy colors in `rebuild-content-guide.md`. `plan.md` is the product roadmap.

---

## Current status

| Phase | Status |
|-------|--------|
| 0 — Infrastructure | ✅ Complete |
| 1 — Design system & layout shell | ✅ Complete |
| 2 — Marketing pages | 🔜 Next |
| 3–6 — CMS, listings, search, polish | Not started |

**Phase 1 delivered:** Modern Sanctuary tokens, Lora + DM Sans, shadcn Button/Card/Sheet, `Navbar` / `Footer` / `PageHeader` / `Section`, site metadata, logo placeholder, minimal home page.

**Do not** re-implement the layout shell unless explicitly asked. Build Phase 2+ on existing primitives.

---

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16, React 19, App Router |
| CMS | Payload CMS v3 (`/admin`, `/api/*`) |
| Database | Neon PostgreSQL (`postgresAdapter`) |
| Media | Cloudinary via custom adapter |
| Styling | Tailwind CSS v4, shadcn/ui (radix-luma) |
| Icons | `lucide-react` |
| Package manager | **pnpm** (never npm/yarn) |
| Node | 20 LTS (see `.nvmrc`) — required for `migrate:create` |

---

## Project structure

```
src/app/(my-app)/     → Public site (/, /about, /contact, /properties, …)
src/app/(payload)/    → Payload admin + API — avoid editing generated files
src/collections/      → Payload collection configs
src/components/
  layout/             → Navbar, Footer, PageHeader, Section
  home/               → Hero, services, investments, CTA (Phase 2)
  properties/         → Cards, filters, gallery (Phase 4–5)
  contact/            → Contact form (Phase 2)
  ui/                 → shadcn primitives — add via CLI, then customize
src/migrations/       → Committed DB migrations (required for schema changes)
src/storage/          → Cloudinary adapter
payload.config.ts     → Payload entry config
```

Route group folder names `(my-app)` and `(payload)` **do not** appear in URLs.

---

## Commands

```bash
pnpm install
pnpm dev              # migrate + next dev
pnpm build            # migrate + next build
pnpm lint
pnpm run generate:types
pnpm run generate:importmap   # after plugin/field changes
pnpm run migrate:status
pnpm run migrate:create -- <name>
pnpm payload migrate:fresh    # destructive — dev only
```

---

## Conventions

### Scope & diffs

- Minimize scope. Match existing patterns (imports, naming, component style).
- Do not edit unrelated files. Do not commit unless asked.
- Do not add tests unless requested or they cover real behavior.
- Marketing copy for v1 is **hardcoded in React** — not CMS-driven.

### Public frontend (`src/app/(my-app)/`)

- Server Components by default; `"use client"` only for interactivity (forms, sheets, pathname).
- Use `PageHeader` on inner pages (about, contact); home uses a hero, not `PageHeader`.
- Use `Section` for vertical rhythm (`py-20`, `container mx-auto px-4`).
- Fetch CMS data server-side (Payload Local API or REST) in RSC — no client fetch for listings.
- Site title: `RealtyReach - Rajal Realty`. Language: `en`.

### Design system — Modern Sanctuary

- Tokens live in `src/app/(my-app)/globals.css` — use semantic classes (`bg-primary`, `text-accent`), not hardcoded hex.
- **Lora** = headings (`font-heading` / `h1–h6`). **DM Sans** = body/UI (`font-sans`).
- Cards: `rounded-[var(--radius)]` (16px), `shadow-soft`.
- Buttons: `rounded-[8px]`, primary = Sage (`--primary`).
- **Terracotta (`--accent`)** — RERA badges and trust signals only.
- Section spacing: `py-20` between major blocks.
- Legacy deep-blue palette from old site is **never** used.

### Responsive & mobile-friendly

All public UI must be **mobile-first** and work well from 320px through desktop. Real estate users browse heavily on phones — treat mobile as the default, then enhance for larger breakpoints.

- **Layout:** Single column on mobile; use Tailwind breakpoints (`sm:`, `md:`, `lg:`) to expand grids and side-by-side layouts. Never assume desktop-only widths.
- **Touch targets:** Buttons, nav links, and form controls ≥ 44px tap area. Use adequate padding (`py-3`, `min-h-11`) on interactive elements.
- **Navigation:** Mobile uses the Sheet drawer (`Navbar`); desktop shows inline links. New nav patterns must follow the same split.
- **Typography:** Scale headings down on small screens (e.g. `text-3xl md:text-4xl lg:text-5xl`). Keep body text readable without horizontal scroll.
- **Spacing:** Reduce section padding on mobile if needed (`py-12 md:py-20`). Maintain `px-4` container gutters.
- **Images & media:** Responsive `next/image` sizes; hero ~60vh with `min-h-[400px]`. Property galleries must be swipe-friendly (Phase 4).
- **Forms:** Full-width inputs on mobile; stack label/field vertically. Avoid tiny hit areas on checkboxes and submit buttons.
- **Property detail (Phase 4):** Sticky mobile bar with Call Now + Contact Us.
- **No horizontal overflow:** Test that pages do not scroll sideways at 375px width.
- **Verify:** Resize browser or use devtools — mobile sheet, readable text, tappable CTAs, grids collapsing to one column.

### shadcn/ui

- Config: [`components.json`](components.json) — CSS path is `src/app/(my-app)/globals.css`.
- Add components: `pnpm dlx shadcn@latest add <name> --yes` (skip overwrite on `button.tsx` if customized).
- Prefer extending `src/components/ui/*` over one-off styled elements.

### Payload CMS & database

- **`push: false`** — schema changes **must** go through migrations. Never rely on dev auto-push.
- After collection/field changes:
  1. `pnpm run generate:types`
  2. `pnpm run migrate:create -- <descriptive_name>`
  3. Review `src/migrations/`
  4. `pnpm run migrate` (also runs on `dev` and `build`)
  5. Commit migration with schema change
- Access: public read on listings/taxonomy; auth-required write. `Inquiries` collection is Phase 6.
- Media uploads go to Cloudinary; respect **~4.5 MB** Vercel serverless body limit.
- Do not hand-edit `src/payload-types.ts` or `src/payload-generated-schema.ts`.

### Payload route group

- Do not modify generated files under `src/app/(payload)/admin/importMap.js` without running `generate:importmap`.
- REST API at `/api/*`; GraphQL is not enabled.

### Images

- Use `next/image` with `res.cloudinary.com` remote pattern (configured in `next.config.ts`).
- Logo: `/logo.svg`, alt `Rajal Realty Logo`.

### Environment

- Copy `.env.example` → `.env`. Never commit secrets.
- Required: `DATABASE_URL`, `PAYLOAD_SECRET`, Cloudinary vars.

---

## Component map (target)

Reuse before creating new abstractions:

| Area | Location |
|------|----------|
| Layout shell | `src/components/layout/` |
| Home sections | `src/components/home/` |
| Property UI | `src/components/properties/` |
| Contact form | `src/components/contact/` |
| shadcn primitives | `src/components/ui/` |
| Payload schemas | `src/collections/` |
| Data helpers | `src/lib/`, `src/lib/queries/` |

---

## Common pitfalls

1. **Migration drift** — Tables exist but `payload_migrations` is empty → run `migrate:fresh` on dev DB or baseline manually. With `push: false`, this should not recur if migrations are committed.
2. **Wrong route group** — Public pages go in `(my-app)`, not `(payload)`.
3. **Legacy colors** — Do not use `#003366` / teal from rebuild guide §1.
4. **Overwriting shadcn** — `shadcn add` may prompt to overwrite `button.tsx`; decline unless intentionally resetting.
5. **Node version** — `migrate:create` on Node 22+ can fail; use Node 20.
6. **Neon on Vercel** — Use pooled connection string (`-pooler` hostname).

---

## Verification before finishing

- `pnpm lint` on touched files
- `pnpm build` when changes affect app shell, routes, or Payload config
- Visual check: Warm Alabaster background, Sage primary, Lora headings
- Responsive check: 375px mobile — no horizontal scroll, tappable CTAs, readable type, grids stack correctly
- New routes: navbar links, metadata, mobile sheet menu

---

## Related files

- [`CLAUDE.md`](CLAUDE.md) — points here
- [`payload.config.ts`](payload.config.ts)
- [`package.json`](package.json)
