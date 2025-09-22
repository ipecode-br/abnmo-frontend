# Documentação do Componente Table (`table.tsx`)

O arquivo `table.tsx` define um conjunto de componentes React reutilizáveis para criar tabelas estilizadas com cabeçalho, corpo, linhas e células, mantendo consistência visual e responsividade.

---

## ☑️ Objetivo do Componente

- Criar tabelas estilizadas de forma reutilizável.
- Fornecer componentes separados para cabeçalho, linhas e células.
- Garantir responsividade e estilo consistente para tabelas em toda a aplicação.

---

## 📦 Principais Importações

- `cn` de `@/utils/class-name-merge`: Função para unir classes CSS dinamicamente.
- `React.ComponentProps` para aceitar todas as props nativas de `<div>`, `<thead>`, `<th>`, `<tbody>`, `<tr>` e `<td>`.

---

## 🧩 Componentes e Propriedades

### Table

```ts
export function Table({ className, children, ...props }: Readonly<React.ComponentProps<'div'>>) {...}
```

- Container principal da tabela.
- `className` (`string`): Classes adicionais.
- `children`: Conteúdo da tabela (`TableHeader`, `TableBody`, etc.).
- Aplica `overflow-x-auto` para responsividade horizontal.

### TableHeader

```ts
export function TableHeader({ className, ...props }: Readonly<React.ComponentProps<'thead'>>) {...}
```

- Renderiza o `<thead>` da tabela.
- `className` (`string`): Classes adicionais.
- Desativa eventos de ponteiro para cabeçalho.

### TableHead

```ts
export function TableHead({ className, ...props }: Readonly<React.ComponentProps<'th'>>) {...}
```

- Renderiza células de cabeçalho `<th>`.
- Aplica bordas, padding, cores e arredondamento para primeira/última coluna.
- `className` (`string`): Classes adicionais.

### TableBody

```ts
export function TableBody(props: Readonly<React.ComponentProps<'tbody'>>) {...}
```

- Renderiza o corpo da tabela `<tbody>`.

### TableRow

```ts
export function TableRow({ className, ...props }: Readonly<React.ComponentProps<'tr'>>) {...}
```

- Renderiza linhas `<tr>` com efeito de hover.
- `className` (`string`): Classes adicionais.

### TableCell

```ts
export function TableCell({ className, isLastRow, ...props }: Readonly<React.ComponentProps<'td'> & { isLastRow?: boolean }>) {...}
```

- Renderiza células `<td>`.
- `isLastRow` (`boolean`): Remove a borda inferior se for a última linha.
- `className` (`string`): Classes adicionais.

---

### 📝 Exemplo de Uso

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Idade</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>João</TableCell>
      <TableCell isLastRow>30</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## 🔍 Pontos-Chave

- Estrutura modular: componentes separados para cabeçalho, linhas e células.
- Reusabilidade: pode ser usado em diferentes tabelas com estilos consistentes.
- Responsividade: `overflow-x-auto` permite scroll horizontal em telas pequenas.
- Flexibilidade: classes adicionais podem ser aplicadas via `className`.

---

## 💡 Vantagens

- Criação rápida de tabelas estilizadas.
- Fácil manutenção e personalização.
- Garantia de consistência visual em toda a aplicação.
- Componentes desacoplados que podem ser combinados de forma flexível.

---

## 🛠️ Resumo

O conjunto de componentes `Table` fornece uma solução completa para exibir dados tabulares em React, garantindo flexibilidade, responsividade e consistência visual através de uma estrutura modular e reutilizável.
