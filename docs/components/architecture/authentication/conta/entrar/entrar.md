# Documentação da Página de Login (`sign-in-page.tsx`)

O arquivo `sign-in-page.tsx` define a página de login da aplicação Next.js, utilizando componentes de UI e formulário de autenticação.

---

## ☑️ Objetivo da Página

- Permitir que usuários existentes acessem suas contas.
- Utilizar componentes reutilizáveis (`AuthCard`, `SignInForm`, `Divider`, `NavLink`) para consistência visual.
- Fornecer navegação fácil para usuários que desejam criar uma nova conta.

---

## 📦 Principais Importações

- `image` de `@images/auth/sign-in.svg`: Imagem exibida no card de autenticação.
- `AuthCard`: Componente que estrutura o card central da página.
- `SignInForm`: Formulário de login do usuário.
- `Divider`: Separador visual com texto opcional.
- `NavLink`: Link de navegação estilizado.
- `ROUTES`: Constantes de rotas da aplicação.
- `Metadata` do Next.js: Definição de metadados da página.

---

## ⚙️ Metadata

```ts
export const metadata: Metadata = {
  title: 'Acessar conta',
}
```

- Define o título da página para SEO e aba do navegador.

---

## 🧩 Estrutura da Página

- `AuthCard`: Card principal contendo imagem, título, descrição e conteúdo.
- `SignInForm`: Formulário de login dentro do card.
- `Divider`: Separa o formulário de links adicionais com o texto "ou".
- `NavLink`: Link para página de cadastro caso o usuário não possua conta.

---

### 📝 Exemplo de Estrutura

```tsx
<AuthCard
  image={image}
  title='Bem vindo(a)'
  description='Insira seus dados para entrar na sua conta'
>
  <SignInForm />

  <Divider text='ou' />

  <p className='text-foreground-soft text-center text-sm'>
    Não tem uma conta?{' '}
    <NavLink
      href={ROUTES.auth.signUp}
      className='text-foreground font-medium whitespace-nowrap'
    >
      Crie sua conta aqui
    </NavLink>
  </p>
</AuthCard>
```

---

## 🔍 Pontos-Chave

- Uso de componentes centralizados e reutilizáveis.
- Layout consistente com outros cards de autenticação.
- Navegação clara para usuários que desejam criar uma nova conta.
- Metadata para SEO.

---

## 💡 Vantagens

- Mantém consistência visual em toda a aplicação.
- Facilita manutenção e atualização da página.
- Integração simples com formulários e navegação.
- Experiência de usuário intuitiva e clara.

---

## 🛠️ Resumo

A página `SignInPage` fornece uma interface completa para login de usuários, utilizando componentes reutilizáveis e boas práticas de layout e SEO, garantindo uma experiência consistente e eficiente.

# Documentação do Schema e Valores Padrão do Formulário de Login (`sign-in-form-schema.ts`)

O arquivo `sign-in-form-schema.ts` define o schema de validação e os valores iniciais para o formulário de login usando **Zod**.

---

## ☑️ Objetivo

- Validar os dados inseridos no formulário de login.
- Garantir que o e-mail e senha atendam aos critérios de formato e segurança.
- Fornecer mensagens de erro claras para cada campo.
- Definir valores padrão para inicialização do formulário.

---

## 📦 Principais Importações

- `z` do pacote **zod**: Biblioteca para validação e definição de schema.

---

## ⚙️ Schema de Validação

```ts
export const signInFormSchema = z.object({
  email: z.string().email('Insira um e-mail válido'),
  password: z.string().min(8, 'Sua senha deve conter 8 ou mais caracteres'),
  rememberMe: z.boolean().optional(),
})
```

- Valida cada campo individualmente.
- `email`: Deve ser um e-mail válido.
- `password`: Deve ter no mínimo 8 caracteres.
- `rememberMe`: Campo opcional para lembrar o usuário.

---

## 🧩 Tipo Derivado

```ts
export type SignInFormSchema = z.infer<typeof signInFormSchema>
```

- Gera um tipo TypeScript a partir do schema, garantindo consistência tipada.

---

## 📋 Valores Padrão do Formulário

```ts
export const signInFormDefaultValues: SignInFormSchema = {
  email: '',
  password: '',
  rememberMe: false,
}
```

- Inicializa o formulário com campos vazios e `rememberMe` falso.

---

## 🔍 Pontos-Chave

- Validação simples e robusta.
- Mensagens de erro claras para usuário.
- Tipagem segura com TypeScript.
- Valores padrão facilitam a integração com React Hook Form.

---

## 💡 Vantagens

- Garante dados válidos antes do envio.
- Facilita a exibição de feedback de erro.
- Reduz erros de integração front-end/back-end.
- Reutilizável em qualquer parte do aplicativo que precise de login.

---

## 🛠️ Resumo

O `signInFormSchema` centraliza toda a validação e valores padrão do formulário de login, oferecendo segurança, consistência e feedback imediato ao usuário durante o preenchimento.

# Documentação do Componente SignInForm (`sign-in-form.tsx`)

O arquivo `sign-in-form.tsx` define o formulário de login da aplicação, integrando **React Hook Form**, **Zod** e componentes de UI personalizados.

---

## ☑️ Objetivo do Componente

- Permitir que usuários existentes façam login em suas contas.
- Validar e-mails e senhas de acordo com regras definidas.
- Oferecer feedback de erro e estado de carregamento.
- Redirecionar usuários para páginas apropriadas após login.

---

## 📦 Principais Importações

- `useForm`, `FormProvider` do **react-hook-form**: Gerenciamento de estado do formulário.
- `zodResolver` do **@hookform/resolvers/zod**: Integração com Zod para validação de schema.
- `MailIcon` do **lucide-react**: Ícone para o campo de e-mail.
- `useRouter` do Next.js: Redirecionamento de páginas.
- Componentes de formulário e UI: `TextInput`, `PasswordInput`, `CheckboxInput`, `FormContainer`, `FormField`, `Alert`, `Button`, `NavLink`.
- `signInFormSchema` e `signInFormDefaultValues`: Schema e valores padrão para validação.
- `api`: Função para chamadas ao backend.
- `ROUTES`: Constantes de rotas da aplicação.
- `getDataFromToken`: Função para extrair dados do token JWT.

---

## ⚙️ Funcionalidades

### Inicialização do Formulário

```ts
const formMethods = useForm<SignInFormSchema>({
  resolver: zodResolver(signInFormSchema),
  defaultValues: signInFormDefaultValues,
  mode: 'onBlur',
})
```

- Validação com Zod.
- Valores iniciais do formulário.
- Validação ocorre ao sair do campo (`onBlur`).

### Autenticação do Usuário

```ts
async function signIn({ email, password, rememberMe }: SignInFormSchema) {
  const response = await api('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, rememberMe }),
  })

  if (!response.success) {
    formMethods.setError('root', { message: response.message })
    return
  }

  const data = await getDataFromToken()
  const redirectPath =
    data?.userRole === 'admin' ? ROUTES.dashboard.main : ROUTES.patient.main
  router.push(redirectPath)
}
```

- Envia os dados de login para o backend.
- Exibe mensagem de erro se a autenticação falhar.
- Redireciona usuários baseado no papel (admin ou paciente).

### Estrutura do Formulário

- `TextInput` para e-mail.
- `PasswordInput` para senha.
- `CheckboxInput` para "manter conectado".
- `NavLink` para recuperar senha.
- `Button` de envio com estado de carregamento.
- `Alert` para exibir erros do formulário.

---

## 🔍 Pontos-Chave

- Integração completa com **React Hook Form** e **Zod**.
- Feedback visual de carregamento e mensagens de erro.
- Campos de login com validação tipada e mensagens claras.
- Redirecionamento seguro após autenticação.

---

## 💡 Vantagens

- Validação robusta e tipada.
- Experiência de usuário clara e segura.
- Centraliza lógica de autenticação em um único componente.
- Fácil manutenção e extensão futura.

---

## 🛠️ Resumo

O componente `SignInForm` fornece uma interface completa para login de usuários, integrando validação de dados, feedback de erro e interações com o backend, garantindo consistência visual e usabilidade.
