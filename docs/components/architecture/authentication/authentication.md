# Documentação do Middleware de Autenticação (`middleware.ts`)

O arquivo `middleware.ts` define um middleware Next.js responsável por controlar o acesso às rotas da aplicação com base na autenticação do usuário.

---

## ☑️ Objetivo do Middleware

- Garantir que apenas usuários autenticados acessem rotas protegidas.
- Redirecionar usuários não autenticados para a página de login.
- Impedir que usuários autenticados acessem páginas de login ou registro.

---

## 📦 Principais Importações

- `NextRequest` e `NextResponse` do **next/server**: APIs para manipulação de requisições e respostas no middleware.
- `ROUTES` do módulo local `constants/routes`: Contém rotas principais da aplicação.

---

## ⚙️ Lógica do Middleware

1. **Leitura de cookies e rota**:
   - Obtém o cookie `access_token` e o `pathname` da requisição.
   - Determina se a rota é de autenticação (`/conta`).

2. **Redirecionamento**:
   - Se estiver em rota de autenticação e houver `access_token`, redireciona para dashboard.
   - Se estiver fora de rota de autenticação e não houver `access_token`, redireciona para login.
   - Caso contrário, permite o acesso à rota.

---

## 🧩 Configuração do Middleware

```ts
export const config = {
  matcher: [
    '/((?!images|404|_next/static|_next/image|icon.png|sitemap.xml|robots.txt|favicon.ico).*)',
  ],
}
```

- Aplica o middleware a todas as rotas, exceto arquivos estáticos, imagens públicas, favicon e páginas de erro.
- Garante que apenas as rotas relevantes passem pelo controle de autenticação.

---

## 🔍 Pontos-Chave

- Controle de acesso baseado em cookies.
- Redirecionamentos inteligentes para login ou dashboard.
- Bypass temporário para desenvolvimento via variável de ambiente.
- Configuração de matcher para evitar aplicar o middleware em arquivos estáticos ou públicos.

---

## 💡 Vantagens

- Segurança: impede acesso não autorizado a páginas protegidas.
- Usabilidade: evita que usuários logados acessem páginas de login.
- Flexibilidade: suporte a bypass para testes e desenvolvimento.
- Integração limpa com o roteamento do Next.js.

---

## 🛠️ Resumo

O middleware de autenticação fornece uma camada de segurança para a aplicação Next.js, garantindo que usuários não autenticados sejam redirecionados para login e usuários autenticados não acessem páginas de autenticação desnecessárias, enquanto mantém flexibilidade para desenvolvimento e testes.

# Documentação dos Utilitários Server (`server-utils.ts`)

O arquivo define funções utilitárias para operações server-side em um projeto Next.js, incluindo permissões, cache, cookies, dados do token JWT, cidades e perfil do usuário. Todas as funções usam o `'use server'` do Next.js e são assíncronas.

---

## ☑️ Objetivo

Fornecer funções centralizadas para:

- Verificação de permissões do usuário.
- Revalidação de cache.
- Acesso a cookies.
- Extração de dados do token JWT.
- Consultas externas (ex.: cidades via API do IBGE).
- Obtenção de perfil do usuário.

---

## 📦 Principais Importações

- `definePermissionsFor` do módulo `permissions`: Gerenciamento de permissões baseado no papel do usuário.
- `getDataFromToken` do módulo `token`: Recupera informações do usuário a partir do JWT.
- `revalidateTag` do `next/cache`: Para invalidar/revalidar tags do cache.
- `cookies` do `next/headers`: Para acessar cookies server-side.
- `jwt` do pacote `jsonwebtoken`: Para decodificar tokens JWT.
- `api` do módulo local `lib/api`: Chamadas HTTP centralizadas.
- Tipos `Action`, `Subject`, `Role`, `UserType` para tipagem forte.

---

## ⚙️ Funções e Lógica

### 1️⃣ `canUser(action, subject)`

```ts
export async function canUser(action: Action, subject: Subject)
```

- Verifica se o usuário autenticado tem permissão para uma ação em determinado recurso.
- Retorna `true`, `false` ou `null` (usuário não autenticado).

---

### 2️⃣ `revalidateCache(tags)`

```ts
export async function revalidateCache(tags: string | string[])
```

- Revalida o cache para uma ou mais tags.
- Aceita uma string única ou array de strings.

---

### 3️⃣ `getAllCookies()` e `getCookie(name)`

```ts
export async function getAllCookies()
export async function getCookie(name: string)
```

- `getAllCookies`: Retorna todas as cookies disponíveis.
- `getCookie`: Retorna o valor de um cookie específico.

---

### 4️⃣ `getCitiesByUF(UF)`

```ts
export async function getCitiesByUF(UF: string)
```

- Retorna uma lista de cidades de um estado brasileiro usando a API IBGE.
- Revalida cache por 24 horas (`86400s`) e cria tag `cities/{UF}`.

---

### 5️⃣ `getDataFromToken()`

```ts
export async function getDataFromToken()
```

- Recupera o token `access_token` do cookie.
- Decodifica o JWT para extrair `userId` e `userRole`.
- Retorna `{ userId, userRole }` ou `null` se não houver token.

---

### 6️⃣ `getProfile()`

```ts
export async function getProfile()
```

- Obtém os dados do perfil do usuário autenticado via API.
- Faz cache por 1 hora (`3600s`) e cria tag `NEXT_CACHE_TAGS.user(userId)`.

---

## 🔍 Pontos-Chave

- **Server-only**: Todas as funções usam `'use server'`.
- **Centralização**: Todas operações sensíveis a autenticação, cache e perfil estão centralizadas.
- **Revalidação de cache**: Suporte nativo para invalidar tags específicas do Next.js.
- **JWT seguro**: Decodificação do token sem validação, útil para leitura rápida de payload.
- **Tipos fortes**: Utiliza TypeScript para tipagem de roles, ações, usuários e respostas da API.

---

## 🔗 Dependências

- `jsonwebtoken`
- `next/headers`
- `next/cache`
- `next/navigation`
- `@/lib/permissions`
- `@/lib/api`
- `@/lib/permissions/schemas`
- `@/config/env`
- `@/utils/wait`

---

## 🛠️ Resumo

Este módulo fornece funções server-side essenciais para:

- Autenticação e autorização.
- Acesso a cookies e dados de token.
- Interação com APIs externas e cache.
- Centralização de lógica repetitiva, facilitando manutenção e testes.

# Documentação do Componente AuthCard (`auth-card.tsx`)

O arquivo `auth-card.tsx` define um componente React reutilizável que serve como container estilizado para páginas de autenticação, exibindo imagem, título, descrição e conteúdo adicional.

---

## ☑️ Objetivo do Componente

- O componente **`AuthCard`** serve como card centralizado para interfaces de login, registro ou outras páginas de autenticação.
- Estrutura o conteúdo com imagem, título, descrição e elementos filhos.
- Inclui divisores visuais e estilo consistente com a aplicação.

---

## 📦 Principais Importações

- `Image` do **next/image** para otimização e carregamento de imagens.
- `Divider` do componente UI para separar seções visualmente.
- Tipos `StaticImport` e `ReactNode` para tipagem das props.

---

## 🧩 Propriedades do Componente AuthCard

```ts
interface AuthCardProps {
  image: string | StaticImport
  title: string
  description?: string
  children: ReactNode
}
```

- `image` (`string | StaticImport`): Caminho ou import estático da imagem do card.
- `title` (`string`): Título exibido no topo do card.
- `description` (`string`, opcional): Descrição abaixo do título.
- `children` (`ReactNode`): Conteúdo adicional dentro do card, como formulários ou botões.

---

## ⚙️ Lógica do Componente

- Renderiza um `<div>` principal com estilo de card (`bg-background`, `rounded-3xl`, `shadow-xl/5`, `p-8`).
- Header do card inclui imagem, título e descrição centralizados.
- Um `Divider` separa visualmente o header do conteúdo.
- `children` permite inserir formulários, botões ou outros elementos.

---

### 📝 Exemplo de Uso

```tsx
<AuthCard
  image='/logo.png'
  title='Bem-vindo!'
  description='Faça login para continuar'
>
  <LoginForm />
</AuthCard>
```

---

## 🔍 Pontos-Chave

- Estrutura modular para cards de autenticação.
- Flexível para incluir diferentes conteúdos via `children`.
- Estilização consistente com bordas arredondadas, padding e sombra.
- Imagem e textos centralizados para melhor experiência visual.

---

## 💡 Vantagens

- Cria cards de autenticação de forma rápida e padronizada.
- Fácil de reutilizar em diferentes páginas e contextos.
- Permite adicionar facilmente formulários e botões dentro do card.

---

## 🛠️ Resumo

O componente `AuthCard` fornece uma solução elegante e consistente para exibir cards de autenticação, combinando imagem, título, descrição e conteúdo dinâmico em um layout centralizado e visualmente agradável.

# Documentação do Utilitário de Regras de Senha (`password-requirements.ts`)

O arquivo `password-requirements.ts` define funções e constantes para validar senhas de acordo com regras específicas de segurança.

---

## ☑️ Objetivo

- Validar senhas de usuários seguindo critérios de segurança.
- Retornar lista de requisitos com informações de validade.
- Facilitar exibição de feedback em formulários de autenticação.

---

## 📦 Principais Importações

- `PASSWORD_MIN_LENGTH` de `@/constants/auth`: Define o tamanho mínimo da senha.
- `LOWERCASE_REGEX`, `UPPERCASE_REGEX`, `NUMBER_REGEX`, `SPECIAL_CHAR_REGEX` de `@/constants/regex`: Expressões regulares para validar diferentes tipos de caracteres.

---

## 🧩 Constantes

```ts
export const PASSWORD_REQUIREMENTS = {
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  number: 'number',
  specialChar: 'special_char',
  length: 'length',
} as const
```

- Define os tipos de requisitos de senha como constantes para uso consistente.

---

## ⚙️ Função getPasswordRequirements

```ts
export function getPasswordRequirements(value: string): PasswordRequirementType[] {...}
```

- Recebe uma senha (`value`) como string.
- Retorna um array de objetos `PasswordRequirementType` contendo:
  - `type`: Tipo do requisito (`uppercase`, `lowercase`, `number`, `specialChar`, `length`).
  - `text`: Descrição do requisito.
  - `isValid`: Booleano indicando se a senha atende ao requisito.

### Regras Validadas

1. Pelo menos 1 letra maiúscula.
2. Pelo menos 1 letra minúscula.
3. Pelo menos 1 número.
4. Pelo menos 1 caractere especial.
5. Comprimento mínimo definido por `PASSWORD_MIN_LENGTH`.

---

### 📝 Exemplo de Uso

```ts
const password = 'Exemplo@123'
const requirements = getPasswordRequirements(password)
requirements.forEach((req) => console.log(req.text, req.isValid))
```

---

## 🔍 Pontos-Chave

- Modularidade: cada requisito é validado separadamente.
- Feedback claro: cada requisito retorna se a senha é válida.
- Fácil integração com componentes de formulário e UI.

---

## 💡 Vantagens

- Segurança: garante que senhas atendam critérios mínimos.
- Usabilidade: permite mostrar visualmente quais critérios foram atendidos.
- Flexibilidade: fácil de ajustar requisitos ou adicionar novos tipos.

---

## 🛠️ Resumo

O utilitário `getPasswordRequirements` fornece uma maneira estruturada e reutilizável de validar senhas e gerar feedback, promovendo segurança e experiência de usuário consistente em aplicações web.

# Documentação de Testes para o Componente AuthCard (`auth-card.test.tsx`)

O arquivo `auth-card.test.tsx` define o esqueleto de testes para o componente `AuthCard` usando **Jest** e **Testing Library**.

---

## ☑️ Objetivo dos Testes

- Garantir que o componente **`AuthCard`** renderize corretamente.
- Servir como base para testes futuros de funcionalidades e interação do componente.

---

## 📦 Principais Importações

- `@testing-library/jest-dom`: Extensões para asserções de DOM do Jest.
- `describe` e `it` do Jest: Estrutura de agrupamento e definição de testes.

---

## ⚙️ Estrutura Inicial do Teste

```ts
describe('AuthCard', () => {
  it('should render a default AuthCard', () => {})
})
```

- `describe`: Agrupa os testes do componente `AuthCard`.
- `it`: Define um caso de teste específico (ainda não implementado).
- `TODO`: Implementar verificações de renderização, props e interações.

---

## 🔍 Pontos-Chave

- Estrutura inicial para garantir qualidade do componente.
- Preparado para testes futuros de UI, acessibilidade e eventos.
- Usa padrões do Jest e Testing Library.

---

## 💡 Vantagens

- Facilita a manutenção do componente ao longo do tempo.
- Ajuda a detectar regressões em atualizações futuras.
- Permite escrever testes unitários e de integração de forma organizada.

---

## 🛠️ Resumo

O arquivo de teste para `AuthCard` estabelece uma base inicial para validação do componente, pronta para implementação de verificações de renderização e interações, garantindo maior confiabilidade no desenvolvimento.
