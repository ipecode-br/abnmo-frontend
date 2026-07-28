# Sistema Viver Melhor (SVM) — Front-End

Aplicação Front-End do **Sistema Viver Melhor (SVM)**, desenvolvida para a ABNMO. Plataforma centralizada para equipes multidisciplinares de saúde com acompanhamento de pacientes, gerenciamento de encaminhamentos e consolidação de informações clínicas.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** (`@tailwindcss/postcss`) + Base UI (`@base-ui/react`) + CVA
- **TanStack Query** (server state) + **Zustand** (global state)
- **React Hook Form** + **Zod** (form management and validation)
- **Recharts** (charts) + **lucide-react** (icons) + **date-fns** (dates)
- **Jest** + **Testing Library** (tests)
- **ESLint 9** flat config + **Prettier** (linting/formatting)
- **Husky** + **lint-staged** + **commitlint** (git hooks)

## Pré-requisitos

- Node.js 20.9.0 (LTS) ou superior
- NPM

## Estrutura

```
src/
  app/              Rotas em português (App Router)
  actions/          Server Actions do Next.js
  components/       Componentes React reutilizáveis
  modules/          Lógica de negócio por funcionalidade
  providers/        Providers de contexto React
  store/            Stores Zustand (period, permissions)
  lib/              Configurações (api client, tanstack-query, fonts, can)
  config/           Configurações da aplicação (env.ts, cache.ts)
  constants/        Rotas, cache keys, cookies, regex, etc.
  enums/            Enums para features, pacientes, queries, etc.
  helpers/          Funções auxiliares de negócio
  hooks/            Custom hooks
  schemas/          Schemas Zod
  types/            Tipos globais TypeScript
  utils/            Utilitários puros (cn, formatters, sanitizers)
  proxy.ts          Proxy Next.js 16 — proteção de rotas via cookie de sessão
```

## Configuração

```bash
cp .env.sample .env.local   # Configurar variáveis de ambiente
npm install                 # save-exact=true (sem ranges ^)
npm run dev                 # http://localhost:3000
```

### Variáveis de ambiente

| Variável              | Padrão                  | Descrição              |
| --------------------- | ----------------------- | ---------------------- |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | URL da aplicação       |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3333` | URL da API             |
| `NEXT_PUBLIC_DOMAIN`  | `localhost`             | Domínio (para cookies) |

Use `.env.local` para desenvolvimento e `.env.test` para testes.

## Comandos

| Comando                       | Descrição                   |
| ----------------------------- | --------------------------- |
| `npm run dev`                 | Servidor de desenvolvimento |
| `npm test`                    | Jest (suíte completa)       |
| `npm run test:watch`          | Jest --watch                |
| `npm run build`               | `next build`                |
| `npm run build:analyze`       | `ANALYZE=true next build`   |
| `npm run start`               | `next start`                |
| `npm run lint:tsc`            | `tsc --noEmit`              |
| `npm run lint:eslint:check`   | ESLint check                |
| `npm run lint:prettier:check` | Prettier check              |
| `npm run lint:prettier:fix`   | Prettier write              |
| `npm run validate`            | Prettier + ESLint + tsc     |
