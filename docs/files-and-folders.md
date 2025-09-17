# Documentação de arquivos e pastas

Este documento estabelece as diretrizes para organização e criação de arquivos e pastas no projeto, definindo onde cada tipo de código deve ser localizado para manter a estrutura consistente e escalável.

## Regras gerais

- **Reutilização**: Componentes e utilities globais ficam em `src/components/` e `src/utils/`
- **Escopo específico**: Arquivos específicos de uma página ficam na pasta correspondente em `src/app/`
- **Prefixo underscore**: Pastas que não são rotas em `src/app/` devem usar prefixo `_`
- **Nomenclatura**: Siga as [convenções de nomenclatura](./naming.md) do projeto
- **Agrupamento**: Organize por funcionalidade e contexto

## Estrutura principal do projeto

```
src/
  actions/          ← Server actions do Next.js
  app/              ← Pages e layouts (App Router)
  components/       ← Componentes React reutilizáveis
  config/           ← Configurações da aplicação
  constants/        ← Constantes e enums
  helpers/          ← Funções auxiliares reutilizáveis
  hooks/            ← Custom hooks reutilizáveis
  lib/              ← Configurações de bibliotecas
  store/            ← Estado global (Zustand)
  types/            ← Types TypeScript globais
  utils/            ← Utilities e formatadores
  middleware.ts     ← Middleware do Next.js
```

## Componentes React

### Componentes globais reutilizáveis

**Localização**: `src/components/`

Para componentes que serão utilizados em múltiplos locais:

```
src/components/
  breadcrumbs.tsx           ← Componente único global
  auth/                     ← Grupo de componentes de autenticação
    auth-card.tsx
  dashboard/                ← Grupo de componentes do dashboard
    container.tsx
    tab-buttons.tsx
  charts/                   ← Grupo de componentes de gráficos
    bar.tsx
    custom-tooltip.tsx
```

### Componentes de UI base

**Localização**: `src/components/ui/`

Componentes primitivos e unitários baseados em bibliotecas como Radix:

```
src/components/ui/
  button.tsx               ← Componente simples
  input.tsx
  card.tsx
  select/                  ← Componente composto com subcomponentes
    index.tsx
    trigger.tsx
    content.tsx
    item.tsx
  calendar/                ← Componente complexo isolado
    index.tsx
    dropdown-nav.tsx
    step-nav.tsx
```

### Componentes compostos

**Localização**: `src/components/{nome-componente}/`

Componentes que usam múltiplos componentes UI e possuem contexto próprio:

```
src/components/
  form/                    ← Sistema de formulários
    text-input.tsx
    select-input.tsx
    form-container.tsx
    password-requirements.tsx
  data-table/              ← Sistema de tabelas
    header/
      index.tsx
      search.tsx
      filter-button.tsx
    filters/
      index.tsx
      status.tsx
      date.tsx
  pagination/              ← Sistema de paginação
    index.tsx
    button.tsx
```

### Componentes específicos de página

**Localização**: `src/app/{rota}/_components/`

Para componentes usados apenas em uma página específica:

```
src/app/
  pacientes/
    _components/           ← Componentes específicos desta rota
      patients-table-actions.tsx
      patient-details-modal.tsx
  (dashboard)/
    _sidebar/              ← Componentes do sidebar
      index.tsx
      container.tsx
      menu-section.tsx
    _header/               ← Componentes do header
      index.tsx
```

## Hooks personalizados

### Hooks globais reutilizáveis

**Localização**: `src/hooks/`

```
src/hooks/
  debounce.ts              ← Hook de debounce global
  params.ts                ← Hook de query parameters
  use-local-storage.ts     ← Hook de localStorage
```

### Hooks específicos

**Localização**: `src/app/{rota}/_hooks/` ou junto ao componente

```
src/app/
  paciente/triagem/
    hooks.ts               ← Hook específico da triagem
  _hooks/                  ← Hooks específicos da área
    use-patient-data.ts
```

## Types e interfaces

### Types globais

**Localização**: `src/types/`

Para types usados em múltiplos locais:

```
src/types/
  patients.ts              ← Types relacionados a pacientes
  users.ts                 ← Types relacionados a usuários
  api.ts                   ← Types de API
```

### Types específicos

**Localização**: `src/app/{rota}/_types/`

```
src/app/
  pacientes/
    _types/
      patient-filters.ts   ← Types específicos desta funcionalidade
```

## Constants e configurações

### Constants globais

**Localização**: `src/constants/`

```
src/constants/
  routes.ts                ← Rotas da aplicação
  brazilian-states.ts      ← Estados brasileiros
  regex.ts                 ← Expressões regulares
  cache.ts                 ← Cache keys
  params.ts                ← Query parameters
  breadcrumbs/             ← Configurações de breadcrumbs
    index.ts
    dashboard.ts
    patient.ts
```

### Configurações de biblioteca

**Localização**: `src/lib/`

```
src/lib/
  api.ts                   ← Configuração da API
  fonts.ts                 ← Configuração de fontes
  tanstack-query.ts        ← Configuração do TanStack Query
  permissions/             ← Sistema de permissões
```

### Configurações da aplicação

**Localização**: `src/config/`

```
src/config/
  env.ts                   ← Variáveis de ambiente
```

## Utilities e helpers

### Utilities globais

**Localização**: `src/utils/`

Funções puras e formatadores:

```
src/utils/
  class-name-merge.ts      ← Utility principal (cn)
  wait.ts                  ← Delay function
  formatters/              ← Formatadores de dados
    format-date.ts
    format-phone-number.ts
    format-cpf-number.ts
  mock/                    ← Dados de mock
    patients.ts
    users.ts
```

### Helpers globais

**Localização**: `src/helpers/`

Funções com lógica de negócio:

```
src/helpers/
  convert-object-to-options.ts  ← Conversão para select options
  local-storage.ts              ← Gerenciamento de localStorage
  auth/                         ← Helpers de autenticação
    get-password-requirement.ts
```

## Actions e estado

### Server actions

**Localização**: `src/actions/`

Server actions do Next.js:

```
src/actions/
  auth.ts                  ← Ações de autenticação
  users.ts                 ← Ações de usuários
  cache.ts                 ← Ações de cache
  cookies.ts               ← Gerenciamento de cookies
  token.ts                 ← Gerenciamento de tokens
```

### Estado global

**Localização**: `src/store/`

Estados globais usando Zustand:

```
src/store/
  sidebar.ts               ← Estado do sidebar
  user.ts                  ← Estado do usuário atual
  theme.ts                 ← Estado do tema (se houver)
```

## Exemplos práticos de organização

### Feature completa - Pacientes

```
src/
  types/
    patients.ts            ← Types globais de pacientes
  constants/
    patients.ts            ← Constants de pacientes
  components/
    patients-table.tsx     ← Tabela reutilizável
  app/
    (dashboard)/
      pacientes/
        _components/       ← Componentes específicos
          patient-details-modal.tsx
          patients-table-actions.tsx
        _hooks/
          use-patient-filters.ts
        _types/
          patient-filters.ts
        page.tsx           ← Página principal
        [id]/
          page.tsx         ← Página de detalhes
```

### Componente UI complexo - Calendar

```
src/components/ui/
  calendar/
    index.tsx              ← Componente principal
    dropdown-nav.tsx       ← Navegação dropdown
    step-nav.tsx          ← Navegação step
```

### Sistema de formulários

```
src/components/
  form/                    ← Sistema completo
    form-container.tsx     ← Container base
    form-field.tsx         ← Field wrapper
    form-message.tsx       ← Mensagens
    text-input.tsx         ← Input de texto
    select-input.tsx       ← Input de select
    password-input.tsx     ← Input de senha
    password-requirements.tsx  ← Requisitos de senha
```

### Utilities por categoria

```
src/utils/
  class-name-merge.ts      ← Utility base
  wait.ts                  ← Delay function
  formatters/              ← Formatadores específicos
    format-date.ts
    format-phone-number.ts
    format-cpf-number.ts
  mock/                    ← Dados de desenvolvimento
    patients.ts
    users.ts
```

## Diretrizes de decisão

### Onde criar um novo arquivo?

**Pergunte-se:**

1. **É reutilizável?** → `src/components/`, `src/hooks/`, `src/utils/`
2. **É específico de uma página?** → `src/app/{rota}/_components/`
3. **É um componente UI base?** → `src/components/ui/`
4. **É um sistema complexo?** → `src/components/{nome-sistema}/`
5. **É configuração?** → `src/config/` ou `src/lib/`
6. **É constante global?** → `src/constants/`
7. **É tipo global?** → `src/types/`

### Criando uma nova feature

1. **Types**: Crie em `src/types/{feature}.ts` se global
2. **Constants**: Adicione em `src/constants/{feature}.ts`
3. **Components**: Crie em `src/components/{feature}/` se reutilizável
4. **Page components**: Crie em `src/app/{rota}/_components/`
5. **Hooks**: Crie em `src/hooks/` se global, ou `_hooks/` se específico
6. **Utils**: Adicione em `src/utils/` ou `src/helpers/`

## Boas práticas

### 1. Organização

- Mantenha arquivos relacionados próximos
- Use pastas para agrupar funcionalidades
- Evite aninhamento excessivo (máximo 3 níveis)

### 2. Nomenclatura

- Arquivos em kebab-case
- Pastas em kebab-case
- Componentes em PascalCase
- Siga as [convenções de nomenclatura](./naming.md)

### 3. Reutilização

- Identifique padrões comuns
- Extraia lógica repetitiva para utilities
- Crie componentes reutilizáveis quando apropriado

### 4. Escopo

- Mantenha código específico próximo ao uso
- Promova para global apenas quando necessário
- Evite dependências circulares

### 5. Imports

- Use imports absolutos com `@/`
- Organize imports por categoria (externos, internos, relativos)
- Use barrel exports (index.ts) quando apropriado

## Checklist de organização

Antes de criar novos arquivos, verifique:

- O arquivo é realmente necessário ou pode usar existente?
- A localização segue as diretrizes estabelecidas?
- O nome segue as convenções de nomenclatura?
- A pasta parent existe ou precisa ser criada?
- O arquivo se relaciona com outros da mesma área?
- Os imports estão organizados corretamente?
- A funcionalidade é específica ou reutilizável?
- Existe um padrão similar já estabelecido?
- A estrutura facilita a manutenção futura?
- O código segue o princípio DRY (Don't Repeat Yourself)?
