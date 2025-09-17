# Gráficos

Esta seção documenta os componentes de gráficos reutilizáveis do projeto, construídos com a biblioteca [Recharts](https://recharts.org/).

## BarChart

O `BarChart` é um componente de gráfico de barras verticais e horizontais, ideal para exibir dados categóricos de forma clara e responsiva.

- **Localização**: `src/components/charts/bar.tsx`

### Estrutura de Dados

O componente espera um array de objetos (`data`) onde cada objeto representa uma barra no gráfico. A estrutura de cada objeto deve ser:

```typescript
interface ChartDataItem {
  name: string // Rótulo exibido no eixo Y
  value: number // Valor que determina o comprimento da barra no eixo X
}
```

### Propriedades (Props)

| Prop       | Tipo              | Obrigatório | Descrição                                                       |
| :--------- | :---------------- | :---------- | :-------------------------------------------------------------- |
| `data`     | `ChartDataItem[]` | Sim         | O array de dados para renderizar o gráfico.                     |
| `barColor` | `string`          | Não         | A cor das barras do gráfico. O padrão é `var(--color-primary)`. |

### Como Usar

Importe o componente e forneça os dados no formato esperado.

```tsx
import { BarChart } from '@/components/charts/bar'

const myChartData = [
  { name: 'Cardiologia', value: 150 },
  { name: 'Neurologia', value: 95 },
  { name: 'Ortopedia', value: 210 },
]

export function Dashboard() {
  return (
    <div style={{ height: '300px' }}>
      <BarChart data={myChartData} barColor='var(--color-accent)' />
    </div>
  )
}
```

### Customização

- **Cores**: A cor das barras pode ser alterada pela prop `barColor`. Outras cores, como as dos eixos e da grade, são definidas por variáveis CSS do Tailwind e podem ser ajustadas no arquivo do componente (`bar.tsx`).
- **Tooltip**: O `BarChart` utiliza um tooltip customizado (`CustomTooltip`) para exibir o valor da barra ao passar o mouse. A aparência do tooltip pode ser modificada em `src/components/charts/custom-tooltip.tsx`.
