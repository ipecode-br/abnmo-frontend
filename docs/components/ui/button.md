# Button

Componente de botão reutilizável com CVA para variantes visuais, tamanhos e estado de carregamento.

**Localização:** `src/components/ui/button.tsx`

## Variantes

```ts
const buttonVariants = cva(..., {
  variants: {
    variant: {
      default, outline, destructive, success, muted, ghost
    },
    size: {
      default, xs, sm, lg, icon
    }
  }
})
```

## Props

```ts
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}
```

## Como usar

```tsx
<Button>Enviar</Button>
<Button variant="destructive" size="lg">Excluir</Button>
<Button variant="outline">Cancelar</Button>
<Button loading>Salvando...</Button>
```

## Loading

Quando `loading={true}`, o botão renderiza `Loader2Icon` com animação `animate-spin` e fica desabilitado.

## `buttonVariants`

Exportado para reuso em outros componentes (`NavButton`, `DialogTrigger`, etc.).

```tsx
import { buttonVariants } from '@/components/ui/button'
;<Link className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
  Link
</Link>
```
