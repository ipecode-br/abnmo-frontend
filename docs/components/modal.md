# Documentação de modais (Dialogs)

Este documento explica como criar e utilizar dialogs no projeto usando Base UI.

---

## Objetivo

Os modais são utilizados para exibir conteúdo sobreposto à interface principal. O projeto utiliza **Base UI Dialog** (`@base-ui/react/dialog`) como base, com componentes customizados em `src/components/ui/dialog.tsx`.

---

## Componentes disponíveis

Todos em `src/components/ui/dialog.tsx`:

- **Dialog**: Componente raiz (`BaseDialog.Root`)
- **DialogTrigger**: Botão que abre o modal (com suporte a `buttonVariants`)
- **DialogContainer**: Container principal (Portal + Backdrop + Popup + botão fechar)
- **DialogHeader**: Cabeçalho com `DialogIcon` opcional
- **DialogIcon**: Ícone com variantes (`default`, `destructive`, `success`)
- **DialogTitle**: Título do modal
- **DialogDescription**: Descrição opcional
- **DialogContent**: Área de conteúdo scrollável
- **DialogDetailField**: Par label + valor para exibição de dados
- **DialogFooter**: Rodapé com ações (`md:flex-row-reverse`)
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

## Padrões de uso

### Modal com formulário

```tsx
function FormModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger variant='outline'>Novo registro</DialogTrigger>
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Novo registro</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <FormContainer onSubmit={handleSubmit}>
            {/* campos */}
            <DialogFooter>
              <Button type='submit' loading={isLoading}>
                Salvar
              </Button>
              <DialogClose>Cancelar</DialogClose>
            </DialogFooter>
          </FormContainer>
        </DialogContent>
      </DialogContainer>
    </Dialog>
  )
}
```

### Modal de confirmação

```tsx
<Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
  <DialogContainer>
    <DialogHeader icon='destructive'>
      <DialogTitle>Confirmar exclusão</DialogTitle>
      <DialogDescription>Esta ação não pode ser desfeita.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant='destructive' onClick={handleDelete}>
        Excluir
      </Button>
      <DialogClose>Cancelar</DialogClose>
    </DialogFooter>
  </DialogContainer>
</Dialog>
```

### Modal de detalhes com DialogDetailField

```tsx
<DialogContent>
  <DialogDetailField label='Nome' value={data.name} />
  <DialogDetailField label='Email' value={data.email} />
  <DialogDetailField label='Status'>
    <StatusTag status={data.status} />
  </DialogDetailField>
</DialogContent>
```

---

## Boas práticas

- Use `DialogTitle` sempre (acessibilidade)
- Feche o modal após submit bem-sucedido (`setIsOpen(false)`)
- Desabilite botões durante carregamento (`loading={isLoading}`)
- Para modais dentro de dropdowns, gerencie estados separados e use `e.preventDefault()` no `onSelect`
