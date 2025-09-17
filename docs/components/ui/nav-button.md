# Documentação do Componente NavButton (`nav-button.tsx`)

O arquivo `nav-button.tsx` define um componente React reutilizável que combina a navegação do Next.js com a estilização de botões, permitindo criar links com aparência de botão com diferentes variantes e tamanhos.

---

## ☑️ Objetivo do Componente

- O componente **`NavButton`** serve para criar links de navegação com aparência de botão.
- Permite personalização visual através de variantes e tamanhos, mantendo a consistência com outros botões do projeto.
- Facilita a integração de links internos no Next.js com estilos predefinidos.

---

## 📦 Principais Importações

- `Link` e `LinkProps` do **Next.js**: Para navegação entre páginas.
- `buttonVariants` e `ButtonProps` do componente `Button`: Para aplicar estilos e variantes de botão.
- `cn` de `@/utils/class-name-merge`: Função utilitária para unir classes CSS dinamicamente.

---

## 🧩 Propriedades do Componente NavButton

```ts
interface NavButtonProps
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}
```

- `variant`: Variante visual do botão, herdada de `ButtonProps`.
- `size`: Tamanho do botão, herdado de `ButtonProps`.
- Outras props do `<a>` (exceto `href`) são aceitas.
- Inclui todas as props de navegação do Next.js `LinkProps`.

---

## ⚙️ Lógica do Componente

```tsx
export function NavButton({
  variant,
  size,
  className,
  ...props
}: Readonly<NavButtonProps>) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

- Combina classes do botão com qualquer `className` adicional usando `cn`.
- Aplica variantes e tamanhos através de `buttonVariants`.
- Repassa todas as props restantes para o componente `Link`.

---

### 📝 Exemplo de Uso

- `<NavButton href="/dashboard">Dashboard</NavButton>`
- `<NavButton href="/profile" variant="secondary" size="sm">Perfil</NavButton>`

---

## 🔍 Pontos-Chave

- Combina navegação (`Link`) com aparência de botão.
- Mantém consistência de estilo com outros botões.
- Flexível e personalizável através de props.

---

## 📋 Resumo das Props

- `href` (`string` | `UrlObject`): Caminho do link.
- `variant` (`ButtonProps['variant']`): Variante visual do botão.
- `size` (`ButtonProps['size']`): Tamanho do botão.
- `className` (`string`): Adiciona classes extras.
- `...props` (`LinkProps` & `AnchorHTMLAttributes<HTMLAnchorElement>`): Outras props para `<Link>`.

---

## 💡 Vantagens

- Reusável para links internos com estilo de botão.
- Facilita consistência visual entre links e botões.
- Integração nativa com Next.js.

---

## 🛠️ Resumo

O componente `NavButton` é uma solução elegante para criar links navegáveis com estilo de botão, garantindo consistência visual e fácil integração com a navegação do Next.js.
