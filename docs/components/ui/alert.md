# Documentação do Componente Alert (`alert.tsx`)

O arquivo `alert.tsx` define um componente React reutilizável que exibe mensagens de alerta com diferentes estilos visuais, como padrão, sucesso e erro. Ele utiliza utilitários modernos de estilização para garantir flexibilidade e consistência no design.

---

## ☑️ Objetivo do Componente

- O componente **`Alert`** serve para mostrar mensagens de alerta em aplicações.
- Permite customização visual através de variantes (`default`, `success`, `error`).
- Aceita todas as props de um `<div>` padrão, mantendo flexibilidade.

---

## 📦 Principais Importações

- `cva` e `VariantProps` do **class-variance-authority**: Gerenciamento das variantes de estilo.
- `HTMLAttributes` do React: Permite que o componente aceite todas as props de `<div>`.
- `cn` de `@/utils/class-name-merge`: Função utilitária para combinar classes CSS dinamicamente.

---

## 🎨 Estrutura dos Estilos e Variantes

```ts
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

### 🚦 Tabela de Variantes

- `default`: `border-disabled/50 bg-disabled/5 text-foreground` (Visual padrão, neutro)
- `success`: `border-success text-success bg-success/5` (Verde, indicando sucesso)
- `error`: `border-error text-error bg-error/5` (Vermelho, indicando erro)

---

## 🧩 Propriedades do Componente Alert

```ts
export type AlertProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    error?: boolean
  }
```

- `variant` (`default` | `success` | `error`): Define a aparência do alerta.
- `error` (`boolean`): Se `true`, força o estilo de erro, ignorando `variant`.
- `className` (`string`): Permite adicionar classes CSS extras.
- `...props` (`HTMLAttributes<HTMLDivElement>`): Outras props válidas para `<div>`.

---

## ⚙️ Lógica do Componente

```tsx
export function Alert({
  variant,
  error,
  className,
  ...props
}: Readonly<AlertProps>) {
  return (
    <div
      className={cn(
        alertVariants({ variant: error ? 'error' : variant, className }),
      )}
      {...props}
    />
  )
}
```

- Aplica classes do alerta combinando `variant` e `className`.
- Se `error` for `true`, sempre aplica a variante de erro.
- Repassa todas as props restantes para o `<div>`.

---

### 📝 Exemplo de Uso

- `<Alert>Mensagem de informação padrão</Alert>`
- `<Alert variant="success">Ação realizada com sucesso!</Alert>`
- `<Alert variant="error">Ocorreu um erro!</Alert>`
- `<Alert error>Erro crítico detectado!</Alert>`

---

## 🔍 Pontos-Chave

- Reusabilidade: Pode ser usado em qualquer lugar da aplicação.
- Personalização: Suporta variantes e sobrescrita de estilos.
- Acessibilidade: Passa todas props de `<div>`.
- Consistência visual: Usa padrões centralizados de estilização.

---

## 💡 Vantagens

- Centraliza a estilização de alertas.
- Fácil de manter e ampliar.
- Funciona como componente autônomo ou controlado.

---

## 🛠️ Resumo

O componente `Alert` fornece uma solução moderna e consistente para exibição de mensagens de alerta, garantindo flexibilidade, personalização e integração fácil em qualquer parte da aplicação.
