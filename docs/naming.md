# Convenções de nomenclatura

Este documento estabelece as regras de nomenclatura para arquivos, componentes, pastas e outros elementos do projeto.

## Regras gerais

- **Idioma**: Todos os nomes devem ser em inglês
- **Exceção**: Pastas dentro de `app/` que servem de rota para páginas devem ser em português
- **Consistência**: Mantenha o mesmo padrão em todo o projeto

## Estrutura de arquivos

### Nomes de arquivos

Todos os arquivos devem seguir o padrão **kebab-case**:

```text
✅ Correto
password-requirements.tsx
auth-card.tsx
class-name-merge.ts

❌ Incorreto
passwordRequirements.tsx
AuthCard.tsx
classNameMerge.ts
```

### Estrutura de pastas

#### Pastas gerais

Pastas fora de `app/` devem ser em inglês e em **kebab-case**:

```text
src/
  components/
  constants/
  helpers/
  utils/
    formatters/
```

#### Pastas dentro de `app/`

**Rotas (português)**: Pastas que definem rotas devem ser em português usando **kebab-case**:

```text
app/
  pacientes/
  atendimentos/
  encaminhamentos/
  catalogacao/
  equipe/
  entrar/
  cadastrar/
  nova-senha/
  recuperar-senha/
```

**Agrupamento (inglês com parênteses)**: Pastas de agrupamento seguem o padrão do Next.js:

```text
app/
  (dashboard)/     ← Agrupamento de rotas do dashboard
  (auth)/           ← Agrupamento de rotas de autenticação
```

**Pastas internas (prefixo \_)**: Pastas que não são rotas devem começar com `_`:

```text
app/
  pacientes/
    _components/    ← Componentes específicos desta rota
    _types/         ← Types específicos desta rota
  (dashboard)/
    _aprovacoes/    ← Rotas internas de aprovações
    _configuracoes/ ← Rotas internas de configurações
```

## Componentes React

### Nomes de componentes

Componentes devem seguir o padrão **PascalCase** com **contexto descritivo**:

```tsx
✅ Correto - Com contexto
export function PasswordRequirements() {}
export function AuthCard() {}
export function PatientListTable() {}
export function DashboardHeader() {}

❌ Incorreto - Sem contexto suficiente
export function Requirements() {}
export function Card() {}
export function Table() {}
```

### Padrões de contexto

#### Arquivos de layout e páginas

```tsx
// layout.tsx - Sempre usar "Layout"
export default function Layout({ children }) {
  return <div>{children}</div>
}

// page.tsx - Sempre usar "Page"
export default function Page() {
  return <div>Conteúdo da página</div>
}
```

Os arquivos `layout.tsx` e `page.tsx` devem sempre exportar componentes com os nomes `Layout` e `Page`.

#### Componentes UI

```tsx
;(Button, Input, Checkbox, Select)
;(PasswordInput, DateInput, SelectInput)
```

#### Componentes de domínio

```tsx
;(PatientsTable, DashboardHeader, AuthCard, DataTableFilters)
```

## Organização por funcionalidade

### Componentes

```text
components/
  ui/                    ← Componentes base reutilizáveis
    button.tsx
    input.tsx
    checkbox.tsx
  form/                  ← Componentes de formulário
    text-input.tsx
    date-input.tsx
    form-container.tsx
  sidebar/               ← Componentes da sidebar
    index.tsx
    container.tsx
    menu-section.tsx
```

### Agrupamento por domínio

```text
app/
  (dashboard)/           ← Grupo dashboard
    layout.tsx
    page.tsx
    pacientes/
    atendimentos/

  pacientes/             ← Rota pacientes
    [id]/
      _components/
```

## Checklist de revisão

- Nome do arquivo está em kebab-case?
- Nome do componente está em PascalCase com contexto?
- Arquivos `layout.tsx` exportam componente `Layout`?
- Arquivos `page.tsx` exportam componente `Page`?
- Rota em português está correta?
- Pasta de agrupamento usa parênteses?
- Pasta interna usa prefixo `_`?
- Nome está em inglês (exceto rotas)?
