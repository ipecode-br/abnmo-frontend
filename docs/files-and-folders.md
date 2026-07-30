# Organização de arquivos e pastas

Diretrizes para onde cada tipo de código deve ser localizado.

## Regras gerais

- **Reutilização**: Componentes e utilities globais em `src/components/` e `src/utils/`
- **Escopo específico**: Arquivos de uma página na pasta correspondente em `src/app/`
- **Prefixo underscore**: Pastas não-rotas em `src/app/` usam prefixo `_`
- **Nomenclatura**: Siga as [convenções de nomenclatura](./naming.md)

## Estrutura principal

```
src/
  actions/          ← Server Actions do Next.js
  app/              ← Pages e layouts (App Router)
  components/       ← Componentes React reutilizáveis
  config/           ← Configurações (env.ts, cache.ts)
  constants/        ← Constantes e valores estáticos
  enums/            ← Enums TypeScript
  helpers/          ← Funções auxiliares com lógica de negócio
  hooks/            ← Custom hooks reutilizáveis
  lib/              ← Configurações de bibliotecas (api, tanstack-query, can, fonts)
  modules/          ← Lógica de negócio por funcionalidade
  providers/        ← Providers de contexto React
  schemas/          ← Schemas Zod compartilhados
  store/            ← Estado global (Zustand)
  types/            ← Tipos TypeScript globais
  utils/            ← Utilitários puros (formatters, validators, parsers)
  proxy.ts          ← Proxy de proteção de rotas (Next.js 16)
```

## Componentes React

### Componentes globais reutilizáveis

**Localização:** `src/components/`

```
src/components/
  breadcrumbs.tsx           ← Componente único global
  auth/
    auth-card.tsx           ← Card wrapper de autenticação
  dashboard/
    header.tsx              ← Header do dashboard
    tab-buttons.tsx         ← Abas de navegação
  sidebar/                  ← Sistema de sidebar
    index.tsx
    container.tsx
    header.tsx
    account.tsx
    menu-section.tsx
  charts/
    bar.tsx                 ← Gráfico de barras
    pie.tsx                 ← Gráfico de pizza
    custom-tooltip.tsx      ← Tooltip customizado
```

### Componentes de UI base

**Localização:** `src/components/ui/`

Componentes primitivos baseados em Base UI (`@base-ui/react`):

```
src/components/ui/
  button.tsx, input.tsx, card.tsx, checkbox.tsx
  dialog.tsx, popover.tsx, menu.tsx, select.tsx
  combobox.tsx, switch.tsx, tab-buttons.tsx, tab-select.tsx
  alert.tsx, avatar.tsx, divider.tsx, label.tsx
  nav-button.tsx, nav-link.tsx, skeleton.tsx, tag.tsx
  status-tag.tsx, page-loader.tsx, data-display.tsx
  date-picker.tsx, input-button.tsx, list.tsx, textarea.tsx
  chart-card.tsx
  calendar/
    index.tsx, nav.tsx
```

### Componentes compostos

**Localização:** `src/components/`

```
src/components/
  form/                    ← Sistema de formulários
    text-input.tsx, select-input.tsx, date-input.tsx
    password-input.tsx, password-requirements.tsx
    checkbox-input.tsx, combobox-input.tsx, file-input.tsx
    switch-input.tsx, switch-group-input.tsx, textarea-input.tsx
    form-container.tsx, form-message.tsx
  pagination/              ← Sistema de paginação
  filters/                 ← Filtros de tabela
  tags/                    ← Tags de status
```

### Componentes específicos de página

**Localização:** `src/app/{rota}/_components/`

```
src/app/
  pacientes/
    [id]/
      _components/         ← Componentes específicos dos detalhes do paciente
```

## Hooks

### Hooks globais

**Localização:** `src/hooks/`

```
src/hooks/
  debounce.ts, params.ts, cities.ts
  use-permissions.ts, use-patient-otions.ts, use-utils.ts
```

### Hooks específicos

**Localização:** `src/app/{rota}/_hooks/` ou junto ao componente

## Types

### Types globais

**Localização:** `src/types/`

```
src/types/
  patients.d.ts, users.d.ts, appointments.d.ts
  referrals.d.ts, surveys.d.ts, patient-requirements.d.ts, orders.d.ts
```

### Types específicos

**Localização:** `src/app/{rota}/_types/`

## Constants

**Localização:** `src/constants/`

```
src/constants/
  routes.ts, cookies.ts, cache.ts, regex.ts, auth.ts, charts.ts
  images.ts, section-tabs.ts, section-titles.ts
  breadcrumbs/             ← Configurações de breadcrumbs
  cities/
    index.ts, json/        ← Lista de cidades por estado (27 arquivos JSON)
```

## Configurações

### Bibliotecas

**Localização:** `src/lib/`

```
src/lib/
  api.ts, fonts.ts, tanstack-query.ts, can.ts
```

### Aplicação

**Localização:** `src/config/`

```
src/config/
  env.ts, cache.ts
```

## Modules (lógica de negócio)

**Localização:** `src/modules/`

```
src/modules/
  appointments/, auth/, overview/
  patient-requirements/, patient-supports/
  patients/, profile/, referrals/
  settings/, surveys/, users/
```

## Actions

**Localização:** `src/actions/`

```
src/actions/
  cookies.ts, sidebar.ts
  auth/
    can-user.ts, logout.ts
  users/
    get-current-user.ts, get-user.ts
  patients/
    get-patient.ts
  appointments/
    get-appointments.ts
  surveys/
    get-survey.ts, get-submission.ts
  statistics/
    get-total-appointments.ts, get-total-patients.ts, ...
```

## Store (Zustand)

**Localização:** `src/store/`

```
src/store/
  period.ts                ← Período selecionado nos filtros
  permissions.ts           ← Permissões do usuário
```

## Diretrizes de decisão

### Onde criar um novo arquivo?

1. **É reutilizável?** → `src/components/`, `src/hooks/`, `src/utils/`, `src/helpers/`
2. **É específico de uma página?** → `src/app/{rota}/_components/`
3. **É um componente UI base?** → `src/components/ui/`
4. **É lógica de negócio de uma feature?** → `src/modules/{feature}/`
5. **É configuração?** → `src/config/` ou `src/lib/`
6. **É constante global?** → `src/constants/`
7. **É tipo global?** → `src/types/`
8. **É um server action?** → `src/actions/`

### Criando uma nova feature

1. **Types**: `src/types/{feature}.d.ts` se global
2. **Constants**: `src/constants/` se necessário
3. **Modules**: `src/modules/{feature}/` para lógica de negócio
4. **Components**: `src/components/{feature}/` se reutilizável
5. **Page components**: `src/app/{rota}/_components/`
6. **Server actions**: `src/actions/{feature}/`

## Boas práticas

- Mantenha arquivos relacionados próximos
- Use pastas para agrupar funcionalidades
- Evite aninhamento excessivo (máximo 3 níveis)
- Use imports absolutos com `@/`
- Organize imports por categoria (externos, internos, relativos)
