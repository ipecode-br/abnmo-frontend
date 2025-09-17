# Custom Hooks

Custom hooks são funções reutilizáveis que encapsulam lógica de componentes. Eles estão localizados em `src/hooks` e seguem o padrão `use` em sua nomenclatura.

## Hooks Disponíveis

### `useDebounce`

O hook `useDebounce` atrasa a atualização de um valor, o que é útil para evitar chamadas excessivas a APIs ou cálculos pesados enquanto o usuário está digitando em um campo de busca.

- **Localização**: `src/hooks/debounce.ts`
- **Parâmetros**:
  1.  `value` (`T`): O valor a ser "debounced".
  2.  `delay` (`number`, opcional, padrão: `400`): O tempo em milissegundos para aguardar antes de atualizar o valor.
- **Retorno**: `T` - O valor "debounced", que só será atualizado após o `delay`.

**Como Usar**:

É ideal para campos de busca, onde a pesquisa só deve ser disparada após o usuário parar de digitar.

```tsx
import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/debounce'

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Aguarda 500ms

  useEffect(() => {
    // Este efeito só será executado quando `debouncedSearchTerm` mudar,
    // ou seja, 500ms após o usuário parar de digitar.
    if (debouncedSearchTerm) {
      // Lógica de busca da API aqui
      console.log(`Buscando por: ${debouncedSearchTerm}`)
    }
  }, [debouncedSearchTerm])

  return (
    <input
      type='text'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder='Pesquisar...'
    />
  )
}
```

---

### `useParams`

O hook `useParams` é um wrapper em torno dos hooks `useRouter` e `useSearchParams` do Next.js, simplificando a manipulação de parâmetros de busca (query params) da URL.

- **Localização**: `src/hooks/params.ts`
- **Retorno**: Um objeto com três propriedades:
  - `searchParams` (`URLSearchParams`): O objeto original de `useSearchParams`.
  - `getParam(key: string)`: Uma função que retorna o valor de um parâmetro específico da URL.
  - `updateParams({ set?, remove? })`: Uma função para adicionar/atualizar ou remover parâmetros da URL de forma declarativa.

**Como Usar**:

Este hook é central para o funcionamento de filtros, paginação e ordenação em tabelas.

```tsx
import { useParams } from '@/hooks/params'

function FilterComponent() {
  const { getParam, updateParams } = useParams()

  const currentStatus = getParam('status')

  function handleStatusChange(newStatus: string) {
    updateParams({
      set: [{ key: 'status', value: newStatus }], // Define ou atualiza o status
      remove: ['page'], // Remove o parâmetro 'page' para resetar a paginação
    })
  }

  return (
    <div>
      <p>Filtro atual: {currentStatus || 'Nenhum'}</p>
      <button onClick={() => handleStatusChange('active')}>Ativos</button>
      <button onClick={() => handleStatusChange('inactive')}>Inativos</button>
    </div>
  )
}
```

#### `updateParams`

A função `updateParams` aceita um objeto com duas chaves opcionais:

- `set`: Um array de objetos `{ key: string, value: string | number }` para adicionar ou atualizar na URL.
- `remove`: Um array de strings com as chaves dos parâmetros a serem removidos da URL.

O hook se encarrega de construir a nova URL e aplicar a mudança com `router.replace()`.
