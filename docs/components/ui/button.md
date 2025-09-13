# Documentação do Componente Button (`button.tsx`)

O arquivo `button.tsx` define um componente React reutilizável para botões com suporte a variantes visuais, tamanhos diferentes, estado de carregamento e renderização condicional como `Slot`.

---

## ☑️ Objetivo do Componente

- O componente **`Button`** serve para criar botões reutilizáveis em toda a aplicação.
- Suporta diferentes **variantes visuais** (`default`, `fancy`, `outline`, `muted`, `ghost`).
- Suporta diferentes **tamanhos** (`xs`, `sm`, `default`, `lg`, `icon`).
- Possui suporte a estado **loading** e opção `asChild` para renderização como outro componente.

---

## 📦 Principais Importações

- `Slot` do **@radix-ui/react-slot**: Permite renderizar o botão como outro componente.
- `cva` e `VariantProps` do **class-variance-authority**: Gerenciamento de variantes de estilo.
- `Loader2Icon` do **lucide-react**: Ícone de carregamento animado.
- `cn` de `@/utils/class-name-merge`: Função utilitária para unir classes CSS dinamicamente.

---

## 🎨 Estrutura dos Estilos e Variantes

```ts
const buttonVariants = cva(
  'ring-offset-background focus-visible:ring-ring inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/80 shadow-xs',
        fancy:
          'bg-primary text-primary-foreground hover:bg-primary/80 inset-shadow-md shadow-xs',
        outline:
          'border-border hover:bg-accent text-accent-foreground bg-background border shadow-xs',
        muted: 'bg-background-soft text-accent-foreground hover:bg-accent',
        ghost: 'text-accent-foreground hover:bg-accent/50 bg-transparent',
      },
      size: {
        default: 'h-10 min-h-10 px-4 [&_svg]:size-5',
        xs: 'h-8 min-h-8 rounded-md px-2.5 text-xs [&_svg]:size-4',
        sm: 'h-9 min-h-9 px-4 [&_svg]:size-4',
        lg: 'h-11 min-h-11 rounded-xl px-3 text-base [&_svg]:size-5',
        icon: 'min-size-10 size-10 [&_svg]:size-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
```

---

## 🧩 Propriedades do Componente Button

```ts
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  asChild?: boolean
}
```

- `variant` (`string`): Define o estilo do botão.
- `size` (`string`): Define o tamanho do botão.
- `loading` (`boolean`): Se `true`, mostra um ícone de carregamento e desabilita o botão.
- `asChild` (`boolean`): Se `true`, renderiza como outro componente usando `Slot`.
- `className` (`string`): Adiciona classes CSS extras.
- `...props` (`ButtonHTMLAttributes<HTMLButtonElement>`): Outras props do botão.

---

## ⚙️ Lógica do Componente

```tsx
function Button({
  className,
  variant,
  size,
  loading,
  disabled,
  asChild = false,
  children,
  ...props
}: Readonly<ButtonProps>) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? <Loader2Icon className='animate-spin' /> : children}
    </Comp>
  )
}

export { Button, buttonVariants }
```

- Renderiza um `<button>` ou outro componente (`Slot`) se `asChild` for `true`.
- Aplica classes combinando variantes, tamanho e `className`.
- Se `loading` for `true`, exibe o ícone `Loader2Icon` animado e desabilita o botão.
- Repassa todas as props restantes para o elemento renderizado.

---

### 📝 Exemplo de Uso

- `<Button>Enviar</Button>`
- `<Button variant="fancy" size="lg">Enviar</Button>`
- `<Button loading>Carregando...</Button>`
- `<Button asChild><a href="/login">Login</a></Button>`

---

## 🔍 Pontos-Chave

- Reusabilidade: Pode ser usado em qualquer parte da aplicação.
- Personalização: Suporta variantes, tamanhos e estados de loading.
- Flexibilidade: `asChild` permite renderização condicional.
- Consistência visual: Usa padrões centralizados de estilização.

---

## 💡 Vantagens

- Componentes estilizados e consistentes.
- Suporte a estados de carregamento e desabilitado.
- Fácil de personalizar e integrar em diferentes contextos.

---

## 🛠️ Resumo

O componente `Button` fornece uma solução completa para botões reutilizáveis, combinando estilo, flexibilidade e usabilidade, garantindo consistência visual em toda a aplicação.
