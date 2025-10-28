# Documentação de Ícones

Este documento explica como utilizar ícones no projeto de forma padronizada e otimizada para reduzir o tamanho do bundle final.

---

## Objetivo

O projeto utiliza a biblioteca **Lucide React** para ícones. Importamos diretamente do `lucide-react` para:

- **Otimizar tree-shaking**: Webpack pode eliminar ícones não utilizados em cada arquivo
- **Reduzir HMR modules**: Menos dependências durante desenvolvimento
- **Manter consistência**: Garantir que todos usem os mesmos ícones
- **Padronizar nomenclatura**: Todos os ícones possuem sufixo `Icon`

---

## Como usar

### Importação básica

Importe os ícones diretamente do `lucide-react`:

```tsx
import { UserIcon, MailIcon, SearchIcon } from 'lucide-react'
```

### Estrutura de nomenclatura

Os ícones do Lucide possuem o sufixo `Icon` automaticamente:

```tsx
✅ UserIcon
✅ SearchIcon
✅ AlertCircleIcon

❌ User (nome sem sufixo)
❌ Search (nome sem sufixo)
```

### Exemplos de uso

#### Uso simples em componentes

```tsx
import { SearchIcon, XIcon } from 'lucide-react'

export function SearchBar() {
  return (
    <div>
      <SearchIcon className='text-muted size-5' />
      <input type='search' />
      <button>
        <XIcon className='size-4' />
      </button>
    </div>
  )
}
```

#### Uso como prop de componente

```tsx
import { AlertCircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ErrorButton() {
  return (
    <Button variant='outline'>
      <AlertCircleIcon />
      Reportar erro
    </Button>
  )
}
```

#### Uso com tipagem (componentes que recebem ícones)

```tsx
import type { LucideIcon } from 'lucide-react'

interface CardProps {
  icon: LucideIcon
  title: string
}

export function Card({ icon: Icon, title }: CardProps) {
  return (
    <div>
      <Icon className='size-6' />
      <h3>{title}</h3>
    </div>
  )
}
```

Uso do componente acima:

```tsx
import { UserIcon, SettingsIcon } from 'lucide-react'
import { Card } from './card'

export function Dashboard() {
  return (
    <>
      <Card icon={UserIcon} title='Perfil' />
      <Card icon={SettingsIcon} title='Configurações' />
    </>
  )
}
```

---

## Adicionando novos ícones

Você pode usar qualquer ícone diretamente do Lucide:

1. Acesse a [documentação do Lucide](https://lucide.dev/icons/) e encontre o ícone desejado
2. Importe direto em seu arquivo:

```tsx
import { NovoIconeIcon } from 'lucide-react'

export function MyComponent() {
  return <NovoIconeIcon className='size-5' />
}
```

---

## Convenções de nomenclatura

### Padrão obrigatório

Todos os ícones **possuem** o sufixo `Icon`:

```tsx
✅ UserIcon
✅ SearchIcon
✅ AlertCircleIcon

❌ User
❌ Search
❌ AlertCircle
```

### Por que o sufixo Icon?

O sufixo evita conflitos de nomenclatura com outros componentes ou tipos do projeto:

```tsx
// Sem conflito entre o tipo User e o ícone UserIcon
import { type User } from '@/types/users'
import { UserIcon } from 'lucide-react'

interface Props {
  user: User // Tipo do usuário
}

function UserCard({ user }: Props) {
  return (
    <div>
      <UserIcon /> {/* Ícone do usuário */}
      <span>{user.name}</span>
    </div>
  )
}
```

---

## Estilização

### Classes Tailwind

Os ícones do Lucide aceitam classes CSS normalmente:

```tsx
import { CheckIcon } from 'lucide-react'

// Tamanho
<CheckIcon className="size-4" />  // 16x16px
<CheckIcon className="size-5" />  // 20x20px
<CheckIcon className="size-6" />  // 24x24px

// Cor
<CheckIcon className="text-primary" />
<CheckIcon className="text-success" />
<CheckIcon className="text-muted" />

// Combinado
<CheckIcon className="size-5 text-success" />
```

### Tamanhos recomendados

- `size-4` (16px): Ícones pequenos, botões xs
- `size-5` (20px): Ícones padrão, botões normais
- `size-6` (24px): Ícones maiores, cabeçalhos
- `size-8` (32px): Ícones de destaque

### Animações

Alguns ícones podem ter animações, como o ícone de loading:

```tsx
import { Loader2Icon } from 'lucide-react'
;<Loader2Icon className='size-5 animate-spin' />
```

---

## Ícones disponíveis

Consulte a [documentação do Lucide](https://lucide.dev/icons/) para ver todos os ícones disponíveis.

---

## Boas práticas

### 1. Importe apenas o que usa

```tsx
✅ import { UserIcon } from 'lucide-react'
❌ import { UserIcon, OtherIcon, AnotherIcon } from 'lucide-react' // Importar apenas se usar
```

### 2. Mantenha consistência de tamanhos

Use os tamanhos definidos no design system:

```tsx
✅ <SearchIcon className="size-5" />
❌ <SearchIcon className="w-5 h-6" /> // Tamanhos diferentes
```

### 3. Use cores do design system

```tsx
✅ <AlertIcon className="text-error" />
❌ <AlertIcon className="text-red-500" />
```

### 4. Componentes com ícones devem usar a tipagem

```tsx
import type { LucideIcon } from 'lucide-react'

interface Props {
  icon: LucideIcon // Tipo correto
  label: string
}
```

---

## Performance

### Tree shaking

Ao importar diretamente do `lucide-react`, webpack pode fazer tree-shaking efetivo em cada arquivo:

```tsx
// Webpack removará CheckIcon, AlertIcon se não forem usados neste arquivo
import { UserIcon, CheckIcon, AlertIcon } from 'lucide-react'

export function MyComponent() {
  return <UserIcon /> // Apenas UserIcon será incluído
}
```

### Redução de HMR modules

Importar diretamente reduz o número de módulos na dependency chain durante desenvolvimento, melhorando significativamente:

- **Tempo de compilação**: HMR compila apenas o necessário
- **Memória**: Menos módulos carregados na memória
- **Developer experience**: Recarregamento mais rápido

---

## Solução de problemas

### Ícone não encontrado

Se você receber um erro dizendo que o ícone não existe:

1. Verifique se está usando o nome correto no Lucide
2. Consulte a [documentação do Lucide](https://lucide.dev/icons/)
3. Certifique-se de que o ícone tem o sufixo `Icon`

Exemplo:

```tsx
// ✅ Correto
import { UserIcon } from 'lucide-react'

// ❌ Errado - não existe (falta Icon)
import { User } from 'lucide-react'
```

### Erro de tipo ao passar ícone como prop

Certifique-se de usar o tipo `LucideIcon`:

```tsx
import type { LucideIcon } from 'lucide-react'

// Correto
interface Props {
  icon: LucideIcon
}

// Errado
interface Props {
  icon: React.ComponentType
}
```
