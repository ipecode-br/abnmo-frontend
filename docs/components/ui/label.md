# Documentação do Componente Label (`label.tsx`)

O arquivo `label.tsx` define um componente React reutilizável que renderiza elementos `<label>` com estilo consistente, permitindo a associação com campos de formulário e suporte a classes personalizadas.

---

## ☑️ Objetivo do Componente

- O componente **`Label`** serve para exibir textos de rótulo associados a campos de formulário.
- Permite estilização consistente e suporte a classes CSS adicionais.
- Mantém acessibilidade, vinculando o rótulo ao campo correspondente via `htmlFor`.

---

## 📦 Principais Importações

- `cn` de `@/utils/class-name-merge`: Função utilitária para unir classes CSS dinamicamente.
- `React.LabelHTMLAttributes<HTMLLabelElement>`: Para permitir todas as props nativas do elemento `<label>`.

---

## ⚙️ Lógica do Componente

```tsx
import { cn } from '@/utils/class-name-merge'

export function Label({
  htmlFor,
  className,
  children,
  ...props
}: Readonly<React.LabelHTMLAttributes<HTMLLabelElement>>) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('text-sm font-medium peer-disabled:opacity-50', className)}
      {...props}
    >
      {children}
    </label>
  )
}
```

- Recebe `htmlFor`, `className`, `children` e demais props do `<label>`.
- Combina classes padrão (`text-sm font-medium peer-disabled:opacity-50`) com classes adicionais via `cn`.
- Repassa todas as demais props para o elemento `<label>`.
- Renderiza o conteúdo `children` dentro do `<label>`.

---

### 📝 Exemplo de Uso

- `<Label htmlFor="name">Nome</Label>`
- `<Label htmlFor="email" className="text-blue-500">Email</Label>`

---

## 🔍 Pontos-Chave

- Reusabilidade: pode ser usado em qualquer formulário.
- Personalização: suporta classes extras via `className`.
- Acessibilidade: vincula o rótulo ao campo correspondente com `htmlFor`.
- Consistência visual: aplica classes padrão para tamanho e peso da fonte.

---

## 📋 Resumo das Props

- `htmlFor` (`string`): id do campo de formulário ao qual o rótulo está associado.
- `className` (`string`): adiciona classes CSS extras.
- `children` (`ReactNode`): conteúdo exibido dentro do rótulo.
- `...props` (`LabelHTMLAttributes<HTMLLabelElement>`): outras props HTML válidas.

---

## 💡 Vantagens

- Simples e reutilizável.
- Mantém acessibilidade e consistência visual.
- Permite personalização de estilo.

---

## 🛠️ Resumo

O componente `Label` é uma solução leve e eficiente para exibição de rótulos de formulário em React, garantindo reusabilidade, acessibilidade e fácil integração com campos de formulário.
