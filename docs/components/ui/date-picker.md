# Documentação do Componente DatePicker (`date-picker.tsx`)

O arquivo `date-picker.tsx` define um componente React reutilizável que combina input de data com um calendário interativo, permitindo seleção de datas e formatação consistente.

---

## ☑️ Objetivo do Componente

- O componente **`DatePicker`** serve para selecionar datas via input de texto ou calendário.
- Permite bloquear datas futuras e controlar o formato de exibição.
- Pode ser usado em formulários e interfaces que necessitam de entrada de datas.

---

## 📦 Principais Importações

- `Input` e `inputVariants`: Componente de input estilizado.
- `Popover`, `PopoverTrigger`, `PopoverContent`: Para exibir o calendário em um popover.
- `Calendar`: Componente do calendário para seleção de datas.
- `cn` de `@/utils/class-name-merge`: Função para unir classes CSS.
- Funções utilitárias `formatDate`, `formatDateInput`, `parseDateInput`.
- `CalendarDays` do **lucide-react**: Ícone de calendário.

---

## 🧩 Propriedades do Componente DatePicker

```ts
export interface DatePickerProps extends VariantProps<typeof inputVariants> {
  name: string
  className?: string
  navMode?: 'step' | 'dropdown'
  onSelectDate?: (date: string) => void
  value?: string
  allowTextInput?: boolean
  blockFutureDates?: boolean
}
```

- `name` (`string`): Identificador do input.
- `className` (`string`): Adiciona classes extras ao input.
- `variant` e `size`: Definem estilo do input via `inputVariants`.
- `navMode` (`'step' | 'dropdown'`): Modo de navegação do calendário.
- `onSelectDate` (`function`): Callback quando uma data é selecionada.
- `value` (`string`): Data selecionada no formato ISO.
- `allowTextInput` (`boolean`): Permite edição manual do input.
- `blockFutureDates` (`boolean`): Bloqueia seleção de datas futuras.

---

## ⚙️ Lógica do Componente

- Mantém estado `open` para controlar visibilidade do popover.
- Mantém `inputValue` para edição manual do input.
- `handleInputChange`:
  - Formata a data digitada.
  - Bloqueia datas futuras se `blockFutureDates` estiver ativo.
  - Dispara `onSelectDate` quando a data é válida.

- `handleCalendarSelect`:
  - Atualiza a data selecionada pelo calendário.
  - Fecha o popover e limpa o input temporário.

- Combina valor do input manual com valor formatado para exibição.

---

## ⚡ Renderização do Componente

- `Input` para digitação de data, com ícone do calendário (`CalendarDays`).
- `Popover` que contém o componente `Calendar`.
- `PopoverTrigger` posicionado sobre o ícone para abrir o calendário.
- `PopoverContent` com `Calendar` que aceita seleção de datas e bloqueio de datas futuras.

---

### 📝 Exemplo de Uso

```tsx
<DatePicker
  name='birthDate'
  value={selectedDate}
  onSelectDate={setSelectedDate}
  allowTextInput={true}
  blockFutureDates={true}
  variant='default'
  size='default'
/>
```

---

## 🔍 Pontos-Chave

- Permite seleção de datas via input ou calendário.
- Formata datas automaticamente e suporta entrada manual.
- Bloqueio de datas futuras opcional.
- Integrável com formulários React e sistemas de validação.
- Usa popover para exibir calendário de forma compacta.

---

## 💡 Vantagens

- Flexibilidade: permite digitar ou selecionar datas.
- Controle de formato e restrição de datas.
- UI consistente e acessível.
- Reutilizável em múltiplos formulários e contextos.

---

## 🛠️ Resumo

O componente `DatePicker` fornece uma solução completa para entrada de datas em React, combinando input formatado, seleção via calendário, controle de datas futuras e integração com popovers de forma elegante e consistente.
