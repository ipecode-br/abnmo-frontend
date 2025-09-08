# Divider Component (`divider.tsx`)

Este arquivo implementa um componente de **Divider** reutilizável em React, que pode ser usado para separar visualmente seções de conteúdo. O componente suporta orientação horizontal e vertical, texto centralizado e customização de tamanho e estilo via props.

---

## Visão Geral

O componente `Divider` permite:

- Separação visual clara entre seções de conteúdo.
- Orientação horizontal ou vertical.
- Inserção opcional de texto centralizado na linha.
- Customização de largura, altura e estilo CSS.
- Integração flexível com layouts baseados em `flex`.

---

## Objetivos do Componente

- Prover divisores visuais consistentes e reutilizáveis.
- Permitir orientação horizontal ou vertical.
- Suportar divisores com ou sem texto centralizado.
- Facilitar customização de largura, altura e comportamento flexível.

---

## Importações e Dependências

| Biblioteca                 | Função                                             |
| -------------------------- | -------------------------------------------------- |
| `react`                    | Estrutura do componente                            |
| `@/utils/class-name-merge` | Função `cn` para mesclar classes CSS dinamicamente |

---

## Propriedades do Componente

| Propriedade   | Tipo                          | Padrão         | Descrição                                                             |
| ------------- | ----------------------------- | -------------- | --------------------------------------------------------------------- |
| `flexItem`    | `boolean`                     | -              | Define se o divisor deve se ajustar ao tamanho do container flex      |
| `height`      | `string`                      | -              | Altura do divisor (aplicável principalmente para divisores verticais) |
| `orientation` | `'horizontal' \| 'vertical'`  | `'horizontal'` | Define a orientação do divisor                                        |
| `text`        | `string`                      | -              | Texto a ser exibido no centro do divisor (apenas horizontal)          |
| `width`       | `string`                      | `'w-full'`     | Largura do divisor                                                    |
| `className`   | `string`                      | -              | Classe CSS customizada para estilização adicional                     |
| `...props`    | `React.ComponentProps<'div'>` | -              | Props adicionais de um elemento `<div>` padrão                        |

---

## Estrutura do Componente

O componente verifica a orientação e renderiza o divisor correspondente:

- **Vertical:** linha fina (`w-px`) que pode esticar no container flex.
- **Horizontal sem texto:** linha fina (`h-px`) ocupando a largura definida.
- **Horizontal com texto:** linha horizontal com o texto centralizado e linha atrás.

```tsx
<Divider orientation="horizontal" />
<Divider orientation="vertical" height="h-16" flexItem />
<Divider text="Ou continue com" />
```

## Fluxo de Renderização

### Verifica orientation:

Se vertical, renderiza <div> estreito e alto.

Se horizontal:

Se text presente, renderiza linha com texto centralizado.

Caso contrário, renderiza linha simples.

Classes CSS aplicadas via cn para permitir customização de largura, altura e comportamento flexível.

## Diagrama de Fluxo

mermaid
Copiar código

```
flowchart TD
  Props([Props do Divider])
  CheckOrientation{orientation}
  VerticalDiv([Div Vertical])
  CheckText{text?}
  HorizontalTextDiv([Div Horizontal com Texto])
  HorizontalDiv([Div Horizontal])

  Props --> CheckOrientation
  CheckOrientation -->|vertical| VerticalDiv
  CheckOrientation -->|horizontal| CheckText
  CheckText -->|sim| HorizontalTextDiv
  CheckText -->|não| HorizontalDiv
```

## Detalhes das Classes CSS

bg-border → cor do divisor

h-px → altura mínima para divisores horizontais

w-px → largura mínima para divisores verticais

flexItem → adiciona self-stretch para ocupar todo o espaço do container flex

px-3, z-10 → espaçamento e sobreposição do texto centralizado

bg-background e text-foreground-soft → estilo do texto do divisor

## Exemplo de Uso

### Divisor Horizontal Simples

Copiar código

```tsx
<Divider />
```

### Divisor Vertical em Flex Container

Copiar código

```tsx
<div className='flex items-center gap-4'>
  <span>Item 1</span>
  <Divider orientation='vertical' flexItem height='h-12' />
  <span>Item 2</span>
</div>
```

### Divisor Horizontal com Texto Centralizado

Copiar código

```tsx
<Divider text='Ou continue com' className='my-4' />
```

## Vantagens e Boas Práticas

✅ Reutilizável: Pode ser usado em diferentes layouts e seções.

✅ Flexível: Suporta orientação, altura, largura e texto centralizado.

✅ Customizável: Classes adicionais podem ser passadas via className.

✅ Compatível com Flexbox: flexItem garante alinhamento correto em layouts flexíveis.

## Quando Usar Este Componente

Separar visualmente seções de um formulário.

Inserir divisores entre cards ou elementos de lista.

Criar linhas de separação com ou sem texto explicativo.

Layouts que exigem divisores horizontais ou verticais consistentes.

## Resumo

O componente Divider é uma solução leve e flexível para criar separações visuais em React. Ele suporta orientação horizontal e vertical, texto centralizado e integração com layouts flex, mantendo consistência visual e facilidade de customização.
