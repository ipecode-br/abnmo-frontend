# Documentação do Componente RecoverPasswordPage (`recover-password-page.tsx`)

O arquivo `recover-password-page.tsx` define a página de recuperação de senha, integrando o componente de formulário de recuperação de senha e elementos de UI como cartões, divisores e links de navegação.

---

## ☑️ Objetivo da Página

A página **`RecoverPasswordPage`** tem como objetivos:

- Permitir que o usuário informe seu e-mail para iniciar a recuperação de senha.
- Exibir mensagens e componentes auxiliares de UI de forma clara.
- Proporcionar navegação fácil para a tela de login.

---

## 📦 Principais Importações

- `image` do diretório de imagens: Ilustração da página.
- `Metadata` do Next.js: Define metadados como título da página.
- Componentes internos:
  - `AuthCard`: Estrutura principal do cartão de autenticação.
  - `Divider`: Separador visual.
  - `NavLink`: Link estilizado de navegação.

- `ROUTES`: Constantes de rotas do projeto.
- `RecoverForm`: Componente do formulário de recuperação de senha.

---

## ⚙️ Lógica da Página

```tsx
export default function RecoverPasswordPage() {
  return (
    <AuthCard
      image={image}
      title='Recuperar senha'
      description='Insira seu e-mail para recuperar sua senha'
    >
      <RecoverForm />

      <Divider />

      <p className='text-foreground-soft text-center text-sm'>
        Mudou de ideia?{' '}
        <NavLink
          href={ROUTES.auth.signIn}
          className='text-foreground font-medium whitespace-nowrap'
        >
          Acesse sua conta
        </NavLink>
      </p>
    </AuthCard>
  )
}
```

- Utiliza o `AuthCard` como container principal.
- Inclui `RecoverForm` para capturar e validar o e-mail.
- Um `Divider` separa visualmente o formulário do link de retorno.
- `NavLink` fornece navegação para a página de login.

---

## 🔍 Pontos-Chave

- **Usabilidade:** Interface limpa e intuitiva para recuperação de senha.
- **Feedback visual:** Estrutura clara com separadores e links.
- **Reusabilidade:** Usa componentes genéricos (`AuthCard`, `Divider`, `NavLink`) que podem ser reutilizados em outras páginas.
- **Acessibilidade:** Textos e botões compatíveis com navegação por teclado e leitores de tela.

---

## 💡 Vantagens

- Centraliza lógica de UI para recuperação de senha.
- Fácil manutenção e extensão para novos métodos de autenticação.
- Integração rápida com formulários validados.

---

## 🛠️ Resumo

O componente `RecoverPasswordPage` fornece uma página de recuperação de senha pronta, com estrutura visual moderna e integração com o formulário de recuperação de e-mail, garantindo uma experiência de usuário consistente e segura.

# Documentação do Componente RecoverForm (`recover-form-schema.ts`)

O arquivo `recover-form-schema.ts` define o schema de validação e os tipos para o formulário de recuperação de senha, garantindo que os dados de entrada sejam consistentes e válidos.

---

## ☑️ Objetivo do Componente

O **`RecoverForm`** tem como objetivo validar e tipar os dados de e-mail inseridos pelo usuário para recuperação de senha.

---

## 📦 Principais Importações

- `z` do pacote **zod**: Biblioteca para validação de esquemas e tipagem segura.

---

## ⚙️ Estrutura do Schema

```ts
export const recoverFormSchema = z.object({
  email: z.string().email('Insira um e-mail válido'),
})
```

- `email`: String obrigatória, deve estar em formato de e-mail válido.

---

## 🧩 Tipos e Valores Padrão

```ts
export type RecoverFormSchema = z.infer<typeof recoverFormSchema>

export const recoverFormDefaultValues: RecoverFormSchema = {
  email: '',
}
```

- `RecoverFormSchema`: Tipo TypeScript inferido a partir do schema.
- `recoverFormDefaultValues`: Valores iniciais do formulário, com `email` vazio.

---

## 🔍 Pontos-Chave

- **Validação:** Utiliza `zod` para garantir que o e-mail seja válido.
- **Segurança:** Evita envio de dados inválidos para o backend.
- **Integração com formulários:** Compatível com `react-hook-form` e outros gerenciadores de estado de formulário.

---

## 💡 Vantagens

- Facilita a manutenção e atualização das regras de validação.
- Evita erros de digitação ou formatos inválidos no e-mail.
- Permite tipagem segura no TypeScript.

---

## 🛠️ Resumo

O schema `recoverFormSchema` fornece uma forma segura e consistente de validar o e-mail para recuperação de senha, garantindo integridade dos dados e uma melhor experiência para o usuário.

# Documentação do Componente RecoverForm (`recover-form.tsx`)

O arquivo `recover-form.tsx` define um componente React reutilizável para recuperação de senha via e-mail. Ele utiliza `react-hook-form` junto com `zod` para validação e `sonner`/UI para feedback visual de sucesso ou erro.

---

## ☑️ Objetivo do Componente

O componente **`RecoverForm`** permite que usuários solicitem a redefinição de senha inserindo seu e-mail. Ele exibe mensagens de erro ou sucesso e pode ser integrado facilmente a páginas de autenticação.

---

## 📦 Principais Importações

- `zodResolver` do pacote **@hookform/resolvers/zod**: Validação de formulários.
- `useForm` e `FormProvider` do **react-hook-form**: Gerenciamento de estado do formulário.
- `MailIcon`, `Loader2` do **lucide-react**: Ícones de UI.
- Componentes de formulário e UI (`TextInput`, `Button`, `Alert`, `FormContainer`) para layout e feedback.
- `wait` utilitário: Simulação de delay.

---

## ⚙️ Lógica do Componente

1. Inicializa o formulário com `useForm`, definindo valores padrão e esquema de validação `zod`.
2. Define estados internos:
   - `successMessage`: Mensagem de sucesso após envio.

3. `sendRecoverEmail` é chamado ao submeter o formulário:
   - Simula delay com `wait`.
   - Mostra erro se o e-mail for específico.
   - Caso contrário, define mensagem de sucesso.

4. Renderiza:
   - Campo de e-mail (`TextInput`).
   - Botão de envio (`Button`) com estado de loading.
   - Alertas (`Alert`) para sucesso ou erro.

---

## 🧩 Propriedades do Componente RecoverForm

```ts
// Não possui props externas
```

- Gerenciamento interno de estado do formulário e mensagens.
- Validação de e-mail usando `zod`.

---

## 📝 Exemplo de Uso

```tsx
<RecoverForm />
```

---

## 🔗 Dependências

- `react-hook-form`
- `@hookform/resolvers/zod`
- `zod`
- `lucide-react`
- Componentes de UI internos (`TextInput`, `Button`, `Alert`, `FormContainer`)
- Utilitário `wait`

---

## 🛠️ Resumo

O componente `RecoverForm` é uma solução prática para recuperação de senha, combinando validação robusta com feedback visual. Ele pode ser utilizado de forma autônoma ou integrado a páginas de autenticação, garantindo uma boa experiência do usuário.
