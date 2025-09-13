# Documentação do Componente Skeleton (`skeleton.tsx`)

O arquivo `skeleton.tsx` define um componente React reutilizável que exibe placeholders animados para indicar carregamento de conteúdo.

---

## ☑️ Objetivo do Componente

- O componente **`Skeleton`** serve como placeholder visual durante o carregamento de dados.
- Suporta exibição de múltiplos elementos através da prop `quantity`.
- Mantém consistência visual com animação de pulsação.

---

## 📦 Principais Importações

- `React` para criação do componente.
- `cn` de `@/utils/class-name-merge`: Função utilitária para combinar classes CSS dinamicamente.

---

## 🧩 Propriedades do Componente Skeleton

```ts
interface SkeletonProps extends React.ComponentProps<'div'> {
  quantity?: number
}
```

- `quantity` (`number`): Número de placeholders a serem exibidos. Padrão é 1.
- `className` (`string`): Adiciona classes CSS extras para customização.
- `...props` (`div` props): Outras props válidas para o `<div>`.

---

## ⚙️ Lógica do Componente

- Cria um array de tamanho `quantity`.
- Renderiza um `<div>` para cada item, aplicando classes de estilo padrão (`bg-accent`, `animate-pulse`, `rounded-lg`) e quaisquer classes adicionais via `className`.
- Repassa todas as props restantes para cada `<div>` renderizado.

---

### 📝 Exemplo de Uso

- `<Skeleton />` (1 placeholder)
- `<Skeleton quantity={3} />` (3 placeholders)
- `<Skeleton className="h-6 w-20" />` (placeholder customizado com altura e largura)

---

## 🔍 Pontos-Chave

- Reusabilidade: Pode ser usado em qualquer parte do aplicativo para indicar carregamento.
- Flexibilidade: Suporta múltiplos placeholders e customização de estilo.
- Animação: Usa `animate-pulse` para efeito visual de carregamento.

---

## 💡 Vantagens

- Fornece feedback visual para usuários durante carregamento.
- Fácil de integrar em listas, cards e componentes dinâmicos.
- Mantém consistência visual em toda a aplicação.

---

## 🛠️ Resumo

O componente `Skeleton` é uma solução simples e elegante para placeholders de carregamento, suportando múltiplos elementos e personalização de estilo, garantindo uma experiência de usuário suave e consistente.
