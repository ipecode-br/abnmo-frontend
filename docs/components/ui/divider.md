# Documentação do Componente Divider (`divider.tsx`)

O arquivo `divider.tsx` define um componente React reutilizável que exibe linhas divisórias horizontais ou verticais, com suporte opcional a texto centralizado.

---

## ☑️ Objetivo do Componente

- O componente **`Divider`** serve para separar visualmente seções de conteúdo.
- Suporta orientação horizontal ou vertical.
- Pode incluir texto centralizado em divisores horizontais.
- Flexível para integração com layouts responsivos.

---

## 📦 Principais Importações

- `cn` de `@/utils/class-name-merge`: Função utilitária para unir classes CSS dinamicamente.

---

## 🧩 Propriedades do Componente Divider

```ts
interface DividerProps extends React.ComponentProps<'div'> {
  flexItem?: boolean
  height?: string
  orientation?: 'horizontal' | 'vertical'
  text?: string
  width?: string
}
```

- `flexItem` (`boolean`): Faz o divisor se estender no container flexível.
- `height` (`string`): Altura do divisor vertical.
- `orientation` (`'horizontal' | 'vertical'`): Define a direção do divisor.
- `text` (`string`): Texto exibido no centro do divisor horizontal.
- `width` (`string`): Largura do divisor horizontal.
- `className` (`string`): Adiciona classes CSS extras.
- `...props` (`div` props): Outras props válidas para o `<div>`.

---

## ⚙️ Lógica do Componente

- Se `orientation` for `vertical`, renderiza uma linha vertical com altura opcional.
- Se `orientation` for `horizontal` e `text` estiver presente, renderiza uma linha com texto centralizado.
- Caso contrário, renderiza uma linha horizontal simples.
- Aplica classes padrão combinadas com `className` e dimensões fornecidas.
- Repassa todas as props restantes para o `<div>`.

---

### 📝 Exemplo de Uso

- `<Divider />` (linha horizontal simples)
- `<Divider text="OU" />` (linha horizontal com texto centralizado)
- `<Divider orientation="vertical" height="h-10" />` (linha vertical)
- `<Divider width="w-1/2" />` (linha horizontal com largura customizada)

---

## 🔍 Pontos-Chave

- Reusabilidade: Pode ser usado em qualquer layout para separar conteúdo.
- Flexibilidade: Suporta orientação, tamanho, texto e classes customizadas.
- Consistência visual: Mantém estilo uniforme para divisores em toda a aplicação.

---

## 💡 Vantagens

- Criação rápida de divisores visuais.
- Suporte a divisores horizontais e verticais.
- Facilita leitura e organização do conteúdo.
- Fácil de personalizar com texto, altura e largura.

---

## 🛠️ Resumo

O componente `Divider` fornece uma solução elegante e flexível para separar seções de conteúdo, suportando tanto divisores horizontais quanto verticais, com opção de texto centralizado e fácil personalização de estilo.
