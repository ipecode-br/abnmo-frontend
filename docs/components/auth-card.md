# Auth Card

O `AuthCard` é um componente de layout reutilizável, projetado para envolver formulários e conteúdos de páginas de autenticação, como login, cadastro e recuperação de senha.

- **Localização**: `src/components/auth/auth-card.tsx`

## Estrutura

O componente fornece uma estrutura visual consistente para as telas de autenticação, incluindo:

- Um cabeçalho com imagem, título e descrição.
- Um divisor visual.
- Uma área para conteúdo dinâmico (geralmente um formulário).

## Propriedades (Props)

| Prop          | Tipo                     | Obrigatório | Descrição                                                                          |
| :------------ | :----------------------- | :---------- | :--------------------------------------------------------------------------------- |
| `image`       | `string \| StaticImport` | Sim         | A imagem a ser exibida no topo do card (ex: um ícone ou logo).                     |
| `title`       | `string`                 | Sim         | O título principal do card, exibido abaixo da imagem.                              |
| `description` | `string`                 | Não         | Um texto descritivo opcional, exibido abaixo do título.                            |
| `children`    | `ReactNode`              | Sim         | O conteúdo a ser renderizado dentro do card, abaixo do divisor (ex: o formulário). |

## Como Usar

Importe o `AuthCard` e utilize-o como um wrapper em suas páginas de autenticação, passando as props necessárias.

```tsx
import { AuthCard } from '@/components/auth/auth-card'
import { SignInForm } from './_components/sign-in-form'
import SignInImage from '@/public/images/auth/sign-in.svg'

export function SignInPage() {
  return (
    <AuthCard
      image={SignInImage}
      title='Acesse sua conta'
      description='Bem-vindo de volta! Insira seus dados para continuar.'
    >
      <SignInForm />
    </AuthCard>
  )
}
```

## Design e Estilo

- O card possui um layout flexível que se centraliza na página.
- O estilo é definido com Tailwind CSS e pode ser customizado diretamente no arquivo `auth-card.tsx`.
- A largura máxima é pré-definida para garantir uma boa legibilidade em telas maiores.
