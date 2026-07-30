# Área de Autenticação

## Visão geral

Área do sistema responsável por login, cadastro via convite, recuperação e redefinição de senha.

**Rotas:**

| Rota               | Página                         | Módulo do formulário                 |
| ------------------ | ------------------------------ | ------------------------------------ |
| `/entrar`          | Login                          | `modules/auth/sign-in-form`          |
| `/cadastrar`       | Cadastro (requer token)        | `modules/auth/sign-up-form`          |
| `/recuperar-senha` | Solicitar recuperação de senha | `modules/auth/recover-password-form` |
| `/nova-senha`      | Redefinir senha (requer token) | `modules/auth/reset-password-form`   |

## Estrutura

```
src/
  app/
    (auth)/
      layout.tsx              # Layout centralizado com bg-background-soft
      entrar/page.tsx         # SignInForm dentro de AuthCard
      cadastrar/page.tsx      # SignUpForm (token obrigatório via searchParams)
      recuperar-senha/page.tsx # RecoverPasswordForm
      nova-senha/page.tsx     # ResetPasswordForm (token obrigatório)
  components/
    auth/
      auth-card.tsx           # Wrapper: imagem, título, descrição, divider, children
  modules/
    auth/
      sign-in-form.tsx        # Login: email + senha + "lembrar-me"
      sign-up-form.tsx        # Cadastro via convite: nome, email, senha, confirmar senha
      recover-password-form.tsx # Recuperação: email
      reset-password-form.tsx   # Nova senha: senha, confirmar senha
```

## Layout

O `(auth)/layout.tsx` é minimalista — centraliza o conteúdo vertical e horizontalmente com `bg-background-soft`. Todas as páginas herdam esse layout automaticamente.

## Páginas

### Entrar (`/entrar`)

Renderiza `AuthCard` com título "Bem vindo(a)" e o `SignInForm`. O formulário usa React Hook Form + Zod com campos de email (validação de formato) e senha (mínimo de caracteres).

### Cadastrar (`/cadastrar?token=...`)

Recebe um `token` via `searchParams`. O token é decodificado com `extractTokenData()` para obter `email` e `role` do convite. Se o token for inválido, mostra mensagem de erro. Se válido, renderiza `SignUpForm` com os campos: nome, email (preenchido do token), senha, confirmar senha.

### Recuperar senha (`/recuperar-senha`)

Formulário simples com campo de email. Ao submeter, envia solicitação de recuperação para o backend.

### Nova senha (`/nova-senha?token=...`)

Recebe `token` via `searchParams` (redireciona para login se ausente). Renderiza `ResetPasswordForm` com campos de senha e confirmação.

## Schemas

Os schemas Zod compartilhados (`emailSchema`, `passwordSchema`) estão em `src/schemas/index.tsx`. Cada formulário compõe seus schemas específicos a partir desses blocos.

## Fluxo de autenticação

1. **Login**: credenciais → API `/login` → cookie `session` → redireciona para dashboard
2. **Cadastro**: convite por email com token → página de cadastro → API de registro → login automático
3. **Recuperação**: email → link com token → página de nova senha → API de reset
4. **Logout**: server action em `actions/auth/logout.ts` — remove cookie de sessão

## Proxy

O `src/proxy.ts` protege as rotas:

- Rotas de auth com sessão ativa → redireciona para dashboard
- Rotas protegidas sem sessão → redireciona para login
