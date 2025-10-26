# Guia de estilização com Tailwind CSS v4

## Visão geral

Este projeto utiliza **Tailwind CSS v4** com um design system consolidado. O objetivo deste guia é garantir consistência, reduzir o tamanho do bundle e manter o código limpo e legível.

---

## Tokens do design system

### Cores disponíveis

Todas as cores devem ser utilizadas através dos tokens do design system definidos em `globals.css`:

### Usando cores no Tailwind

```tsx
// ✅ Correto: Use classes Tailwind com os tokens
<div className='bg-background text-foreground'>
  <button className='bg-primary text-primary-foreground'>Salvar</button>
</div>

// ❌ Incorreto: Nunca use valores arbitrários
<div className='bg-[#ff0000] text-[#0a0d14]'>Erro</div>
<div className='bg-blue-500'>Erro</div>

// ❌ Incorreto: Nunca use cores do Tailwind padrão
<button className='bg-red-500'>Não faça isso</button>
```

---

## Regras fundamentais

### 1. Evitar valores arbitrários

Nunca use valores arbitrários do Tailwind. Eles quebram a consistência visual e aumentam o bundle.

```tsx
// ❌ Não faça:
<div className='w-[480px] h-[240px] text-[14px] rounded-[8px]' />

// ✅ Faça: Use classes predefinidas ou adicione ao globals.css
<div className='w-full h-40 text-sm rounded-lg' />
```

Se você precisar de um valor que não existe, considere adicionar ao design system em `globals.css`.

### 2. Preferir `size-*` sobre `w-* h-*`

Para dimensionar elementos quadrados, use `size-*` em vez de combinações `w-` e `h-`.

```tsx
// ❌ Desnecessário:
<button className='w-10 h-10'>Ícone</button>

// ✅ Conciso:
<button className='size-10'>Ícone</button>

// ✅ Mantém SVG dentro de tamanho correto:
<Icon className='size-5' />
```

### 3. Nunca repita estilos de componentes

Componentes UI já possuem estilos base. Não repita classes que já estão aplicadas.

```tsx
// ❌ Não faça (input já tem px-3, py-2, rounded-lg):
<Input className='px-3 py-2 rounded-lg' />
<Button className='rounded-lg px-4 py-2' />

// ✅ Adicione apenas customizações necessárias:
<Input className='bg-background-soft' />
<Button variant='primary' size='lg' />

// ✅ Ou customize com classes que não conflitem:
<Input className='border-primary focus-visible:ring-primary' />
```

### 4. Reduzir ao máximo o uso de classes

Escreva menos CSS. Use componentes e variantes quando possível.

```tsx
// ❌ Muitas classes desnecessárias:
<div className='flex items-center justify-center gap-2 rounded-lg bg-background-soft border border-border px-4 py-2'>
  Conteúdo
</div>

// ✅ Simples e limpo (quando possível):
<Card className='flex items-center justify-center gap-2'>
  Conteúdo
</Card>

// ✅ Quando não há componente, seja minimalista dentro do possível:
<div className='flex items-center gap-2'>
  Conteúdo
</div>
```

### 5. Use espaçamento com `gap` em flexbox

Prefira `gap` sobre `margin` ou `space-*` para espaçar itens em flex containers.

```tsx
// ❌ Menos legível (margin individual):
<div className='flex'>
  <button className='mr-2'>Botão 1</button>
  <button className='mr-2'>Botão 2</button>
  <button>Botão 3</button>
</div>

// ❌ Errado (space-* com flex):
<div className='flex space-x-2'>
  <button>Botão 1</button>
  <button>Botão 2</button>
  <button>Botão 3</button>
</div>

// ✅ Correto (gap com flex):
<div className='flex gap-2'>
  <button>Botão 1</button>
  <button>Botão 2</button>
  <button>Botão 3</button>
</div>
```

**Regra importante**:

- Com `flex` ou `grid`: **use `gap-*` obrigatoriamente**
- Sem `flex`/`grid` (div simples): use `space-*` se necessário

```tsx
// ✅ Correto (gap com grid):
<div className='grid grid-cols-3 gap-4'>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// ✅ Correto (space-* sem flex/grid):
<div className='space-y-4'>
  <p>Parágrafo 1</p>
  <p>Parágrafo 2</p>
  <p>Parágrafo 3</p>
</div>
```

### 6. Espaçamento com `ml-auto` para flex items à direita

Use `ml-auto` (margin-left auto) para empurrar elementos para a direita em flex containers, em vez de usar `justify-between` com muitos itens.

```tsx
// ✅ Comum no projeto:
<header className='flex items-center gap-4 px-8 py-4'>
  <h1>Título</h1>
  <div className='ml-auto flex items-center gap-2'>
    <Button>Ação</Button>
  </div>
</header>
```

### 7. Seletores filho com `[&_svg]`

Use o seletor `[&_svg]` **apenas em componentes que definem tamanhos padrões de SVG** (como Button, Input, Select, etc).

```tsx
// ✅ Correto: Componente define tamanho do SVG
const buttonVariants = cva('...', {
  variants: {
    size: {
      default: '[&_svg]:size-5',
      sm: '[&_svg]:size-4',
    },
  },
})

// ✅ SVG isolado: aplique a classe diretamente no ícone
<Icon className='size-5 text-primary' />

// ❌ Não faça (desnecessário):
<div className='[&_svg]:size-5 [&_svg]:text-primary'>
  <Icon />
</div>
```

**Regra**: Se há apenas um SVG filho ou você está usando um ícone isolado, aplique a classe direto no elemento. Use `[&_svg]` apenas quando precisar estilizar múltiplos SVGs filhos dentro de um componente estruturado.

### 8. Usar `disabled` e `aria-` para estados

Prefira atributos semânticos sobre classes manuais para estados.

```tsx
// ❌ Evite:
<button className='opacity-50 cursor-not-allowed'>Desabilitado</button>

// ✅ Use atributos semânticos:
<button className='disabled:opacity-50 disabled:cursor-not-allowed' disabled>
  Desabilitado
</button>

// ✅ Com aria-attributes:
<div className='aria-disabled:pointer-events-none aria-disabled:opacity-50' aria-disabled>
  Conteúdo
</div>
```

### 9. Nunca usar template literals para classes dinâmicas

Nunca construa strings de classes dinamicamente com template literals. Use a função `cn()` do `@/utils/class-name-merge`.

```tsx
// ❌ Proibido (template literals):
const getButtonClass = (variant) => `bg-${variant} text-white`
const className = `flex gap-${spacing} p-${padding}`
className = `${isActive ? 'bg-primary' : 'bg-gray-200'}`

// ✅ Use CVA para variantes:
const buttonVariants = cva('...', {
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
    },
  },
})

// ✅ Use cn() para classes condicionais:
import { cn } from '@/utils/class-name-merge'
;<div
  className={cn(
    'flex gap-2 p-4',
    isActive && 'bg-primary',
    !isActive && 'bg-background-soft',
  )}
>
  Conteúdo
</div>
```

**Por quê**:

- Template literals quebram a compilação do Tailwind
- Tailwind precisa analisar as classes em tempo de build
- Dinâmica com template literal previne que Tailwind encontre as classes
- `cn()` e CVA mantêm as classes estáticas e analisáveis

---

## O que não fazer

### Valores arbitrários

```tsx
className = 'w-[480px] h-[240px] text-[14px] gap-[12px] rounded-[8px]'
```

Use valores do scale do Tailwind ou adicione ao design system.

### Cores não-sistema

```tsx
className = 'text-red-500 bg-blue-600 border-gray-300'
```

### Repetir estilos de componentes

```tsx
<Button className='h-10 px-4 text-sm rounded-lg' />
<Input className='h-10 px-3 py-2 rounded-lg' />
```

Esses estilos já estão inclusos. Customize apenas o necessário.

### Usar `w-*` e `h-*` separados para quadrados

```tsx
<div className='h-10 w-10'>Conteúdo</div>
```

Use `size-10`.

### Espaçamento aninhado desnecessário

```tsx
<div className='p-4'>
  <div className='m-2 p-2'>
    <span className='ml-4'>Texto</span>
  </div>
</div>
```

Simplifique a estrutura.

### Template literals para classes dinâmicas

```tsx
// ❌ Proibido:
const className = `flex gap-${spacing} p-${padding}`
const bgColor = `bg-${isActive ? 'primary' : 'gray'}`
```

Use `cn()` ou CVA em vez disso. Template literals quebram a análise do Tailwind.

---

## Breakpoints e responsividade

Use os breakpoints padrão do Tailwind:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

```tsx
// ✅ Correto:
<div className='flex flex-col md:flex-row gap-4'>
  <aside className='w-full md:w-48'>Sidebar</aside>
  <main className='flex-1'>Conteúdo</main>
</div>

// ✅ Ocultar/mostrar:
<button className='hidden md:block'>Ação Desktop</button>
<button className='md:hidden'>Ação Mobile</button>
```

---

## Dicas de performance

1. **Agrupe classes semelhantes**: use a mesma classe para múltiplos elementos quando apropriado
2. **Evite template literals com classes**: nunca use `` `bg-${color}` `` ou similar, use CVA ou `cn()`
3. **Use variantes CVA**: para dinâmica controlada de variantes
4. **Minifique com `cn()`**: use `cn()` do `@/utils/class-name-merge` para mesclar classes
5. **Use componentes**: abstraia padrões repetidos em componentes

```tsx
// ❌ Template literals (quebra o Tailwind):
const buttonClass = `bg-${color} text-${textColor}`

// ✅ Use variantes CVA:
const buttonVariants = cva('...', {
  variants: {
    color: {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
    },
  },
})

// ✅ Use cn() para condições:
className={cn(
  'base-classes',
  isActive && 'active-classes',
  isDisabled && 'disabled-classes'
)}
```

---

## Recursos adicionais

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Class Variance Authority (CVA)](https://cva.style)
- Arquivo de config: `src/app/globals.css`
- Utilitário de merge: `src/utils/class-name-merge.ts`
