# Gerenciamento de Estado

Este documento descreve o gerenciamento de estado com **Zustand** (estado global) e **TanStack Query** (estado do servidor).

---

## Zustand (Estado Global)

Duas stores em `src/store/`:

### `period.ts` — Período selecionado

Controla o período atual dos filtros do dashboard.

```ts
interface PeriodState {
  period: QueryPeriod // 'today' | '7d' | '30d' | '90d' | '1y' | 'all'
  setPeriod: (period: QueryPeriod) => void
}
```

Valor inicial: `'today'`.

### `permissions.ts` — Permissões do usuário

Store criada via `createPermissionsStore()` (factory, não hook direto). Provê o método `can(feature, compareToId?)` que encapsula `can()` de `@/lib/can`.

```ts
interface PermissionsStore {
  user?: User | null
  can: (
    feature: Feature | Feature[],
    compareToId?: string | string[],
  ) => boolean
  setPermissions: (user?: User | null) => void
}
```

A store é inicializada pelo `PermissionsProvider` em `src/providers/permissions-provider.tsx` com o usuário atual obtido no layout do dashboard.

---

## TanStack Query (Estado do Servidor)

**Arquivo:** `src/lib/tanstack-query.ts`

```ts
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minuto
      },
    },
  })
}
```

- No **servidor**: novo `QueryClient` a cada requisição.
- No **cliente**: singleton persistido.
- `staleTime: 60s` — dados são considerados frescos por 1 minuto.

---

## Resumo

- **Zustand**: estado local/global de UI (`period`, `permissions`).
- **TanStack Query**: cache e sincronização de dados do servidor.
