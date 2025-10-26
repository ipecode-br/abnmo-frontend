# Convenções de nomenclatura

Este documento estabelece as regras de nomenclatura para arquivos, componentes, pastas e outros elementos do projeto. Todas as nomenclaturas devem seguir consistentemente os padrões definidos abaixo.

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
brazilian-states.ts

❌ Incorreto
passwordRequirements.tsx
AuthCard.tsx
classNameMerge.ts
BrazilianStates.ts
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
  data-table/
```

#### Pastas dentro de `app/`

**Rotas (português)**: Pastas que definem rotas da aplicação devem ser em português usando **kebab-case**:

```text
app/
  conta/
  pacientes/
  aprovacoes/
  configuracoes/
  encaminhados/
  suporte/
  nova-senha/
  recuperar-senha/
  seus-dados/
  laudo-medico/
  rede-de-apoio/
```

**Agrupamento (inglês com parênteses)**: Pastas de agrupamento seguem o padrão do Next.js:

```text
app/
  (dashboard)/     ← Agrupamento de rotas do dashboard
  (auth)/         ← Agrupamento de rotas de autenticação
```

**Pastas internas (prefixo \_)**: Pastas que não são rotas devem começar com `_`:

```text
app/
  pacientes/
    _components/    ← Componentes específicos desta rota
    _services/      ← Services específicos desta rota
    _types/         ← Types específicos desta rota
  (dashboard)/
    _cards/
    _header/
    _sidebar/
```

## Componentes React

### Nomes de componentes

Componentes devem seguir o padrão **PascalCase** com **contexto descritivo**:

```tsx
✅ Correto - Com contexto
export function PasswordRequirements() {}
export function AuthCard() {}
export function DashboardContainer() {}
export function DataTableFilters() {}
export function PatientsListTable() {}
export function AccountProfilePage() {}
export function PatientsDetailsPage() {}
export function DashboardCard() {}

❌ Incorreto - Sem contexto suficiente
export function Requirements() {}
export function Card() {}
export function Container() {}
export function Filters() {}
export function Table() {}
export function Page() {}
```

### Padrões de contexto

#### Arquivos de layout e páginas do Next.js

Arquivos padrão do Next.js para rotas devem usar nomes específicos:

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

**Importante**: Os arquivos `layout.tsx` e `page.tsx` devem sempre exportar componentes com os nomes `Layout` e `Page` respectivamente, independente da rota onde estão localizados.

#### Componentes UI

```tsx
// Componentes de interface base
Button
Input
Checkbox
Select

// Componentes compostos
PasswordInput
DateInput
SelectInput
```

#### Componentes de domínio

```tsx
// Com contexto da feature
PatientsTable
DashboardCard
AuthCard
DataTableFilters
PasswordRequirements

// Com contexto da área
DashboardContainer
AuthContainer
PatientHeader
```

## Arquivos de configuração

### Schemas

```text
patient-data-form-schema.ts
new-password-form-schema.ts
support-network-form-schema.ts
```

### Constants

```text
brazilian-states.ts
storage-keys.ts
password-requirements.ts
```

### Types

```text
patients.ts
users.ts
```

### Utils e helpers

```text
class-name-merge.ts
format-cpf-number.ts
get-password-requirement.ts
```

## Organização por funcionalidade

### Estrutura de componentes

```text
components/
  ui/                    ← Componentes base reutilizáveis
    button.tsx
    input.tsx
    checkbox.tsx

  form/                  ← Componentes específicos de formulário
    password-input.tsx
    date-input.tsx
    form-field.tsx

  data-table/            ← Componentes da tabela de dados
    filters/
      index.tsx
      date.tsx
      container.tsx
    header/
      filter-button.tsx
      order-by.tsx
```

### Agrupamento por domínio

```text
app/
  (dashboard)/           ← Grupo dashboard
    _cards/             ← Componentes dos cards
    _header/            ← Componente do header
    _sidebar/           ← Componente da sidebar

  pacientes/            ← Rota pacientes
    _components/        ← Componentes específicos
    _types/            ← Types específicos
```

## Exemplos práticos

### Arquivo de componente completo

```tsx
// Arquivo: patient-list-table.tsx
export function PatientsListTable() {
  // Implementação
}
```

### Estrutura de pasta de feature

```text
app/
  pacientes/
    _components/
      patients-list-table.tsx
      patient-details-modal.tsx
    _types/
      patients.ts
    _services/
      patients-api.ts
    page.tsx              ← Lista de pacientes
    [id]/
      page.tsx           ← Detalhes do paciente
```

### Constants e utilities

```typescript
// Arquivo: constants/patient-status.ts
export const PATIENT_STATUS = {
  active: 'Ativo',
  inactive: 'Inativo',
} as const

// Arquivo: utils/formatters/format-phone-number.ts
export function formatPhoneNumber(input: string) {
  // Implementação
}
```

## Diretrizes importantes

1. **Seja específico**: Use nomes que descrevem claramente a função
2. **Mantenha contexto**: Inclua o domínio ou área no nome do componente
3. **Evite abreviações**: Prefira nomes completos e descritivos
4. **Siga a hierarquia**: Organize por funcionalidade e contexto
5. **Consistência**: Use sempre os mesmos padrões em todo o projeto

## Checklist de revisão

Antes de criar novos arquivos ou componentes, verifique:

- Nome do arquivo está em kebab-case?
- Nome do componente está em PascalCase com contexto?
- Arquivos `layout.tsx` exportam componente `Layout`?
- Arquivos `page.tsx` exportam componente `Page`?
- Pasta está na estrutura correta?
- Rota em português está correta?
- Pasta de agrupamento usa parênteses?
- Pasta interna usa prefixo `_`?
- Nome está em inglês (exceto rotas)?
