# State Management Documentation

Este documento descreve a configuração do gerenciamento de estado global usando **Zustand** e o gerenciamento de estado do servidor usando **TanStack Query**.

---

## 1. Zustand (Estado Global)

**Arquivo:** `src/store/sidebar.ts`

Zustand é usado para criar um estado global simples que controla a expansão da sidebar.

```ts
import { create } from 'zustand'

interface SidebarState {
  expanded: boolean
  toogleSidebar: () => void
}

export const useSidebar = create<SidebarState>((set, get) => {
  return {
    expanded: true,

    toogleSidebar() {
      const { expanded } = get()
      set({ expanded: !expanded })
    },
  }
})
```

### Descrição

- **expanded**: boolean que indica se a sidebar está expandida.
- **toogleSidebar**: função para alternar o estado de `expanded`.

Exemplo de uso em um componente React:

```tsx
const { expanded, toogleSidebar } = useSidebar()
<button onClick={toogleSidebar}>{expanded ? 'Fechar' : 'Abrir'}</button>
```

---

## 2. TanStack Query (Estado do Servidor)

**Arquivo:** `src/lib/tanstack-query.ts`

TanStack Query é usado para gerenciar o estado do servidor, incluindo cache de requisições e sincronização automática.

```ts
import { isServer, QueryClient } from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minuto
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient() // Novo cliente a cada requisição do servidor
  }

  if (!browserQueryClient) browserQueryClient = makeQueryClient() // Singleton no cliente

  return browserQueryClient
}

export const queryClient = getQueryClient()
```

### Observações

- No **servidor**, um novo `QueryClient` é criado a cada requisição.
- No **cliente**, o `QueryClient` é persistido para evitar recriações desnecessárias.
- `staleTime` define o tempo que os dados permanecem frescos antes de serem refetch automaticamente.

---

## Resumo

- **Zustand**: usado para estados locais e globais simples (ex.: UI, sidebar).
- **TanStack Query**: usado para gerenciamento de dados assíncronos e cache de requisições do servidor.
- Esta combinação permite separar o estado do cliente (UI) do estado do servidor (dados), garantindo melhor performance e experiência do usuário.
