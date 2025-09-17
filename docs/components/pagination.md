# Paginação

O componente `Pagination` é responsável por renderizar a navegação de páginas para listas de dados, como tabelas. Ele calcula automaticamente o número de páginas e gera os botões de navegação, integrando-se com os parâmetros de busca da URL.

- **Localização**: `src/components/pagination/index.tsx`

## Funcionamento

O componente utiliza o hook `useParams` para ler o parâmetro `page` da URL e para atualizar a rota quando o usuário navega entre as páginas. Ele é projetado para funcionar de forma quase automática, exigindo apenas o número total de itens.

## Propriedades (Props)

| Prop             | Tipo     | Obrigatório | Padrão | Descrição                                                                      |
| :--------------- | :------- | :---------- | :----- | :----------------------------------------------------------------------------- |
| `totalItems`     | `number` | Sim         | -      | O número total de itens na lista. O componente será nulo se `totalItems <= 0`. |
| `perPage`        | `number` | Não         | `10`   | O número de itens exibidos por página.                                         |
| `maxPageButtons` | `number` | Não         | `7`    | O número máximo de botões de página a serem exibidos simultaneamente.          |

## Como Usar

Para usar o componente, renderize-o após a lista de dados e forneça o total de itens. A paginação será exibida apenas se houver itens para paginar.

```tsx
import { Pagination } from '@/components/pagination'

// Exemplo dentro de um componente de tabela
export function PatientsListTable() {
  // Lógica para buscar dados e obter o total
  const total = response?.data?.total ?? 0

  return (
    <>
      {/* ... Tabela de dados ... */}

      <Pagination totalItems={total} />
    </>
  )
}
```

## Comportamento

- **Cálculo de Páginas**: O total de páginas é calculado dividindo `totalItems` por `perPage`.
- **Botões de Navegação**: O componente renderiza botões para a primeira e última página, além de um conjunto de botões de página numerados. reticências (`...`) são usadas para indicar saltos de página quando há muitas páginas.
- **Atualização de URL**: Ao clicar em um botão de página, o hook `useParams` é usado para atualizar o parâmetro `page` na URL. Se o usuário for para a primeira página, o parâmetro `page` é removido da URL por questões de canonicidade.
- **Contagem de Itens**: Exibe uma contagem dos itens visíveis na página atual (ex: "Exibindo 10-20 itens").
