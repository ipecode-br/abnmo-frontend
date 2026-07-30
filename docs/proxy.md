# Proxy (Proteção de Rotas)

O `src/proxy.ts` é o middleware de proteção de rotas do Next.js 16. Ele verifica o cookie de sessão e redireciona conforme necessário.

## Funcionamento

```ts
export async function proxy(request: NextRequest) {
  const session = request.cookies.get(COOKIES.session)
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  // Usuário logado tentando acessar rota de auth → redireciona para dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL(ROUTES.main, request.url))
  }

  // Usuário não logado em rota protegida → redireciona para login
  if (!isAuthRoute && !session) {
    return NextResponse.redirect(new URL(ROUTES.auth.signIn, request.url))
  }

  return NextResponse.next()
}
```

## Configuração

O `matcher` exclui arquivos estáticos e rotas de API:

```
'/((?!api|images|404|_next/static|_next/image|icon.png|sitemap.xml|robots.txt|favicon.ico).*)'
```

## Rotas de autenticação

Definidas via `ROUTES.auth` em `src/constants/routes.ts`:

| Rota               | Constante                    |
| ------------------ | ---------------------------- |
| `/entrar`          | `ROUTES.auth.signIn`         |
| `/cadastrar`       | `ROUTES.auth.signUp`         |
| `/recuperar-senha` | `ROUTES.auth.forgotPassword` |
| `/nova-senha`      | `ROUTES.auth.resetPassword`  |

## Cookies

O nome do cookie de sessão é definido em `COOKIES.session` (`src/constants/cookies.ts`).

## Comparação com middleware tradicional

Diferente do `middleware.ts` do Next.js, o proxy do Next.js 16:

- É exportado como função nomeada `proxy` (não `middleware`)
- Usa `export const config` com `matcher` em vez de exportar `config` do arquivo
- É carregado automaticamente pelo framework a partir de `src/proxy.ts`
