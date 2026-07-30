# Helpers

Funções auxiliares com lógica de negócio reutilizável em `src/helpers/`.

---

## convertObjectToOptions

Transforma um objeto ou enum em array de opções `{ value, label }`.

**Localização:** `helpers/convert-object-to-options.ts`

```ts
const states = { MG: 'Minas Gerais', SP: 'São Paulo' }
convertObjectToOptions(states)
// [{ value: 'MG', label: 'Minas Gerais' }, { value: 'SP', label: 'São Paulo' }]
```

---

## LocalStorage

Salvar, buscar e remover dados no `localStorage`.

**Localização:** `helpers/local-storage.ts`

```ts
setStorageItem('user', { name: 'John Doe', email: 'johndoe@example.com' })
getStorageItem('user')
removeStorageItem('user')
removeStorageItem(['user', 'token'])
```

---

## getPasswordRequirements

Valida uma senha contra regras de segurança (maiúscula, minúscula, número, caractere especial, comprimento mínimo).

**Localização:** `helpers/get-password-requirement.ts`

```ts
const requirements = getPasswordRequirements('Abc123!')
// [{ type: 'uppercase', text: '...', isValid: true }, ...]
```

---

## extractTokenData

Decodifica dados de um token JWT.

**Localização:** `helpers/extract-token-data.ts`

Usado na página de cadastro para extrair `email` e `role` do token de convite.

```ts
const data = await extractTokenData<{ email: string; role: UserRole }>(token)
```

---

## getTimeDistanceToNow

Calcula a distância temporal de uma data até o momento atual (ex.: "há 2 horas").

**Localização:** `helpers/get-time-distance-to-now.ts`

---

## revalidateClientCache

Força a reinvalidação do cache do TanStack Query no cliente.

**Localização:** `helpers/revalidate-client-cache.ts`

---

## revalidateServerCache

Força a reinvalidação do cache do Next.js no servidor via `revalidateTag`.

**Localização:** `helpers/revalidate-server-cache.ts`
