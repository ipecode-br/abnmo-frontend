# Documentação de Ícones

Este documento explica como utilizar ícones no projeto de forma padronizada e otimizada para reduzir o tamanho do bundle final.

---

## Objetivo

O projeto utiliza a biblioteca **Lucide React** para ícones, centralizando as importações em um único arquivo (`icons.ts`) para:

- **Reduzir o tamanho do bundle**: Importar apenas os ícones necessários
- **Manter consistência**: Garantir que todos usem os mesmos ícones
- **Facilitar manutenção**: Gerenciar ícones em um único local
- **Padronizar nomenclatura**: Todos os ícones possuem sufixo `Icon`

---

## Como usar

### Importação básica

Sempre importe os ícones através do arquivo centralizado:

```tsx
import { UserIcon, MailIcon, SearchIcon } from '@/components/ui/icons'
```

### Nunca faça

❌ **Não importe diretamente do lucide-react**:

```tsx
// ERRADO - Não fazer isso
import { User, Mail, Search } from 'lucide-react'
```

❌ **Não use nomes sem o sufixo Icon**:

```tsx
// ERRADO - Não fazer isso
import { User } from '@/components/ui/icons' // Não existe
```

### Exemplos de uso

#### Uso simples em componentes

```tsx
import { SearchIcon, XIcon } from '@/components/ui/icons'

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
import { AlertCircleIcon } from '@/components/ui/icons'
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
import type { LucideIcon } from '@/components/ui/icons'

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
import { UserIcon, SettingsIcon } from '@/components/ui/icons'
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

Se você precisar de um ícone que não está disponível no arquivo `icons.ts`:

1. Acesse a [documentação do Lucide](https://lucide.dev/icons/) e encontre o ícone desejado
2. Abra o arquivo `src/components/ui/icons.ts`
3. Adicione o ícone na lista de exports, mantendo a ordem alfabética:

```ts
export {
  // ... outros ícones
  MailIcon,
  MenuIcon,
  NovoIconeIcon, // Novo ícone adicionado
  PencilIcon,
  // ... outros ícones
} from 'lucide-react'
```

---

## Convenções de nomenclatura

### Padrão obrigatório

Todos os ícones **devem** ter o sufixo `Icon`:

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
import { UserIcon } from '@/components/ui/icons'

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
import { CheckIcon } from '@/components/ui/icons'

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
import { Loader2Icon } from '@/components/ui/icons'
;<Loader2Icon className='size-5 animate-spin' />
```

---

## Ícones disponíveis

Para ver todos os ícones disponíveis, consulte o arquivo `src/components/ui/icons.ts` ou a [documentação do Lucide](https://lucide.dev/icons/).

---

## Boas práticas

### 1. Sempre use o arquivo centralizado

```tsx
✅ import { UserIcon } from '@/components/ui/icons'
❌ import { User as UserIcon } from 'lucide-react'
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
import type { LucideIcon } from '@/components/ui/icons'

interface Props {
  icon: LucideIcon // Tipo correto
  label: string
}
```

### 5. Não adicione ícones não utilizados

Só adicione ícones ao `icons.ts` quando forem realmente necessários no projeto.

---

## Performance

### Por que centralizar?

Ao importar ícones diretamente do `lucide-react`, o bundler pode incluir ícones não utilizados. O arquivo centralizado garante que apenas os ícones explicitamente exportados sejam incluídos no bundle final.

### Exemplo de impacto

```tsx
// Sem centralização - pode incluir todos os ícones do lucide
import { User, Mail, Search } from 'lucide-react'

// Com centralização - inclui apenas os ícones exportados
import { UserIcon, MailIcon, SearchIcon } from '@/components/ui/icons'
```

### Tree shaking

O arquivo `icons.ts` utiliza named exports que permitem tree shaking efetivo:

```ts
export { UserIcon, MailIcon, SearchIcon } from 'lucide-react'
```

---

## Solução de problemas

### Ícone não encontrado

Se você receber um erro dizendo que o ícone não existe:

1. Verifique se está usando o sufixo `Icon`
2. Verifique se o ícone está exportado em `icons.ts`
3. Se não estiver, adicione-o seguindo as instruções na seção "Adicionando novos ícones"

### Erro de tipo ao passar ícone como prop

Certifique-se de usar o tipo `LucideIcon`:

```tsx
import type { LucideIcon } from '@/components/ui/icons'

// Correto
interface Props {
  icon: LucideIcon
}

// Errado
interface Props {
  icon: React.ComponentType
}
```
