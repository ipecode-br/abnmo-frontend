# Documentação do Componente RadioGroup (`radio-group.tsx`)

O arquivo `radio-group.tsx` define componentes React reutilizáveis para criar grupos de opções de seleção (radio buttons) com estilos consistentes e suporte a labels acessíveis.

---

## ☑️ Objetivo do Componente

- O componente **`RadioGroup`** serve para agrupar várias opções de seleção.
- Cada opção é representada pelo componente **`RadioGroupItem`**.
- Permite estilização consistente e integração com labels acessíveis.
- Facilita a criação de grupos de radio buttons em formulários React.

---

## 📦 Principais Importações

- `RadioGroupPrimitive` do **@radix-ui/react-radio-group**: Base para criar grupos de radio buttons.
- `CheckIcon` do **lucide-react**: Ícone de marcação.
- `useId` do React: Gera ids únicos para associação entre radio e label.
- `cn` de `@/utils/class-name-merge`: Para unir classes CSS dinamicamente.
- `Label`: Componente de label reutilizável.

---

## 🧩 Propriedades do Componente RadioGroup

```ts
export type RadioGroupProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Root
>
```

- Recebe todas as props do `RadioGroupPrimitive.Root`.
- `className`: Permite adicionar classes CSS extras.

---

## ⚙️ Lógica do Componente RadioGroup

```tsx
export function RadioGroup({ className, ...props }: Readonly<RadioGroupProps>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn('flex gap-6', className)}
      {...props}
    />
  )
}
```

- Renderiza o container do grupo com espaçamento (`gap-6`).
- Combina classes padrão com `className`.
- Repassa todas as props para o `RadioGroupPrimitive.Root`.

---

## 🧩 Propriedades do Componente RadioGroupItem

```ts
export interface RadioGroupItemProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {
  label: string
}
```

- `label` (`string`): Texto exibido ao lado do radio.
- Aceita todas as props do `RadioGroupPrimitive.Item`.
- `className`: Para customizar o estilo de cada item.

---

## ⚙️ Lógica do Componente RadioGroupItem

```tsx
export function RadioGroupItem({
  label,
  className,
  ...props
}: Readonly<RadioGroupItemProps>) {
  const id = useId()

  return (
    <div className='flex items-center gap-2'>
      <RadioGroupPrimitive.Item
        id={id}
        className={cn(
          'peer border-border focus-visible:ring-ring data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=checked]:bg-primary size-6 shrink-0 cursor-pointer rounded-md border shadow-xs focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
          <CheckIcon
            className='text-primary-foreground size-4'
            strokeWidth={3}
          />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <Label
        htmlFor={id}
        className='text-foreground-soft cursor-pointer font-medium'
      >
        {label}
      </Label>
    </div>
  )
}
```

- Cada item gera um `id` único com `useId`.
- Aplica classes para estados padrão, selecionado, foco e desabilitado.
- Renderiza `CheckIcon` dentro do item quando selecionado.
- Associa o `Label` ao item pelo `id`.

---

### 📝 Exemplo de Uso

```tsx
<RadioGroup defaultValue='opcao1'>
  <RadioGroupItem value='opcao1' label='Opção 1' />
  <RadioGroupItem value='opcao2' label='Opção 2' />
  <RadioGroupItem value='opcao3' label='Opção 3' />
</RadioGroup>
```

---

## 🔍 Pontos-Chave

- Reusabilidade: Pode ser usado em qualquer formulário.
- Personalização: Cada item aceita classes extras e props do Radix.
- Acessibilidade: Labels vinculados automaticamente aos inputs.
- Consistência visual: Estados de foco, seleção e desabilitado estilizados.

---

## 📋 Resumo das Props

- `value` (`string`): Valor do radio selecionado.
- `label` (`string`): Texto exibido ao lado do radio.
- `className` (`string`): Adiciona classes extras.
- `...props` (props do `RadioGroupPrimitive.Root` ou `Item`): Outras props do Radix.

---

## 💡 Vantagens

- Criação fácil de grupos de radio buttons estilizados.
- Integração com labels acessíveis.
- Suporte a ícones e estados visuais customizados.
- Flexível e reutilizável.

---

## 🛠️ Resumo

O componente `RadioGroup` e `RadioGroupItem` fornecem uma solução completa para grupos de radio buttons em React, combinando acessibilidade, estilo consistente e integração simples em formulários complexos.
