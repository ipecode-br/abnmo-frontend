# Documentação de modais

Este documento explica como criar e utilizar modais (dialogs) no projeto, seguindo os padrões estabelecidos e as melhores práticas.

---

## Objetivo

Os modais são utilizados para exibir conteúdo sobreposto à interface principal, como formulários, confirmações e alertas. O projeto utiliza o **Radix UI Dialog** como base, com componentes customizados que garantem consistência visual e funcional.

---

## Componentes disponíveis

Todos os componentes de modal estão em `src/components/ui/dialog/`:

- **Dialog**: Componente raiz que controla o estado (aberto/fechado)
- **DialogTrigger**: Botão que abre o modal
- **DialogContainer**: Container principal do modal (overlay + conteúdo)
- **DialogHeader**: Cabeçalho do modal com ícone opcional
- **DialogTitle**: Título do modal
- **DialogDescription**: Descrição opcional do modal
- **DialogContent**: Área de conteúdo principal
- **DialogFooter**: Rodapé com ações (botões)
- **DialogClose**: Botão para fechar o modal

---

## Estrutura básica

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger>Abrir modal</DialogTrigger>

  <DialogContainer>
    <DialogHeader icon={IconComponent}>
      <DialogTitle>Título do modal</DialogTitle>
      <DialogDescription>Descrição opcional</DialogDescription>
    </DialogHeader>

    <DialogContent>Conteúdo aqui</DialogContent>

    <DialogFooter>
      <Button>Confirmar</Button>
      <DialogClose>Cancelar</DialogClose>
    </DialogFooter>
  </DialogContainer>
</Dialog>
```

---

## Três formas de criar modais

### 1. Modal com botão direto na página

Use quando o gatilho do modal é um botão simples diretamente na página.

```tsx
'use client'

import { useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { DialogTrigger } from '@/components/ui/dialog/trigger'
import { PlusIcon } from '@/components/ui/icons'

import { AppointmentModal } from './modal'

export function NewAppointmentButton() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <PlusIcon />
        Novo atendimento
      </DialogTrigger>

      {dialogOpen && <AppointmentModal onOpenChange={setDialogOpen} />}
    </Dialog>
  )
}
```

**Características:**

- Estado `dialogOpen` controla abertura/fechamento
- `DialogTrigger` funciona como botão com estilos do componente `Button`
- Renderização condicional do modal (`{dialogOpen && ...}`) para melhor performance
- Modal recebe `onOpenChange` para controlar seu próprio fechamento

---

### 2. Modal dentro de um dropdown

Use quando o gatilho está dentro de um menu dropdown.

```tsx
'use client'

import { useRef, useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'
import { CircleXIcon, EllipsisIcon } from '@/components/ui/icons'

import { InactivateModal } from './inactivate-modal'

export function TableActions() {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const dropdownTriggerRef = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger
          size='icon'
          variant='ghost'
          ref={dropdownTriggerRef}
        >
          <EllipsisIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem>Editar</DropdownMenuItem>

          <DropdownMenuItem
            variant='destructive'
            onSelect={(e) => {
              e.preventDefault()
              setDropdownOpen(false)
              setModalOpen(true)
            }}
          >
            <CircleXIcon />
            Inativar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        {isModalOpen && (
          <InactivateModal
            dropdownTrigger={dropdownTriggerRef}
            onOpenChange={setModalOpen}
          />
        )}
      </Dialog>
    </>
  )
}
```

**Características importantes:**

- Dois estados separados: `isDropdownOpen` e `isModalOpen`
- `useRef` para referenciar o botão do dropdown
- `e.preventDefault()` no `onSelect` para evitar fechamento automático
- Fechar dropdown manualmente antes de abrir modal
- Modal recebe `dropdownTrigger` para retornar foco ao botão após fechar

**No componente do modal:**

```tsx
interface ModalProps {
  dropdownTrigger?: React.RefObject<HTMLButtonElement | null>
  onOpenChange: (open: boolean) => void
}

export function InactivateModal({ dropdownTrigger, onOpenChange }: ModalProps) {
  function handleFocusOnTrigger(e: Event) {
    if (!dropdownTrigger) return

    e.preventDefault()
    dropdownTrigger?.current?.focus()
  }

  return (
    <DialogContainer onCloseAutoFocus={handleFocusOnTrigger}>
      {/* Conteúdo do modal */}
    </DialogContainer>
  )
}
```

---

### 3. Modal compartilhado entre diferentes páginas

Use quando o mesmo modal é acionado por diferentes botões em diferentes páginas.

**Estrutura recomendada:**

```
src/
  components/
    patients/
      inactivate-modal.tsx    # Modal compartilhado
  app/
    pacientes/
      (patients-list)/
        actions.tsx            # Usa o modal no dropdown
      [id]/
        informacoes/
          inactivate-button.tsx  # Usa o modal com botão direto
```

**Modal compartilhado (`inactivate-modal.tsx`):**

```tsx
'use client'

import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog/close'
import { DialogContainer } from '@/components/ui/dialog/container'
import { DialogContent } from '@/components/ui/dialog/content'
import { DialogFooter } from '@/components/ui/dialog/footer'
import { DialogHeader } from '@/components/ui/dialog/header'
import { DialogTitle } from '@/components/ui/dialog/title'
import { CircleXIcon } from '@/components/ui/icons'

interface InactivateModalProps {
  id: string
  name: string
  dropdownTrigger?: React.RefObject<HTMLButtonElement | null>
  onOpenChange: (open: boolean) => void
}

export function InactivateModal({
  id,
  name,
  dropdownTrigger,
  onOpenChange,
}: InactivateModalProps) {
  async function handleInactivate() {
    // Lógica de inativação
    onOpenChange(false)
  }

  function handleFocusOnTrigger(e: Event) {
    if (!dropdownTrigger) return

    e.preventDefault()
    dropdownTrigger?.current?.focus()
  }

  return (
    <DialogContainer onCloseAutoFocus={handleFocusOnTrigger}>
      <DialogHeader icon={CircleXIcon}>
        <DialogTitle>Inativar {name}?</DialogTitle>
      </DialogHeader>

      <DialogContent>
        Tem certeza que deseja inativar este registro?
      </DialogContent>

      <DialogFooter>
        <Button onClick={handleInactivate}>Confirmar</Button>
        <DialogClose>Cancelar</DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
```

**Uso 1: Com botão direto (`inactivate-button.tsx`):**

```tsx
'use client'

import { useState } from 'react'

import { InactivateModal } from '@/components/patients/inactivate-modal'
import { Dialog } from '@/components/ui/dialog'
import { DialogTrigger } from '@/components/ui/dialog/trigger'
import { UserRoundMinusIcon } from '@/components/ui/icons'

export function InactivateButton({ id, name }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger variant='outline'>
        <UserRoundMinusIcon />
        Inativar
      </DialogTrigger>

      {isOpen && (
        <InactivateModal id={id} name={name} onOpenChange={setIsOpen} />
      )}
    </Dialog>
  )
}
```

**Uso 2: Dentro de dropdown (`actions.tsx`):**

```tsx
'use client'

import { useRef, useState } from 'react'

import { InactivateModal } from '@/components/patients/inactivate-modal'
import { Dialog } from '@/components/ui/dialog'
import { DropdownMenu } from '@/components/ui/dropdown'
// ... outros imports

export function TableActions({ id, name }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const dropdownTriggerRef = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger ref={dropdownTriggerRef}>
          <EllipsisIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault()
              setDropdownOpen(false)
              setModalOpen(true)
            }}
          >
            Inativar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        {isModalOpen && (
          <InactivateModal
            id={id}
            name={name}
            dropdownTrigger={dropdownTriggerRef}
            onOpenChange={setModalOpen}
          />
        )}
      </Dialog>
    </>
  )
}
```

**Vantagens desta abordagem:**

- Lógica do modal centralizada em um único componente
- Reutilização sem duplicação de código
- Manutenção facilitada (alterar em um lugar, reflete em todos os usos)
- Prop `dropdownTrigger` opcional (só usada quando necessário)

---

## Detalhes dos componentes

### Dialog

Componente raiz que gerencia o estado do modal.

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  {/* Conteúdo */}
</Dialog>
```

**Props principais:**

- `open`: Estado booleano que controla se está aberto
- `onOpenChange`: Função callback quando o estado muda

---

### DialogTrigger

Botão que abre o modal. Aceita as mesmas props do componente `Button`.

```tsx
<DialogTrigger variant='outline' size='sm'>
  <PlusIcon />
  Abrir modal
</DialogTrigger>
```

**Props:**

- `variant`: `'default'` | `'fancy'` | `'outline'` | `'muted'` | `'ghost'`
- `size`: `'default'` | `'xs'` | `'sm'` | `'lg'` | `'icon'`
- Todas as props padrão de botão HTML

---

### DialogContainer

Container principal do modal com overlay e animações.

```tsx
<DialogContainer className='max-w-2xl' showCloseButton={true}>
  {/* Conteúdo */}
</DialogContainer>
```

**Props:**

- `showCloseButton`: Exibe botão X no canto superior direito (padrão: `true`)
- `className`: Classes adicionais para o container
- `onCloseAutoFocus`: Callback executado quando o modal fecha e retorna o foco

**Larguras recomendadas:**

- `max-w-md` (448px): Modais pequenos, confirmações
- `max-w-lg` (512px): Padrão
- `max-w-2xl` (672px): Formulários maiores
- `max-w-4xl` (896px): Modais complexos

---

### DialogHeader

Cabeçalho do modal com ícone opcional.

```tsx
<DialogHeader icon={UserIcon} iconClassName='bg-primary/10 text-primary'>
  <DialogTitle>Título</DialogTitle>
  <DialogDescription>Descrição</DialogDescription>
</DialogHeader>
```

**Props:**

- `icon`: Componente de ícone do Lucide
- `iconClassName`: Classes para customizar o container do ícone

**Variações de ícone:**

```tsx
// Sucesso
iconClassName='bg-success/10 text-success'tsx
// Sucesso
iconClassName='bg-success/10 text-success'

// Erro/Destrutivo
iconClassName='bg-error/10 text-error'

// Atenção
iconClassName='bg-warning/10 text-warning'

// Padrão (sem cor específica)
iconClassName='border border-border bg-transparent'
```

---

### DialogTitle

Título do modal. Componente obrigatório para acessibilidade.

```tsx
<DialogTitle>Novo atendimento</DialogTitle>
```

---

### DialogDescription

Descrição opcional do modal.

```tsx
<DialogDescription>
  Esta ação é irreversível e todo o progresso será perdido.
</DialogDescription>
```

---

### DialogContent

Área principal de conteúdo do modal.

```tsx
<DialogContent className='space-y-4'>{/* Conteúdo aqui */}</DialogContent>
```

**Classes úteis:**

```tsx
// Espaçamento vertical
className = 'space-y-4'

// Grid responsivo
className = 'grid gap-4 sm:grid-cols-2'

// Padding customizado
className = 'p-6'
```

---

### DialogFooter

Rodapé do modal com botões de ação.

```tsx
<DialogFooter>
  <Button type='submit'>Confirmar</Button>
  <DialogClose>Cancelar</DialogClose>
</DialogFooter>
```

**Características:**

- Por padrão, botões são exibidos em coluna no mobile e em linha reversa no desktop
- Ordem visual: botão primário à direita (desktop), primeiro (mobile)
- Classes podem ser aplicadas para customização

---

### DialogClose

Botão para fechar o modal. Aceita as mesmas props do componente `Button`.

```tsx
<DialogClose variant='outline'>Cancelar</DialogClose>
```

**Props padrão:**

- `variant`: `'outline'` (padrão)
- Todas as props do componente `Button`

---

## Modais com formulários

Para modais com formulários, use React Hook Form e integre com as ações de submit.

```tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog/close'
import { DialogContainer } from '@/components/ui/dialog/container'
import { DialogContent } from '@/components/ui/dialog/content'
import { DialogFooter } from '@/components/ui/dialog/footer'
import { DialogHeader } from '@/components/ui/dialog/header'
import { DialogTitle } from '@/components/ui/dialog/title'
import { SmilePlusIcon } from '@/components/ui/icons'

interface AppointmentModalProps {
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  date: z.string().datetime('Data é obrigatória'),
})
type FormSchema = z.infer<typeof formSchema>

export function AppointmentModal({ onOpenChange }: AppointmentModalProps) {
  const formMethods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      date: '',
    },
    mode: 'onBlur',
  })

  async function submitForm(data: FormSchema) {
    // Processar dados
    console.log(data)

    // Fechar modal após sucesso
    onOpenChange(false)
  }

  return (
    <DialogContainer className='max-w-2xl'>
      <DialogHeader icon={SmilePlusIcon}>
        <DialogTitle>Novo atendimento</DialogTitle>
      </DialogHeader>

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(submitForm)}>
          <DialogContent className='space-y-4'>
            <TextInput name='name' label='Nome do paciente' isRequired />
            <TextInput name='date' label='Data do atendimento' isRequired />
          </DialogContent>

          <DialogFooter>
            <Button type='submit' loading={formMethods.formState.isSubmitting}>
              Cadastrar
            </Button>
            <DialogClose disabled={formMethods.formState.isSubmitting}>
              Cancelar
            </DialogClose>
          </DialogFooter>
        </form>
      </FormProvider>
    </DialogContainer>
  )
}
```

**Pontos importantes:**

- Use `FormProvider` para contexto do formulário
- Envolva o conteúdo em `<form>` dentro do `DialogContainer`
- Botão de submit deve ter `type='submit'`
- Use `loading` no botão durante submissão
- Desabilite o botão de cancelar durante submissão
- Feche o modal apenas após sucesso

---

## Modais de confirmação

Para confirmações simples sem formulário:

```tsx
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog/close'
import { DialogContainer } from '@/components/ui/dialog/container'
import { DialogDescription } from '@/components/ui/dialog/description'
import { DialogFooter } from '@/components/ui/dialog/footer'
import { DialogHeader } from '@/components/ui/dialog/header'
import { DialogTitle } from '@/components/ui/dialog/title'
import { CircleAlertIcon } from '@/components/ui/icons'

interface ConfirmModalProps {
  onConfirm: () => void
}

export function ConfirmModal({ onConfirm }: ConfirmModalProps) {
  return (
    <DialogContainer>
      <DialogHeader
        icon={CircleAlertIcon}
        iconClassName='bg-error/10 text-error'
        className='border-none'
      >
        <DialogTitle>Confirmar ação?</DialogTitle>
        <DialogDescription>Esta ação não pode ser desfeita.</DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button onClick={onConfirm} className='bg-error hover:bg-error/80'>
          Confirmar
        </Button>
        <DialogClose>Cancelar</DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
```

---

## Boas práticas

### 1. Renderização condicional

Sempre use renderização condicional para melhor performance:

```tsx
✅ {isOpen && <Modal />}
❌ <Modal />  // Sempre renderizado
```

### 2. Controle de estado

Use `useState` para controlar abertura/fechamento:

```tsx
const [isOpen, setIsOpen] = useState(false)

<Dialog open={isOpen} onOpenChange={setIsOpen}>
```

### 3. Componente 'use client'

Modais devem ser componentes client-side:

```tsx
'use client'

import { useState } from 'react'
// ...
```

### 4. Acessibilidade

Sempre inclua `DialogTitle` para acessibilidade:

```tsx
✅ <DialogTitle>Título</DialogTitle>
❌ Omitir o título
```

### 5. Fechamento automático

Feche o modal após ações bem-sucedidas:

```tsx
async function handleSubmit() {
  const success = await submitData()

  if (success) {
    onOpenChange(false)
  }
}
```

### 6. Desabilitar ações durante loading

Desabilite botões durante operações assíncronas:

```tsx
<Button type='submit' loading={isSubmitting}>
  Salvar
</Button>
<DialogClose disabled={isSubmitting}>
  Cancelar
</DialogClose>
```

### 7. Foco em dropdown

Quando modal vem de dropdown, retorne o foco:

```tsx
function handleFocusOnTrigger(e: Event) {
  if (!dropdownTrigger) return

  e.preventDefault()
  dropdownTrigger?.current?.focus()
}

<DialogContainer onCloseAutoFocus={handleFocusOnTrigger}>
```

### 8. Modal compartilhado flexível

Use props opcionais para modais reutilizáveis:

```tsx
interface ModalProps {
  // Props obrigatórias
  id: string
  onOpenChange: (open: boolean) => void

  // Props opcionais (para casos específicos)
  dropdownTrigger?: React.RefObject<HTMLButtonElement | null>
}
```

### 9. Separação de responsabilidades

- **Componente trigger**: Gerencia estado e disparo
- **Componente modal**: Contém lógica e UI do conteúdo
- Mantenha separados para melhor organização

### 10. Largura responsiva

Use larguras responsivas para melhor UX:

```tsx
<DialogContainer className='w-11/12 max-w-lg'>
```

---

## Checklist de implementação

Ao criar um novo modal, verifique:

- [ ] Componente é `'use client'`
- [ ] Estado `open` e `onOpenChange` estão configurados
- [ ] Renderização condicional está implementada
- [ ] `DialogTitle` está presente (acessibilidade)
- [ ] Ícone do `DialogHeader` tem cores apropriadas
- [ ] Formulários usam React Hook Form + Zod
- [ ] Botões têm estados de loading/disabled
- [ ] Modal fecha após ação bem-sucedida
- [ ] Foco retorna ao trigger correto (se aplicável)
- [ ] Modal compartilhado tem props flexíveis

---

## Solução de problemas

### Modal não abre

Verifique se o estado está configurado corretamente:

```tsx
const [isOpen, setIsOpen] = useState(false)

<Dialog open={isOpen} onOpenChange={setIsOpen}>
```

### Modal não fecha ao clicar fora

Verifique se `onOpenChange` está conectado ao estado:

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>  // Correto
<Dialog open={isOpen}>  // Incorreto - não fecha
```

### Foco não retorna ao dropdown

Implemente o handler `onCloseAutoFocus`:

```tsx
function handleFocusOnTrigger(e: Event) {
  if (!dropdownTrigger) return
  e.preventDefault()
  dropdownTrigger?.current?.focus()
}

<DialogContainer onCloseAutoFocus={handleFocusOnTrigger}>
```

### Formulário não submete

Certifique-se de que:

1. O form envolve o conteúdo dentro do `DialogContainer`
2. O botão tem `type='submit'`
3. O `onSubmit` está no elemento `<form>`

```tsx
<form onSubmit={formMethods.handleSubmit(submitForm)}>
  <DialogContent>...</DialogContent>
  <DialogFooter>
    <Button type='submit'>Enviar</Button>
  </DialogFooter>
</form>
```
