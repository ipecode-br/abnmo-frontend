# Documentação do Componente Tag (`tag.tsx`)

O arquivo `tag.tsx` define um componente React reutilizável que exibe pequenos rótulos estilizados, geralmente usados para categorizar ou destacar informações.

---

## ☑️ Objetivo do Componente

- O componente **`Tag`** serve para exibir etiquetas ou rótulos informativos.
- Pode conter ícones e texto.
- Mantém consistência visual com bordas arredondadas, padding e tamanho de fonte uniforme.

---

## 📦 Principais Importações

- `cn` de `@/utils/class-name-merge`: Função para unir classes CSS dinamicamente.
- `React.ComponentProps` para aceitar todas as props nativas de `<div>`.

---

## 🧩 Propriedades do Componente Tag

```ts
export function Tag({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {...}
```

- `className` (`string`): Permite adicionar classes CSS extras.
- `...props` (`div` props): Outras props válidas para o `<div>`.
- Pode incluir ícones SVG dentro do conteúdo do tag.

---

## ⚙️ Lógica do Componente

- Renderiza um `<div>` com classes padrão para estilo de tag (`border-border`, `bg-background`, `rounded-md`, `px-2`, `py-1`, `text-xs`, etc.).
- Combina classes adicionais passadas via `className`.
- Repassa todas as props restantes para o `<div>`.

---

### 📝 Exemplo de Uso

- `<Tag>Nova</Tag>`
- `<Tag className="bg-primary text-primary-foreground">Importante</Tag>`
- `<Tag><Icon /> Texto</Tag>` (com ícone SVG)

---

## 🔍 Pontos-Chave

- Reusabilidade: Pode ser usado em qualquer lugar do aplicativo para categorizar informações.
- Flexibilidade: Suporta customização de classes e ícones internos.
- Consistência visual: Mantém padding, borda e tipografia uniformes.

---

## 💡 Vantagens

- Cria rótulos estilizados de forma rápida.
- Fácil de integrar em listas, filtros e interfaces dinâmicas.
- Mantém padrão visual consistente.

---

## 🛠️ Resumo

O componente `Tag` fornece uma solução simples e elegante para exibir etiquetas informativas em React, com suporte a ícones, customização de estilo e consistência visual.
