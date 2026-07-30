# Constantes

O diretório `src/constants/` centraliza valores estáticos compartilhados.

## Arquivos

### `routes.ts`

Define todas as rotas em um objeto estruturado:

```ts
ROUTES.auth.signIn // '/entrar'
ROUTES.auth.signUp // '/cadastrar'
ROUTES.auth.forgotPassword // '/recuperar-senha'
ROUTES.auth.resetPassword // '/nova-senha'
ROUTES.main // '/'
ROUTES.dashboard.patients.main // '/pacientes'
```

### `cookies.ts`

Nomes de cookies usados na aplicação (ex.: `COOKIES.session`).

### `cache.ts`

Chaves de cache para Next.js (`revalidateTag`) e TanStack Query (`queryKey`).

### `regex.ts`

Expressões regulares para validação: `CPF_REGEX`, `PASSWORD_REGEX`, `NAME_REGEX`, `PHONE_REGEX`, `NON_SPECIAL_CHAR_REGEX`, etc.

### `auth.ts`

Constantes de autenticação como `PASSWORD_MIN_LENGTH`.

### `charts.ts`

Configurações e cores para gráficos Recharts.

### `breadcrumbs/`

Configuração de breadcrumbs por área (dashboard, patient).

### `cities/`

Lista de cidades brasileiras por estado (arquivos JSON em `cities/json/`).

### `section-tabs.ts` / `section-titles.ts`

Configurações de abas e títulos das seções do dashboard.

### `images.ts`

Caminhos de imagens estáticas (ícone, logo, etc.).
