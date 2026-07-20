# Documentação do Componente Checkbox (`checkbox.tsx`)

O arquivo `checkbox.tsx` define um componente React reutilizável para criar checkboxes estilizados com suporte a diferentes tamanhos e integração com a biblioteca Radix.

---

## ☑️ Objetivo do Componente

- O componente **`Checkbox`** serve para exibir caixas de seleção interativas.
- Permite diferentes tamanhos (`sm` e `md`) e estilos consistentes.
- Integra facilmente com formulários e gerencia estados de seleção.

---

## 📦 Principais Importações

- `CheckboxPrimitive` do **@radix-ui/react-checkbox**: Base para o componente checkbox.
- `Check` do **lucide-react**: Ícone de marcação.
- `cn` de `@/utils/class-name-merge`: Função utilitária para unir classes CSS dinamicamente.

---

## 🧩 Propriedades do Componente Checkbox

```ts
export interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  size?: 'sm' | 'md'
}
```

- `size` (`'sm' | 'md'`): Define o tamanho do checkbox.
- Todas as props do `CheckboxPrimitive.Root` também são aceitas.

---

## ⚙️ Lógica do Componente

```tsx
export function Checkbox({ size = 'sm', ...props }: Readonly<CheckboxProps>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'peer border-border focus-visible:ring-ring data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=checked]:bg-primary shrink-0 rounded border-2 shadow-xs focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' && 'size-4.5',
        size === 'md' && 'size-5',
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center')}
      >
        <Check
          className={cn(size === 'sm' && 'size-3', size === 'md' && 'size-4')}
          strokeWidth={3}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
```

- Renderiza o `CheckboxPrimitive.Root` com classes para estados padrão, selecionado, foco e desabilitado.
- Ajusta o tamanho do checkbox e do ícone com base na prop `size`.
- Repassa todas as props restantes para o elemento do Radix Checkbox.

---

### 📝 Exemplo de Uso

- `<Checkbox />` (tamanho `sm` padrão)
- `<Checkbox size="md" />` (tamanho médio)
- `<Checkbox checked />` (marcado)
- `<Checkbox disabled />` (desabilitado)

---

## 🔍 Pontos-Chave

- Reusabilidade: Pode ser usado em qualquer formulário ou interface.
- Personalização: Suporta diferentes tamanhos e estilos visuais.
- Acessibilidade: Usa Radix UI, garantindo suporte a teclado e foco.
- Consistência visual: Mantém padrões de borda, sombra e cores.

---

## 💡 Vantagens

- Checkboxes estilizados e consistentes.
- Fácil de integrar em formulários React.
- Suporta estados de seleção, foco e desabilitado.
- Simples, flexível e reutilizável.

---

## 🛠️ Resumo

O componente `Checkbox` fornece uma solução elegante e consistente para caixas de seleção em React, garantindo flexibilidade, acessibilidade e fácil personalização de estilos.
