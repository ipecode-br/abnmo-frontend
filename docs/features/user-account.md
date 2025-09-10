# Documentação da área Conta

## Visão geral

É a área do sistema responsável pelo gerenciamento de acesso e autenticação de usuários.

Ela centraliza todas as funcionalidades relacionadas à **criação de contas**, **login** e **recuperação de credenciais**.

### Objetivo principal

**Permitir que os usuários:**

- Criem novas contas (cadastrar).

- Acessem o sistema (entrar).

- Atualizem suas credenciais (nova senha).

- Recuperem acesso em caso de esquecimento de senha (recuperar senha).

### Funcionalidades principais

- **Login** → Permite que usuários existentes autentiquem suas credenciais.

- **Cadastro** → Permite criação de novas contas, com validação de dados.

- **Recuperar senha** → Envia link de recuperação de senha por email.

- **Nova senha** → Página para inserir a nova senha após recuperação.

## Estrutura de pastas e rotas

Está localizada em:

```
src/
  app/
    conta/
```

### Rotas principais

- `/cadastrar`
- `/entrar`
- `/nova-senha`
- `/recuperar-senha`

## Layout principal

O layout da área de conta está em:

```
src/
  app/
    conta/
      layout.tsx
```

Ele é responsável por estruturar a interface comum a todas as páginas de conta.

```tsx
export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='bg-background-soft flex min-h-svh w-full items-center justify-center bg-[url("/images/background/auth-bg.svg")] bg-center bg-no-repeat px-4 py-8'>
      {children}{' '}
    </div>
  )
}
```

**Comportamento do layout**

- Todas as páginas de conta (`login`, `cadastro`, `recuperar senha`, `nova senha`) herdam automaticamente esse layout.
- O conteúdo específico de cada página é renderizado dentro do layout através do `children`.
- Isso permite que qualquer nova página de conta seja adicionada sem precisar redefinir a estrutura visual.

## Extensões futuras

Caso novas páginas de conta sejam adicionadas (ex.: alteração de email, autenticação em duas etapas), elas deverão seguir o mesmo padrão de layout descrito acima.

Para a criação de formulários, siga a documentação de referência:

**[Formulários](../components/form.md)** - Como criar formulários com React Hook Form e Zod

## Criando novas páginas de conta

Todas as páginas dessa área seguem um mesmo padrão:

- Herdam o `AuthLayout`.
- Utilizam o componente `AuthCard` como container.
- Renderizam um formulário correspondente (ex.: `SignInForm`, `SignUpForm`, etc.).

### Exemplo simplificado

```tsx
import image from '@images/auth/example.svg'
import { AuthCard } from '@/components/auth/auth-card'
import { ExampleForm } from './example-form'

export default function ExamplePage() {
  return (
    <AuthCard
      image={image}
      title='Título da página'
      description='Descrição curta explicando a ação'
    >
      <ExampleForm />
    </AuthCard>
  )
}
```
