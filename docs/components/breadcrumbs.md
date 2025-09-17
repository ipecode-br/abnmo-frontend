# Breadcrumbs

O componente `Breadcrumbs` renderiza a navegação com base na rota atual da aplicação. Ele é dinâmico e não requer propriedades, pois lê o `pathname` da URL para determinar os passos a serem exibidos.

## Estrutura e Funcionamento

- **Localização**: `src/components/breadcrumbs.tsx`
- **Funcionamento**: O componente divide a URL atual em segmentos e busca por correspondências em um objeto de configuração centralizado.

### Configuração

A configuração dos breadcrumbs fica em `src/constants/breadcrumbs/`. A estrutura principal é definida em `index.ts`, que agrega as configurações de áreas específicas, como `dashboard.ts` e `patient.ts`.

Cada entrada de breadcrumb é um objeto com a seguinte estrutura:

```typescript
{
  icon: LucideIcon // Componente de ícone (ex: HomeIcon)
  name: string // Nome exibido na UI (ex: 'Início')
  path: string // Rota associada (ex: '/dashboard')
}
```

O objeto `BREADCRUMBS` mapeia segmentos de rota (ex: `'home'`) para esses objetos de configuração.

### Exemplo de Configuração (`src/constants/breadcrumbs/dashboard.ts`)

```typescript
export const DASHBOARD_BREADCRUMBS: Breadcrumbs = {
  pacientes: {
    icon: Users2Icon,
    name: 'Pacientes',
    path: ROUTES.dashboard.patients.main,
  },
  informacoes: {
    icon: User2Icon,
    name: 'Informações do paciente',
    path: ROUTES.dashboard.patients.main,
  },
  historico: {
    icon: HistoryIcon,
    name: 'Histórico do paciente',
    path: ROUTES.dashboard.patients.main,
  },
}
```

## Como Usar

Para usar o componente, basta renderizá-lo no local desejado, como em um layout de página. Ele cuidará automaticamente de exibir os breadcrumbs corretos para a rota ativa.

```tsx
import { Breadcrumbs } from '@/components/breadcrumbs'

export function Header() {
  return (
    <header>
      <Breadcrumbs />
    </header>
  )
}
```

## Como Adicionar Novos Breadcrumbs

1.  **Abra o arquivo de constantes** da área desejada (ex: `src/constants/breadcrumbs/dashboard.ts`).
2.  **Adicione uma nova entrada** ao objeto, usando o segmento da URL como chave.

    ```typescript
    // Em src/constants/breadcrumbs/dashboard.ts
    export const DASHBOARD_BREADCRUMBS: Breadcrumbs = {
      // ... outras entradas
      configuracoes: {
        // 'configuracoes' é o segmento da URL (ex: /dashboard/configuracoes)
        icon: SettingsIcon,
        name: 'Configurações',
        path: ROUTES.dashboard.settings, // Rota definida em src/constants/routes.ts
      },
    }
    ```

3.  O componente `Breadcrumbs` passará a renderizar o novo passo automaticamente quando a rota correspondente estiver ativa.
