# Checkbox

Componente de checkbox reutilizável baseado em Base UI (`@base-ui/react/checkbox`) com suporte a variantes e label.

**Localização:** `src/components/ui/checkbox.tsx`

## Props

```ts
interface CheckboxProps
  extends CheckboxRootProps,
    VariantProps<typeof checkboxVariants> {
  label?: string
}
```

- `variant`: `'default'` | `'error'`
- `size`: `'default'` (`size-5.5`) | `'lg'` (`size-7`)
- `label`: texto opcional renderizado ao lado do checkbox
- Todas as props de `Checkbox.Root` do Base UI

## Como usar

```tsx
<Checkbox />                           // Padrão
<Checkbox size="lg" />                 // Grande
<Checkbox label="Lembrar-me" />        // Com label
<Checkbox variant="error" />           // Erro
<Checkbox disabled />                  // Desabilitado
```

## Estrutura

```tsx
<label>
  <UICheckbox.Root>
    <UICheckbox.Indicator>
      <CheckIcon />
    </UICheckbox.Indicator>
  </UICheckbox.Root>
  {label && <span>{label}</span>}
</label>
```

Usa `checkboxVariants` via CVA com variantes `default`/`error` e tamanhos `default`/`lg`.
