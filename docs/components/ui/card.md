# Documentação do Componente Card (`card.tsx`)

O arquivo `card.tsx` define um componente React reutilizável que serve como container estilizado para agrupar conteúdo de forma consistente.

---

## ☑️ Objetivo do Componente

- O componente **`Card`** serve para criar contêineres visuais em aplicativos React.
- Fornece estilo padrão com bordas arredondadas, sombra e padding.
- Pode ser facilmente reutilizado e customizado através de `className`.

---

## 📦 Principais Importações

- `HTMLAttributes` do React: Permite que o componente aceite todas as props de `<div>`.
- `cn` de `@/utils/class-name-merge`: Função utilitária para combinar classes CSS dinamicamente.

---

## 🧩 Propriedades do Componente Card

```ts
export type CardProps = HTMLAttributes<HTMLDivElement>
```

- `className` (`string`): Permite adicionar classes CSS extras.
- `...props` (`HTMLAttributes<HTMLDivElement>`): Outras props válidas para o `<div>`.

---

## ⚙️ Lógica do Componente

```tsx
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

- Renderiza um `<div>` estilizado como um card.
- Combina classes padrão com quaisquer classes adicionais fornecidas via `className`.
- Repassa todas as props restantes para o `<div>`.

---

### 📝 Exemplo de Uso

- `<Card>Conteúdo do Card</Card>`
- `<Card className="bg-blue-50">Conteúdo personalizado</Card>`

---

## 🔍 Pontos-Chave

- Reusabilidade: Pode ser usado em qualquer parte da aplicação.
- Personalização: Aceita classes extras para customização de estilo.
- Consistência visual: Mantém bordas, sombra e padding padrão.
- Flexibilidade: Permite incluir qualquer conteúdo interno.

---

## 💡 Vantagens

- Cria contêineres estilizados de forma rápida.
- Facilita a manutenção do design do aplicativo.
- Simples, flexível e reutilizável.

---

## 🛠️ Resumo

O componente `Card` fornece um contêiner visual elegante e consistente, permitindo agrupar conteúdo de maneira organizada e customizável dentro de aplicações React.
