<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# ABNMO Frontend — Agent Guide

## Project

Front end for the **Sistema Viver Melhor (SVM)**, built for ABNMO. A centralized platform for multidisciplinary health teams to track patients, manage referrals, and consolidate clinical information.

This guide covers the project's concepts, structure, and conventions. Dependencies, scripts, and configuration values change often: read `package.json`, `.env.sample`, and the referenced config files for their current state.

## Stack

- **Framework**: Next.js App Router with React and strict TypeScript
- **Styling**: Tailwind CSS with Base UI primitives and `class-variance-authority` variants
- **State**: Zustand for global state and TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Tests**: Jest and Testing Library
- **Quality**: ESLint, Prettier, Husky, and commitlint
- **Charts and icons**: Recharts and Lucide React

Check `package.json` for current versions and available scripts.

## Setup

```bash
cp .env.sample .env.local
npm install
npm run dev
```

Dependencies use exact versions. Do not add `^` or `~` ranges.

## Commands

`package.json` is the source of truth for scripts. The common ones:

| Command            | Purpose                              |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the development server         |
| `npm test`         | Run the full test suite              |
| `npm run validate` | Run Prettier, ESLint, and TypeScript |
| `npm run build`    | Create a production build            |

Run `npm run validate` and `npm test` before pushing. Git hooks format and lint staged files and enforce conventional commit messages.

## Structure

```
src/
  app/          Routes (Portuguese) and layouts
  modules/      Feature-level business logic
  components/   Shared components; ui/ holds Base UI primitives
  actions/      Server Actions
  lib/          Integrations and library configuration
  config/       Application configuration
  providers/    React context providers
  store/        Zustand stores
  hooks/        Custom hooks
  helpers/      Business-logic helpers
  schemas/      Zod schemas
  constants/    Routes, cache keys, cookies, regex
  enums/        Shared enums
  types/        Global TypeScript types
  utils/        Pure utilities
tests/          Tests that mirror the component structure
docs/           In-depth project documentation
```

`src/proxy.ts` protects routes by checking the session cookie.

If a new file does not fit an existing area, follow the closest pattern and read the matching guide in `docs/`.

## Conventions

- **Files**: kebab-case (`patient-list.tsx`).
- **Components**: PascalCase with domain context (`PatientsListTable`, not `Table`).
- **Routes**: Portuguese (`pacientes/`, `entrar/`); grouping folders in English (`(dashboard)/`, `(auth)/`).
- **Internal folders**: prefix with `_` (`_components/`, `_types/`).
- **Pages and layouts**: default export named `Page` or `Layout`.
- **Imports**: use the `@/` alias. `simple-import-sort` orders external, internal, then relative imports.
- **Code**: English names, except Portuguese routes. Add comments only when the reason is not obvious.
- **Styles**: follow `docs/styling/`. Define design tokens with `@theme` and custom utilities with `@utility` in the global stylesheet.
- **Class names**: merge with `cn()` from `@/utils/class-name-merge`.
- **Commits**: Conventional Commits in English, present tense, brief.

Read `docs/naming.md` and `docs/files-and-folders.md` for the full rules.

## API pattern

Import `api` from `@/lib/api` for server and client requests. It attaches cookies on the server and handles authentication redirects. Query defaults live in the TanStack Query configuration in `src/lib`.

## Permissions

`canUser(feature, compareToId?)` in `@/actions/auth/can-user.ts` wraps `can()` from `@/lib/can.ts`.

Features use `action:resource:scope`, such as `read:user:others` or `create:appointment`. Admin users bypass checks. The `:others` suffix skips ownership matching. See `docs/permissions.md` for the full model.

## CI

Pull requests run Prettier, ESLint, and the Jest suite. Run `npm run validate` and `npm test` locally before pushing.

## Environment

`.env.sample` lists the required keys. `src/config/env.ts` validates them at startup.

Copy `.env.sample` to `.env.local` for development. Jest reads `.env.test`. Do not commit real values.

## Writing style (Zinsser)

- Cut qualifiers, redundant pairs, throat-clearing, jargon
- Active voice, lead with the result, one idea per sentence
- Write commands, not suggestions
