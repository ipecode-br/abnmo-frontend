<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# ABNMO Frontend — Agent Guide

## Stack

- **Next.js 16** (App Router), **TypeScript** (strict), **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **State**: Zustand (global) + TanStack Query (server state)
- **UI**: Base UI primitives (`@base-ui/react`) + `class-variance-authority` variants, `lucide-react` icons
- **Forms**: React Hook Form + Zod
- **Test**: Jest + Testing Library
- **Lint**: ESLint 9 flat config (`eslint-config-next/core-web-vitals` + `typescript-eslint` + `simple-import-sort` + Prettier)

## Setup

```bash
cp .env.sample .env.local   # NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_API_URL, NEXT_PUBLIC_DOMAIN
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
| `npm run start`               | `next start`              |
| `npm run build:analyze`       | `ANALYZE=true next build` |
| `npm run lint:tsc`            | `tsc --noEmit`            |
| `npm run lint:eslint:check`   | ESLint check              |
| `npm run lint:prettier:check` | Prettier check            |
| `npm run lint:prettier:fix`   | Prettier write            |
| `npm run validate`            | Prettier + ESLint + tsc   |

**Pre-commit** (husky): lint-staged → `prettier --check` + `eslint` on `*.{js,jsx,ts,tsx}`, prettier only on `*.{json,md,mdx,css,yaml,yml}`.  
**Commit-msg** (husky): `commitlint` enforces conventional commits.

## Repo map

```
src/
  app/              Routes (Portuguese), pages use App Router
  actions/          Next.js Server Actions
  components/       Reusable React components
    ui/             Base primitives (cva variants, Base UI)
  modules/          Feature-level business logic
  providers/        React context providers
  store/            Zustand stores (period, permissions)
  lib/              Library configs (api client, tanstack-query, fonts)
  config/           App config (env.ts with Zod validation, cache.ts)
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
- **Route folders**: Portuguese (`pacientes/`, `entrar/`), grouping in English `(dashboard)/`, `(auth)/`
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

`canUser(feature, compareToId?)` server action in `@/actions/auth/can-user.ts` wraps `can()` from `@/lib/can.ts`.  
Features follow `action:resource:scope` format (e.g. `read:user:others`, `create:appointment`).  
Admin users bypass all checks. The `:others` suffix skips ownership matching.  
Feature groups: `survey`, `patient`, `user`, `user-invite`, `appointment`, `referral`, `statistic`.

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

Use `.env.local` for development, `.env.test` for Jest.

## Writing style (Zinsser)

- Cut qualifiers, redundant pairs, throat-clearing, jargon
- Active voice, lead with the result, one idea per sentence
- Write commands, not suggestions
