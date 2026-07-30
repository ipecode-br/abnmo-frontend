# Custom Hooks

Hooks reutilizáveis em `src/hooks/`.

## Hooks disponíveis

### `useDebounce`

Atrasa a atualização de um valor. Ideal para campos de busca.

**Localização:** `hooks/debounce.ts`

```ts
const debouncedSearch = useDebounce(searchTerm, 500)
```

- **Parâmetros**: `value`, `delay` (default 400ms)
- **Retorno**: valor atualizado após o delay

### `useParams`

Wrapper sobre `useRouter`/`useSearchParams` do Next.js para manipular query params.

**Localização:** `hooks/params.ts`

```ts
const { searchParams, getParam, updateParams } = useParams()

const status = getParam('status')
updateParams({ set: [{ key: 'status', value: 'active' }], remove: ['page'] })
```

- `getParam(key)` — retorna valor de um parâmetro
- `updateParams({ set?, remove? })` — adiciona/remove parâmetros da URL

### `useCities`

Carrega a lista de cidades de um estado via API do IBGE.

**Localização:** `hooks/cities.ts`

### `usePermissions`

Hook de conveniência para acessar o store de permissões.

**Localização:** `hooks/use-permissions.ts`

### `usePatientOptions`

Fornece opções formatadas para selects de pacientes.

**Localização:** `hooks/use-patient-otions.ts`

### `useUtils`

Utilitários diversos usados em componentes.

**Localização:** `hooks/use-utils.ts`
