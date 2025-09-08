# DatePicker Component (`date-picker.tsx`)

Este arquivo implementa um componente de **DatePicker** reutilizável em React, combinando um campo de input com um calendário popover. Ele foi projetado para ser altamente personalizável, acessível e facilmente integrável em aplicações modernas que exigem seleção de datas.

---

## Visão Geral

O componente `DatePicker` encapsula um input de data com suporte a seleção via teclado e calendário visual, permitindo:

- Entrada manual de datas (`allowTextInput`).
- Bloqueio de datas futuras (`blockFutureDates`).
- Customização de aparência via variantes (`variant`, `size`).
- Navegação no calendário em modos `step` ou `dropdown`.

Ele utiliza o Popover para exibir o calendário, garantindo que a UI permaneça limpa e intuitiva.

---

## Objetivos do Componente

- Fornecer uma interface de seleção de datas acessível e intuitiva.
- Permitir customização de input e popover.
- Integrar facilmente com formulários.
- Controlar o estado de datas, incluindo entrada manual e seleção via calendário.
- Bloquear datas futuras quando necessário.

---

## Importações e Dependências

| Biblioteca                                            | Função                                                 |
| ----------------------------------------------------- | ------------------------------------------------------ |
| `react`                                               | Estrutura do componente e gerenciamento de estado      |
| `lucide-react`                                        | Ícone do calendário (`CalendarDays`)                   |
| `class-variance-authority`                            | Permite variantes de estilos para inputs               |
| `react-day-picker`                                    | Base para o calendário                                 |
| `@/utils/class-name-merge`                            | Merge dinâmico de classes CSS                          |
| `@/utils/formatters`                                  | Funções utilitárias para formatação e parsing de datas |
| Componentes internos (`Input`, `Popover`, `Calendar`) | Construção do input e popover do calendário            |

### Instalação dos Pacotes

```bash
npm install react-day-picker lucide-react class-variance-authority
# ou
yarn add react-day-picker lucide-react class-variance-authority
```

## Propriedades do Componente

### Propriedade Tipo Padrão Descrição

- name string - Nome do input, utilizado para identificação em formulários
  className string - Classe CSS customizada para estilização

- variant string - Variante de estilo do input (herdado de inputVariants)

- size string - Tamanho do input (herdado de inputVariants)

- navMode 'step' | 'dropdown' - Modo de navegação do calendário

- onSelectDate (date: string) => void - Callback acionado ao selecionar uma data

- value string - Valor controlado do input
  allowTextInput boolean true Permite digitação manual da data
  blockFutureDates boolean false Impede seleção de datas futuras

## Estrutura do Componente

O componente é funcional e controlado, utilizando hooks de estado (useState) para gerenciar:

A abertura do popover (open)

O valor do input quando digitado manualmente (inputValue)

Copiar código

```tsx
<DatePicker
  name='birthDate'
  value={dateValue}
  onSelectDate={setDateValue}
  size='md'
  variant='outline'
/>
```

## Fluxo de Interação

Usuário clica no input ou ícone → Popover abre.

Usuário digita manualmente → inputValue atualizado e parse de data é realizado.

Usuário seleciona no calendário → onSelectDate é chamado e popover fecha.

Datas futuras podem ser bloqueadas se blockFutureDates = true.

## Diagrama de Fluxo do Componente

mermaid
Copiar código

```
flowchart TD
  User([Usuário])
  InputField([Input de Data])
  PopoverComp([Popover com Calendar])
  CalendarComp([Calendar])

  User --> InputField
  User --> PopoverComp
  PopoverComp --> CalendarComp
  InputField -->|onChange| CalendarComp
  CalendarComp -->|onSelect| InputField
```

## Detalhes das Classes CSS e Comportamento

Utiliza cn para mesclar classes CSS dinamicamente.

inputVariants permite customização de tamanho e estilo.

PopoverTrigger exibe o ícone do calendário de forma consistente.

Feedback visual é aplicado via estados de foco e hover do input.

## Exemplo de Uso

### Básico

Copiar código

```tsx
<DatePicker
  name='appointment'
  value={selectedDate}
  onSelectDate={setSelectedDate}
/>
```

### Com Bloqueio de Datas Futuras e Entrada Manual Desativada

Copiar código

```tsx
<DatePicker
  name='birthDate'
  value={birthDate}
  onSelectDate={setBirthDate}
  allowTextInput={false}
  blockFutureDates={true}
/>
```

## Vantagens e Boas Práticas

✅ Acessível: Interação por teclado e suporte a leitores de tela.

✅ Controlável: Pode ser usado como componente controlado ou não.

✅ Customizável: Variantes de input e popover permitem integração visual consistente.

✅ Flexível: Permite entrada manual e seleção via calendário.

## Quando Usar Este Componente

Formulários que exigem datas (nascimento, agendamento, eventos).

Interfaces que precisam de input de data com feedback visual.

Cenários que precisam bloquear datas futuras ou permitir apenas seleção de calendário.

## Resumo

O componente DatePicker é uma solução moderna e acessível para seleção de datas em React. Ele combina input controlado, popover e calendário, permitindo customização, validação de datas e integração fluida com formulários e design systems.
