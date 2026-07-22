<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# ABNMO Frontend — Agent Guide

## Stack

- **Next.js 16** (App Router), **TypeScript** (strict), **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **State**: Zustand (global) + TanStack Query (server state)
- **UI**: Radix UI primitives + `class-variance-authority` variants, `lucide-react` icons
- **Forms**: React Hook Form + Zod
- **Test**: Jest + Testing Library (currently broken — env vars missing in `.env.local`, skip `npm test` for now)
- **Lint**: ESLint 9 flat config (`eslint-config-next/core-web-vitals` + `typescript-eslint` + `simple-import-sort` + Prettier)

## Setup

```bash
cp env.sample .env.local   # NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_API_URL, NEXT_PUBLIC_DOMAIN
npm install                 # save-exact=true (no ^ ranges)
npm run dev                 # localhost:3000
```

## Commands

| Command                       | What it does              |
| ----------------------------- | ------------------------- |
| `npm run dev`                 | Next.js dev server        |
| `npm test`                    | Jest (full suite)         |
| `npm run test:watch`          | Jest --watch              |
| `npm run build`               | `next build`              |
| `npm run build:analyze`       | `ANALYZE=true next build` |
| `npm run lint:tsc`            | `tsc --noEmit`            |
| `npm run lint:eslint:check`   | ESLint + `tsc --noEmit`   |
| `npm run lint:prettier:check` | Prettier check            |
| `npm run lint:prettier:fix`   | Prettier write            |

**Pre-commit** (husky): lint-staged → `prettier --check` + `eslint` on `*.{js,jsx,ts,tsx}`, prettier only on `*.{json,md,mdx,css,yaml,yml}`.  
**Commit-msg** (husky): `commitlint` enforces conventional commits.

## Repo map

```
src/
  app/              Routes (Portuguese), pages use App Router
  actions/          Next.js Server Actions
  components/       Reusable React components
    ui/             Base primitives (cva variants, Radix)
  modules/          Feature-level business logic
  store/            Zustand stores (sidebar, permissions, period)
  lib/              Library configs (api client, tanstack-query, fonts)
  config/           App config (env.ts with Zod validation)
  constants/        Routes, cache keys, cookies, regex, etc.
  enums/            Enums for params, patients, queries, etc.
  helpers/          Business-logic helpers
  hooks/            Custom hooks
  schemas/          Zod schemas
  types/            Global TS types
  utils/            Pure utilities (cn, formatters, sanitizers)
  proxy.ts          Next.js 16 proxy — checks session cookie for route protection
tests/
  components/       Test files mirror src/components structure
  utils/            (empty)
docs/               Full project docs (naming, files-and-folders, components, styling, permissions)
```

## Conventions

- **File naming**: kebab-case (`patient-list.tsx`)
- **Component naming**: PascalCase with domain context (`PatientsListTable`, not `Table`)
- **Route folders**: Portuguese (`pacientes/`, `conta/`), grouping in English `(dashboard)/`
- **Internal route folders** (non-route): prefix `_` (`_components/`, `_types/`)
- **Page/Layout exports**: default export named `Page` or `Layout`
- **Imports**: absolute `@/` alias, organized by `simple-import-sort` (external → internal → relative)
- **Code**: English names (except Portuguese route names), no comments unless necessary
- **CSS**: Tailwind v4 `@theme` directive for design tokens, `@utility` for custom utilities
- **`cn()`**: from `@/utils/class-name-merge` (clsx + tailwind-merge)
- **Commit messages**: Conventional commits, English, present tense, Zinsser-brief

## API pattern

Server/client-safe fetch via `api<Data>(path, { params, ...fetchOptions })` from `@/lib/api`.  
Automatically attaches cookies server-side, handles 401 redirects.  
TanStack Query `staleTime`: 60s default.

## Permissions

`canUser(action, resource)` in `@/actions/auth/can-user.ts`.  
Actions: `manage | view | create | update | delete`  
Resources: `all | Dashboard | PatientDashboard | Patients | Appointments | Statistics | Users`  
User roles: Administração, Gestão, Enfermagem, Especialista, Paciente

## CI

PRs to `main` and `staging` run:

- **linting.yaml**: Prettier check + ESLint check
- **tests.yaml**: `npm test` (Jest)

## Env vars (validated by Zod in `src/config/env.ts`)

```
NEXT_PUBLIC_APP_URL   http://localhost:3000
NEXT_PUBLIC_API_URL   http://localhost:3333
NEXT_PUBLIC_DOMAIN    localhost
```

## Writing style (Zinsser)

- Cut qualifiers, redundant pairs, throat-clearing, jargon
- Active voice, lead with the result, one idea per sentence
- Write commands, not suggestions
