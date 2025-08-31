# Documentação de tabelas

Este documento estabelece as diretrizes para criação de tabelas de dados no projeto, utilizando os componentes padronizados e funcionalidades como filtros, busca, ordenação e paginação.

## Regras gerais

- **Componentes**: Use sempre os componentes padronizados do projeto
- **Query**: Utilize TanStack Query para gerenciamento de estado
- **Filtros**: Implemente filtros através de query parameters
- **Responsividade**: Garanta que a tabela funcione em diferentes tamanhos de tela
- **Nomenclatura**: Siga as convenções de nomenclatura do projeto

## Estrutura de uma tabela

### 1. Componente principal

**Nomenclatura**: `{entidade}-list-table.tsx` (ex: `patients-list-table.tsx`)

```tsx
export function PatientsListTable() {
  // Implementação
}
```

### 2. Estrutura básica

```tsx
export function EntityListTable() {
  return (
    <>
      {/* Header com informações e ações */}
      <DataTableHeader>
        <DataTableHeaderInfo />
        <DataTableHeaderActions />
      </DataTableHeader>

      {/* Filtros (opcional) */}
      {showFilters && (
        <DataTableFilters>{/* Componentes de filtro */}</DataTableFilters>
      )}

      {/* Tabela principal */}
      <Card className='p-6'>
        <Table>
          <TableHeader>{/* Cabeçalhos */}</TableHeader>
          <TableBody>{/* Linhas de dados */}</TableBody>
        </Table>
      </Card>

      {/* Paginação */}
      <Pagination totalItems={total} />
    </>
  )
}
```

## Componentes de header

### DataTableHeader

Container principal que organiza informações e ações:

```tsx
<DataTableHeader>
  <DataTableHeaderInfo
    icon={<Users2Icon />}
    total={total}
    title='Pacientes cadastrados'
    emptyTitle='Nenhum paciente cadastrado'
  />
  <DataTableHeaderActions>{/* Ações da tabela */}</DataTableHeaderActions>
</DataTableHeader>
```

### DataTableHeaderInfo

Exibe informações sobre os dados da tabela:

```tsx
<DataTableHeaderInfo
  icon={<Users2Icon />} // Ícone representativo
  total={total} // Total de itens
  title='Usuários cadastrados' // Título quando há dados
  emptyTitle='Nenhum usuário' // Título quando vazio
/>
```

### DataTableHeaderActions

Container para ações como busca, filtros e botões:

```tsx
<DataTableHeaderActions>
  <DataTableHeaderSearch placeholder='Pesquisar nome...' />
  <DataTableHeaderFilterButton onClick={() => setShowFilters(!showFilters)} />
  <DataTableHeaderOrderBy options={ORDER_OPTIONS} className='min-w-48' />

  <Button size='sm'>
    <PlusIcon />
    Novo item
  </Button>
</DataTableHeaderActions>
```

## Funcionalidades de tabela

### Busca

```tsx
<DataTableHeaderSearch
  placeholder='Pesquisar nome...' // Texto do placeholder
  className='w-52' // Largura personalizada
/>
```

A busca usa debounce automático e atualiza os query parameters.

### Ordenação

```tsx
// Definir opções de ordenação
const ORDER_OPTIONS = [
  { label: 'Nome (A-Z)', value: 'name_asc' },
  { label: 'Nome (Z-A)', value: 'name_desc' },
  { label: 'Data (Mais recente)', value: 'date_desc' },
  { label: 'Data (Mais antiga)', value: 'date_asc' },
]

<DataTableHeaderOrderBy
  options={ORDER_OPTIONS}
  className='min-w-48'
/>
```

### Filtros

#### Container de filtros

```tsx
{
  showFilters && (
    <DataTableFilters
      queries={[
        QUERY_PARAMS.status,
        QUERY_PARAMS.startDate,
        QUERY_PARAMS.endDate,
      ]}
    >
      {/* Componentes de filtro */}
    </DataTableFilters>
  )
}
```

#### Filtro de status

```tsx
// Definir opções de status
const STATUS_OPTIONS = [
  {
    label: 'Ativo',
    value: 'active',
    icon: CheckIcon,
    color: '[&_svg]:text-success'
  },
  {
    label: 'Inativo',
    value: 'inactive',
    icon: XIcon,
    color: '[&_svg]:text-error'
  },
]

<DataTableFilterStatus options={STATUS_OPTIONS} />
```

#### Filtro de data

```tsx
<DataTableFilterDate />
```

### Controle de filtros

```tsx
const [showFilters, setShowFilters] = useState(false)

// Mostrar filtros automaticamente se algum estiver ativo
useEffect(() => {
  if (status || startDate || endDate) {
    setShowFilters(true)
  } else {
    setShowFilters(false)
  }
}, [status, startDate, endDate])
```

## Gerenciamento de estado

### Query parameters

Use o hook `useParams` para gerenciar filtros via URL:

```tsx
const { getParam } = useParams()

const page = getParam(QUERY_PARAMS.page)
const search = getParam(QUERY_PARAMS.search)
const status = getParam(QUERY_PARAMS.status)
const orderBy = getParam(QUERY_PARAMS.orderBy)
const startDate = getParam(QUERY_PARAMS.startDate)
const endDate = getParam(QUERY_PARAMS.endDate)
```

### TanStack Query

Configure a query para buscar dados:

```tsx
const filterQueries = [page, search, orderBy, status, startDate, endDate]

const { data: response, isLoading } = useQuery({
  queryKey: [QUERY_CACHE_KEYS.patients, filterQueries],
  queryFn: () =>
    api<{ patients: PatientType[]; total: number }>('/patients', {
      params: { page, search, orderBy, status, startDate, endDate },
    }),
})

const total = response?.data?.total ?? 0
const patients = response?.data?.patients ?? []
```

## Estrutura da tabela

### Header da tabela

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead className='w-64'>Nome do paciente</TableHead>
      <TableHead className='w-36'>Telefone</TableHead>
      <TableHead>E-mail</TableHead>
      <TableHead className='w-24'>Status</TableHead>
      <TableHead className='w-40 whitespace-nowrap'>Data de cadastro</TableHead>
      <TableHead className='w-20 text-center'>Ações</TableHead>
    </TableRow>
  </TableHeader>
</Table>
```

### Body da tabela

```tsx
<TableBody>
  {items.map((item, index) => {
    const isLastRow = index === items.length - 1

    return <TableRow key={item.id}>{/* Células da tabela */}</TableRow>
  })}
</TableBody>
```

### Células clicáveis

Para células que devem redirecionar:

```tsx
<TableCell isLastRow={isLastRow} className='p-0'>
  <button
    className='w-64 cursor-pointer px-4'
    onClick={() => router.push(ROUTES.details(item.id))}
  >
    <div className='flex items-center gap-2'>
      <Avatar className='size-9' src={item.avatar} />
      <span className='truncate'>{item.name}</span>
    </div>
  </button>
</TableCell>
```

### Células com formatação

```tsx
{
  /* Telefone formatado */
}
;<TableCell isLastRow={isLastRow}>{formatPhoneNumber(item.phone)}</TableCell>

{
  /* Data formatada */
}
;<TableCell isLastRow={isLastRow}>{formatDate(item.createdAt)}</TableCell>

{
  /* Status com tag */
}
;<TableCell isLastRow={isLastRow}>
  <Tag className={statusTag.class}>
    <StatusIcon />
    {STATUS_LABELS[item.status]}
  </Tag>
</TableCell>
```

### Menu de ações

```tsx
<TableCell isLastRow={isLastRow} className='text-center'>
  <TableActionsMenu>{/* Ações específicas do item */}</TableActionsMenu>
</TableCell>
```

## Paginação

Use o componente `Pagination` após a tabela:

```tsx
<Pagination
  totalItems={total} // Total de itens
  perPage={10} // Itens por página (opcional, padrão: 10)
  maxPageButtons={7} // Botões máximos (opcional, padrão: 7)
/>
```

## Formatação e estilização

### Larguras das colunas

Use classes do Tailwind para controlar larguras:

```tsx
<TableHead className='w-64'>Nome</TableHead>        // Largura fixa
<TableHead className='w-36'>Telefone</TableHead>    // Largura fixa
<TableHead>E-mail</TableHead>                        // Largura flexível
<TableHead className='w-24'>Status</TableHead>      // Largura pequena
```

### Responsividade

Para textos que podem quebrar:

```tsx
<TableHead className='whitespace-nowrap'>Data de cadastro</TableHead>
<span className='truncate'>{longText}</span>
```

### Estados visuais

```tsx
// Hover na linha
<TableRow key={item.id}>  // Já tem hover automático

// Última linha sem borda
<TableCell isLastRow={isLastRow}>

// Centralizar conteúdo
<TableHead className='text-center'>Ações</TableHead>
```

## Types e constants

### Definir tipos

```tsx
// types/patients.ts
export type PatientType = {
  id: string
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive'
  createdAt: Date
}

export const PATIENT_STATUS = {
  active: 'Ativo',
  inactive: 'Inativo',
} as const

export const PATIENTS_ORDER_OPTIONS = [
  { label: 'Nome (A-Z)', value: 'name_asc' },
  { label: 'Nome (Z-A)', value: 'name_desc' },
  { label: 'Data (Mais recente)', value: 'date_desc' },
]
```

### Constants para query

```tsx
// constants/cache.ts
export const QUERY_CACHE_KEYS = {
  patients: 'patients',
  users: 'users',
} as const

// constants/params.ts
export const QUERY_PARAMS = {
  page: 'page',
  search: 'search',
  status: 'status',
  orderBy: 'orderBy',
  startDate: 'startDate',
  endDate: 'endDate',
} as const
```

## Exemplo completo

```tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { PlusIcon, Users2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { DataTableFilters } from '@/components/data-table/filters'
import { DataTableFilterStatus } from '@/components/data-table/filters/status'
import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderFilterButton } from '@/components/data-table/header/filter-button'
import { DataTableHeaderInfo } from '@/components/data-table/header/info'
import { DataTableHeaderOrderBy } from '@/components/data-table/header/order-by'
import { DataTableHeaderSearch } from '@/components/data-table/header/search'
import { Pagination } from '@/components/pagination'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tag } from '@/components/ui/tag'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { QUERY_PARAMS } from '@/constants/params'
import { ROUTES } from '@/constants/routes'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'

export function UsersListTable() {
  const [showFilters, setShowFilters] = useState(false)
  const { getParam } = useParams()
  const router = useRouter()

  // Query parameters
  const page = getParam(QUERY_PARAMS.page)
  const search = getParam(QUERY_PARAMS.search)
  const status = getParam(QUERY_PARAMS.status)
  const orderBy = getParam(QUERY_PARAMS.orderBy)

  // API Query
  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.users, [page, search, status, orderBy]],
    queryFn: () =>
      api<{ users: UserType[]; total: number }>('/users', {
        params: { page, search, status, orderBy },
      }),
  })

  const total = response?.data?.total ?? 0
  const users = response?.data?.users ?? []

  // Controle automático de filtros
  useEffect(() => {
    if (status) {
      setShowFilters(true)
    } else {
      setShowFilters(false)
    }
  }, [status])

  return (
    <>
      <DataTableHeader>
        <DataTableHeaderInfo
          icon={<Users2Icon />}
          total={total}
          title='Usuários cadastrados'
          emptyTitle='Nenhum usuário cadastrado'
        />
        <DataTableHeaderActions>
          <DataTableHeaderSearch placeholder='Pesquisar usuário...' />
          <DataTableHeaderFilterButton
            onClick={() => setShowFilters(!showFilters)}
          />
          <DataTableHeaderOrderBy
            options={USERS_ORDER_OPTIONS}
            className='min-w-48'
          />
          <Button size='sm'>
            <PlusIcon />
            Novo usuário
          </Button>
        </DataTableHeaderActions>
      </DataTableHeader>

      {showFilters && (
        <DataTableFilters queries={[QUERY_PARAMS.status]}>
          <DataTableFilterStatus options={USER_STATUS_OPTIONS} />
        </DataTableFilters>
      )}

      <Card className='p-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-64'>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className='w-24'>Status</TableHead>
              <TableHead className='w-40'>Data de cadastro</TableHead>
              <TableHead className='w-20 text-center'>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => {
              const isLastRow = index === users.length - 1

              return (
                <TableRow key={user.id}>
                  <TableCell isLastRow={isLastRow} className='p-0'>
                    <button
                      className='w-64 cursor-pointer px-4'
                      onClick={() => router.push(ROUTES.user.details(user.id))}
                    >
                      <div className='flex items-center gap-2'>
                        <Avatar className='size-9' src={user.avatar} />
                        <span className='truncate'>{user.name}</span>
                      </div>
                    </button>
                  </TableCell>

                  <TableCell isLastRow={isLastRow}>{user.email}</TableCell>

                  <TableCell isLastRow={isLastRow}>
                    <Tag className={statusConfig.class}>
                      <StatusIcon />
                      {STATUS_LABELS[user.status]}
                    </Tag>
                  </TableCell>

                  <TableCell isLastRow={isLastRow}>
                    {formatDate(user.createdAt)}
                  </TableCell>

                  <TableCell isLastRow={isLastRow} className='text-center'>
                    <UserTableActions user={user} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>

      <Pagination totalItems={total} />
    </>
  )
}
```

## Configuração de query parameters

### Hook useParams

Use o hook personalizado para gerenciar parâmetros de URL:

```tsx
const { getParam, updateParams } = useParams()

// Obter parâmetro
const currentStatus = getParam(QUERY_PARAMS.status)

// Atualizar parâmetro
updateParams({
  set: [{ key: 'status', value: 'active' }],
  remove: ['page'], // Remove página ao filtrar
})
```

### Dependências da query

Inclua todos os parâmetros que afetam os dados:

```tsx
const filterQueries = [page, search, orderBy, status, startDate, endDate]

const { data: response } = useQuery({
  queryKey: [QUERY_CACHE_KEYS.entity, filterQueries],
  queryFn: () => api('/endpoint', { params: { ...allParams } }),
})
```

## Formatação de dados

### Formatadores disponíveis

```tsx
import { formatDate } from '@/utils/formatters/format-date'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'

// Data
{
  formatDate(item.createdAt)
}

// Telefone
{
  formatPhoneNumber(item.phone)
}

// CPF
{
  formatCpfNumber(item.cpf)
}
```

### Tags de status

```tsx
// constants/utils.ts
export const STATUS_TAGS = {
  active: {
    icon: CircleCheckIcon,
    class: '[&_svg]:text-success',
  },
  inactive: {
    icon: CircleXIcon,
    class: '[&_svg]:text-error',
  },
}

// No componente
const statusTag = STATUS_TAGS[item.status]
const StatusIcon = statusTag.icon

<Tag className={statusTag.class}>
  <StatusIcon />
  {STATUS_LABELS[item.status]}
</Tag>
```

## Estados de carregamento

### Skeleton loading

```tsx
{
  isLoading ? <TableSkeleton /> : <TableBody>{/* Conteúdo real */}</TableBody>
}
```

### Estado vazio

```tsx
{
  total === 0 && !isLoading && (
    <EmptyState
      icon={<Users2Icon />}
      title='Nenhum resultado encontrado'
      description='Tente ajustar os filtros de busca'
    />
  )
}
```

## Navegação e ações

### Redirecionamento

```tsx
const router = useRouter()

// Célula clicável
<TableCell className='p-0'>
  <button
    className='w-full cursor-pointer px-4 text-left'
    onClick={() => router.push(ROUTES.details(item.id))}
  >
    {/* Conteúdo da célula */}
  </button>
</TableCell>
```

### Menu de ações

```tsx
// Componente separado para ações
<TableCell className='text-center'>
  <EntityTableActions item={item} />
</TableCell>
```

## Organização de arquivos

```
feature/
  (entity-list)/
    table.tsx                    ← Componente principal da tabela
    actions.tsx                  ← Menu de ações específicas
    table-skeleton.tsx          ← Loading state (opcional)
  _components/
    entity-table-actions.tsx    ← Componente de ações reutilizável
  _types/
    entity.ts                   ← Types da entidade
```

## Boas práticas

### 1. Performance

- Use `useQuery` com dependências corretas
- Implemente debounce para busca
- Considere paginação para grandes conjuntos de dados

### 2. UX/UI

- Mantenha estados de loading consistentes
- Forneça feedback visual para ações
- Use placeholders descritivos
- Implemente estados vazios informativos

### 3. Responsividade

- Use `truncate` para textos longos
- Defina larguras adequadas para colunas
- Considere scroll horizontal em telas pequenas

### 4. Acessibilidade

- Use títulos descritivos nos botões
- Mantenha foco navegável por teclado
- Forneça feedback para leitores de tela

### 5. Consistência

- Siga os padrões de nomenclatura
- Use os mesmos componentes base
- Mantenha consistência nos filtros e ordenação

## Checklist de tabela

Antes de finalizar uma tabela, verifique:

- Nome do componente segue o padrão EntityListTable?
- Header com DataTableHeaderInfo configurado?
- Ações do header (busca, filtros, ordenação) implementadas?
- Query parameters configurados corretamente?
- TanStack Query com cache key apropriada?
- Filtros mostrados/ocultos automaticamente?
- TableCell com isLastRow configurado?
- Formatadores aplicados onde necessário?
- Tags de status com ícones e cores?
- Navegação/redirecionamento funcionando?
- Paginação implementada?
- Estados de loading considerados?
- Estado vazio tratado?
- Menu de ações implementado?
- Responsividade testada?
