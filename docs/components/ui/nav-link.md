# Documentação do Componente NavLink (`nav-link.tsx`)

O arquivo `nav-link.tsx` define um componente React reutilizável que combina a navegação do Next.js com estilos de link acessíveis e interativos.

---

## ☑️ Objetivo do Componente

- O componente **`NavLink`** serve para criar links internos navegáveis no Next.js com estilo consistente.
- Adiciona efeitos visuais como hover, foco e sublinhado, mantendo acessibilidade.
- Permite personalização adicional de classes CSS via `className`.

---

## 📦 Principais Importações

- `Link` e `LinkProps` do **Next.js**: Para navegação entre páginas.
- `cn` de `@/utils/class-name-merge`: Função utilitária para unir classes CSS dinamicamente.

---

## 🧩 Propriedades do Componente NavLink

```ts
type NavLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
```

- Todas as props de navegação do Next.js (`LinkProps`).
- Todas as props de `<a>` (exceto `href`).
- `className`: Permite adicionar classes CSS extras.

---

## ⚙️ Lógica do Componente

```tsx
export function NavLink({ className, ...props }: Readonly<NavLinkProps>) {
  return (
    <Link
      className={cn(
        'hover:text-primary ring-offset-background focus-visible:ring-ring underline underline-offset-3 transition-colors focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  )
}
```

- Aplica classes padrão para estilo de link interativo e acessível.
- Combina classes adicionais fornecidas via `className` usando `cn`.
- Repassa todas as demais props para o componente `Link`.

---

### 📝 Exemplo de Uso

- `<NavLink href="/about">Sobre nós</NavLink>`
- `<NavLink href="/contact" className="text-blue-600">Contato</NavLink>`

---

## 🔍 Pontos-Chave

- Combina navegação (`Link`) com estilo de link acessível.
- Adiciona efeitos visuais como hover, foco e sublinhado.
- Flexível e personalizável através de props.

---

## 📋 Resumo das Props

- `href` (`string` | `UrlObject`): Caminho do link.
- `className` (`string`): Adiciona classes extras.
- `...props` (`LinkProps` & `AnchorHTMLAttributes<HTMLAnchorElement>`): Outras props para `<Link>`.

---

## 💡 Vantagens

- Reusável para links internos do Next.js.
- Mantém acessibilidade e consistência visual.
- Fácil de customizar via `className`.

---

## 🛠️ Resumo

O componente `NavLink` é uma solução elegante para criar links navegáveis com estilo acessível e efeitos interativos, garantindo consistência visual em toda a aplicação.
