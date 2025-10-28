# Documentação do Componente AutocompleteInput (`autocomplete-input.tsx`)

O arquivo `autocomplete-input.tsx` define um componente React reutilizável e flexível que oferece uma funcionalidade de autocompletar (combobox). Ele foi projetado para funcionar tanto de forma autônoma (não controlada) quanto controlada por um estado externo, como um formulário.

---

## ☑️ Objetivo do Componente

- Permitir que os usuários selecionem uma opção de uma lista filtrável de forma rápida e intuitiva.
- Oferecer uma experiência de usuário aprimorada para seleção de itens em listas grandes.
- Ser flexível o suficiente para ser usado em qualquer contexto: dentro de formulários complexos ou como um seletor independente.
- Garantir acessibilidade e conformidade com padrões web, especialmente para navegação por teclado.

---

## 📦 Principais Importações

- `cmdk`: A base para a funcionalidade de autocompletar e menu de comandos.
- `lucide-react`: Ícones para indicar seleção e abertura/fechamento.
- `cn` de `@/utils/class-name-merge`: Função utilitária para unir classes CSS dinamicamente.
- Componentes de UI internos (`Button`, `Label`, `Popover`, etc.): Para garantir consistência visual com o projeto.

---

## ⚙️ Lógica do Componente: Controlado vs. Não Controlado

O `AutocompleteInput` possui uma lógica de estado dual, tornando-o extremamente versátil.

### Modo Não Controlado (Padrão)

- **Como funciona:** Este é o modo padrão. O componente gerencia seu próprio estado internamente usando `useState`, começando sempre com um valor vazio.
- **Quando usar:** Ideal para casos de uso simples, onde você só precisa de um seletor funcional na tela sem a complexidade de um formulário.
- **Propriedades-chave:**
  - `onChange`: Você pode usar `onChange` para ser notificado quando o valor mudar, mesmo neste modo.

### Modo Controlado

- **Como funciona:** Este modo é ativado quando você passa a propriedade `value`. Nesse cenário, o componente cede todo o controle do estado para o componente pai.
- **Quando usar:** Essencial ao integrar com bibliotecas de formulário (`react-hook-form`) ou quando o estado do seletor precisa ser acessado ou modificado por outros componentes.
- **Propriedades-chave:**
  - `value`: Define o valor exibido pelo componente. O componente sempre refletirá este valor.
  - `onChange`: Uma função que o componente chama com o novo valor sempre que o usuário faz uma seleção. É sua responsabilidade usar esta função para atualizar o estado que você está passando para a prop `value`.

---

## 🧩 Propriedades do Componente

```tsx
interface AutocompleteInputProps {
  name?: string
  label: string | ReactNode
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  isRequired?: boolean
  placeholder?: string
  message?: string
  wrapperClassName?: string
  error?: boolean
}
```

- `name` (`string`, opcional): Usado para acessibilidade (`label htmlFor`).
- `label` (`string | ReactNode`): O rótulo a ser exibido acima do input.
- `options` (`SelectOption[]`): Array de objetos `{ label: string, value: string }` com as opções.
- `value` (`string`, opcional): Ativa o **modo controlado**. O valor a ser exibido.
- `onChange` (`(value: string) => void`, opcional): Callback chamado quando o valor muda.
- `isRequired` (`boolean`, opcional): Exibe o indicador de campo obrigatório.
- `placeholder` (`string`, opcional): Texto de placeholder.
- `message` (`string`, opcional): Mensagem a ser exibida abaixo do input.
- `wrapperClassName` (`string`, opcional): Classes CSS para o elemento wrapper.
- `error` (`boolean`, opcional): Ativa o estilo de erro (ex: borda vermelha).

---

### 📝 Exemplos de Uso

```tsx
const cities = [
  { label: 'São Paulo', value: 'SP' },
  { label: 'Rio de Janeiro', value: 'RJ' },
]

// 1. Modo Não Controlado (uso simples e direto)
<AutocompleteInput
  label='Cidade (Não Controlado)'
  options={cities}
  placeholder='Selecione uma cidade...'
  onChange={(value) => console.log(value)}
/>

// 2. Modo Controlado (com useState)
import { useState } from 'react'

const [city, setCity] = useState('')

<AutocompleteInput
  label='Cidade (Controlado)'
  options={cities}
  placeholder='Selecione uma cidade...'
  value={city}
  onChange={setCity}
/>

// 3. Modo Controlado (com React Hook Form)
import { Controller } from 'react-hook-form'

<Controller
  name='city'
  control={form.control}
  render={({ field, fieldState }) => (
    <AutocompleteInput
      label='Cidade (React Hook Form)'
      options={cities}
      placeholder='Selecione uma cidade...'
      isRequired
      error={!!fieldState.error}
      message={fieldState.error?.message}
      value={field.value}
      onChange={field.onChange}
    />
  )}
/>
```
