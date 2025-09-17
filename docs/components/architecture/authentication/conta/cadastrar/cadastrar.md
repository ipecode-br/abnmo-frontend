# Documentação da Página de Cadastro (`sign-up-page.tsx`)

O arquivo `sign-up-page.tsx` define a página de cadastro de conta da aplicação Next.js, utilizando componentes de UI e formulário de registro.

---

## ☑️ Objetivo da Página

- Permitir que novos usuários criem uma conta.
- Utilizar componentes reutilizáveis (`AuthCard`, `SignUpForm`, `Divider`, `NavLink`) para consistência visual.
- Fornecer navegação fácil para usuários que já possuem conta.

---

## 📦 Principais Importações

- `image` de `@images/auth/sign-in.svg`: Imagem exibida no card de autenticação.
- `AuthCard`: Componente que estrutura o card central da página.
- `SignUpForm`: Formulário de registro de usuário.
- `Divider`: Separador visual com texto opcional.
- `NavLink`: Link de navegação estilizado.
- `ROUTES`: Constantes de rotas da aplicação.
- `Metadata` do Next.js: Definição de metadados da página.

---

## ⚙️ Metadata

```ts
export const metadata: Metadata = {
  title: 'Cadastrar conta',
}
```

- Define o título da página para SEO e aba do navegador.

---

## 🧩 Estrutura da Página

- `AuthCard`: Card principal contendo imagem, título, descrição e conteúdo.
- `SignUpForm`: Formulário de cadastro dentro do card.
- `Divider`: Separa o formulário de links adicionais com o texto "ou".
- `NavLink`: Link para página de login caso o usuário já tenha uma conta.

---

### 📝 Exemplo de Estrutura

```tsx
<AuthCard
  image={image}
  title='Cadastrar conta'
  description='Insira seus dados para criar sua conta'
>
  <SignUpForm />

  <Divider text='ou' />

  <p className='text-foreground-soft text-center text-sm'>
    Já tem uma conta?{' '}
    <NavLink
      href={ROUTES.auth.signIn}
      className='text-foreground font-medium whitespace-nowrap'
    >
      Acesse sua conta
    </NavLink>
  </p>
</AuthCard>
```

---

## 🔍 Pontos-Chave

- Uso de componentes centralizados e reutilizáveis.
- Layout consistente com outros cards de autenticação.
- Navegação clara para usuários que já possuem conta.
- Metadata para SEO.

---

## 💡 Vantagens

- Mantém consistência visual em toda a aplicação.
- Facilita manutenção e atualização da página.
- Integração simples com formulários e navegação.
- Experiência de usuário intuitiva e clara.

---

## 🛠️ Resumo

A página `SignUpPage` fornece uma interface completa para cadastro de usuários, utilizando componentes reutilizáveis e boas práticas de layout e SEO, garantindo uma experiência consistente e eficiente.

# Documentação do Schema e Valores Padrão do Formulário de Cadastro (`sign-up-form-schema.ts`)

O arquivo `sign-up-form-schema.ts` define o schema de validação e os valores iniciais para o formulário de cadastro usando **Zod**.

---

## ☑️ Objetivo

- Validar os dados inseridos no formulário de cadastro.
- Garantir que o nome, e-mail e senha atendam aos critérios de segurança e formato correto.
- Fornecer mensagens de erro claras para cada campo.
- Definir valores padrão para inicialização do formulário.

---

## 📦 Principais Importações

- `z` do pacote **zod**: Biblioteca para validação e schema de dados.
- `PASSWORD_MIN_LENGTH` de `@/constants/auth`: Define comprimento mínimo da senha.
- `NAME_REGEX`, `NON_SPECIAL_CHAR_REGEX`, `PASSWORD_REGEX` de `@/constants/regex`: Expressões regulares para validação de nome e senha.

---

## ⚙️ Schema de Validação

```ts
export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Insira seu nome completo')
      .min(3, 'O nome deve conter mais de 3 caracteres')
      .regex(
        NON_SPECIAL_CHAR_REGEX,
        'Números e caracteres especiais são inválidos',
      )
      .regex(NAME_REGEX, 'Insira seu nome e sobrenome'),
    email: z.string().email('Insira um e-mail válido'),
    password: z
      .string()
      .min(1, 'Insira sua senha')
      .min(
        PASSWORD_MIN_LENGTH,
        `Sua senha precisa conter ${PASSWORD_MIN_LENGTH} ou mais caracteres`,
      )
      .regex(PASSWORD_REGEX, 'Senha inválida'),
    confirmPassword: z.string(),
    consent: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Suas senhas não coincidem',
    path: ['confirmPassword'],
  })
  .refine((data) => data.consent === true, {
    message: 'Seu consentimento é obrigatório',
    path: ['consent'],
  })
```

- Valida cada campo individualmente.
- Usa `refine` para validações dependentes, como confirmação de senha e consentimento.

---

## 🧩 Tipo Derivado

```ts
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>
```

- Deriva o tipo TypeScript do schema, garantindo tipagem consistente.

---

## 📋 Valores Padrão do Formulário

```ts
export const signUpFormDefaultValues: SignUpFormSchema = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  consent: false,
}
```

- Fornece valores iniciais para inicializar o formulário com campos vazios e consentimento falso.

---

## 🔍 Pontos-Chave

- Validação robusta de campos e regras de senha.
- Mensagens de erro claras e específicas.
- Tipagem segura para integração com componentes de formulário.
- Suporte a validações dependentes (`confirmPassword` e `consent`).

---

## 💡 Vantagens

- Garante dados válidos antes de enviar ao backend.
- Facilita a exibição de mensagens de erro para o usuário.
- Reduz erros de integração entre front-end e back-end.
- Reutilizável em diferentes partes do aplicativo que precisem de cadastro de usuário.

---

## 🛠️ Resumo

O `signUpFormSchema` centraliza toda a validação e valores padrão do formulário de cadastro, oferecendo segurança, consistência e feedback imediato ao usuário durante o preenchimento do formulário.

# Documentação do Componente SignUpForm (`sign-up-form.tsx`)

O arquivo `sign-up-form.tsx` define o formulário de cadastro de usuário utilizando **React Hook Form**, **Zod** e componentes de UI personalizados.

---

## ☑️ Objetivo do Componente

- Coletar informações de cadastro do usuário (nome, e-mail e senha).
- Validar dados usando o schema `signUpFormSchema`.
- Exibir mensagens de erro de forma clara.
- Registrar o usuário via API e redirecionar após sucesso.

---

## 📦 Principais Importações

- `useForm`, `FormProvider` do **react-hook-form**: Gerenciamento de estado do formulário.
- `zodResolver` do **@hookform/resolvers/zod**: Integração com Zod para validação de schema.
- Ícones `MailIcon`, `User2Icon` do **lucide-react**.
- `useRouter` do **next/navigation**: Redirecionamento após cadastro.
- Componentes de formulário e UI: `TextInput`, `PasswordInput`, `CheckboxInput`, `FormContainer`, `FormField`, `Alert`, `Button`, `NavLink`.
- `signUpFormSchema` e `signUpFormDefaultValues`: Schema e valores padrão para validação e inicialização do formulário.
- `api`: Função para comunicação com o backend.
- `toast` do **sonner**: Notificações de sucesso.
- `ROUTES`: Constantes de rotas da aplicação.

---

## ⚙️ Funcionalidades

### Inicialização do Formulário

```ts
const formMethods = useForm<SignUpFormSchema>({
  resolver: zodResolver(signUpFormSchema),
  defaultValues: signUpFormDefaultValues,
  mode: 'onBlur',
})
```

- Validação usando Zod.
- Valores iniciais definidos.
- Validação ocorre ao sair do campo (`onBlur`).

### Registro do Usuário

```ts
async function registerUser({ name, email, password }: SignUpFormSchema) {
  const response = await api('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.success) {
    return formMethods.setError('root', { message: response.message })
  }

  toast.success(response.message)
  router.push(ROUTES.patient.main)
}
```

- Envia dados ao backend.
- Exibe mensagem de sucesso com toast.
- Define mensagem de erro no formulário se falhar.
- Redireciona para a página principal de pacientes.

### Estrutura do Formulário

- `TextInput` para nome e e-mail.
- `PasswordInput` para senha e confirmação de senha.
- `CheckboxInput` para consentimento de termos.
- `Button` de envio com estado de carregamento.
- `Alert` para exibir erros do formulário.

---

## 🔍 Pontos-Chave

- Integração completa com **React Hook Form** e **Zod**.
- Campos obrigatórios e mensagens de erro detalhadas.
- Feedback visual de carregamento e erros.
- Uso de componentes reutilizáveis para consistência visual.
- Preparado para extensão futura (como links para políticas de privacidade).

---

## 💡 Vantagens

- Validação robusta e tipada.
- Experiência de usuário clara e segura.
- Centraliza lógica de cadastro em um único componente.
- Facilita manutenção e testes.

---

## 🛠️ Resumo

O componente `SignUpForm` fornece uma interface completa para cadastro de novos usuários, integrando validação de dados, feedback de erros e interações com backend, garantindo consistência visual e usabilidade.
