# Formatadores

Os formatadores são funções puras localizadas em `src/utils/formatters` que recebem um valor bruto (como uma string ou data) e o retornam em um formato específico para exibição na UI.

## Funções Disponíveis

### `formatDate`

Formata uma data para uma string legível no padrão brasileiro (`dd/mm/aaaa`).

- **Localização**: `src/utils/formatters/format-date.ts`
- **Parâmetros**:
  1.  `date` (`string | Date`): A data a ser formatada.
  2.  `options` (`Intl.DateTimeFormatOptions`): Objeto de opções do `Intl.DateTimeFormat` para customização avançada.
- **Retorno**: `string` - A data formatada.

**Como Usar**:

```typescript
import { formatDate } from '@/utils/formatters/format-date'

const date = new Date() // 2025-09-02T12:00:00.000Z

const formatted = formatDate(date) // "02/09/2025"

const detailed = formatDate(date, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}) // "2 de setembro de 2025"
```

---

### `formatCpfNumber`

Formata uma string de números para o padrão de CPF (`xxx.xxx.xxx-xx`).

- **Localização**: `src/utils/formatters/format-cpf-number.ts`
- **Parâmetros**:
  1.  `input` (`string`): A string contendo os dígitos do CPF.
- **Retorno**: `string` - O CPF formatado.
- **Detalhes**: A função remove caracteres não numéricos e aplica a máscara de CPF. A entrada é limitada a 11 dígitos.

**Como Usar**:

```typescript
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'

const cpf = '12345678900'
const formattedCpf = formatCpfNumber(cpf) // "123.456.789-00"
```

---

### `formatPhoneNumber`

Formata uma string de números para o padrão de telefone brasileiro, com ou sem o nono dígito.

- **Localização**: `src/utils/formatters/format-phone-number.ts`
- **Parâmetros**:
  1.  `input` (`string`): A string contendo os dígitos do telefone.
- **Retorno**: `string` - O telefone formatado (`(xx) xxxx-xxxx` ou `(xx) xxxxx-xxxx`).
- **Detalhes**: A função remove caracteres não numéricos e aplica a máscara de telefone fixo ou celular com base no comprimento da string.

**Como Usar**:

```typescript
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

const landline = '1140028922'
const mobile = '11987654321'

const formattedLandline = formatPhoneNumber(landline) // "(11) 4002-8922"
const formattedMobile = formatPhoneNumber(mobile) // "(11) 98765-4321"
```
