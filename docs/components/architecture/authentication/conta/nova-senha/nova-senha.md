# Documentação da Página de Redefinição de Senha (`new-password-page.tsx`)

O arquivo `new-password-page.tsx` define a página para que os usuários possam redefinir suas senhas, integrando componentes de UI e formulários de autenticação.

---

## ☑️ Objetivo da Página

- Permitir que usuários redefinam suas senhas utilizando um token de recuperação.
- Exibir formulário de nova senha de forma centralizada e estilizada.
- Oferecer navegação para a página de login.

---

## 📦 Principais Importações

- `AuthCard`: Componente de card para formulários de autenticação.
- `Divider`: Componente de separador visual.
- `NavLink`: Componente para navegação.
- `NewPasswordForm`: Formulário de redefinição de senha.
- `ROUTES`: Constantes de rotas do projeto.
- `image`: Imagem ilustrativa da página.
- `Metadata` do Next.js: Informação de SEO e título da página.

---

## ⚙️ Metadata

```ts
export const metadata: Metadata = {
  title: 'Redefinir senha',
}
```

- Define o título da página para SEO e abas do navegador.

---

## 🧩 Props da Página

```ts
interface NewPasswordPageProps {
  searchParams: Promise<{ token?: string }>
}
```

- Recebe `searchParams` contendo o `token` de redefinição de senha.

---

## 🔄 Lógica da Página

```ts
const { token } = await searchParams

if (!token) {
  console.error('Token is missing')
}
```

- Extrai o token dos parâmetros da URL.
- Loga erro caso o token não exista (em produção, poderia redirecionar ou exibir mensagem).

---

## 🏗️ Estrutura da Página

- `AuthCard`: Envolve todo o conteúdo da página.
  - `image`: Ilustração da página.
  - `title`: "Redefinir senha".
  - `NewPasswordForm`: Formulário de entrada da nova senha.
  - `Divider`: Separador entre o formulário e link de navegação.
  - `NavLink`: Link para a página de login.

---

## 🔍 Pontos-Chave

- Página assíncrona para extrair token da query.
- Uso de componentes reutilizáveis para consistência visual.
- Feedback mínimo para token ausente (poderia ser melhorado para UX).
- Centraliza toda a UI de redefinição de senha.

---

## 💡 Vantagens

- Estrutura modular e fácil de manter.
- Reutiliza componentes de autenticação já existentes.
- Separação clara entre lógica de token e apresentação.
- Facilita futuras integrações com back-end e validação de tokens.

---

## 🛠️ Resumo

A página `NewPasswordPage` oferece uma interface segura e estilizada para redefinir senhas, utilizando um token de recuperação e componentes de UI padronizados, garantindo consistência e facilidade de manutenção no projeto.

# Documentação do Formulário de Nova Senha (`new-password-form-schema.ts`)

O arquivo `new-password-form-schema.ts` define o schema de validação para o formulário de redefinição de senha, garantindo que a senha do usuário atenda aos requisitos de segurança e que a confirmação coincida.

---

## ☑️ Objetivo do Formulário

O formulário **Nova Senha** tem como objetivo:

- Validar a nova senha do usuário.
- Garantir que a confirmação da senha seja idêntica à senha informada.
- Integrar facilmente com formulários tipados em **React Hook Form** ou outros sistemas de formulário.

---

## 📦 Principais Importações

- `z` do **Zod**: Biblioteca para validação de dados.
- `PASSWORD_MIN_LENGTH`: Constante que define o tamanho mínimo da senha.
- `PASSWORD_REGEX`: Expressão regular que valida os critérios da senha.

---

## ⚙️ Schema de Validação

```ts
export const newPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Insira sua senha')
      .min(
        PASSWORD_MIN_LENGTH,
        `Sua senha precisa conter ${PASSWORD_MIN_LENGTH} ou mais caracteres`,
      )
      .regex(PASSWORD_REGEX, 'Senha inválida'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Suas senhas não coincidem',
    path: ['confirmPassword'],
  })
```

### 🚦 Regras de Validação

| Campo             | Regras                                                                         |
| ----------------- | ------------------------------------------------------------------------------ |
| `password`        | Obrigatório, mínimo de `PASSWORD_MIN_LENGTH`, deve atender ao `PASSWORD_REGEX` |
| `confirmPassword` | Obrigatório, deve ser igual ao campo `password`                                |

- `.refine` assegura que a senha e a confirmação coincidam.

---

## 🧩 Tipo Derivado

```ts
export type NewPasswordFormSchema = z.infer<typeof newPasswordFormSchema>
```

- `NewPasswordFormSchema` representa o tipo seguro do objeto validado.
- Permite tipagem consistente no frontend, especialmente com **React Hook Form**.

---

## 📝 Valores Padrão

```ts
export const newPasswordFormDefaultValues: NewPasswordFormSchema = {
  password: '',
  confirmPassword: '',
}
```

- Inicializa os campos do formulário com valores vazios.
- Facilita o uso de formulários controlados.

---

## 🔍 Pontos-Chave

- Validação completa da senha e confirmação.
- Mensagens de erro claras e direcionadas.
- Integração simples com formulários React tipados.

---

## 💡 Vantagens

- Garantia de senhas fortes e válidas.
- Evita inconsistências entre senha e confirmação.
- Reutilizável e compatível com diferentes sistemas de formulários.

---

## 🛠️ Resumo

O `newPasswordFormSchema` oferece uma solução robusta e segura para redefinição de senhas, garantindo que os usuários criem senhas válidas e confirmem corretamente antes de atualizar suas credenciais.

# Documentação do Componente NewPasswordForm (`new-password-form.tsx`)

O arquivo `new-password-form.tsx` define o componente de formulário para redefinição de senha, integrando validação, UI responsiva e feedback visual para o usuário.

---

## ☑️ Objetivo do Componente

O componente **`NewPasswordForm`** tem como objetivos:

- Permitir que o usuário insira e confirme uma nova senha.
- Validar os campos de senha usando **Zod** e `react-hook-form`.
- Exibir mensagens de sucesso ou erro conforme a ação do usuário.
- Redirecionar para a tela de login após atualização bem-sucedida.

---

## 📦 Principais Importações

- `zodResolver` de `@hookform/resolvers/zod`: Integração da validação Zod com React Hook Form.
- `useForm`, `FormProvider` do React Hook Form: Gerenciamento de estado e validação do formulário.
- `Loader2` de `lucide-react`: Ícone animado para indicar carregamento.
- Componentes internos:
  - `FormContainer`, `FormField`, `PasswordInput`.
  - `Alert` e `Button` para feedback e ação do usuário.

- `ROUTES`: Constantes de rotas do projeto.
- `wait`: Função utilitária para simulação de delay.
- `newPasswordFormSchema` e `newPasswordFormDefaultValues`: Schema e valores padrão do formulário.

---

## ⚙️ Lógica do Componente

```tsx
const formMethods = useForm<NewPasswordFormSchema>({
  resolver: zodResolver(newPasswordFormSchema),
  defaultValues: newPasswordFormDefaultValues,
  mode: 'onBlur',
})

const isSubmitting = formMethods.formState.isSubmitting
const errorMessage = formMethods.formState.errors.root?.message

async function saveNewPassword(data: NewPasswordFormSchema) {
  setSuccess(false)
  await wait(500)
  console.log(data)

  setSuccess(true)

  setTimeout(() => redirect(ROUTES.auth.signIn), 2000)
}
```

- O formulário é inicializado com validação e valores padrão.
- `saveNewPassword` simula a atualização da senha e redireciona após sucesso.
- O estado `success` controla a exibição do alerta de sucesso.

---

## 🧩 Estrutura do JSX

```tsx
<FormProvider {...formMethods}>
  <FormContainer onSubmit={formMethods.handleSubmit(saveNewPassword)}>
    <FormField>
      <PasswordInput name='password' label='Senha' showRequirements />
      <PasswordInput name='confirmPassword' label='Confirmar senha' />
    </FormField>

    <Button variant='fancy' type='submit' disabled={isSubmitting}>
      {isSubmitting ? <Loader2 className='animate-spin' /> : 'Redefinir senha'}
    </Button>

    {success && <Alert variant='success'>Senha atualizada com sucesso.</Alert>}
    {errorMessage && <Alert error>{errorMessage}</Alert>}
  </FormContainer>
</FormProvider>
```

- Campos de senha com validação e placeholders.
- Botão de envio com feedback de carregamento.
- Alertas condicionais para sucesso e erro.

---

## 🔍 Pontos-Chave

- **Validação robusta:** Utiliza Zod e React Hook Form para garantir que a senha e confirmação coincidam.
- **Feedback visual:** Alertas e ícones de carregamento informam o usuário sobre o status da operação.
- **Redirecionamento seguro:** Após o sucesso, o usuário é enviado para a tela de login.
- **Flexibilidade:** Pode ser facilmente estendido para integração com uma API real.

---

## 💡 Vantagens

- Garantia de consistência de dados e segurança de senha.
- UI responsiva com feedback imediato.
- Arquitetura modular, permitindo reuso de campos e componentes.
- Facilidade de integração com futuros endpoints de API.

---

## 🛠️ Resumo

O componente `NewPasswordForm` fornece uma solução segura e interativa para redefinir senhas, utilizando práticas modernas de validação e UI no ecossistema React.
