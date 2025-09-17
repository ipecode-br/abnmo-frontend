# Constantes

O diretório `src/constants` centraliza valores estáticos e configurações que são compartilhados em toda a aplicação. Manter essas constantes em um local centralizado facilita a manutenção e garante a consistência.

## Arquivos Principais

### `routes.ts`

Define todas as rotas da aplicação em um objeto estruturado. Isso evita o uso de strings "mágicas" para links e redirecionamentos, permitindo que as URLs sejam atualizadas em um único local.

**Estrutura**:

```typescript
export const ROUTES = {
  auth: {
    signIn: '/conta/entrar',
    // ...
  },
  dashboard: {
    main: '/',
    patients: {
      main: '/pacientes',
      details: (id: string) => `/pacientes/${id}/informacoes`,
    },
    // ...
  },
}
```

**Como Usar**:

```tsx
import { ROUTES } from '@/constants/routes'
import Link from 'next/link'

// <Link href="/conta/entrar">... (Incorreto)
;<Link href={ROUTES.auth.signIn}>Entrar</Link> // (Correto)
```

---

### `params.ts`

Centraliza as chaves (nomes) dos parâmetros de busca da URL (query params). É usado em conjunto com o hook `useParams` para garantir consistência ao ler ou escrever na URL.

**Estrutura**:

```typescript
export const QUERY_PARAMS = {
  page: 'page',
  search: 'search',
  status: 'status',
  // ...
}
```

---

### `cache.ts`

Define as chaves de cache usadas pela aplicação, tanto para o cache do Next.js (tags) quanto para o TanStack Query (`queryKey`).

- `NEXT_CACHE_TAGS`: Usado para revalidação de dados em Server Actions.
- `QUERY_CACHE_KEYS`: Usado como a chave principal (`queryKey`) em `useQuery` para identificar e gerenciar o cache de dados do lado do cliente.

**Estrutura**:

```typescript
export const NEXT_CACHE_TAGS = {
  user: (id: string) => `user/${id}`,
}

export const QUERY_CACHE_KEYS = {
  profile: 'profile',
  patients: 'patients',
}
```

---

### `storage-keys.ts`

Define as chaves usadas para armazenar dados no `localStorage` ou `sessionStorage` do navegador. Isso previne conflitos e erros de digitação.

**Estrutura**:

```typescript
export const PATIENT_STORAGE_KEYS = {
  screening: {
    patientData: 'screening_patient_data',
    // ...
  },
} as const
```

---

### `regex.ts`

Contém uma coleção de expressões regulares (RegExp) usadas para validação de formulários e formatação de strings.

**Exemplos**:

- `NON_NUMBER_REGEX`: Remove tudo que não for dígito.
- `CPF_REGEX`: Valida uma string no formato de CPF.
- `PASSWORD_REGEX`: Valida a força de uma senha (dígitos, maiúsculas, minúsculas, etc.).

---

### Listas de Opções

Alguns arquivos fornecem arrays de objetos padronizados, ideais para serem usados em componentes de select, radio groups, etc.

- **`brazilian-states.ts`**: Lista de todos os estados brasileiros com `label` e `value`.
- **`genders.ts`**: Lista de opções de gênero.

**Estrutura Padrão**:

```typescript
// Exemplo de GENDERS
export const GENDERS = [
  { label: 'Feminino', value: 'female' },
  { label: 'Masculino', value: 'male' },
  // ...
]
```

---

### `enums.ts`

Define objetos que funcionam como enumerações, mapeando chaves a valores legíveis. É útil para traduzir valores da API para a UI.

**Estrutura**:

```typescript
export const yesOrNoEnum = {
  yes: 'Sim',
  no: 'Não',
} as const
```
