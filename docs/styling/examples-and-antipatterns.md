# Exemplos práticos e anti-padrões

Este documento mostra exemplos reais do projeto, boas práticas e problemas a evitar.

## Exemplo### Anti-padrão 3: Cores arbitrárias do Tailwind

```tsx
// ❌ Não faça:
className = 'border-gray-300'
className = 'text-red-500'
className = 'bg-blue-600'

// ✅ Faça:
className = 'border-border'
className = 'text-error'
className = 'bg-primary'
```

### Anti-padrão 4: Margin quando gap seria melhorcas

### 1. Uso de `size-*` em ícones

Vários componentes do projeto usam corretamente `size-*`:

```tsx
// ✅ De: src/components/ui/button.tsx
const buttonVariants = cva('...', {
  size: {
    default: 'h-10 min-h-10 px-4 [&_svg]:size-5',
    xs: 'h-8 min-h-8 rounded-md px-2.5 text-xs [&_svg]:size-4',
    sm: 'h-9 min-h-9 px-4 [&_svg]:size-4',
    lg: 'h-11 min-h-11 rounded-xl px-3 text-base [&_svg]:size-5',
    icon: 'min-size-10 size-10 [&_svg]:size-5',
  },
})
```

### 2. Componentes com tokens de cores

```tsx
// ✅ De: src/components/ui/card.tsx
export function Card({ className, ...props }: Readonly<CardProps>) {
  return (
    <div
      className={cn(
        'bg-card border-border rounded-2xl border p-4 shadow-xs',
        className,
      )}
      {...props}
    />
  )
}
```

### 3. Uso de `ml-auto` para layout

```tsx
// ✅ De: src/app/(dashboard)/_header/index.tsx
<header className='flex items-center gap-4 px-8 py-4'>
  <h1 className='text-xl font-medium'>Visão Geral</h1>
  <Divider orientation='vertical' height='h-5' />
  <Breadcrumbs />

  <section className='ml-auto flex items-center gap-2'>
    <Button size='icon' variant='outline' className='rounded-full'>
      <CircleHelpIcon className='text-foreground-soft' />
    </Button>
  </section>
</header>
```

### 4. Variantes CVA bem estruturadas

```tsx
// ✅ De: src/components/ui/alert.tsx
const alertVariants = cva('rounded-lg border px-3 py-2 text-sm', {
  variants: {
    variant: {
      default: 'border-disabled/50 bg-disabled/5 text-foreground',
      success: 'border-success text-success bg-success/5',
      error: 'border-error text-error bg-error/5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
```

---

## Anti-padrões e como corrigi-los

### Anti-padrão 1: Usar `w-*` e `h-*` separados para quadrados

```tsx
// ❌ Não faça (para elementos quadrados):
<button className='w-10 h-10'>Ícone</button>
<Avatar className='w-12 h-12' />

// ✅ Faça:
<button className='size-10'>Ícone</button>
<Avatar className='size-12' />
```

**Por quê**: `size-*` é mais conciso e deixa claro que é um quadrado.

**Nota**: Para elementos retangulares, é OK manter `w-*` e `h-*` separados:

```tsx
// ✅ OK para retângulos:
<Skeleton className='h-5 w-48 rounded-md' />
<Skeleton className='h-6 w-32 rounded-md' />
```

---

### Anti-padrão 2: Valores arbitrários desnecessários

```tsx
// ❌ Evite (valores estáticos):
<div className='w-[480px] h-[240px] rounded-[8px]' />
<button className='text-[14px] px-[12px]' />
<Card className='gap-[16px]' />
```

**Por quê**: Valores estáticos devem usar as classes padrão do Tailwind, que são mais eficientes e reduzem o bundle.

**Solução**: Use as classes predefinidas do Tailwind:

```tsx
// ✅ Faça:
<div className='w-96 h-60 rounded-lg' />
<button className='text-sm px-3' />
<Card className='gap-4' />
```

**Exceção**: É aceitável usar valores arbitrários com CSS variables dinâmicas do Radix ou outras bibliotecas:

```tsx
// ✅ OK (valores dinâmicos):
className = 'h-[var(--popover-height)] w-full'
```

---

### Anti-padrão 3: `min-size-` sem `size-`

```tsx
// ❌ Não faça:
className = 'border-gray-300'
className = 'text-red-500'
className = 'bg-blue-600'

// ✅ Faça:
className = 'border-border'
className = 'text-error'
className = 'bg-primary'
```

### Anti-padrão 4: Margin quando gap seria melhor

```tsx
// ⚠️ Menos ideal (margin em cada item):
<div className='flex flex-col'>
  <Button className='mb-2'>Botão 1</Button>
  <Button className='mb-2'>Botão 2</Button>
  <Button>Botão 3</Button>
</div>

// ✅ Melhor (use gap no container):
<div className='flex flex-col gap-2'>
  <Button>Botão 1</Button>
  <Button>Botão 2</Button>
  <Button>Botão 3</Button>
</div>
```

**Por quê**: `gap` é mais limpo, mais fácil de manter e funciona com flexbox.

---

### Anti-padrão 5: Classes redundantes em componentes

**Padrão encontrado**: Passar classes que já estão no componente.

```tsx
// ❌ Não faça (Button já tem px-4, h-10, rounded-lg):
<Button className='px-4 h-10 rounded-lg'>Clique</Button>

// ✅ Faça:
<Button>Clique</Button>
<Button className='text-lg'>Clique Grande</Button>
```

---

## Checklist de estilização

Antes de commitar, verifique:

- [ ] Todas as cores são do sistema
- [ ] Sem valores arbitrários como `w-[480px]`, `text-[14px]`, `rounded-[8px]`
- [ ] Elementos quadrados usam `size-*` em vez de `w-* h-*`
- [ ] Nenhuma classe é repetida que já exista no componente base
- [ ] Classes de espaçamento usam `gap` quando apropriado (flex)
- [ ] Nunca usa template literals para classes (ex: `` `gap-${spacing}` ``)
- [ ] Dinâmica usa `cn()` ou CVA, não template literals
- [ ] `[&_svg]` usado apenas em componentes com múltiplos SVGs, não em ícones isolados
- [ ] Ícones isolados têm classe aplicada diretamente (ex: `<Icon className='size-5' />`)
- [ ] Responsividade usa breakpoints padrão (`sm`, `md`, `lg`, `xl`)
- [ ] Sem uso de cores não-sistema do Tailwind (`red-500`, `blue-600`, etc)

---

## Estrutura de arquivo

Quando criar novo arquivo com estilos:

```tsx
import { cn } from '@/utils/class-name-merge'

// 1. Importar CVA se usar variantes
import { cva, type VariantProps } from 'class-variance-authority'

// 2. Definir variantes (se houver)
const componentVariants = cva(
  'base-classes', // Classes que SEMPRE aplicam
  {
    variants: {
      variant: {
        default: 'primary-styles',
        secondary: 'secondary-styles',
      },
      size: {
        sm: 'small-styles',
        md: 'medium-styles',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

// 3. Definir tipos (se houver)
export interface ComponentProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof componentVariants> {}

// 4. Implementar componente
export function Component({
  className,
  variant,
  size,
  ...props
}: Readonly<ComponentProps>) {
  return (
    <div
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

---

## Recursos

- [Tailwind CSS Docs v4](https://tailwindcss.com)
- [CVA (Class Variance Authority)](https://cva.style)
- [clsx - Conditional Classes](https://github.com/lukeed/clsx)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge)
