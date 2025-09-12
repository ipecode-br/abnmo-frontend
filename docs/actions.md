# Auth

O `canUser` é uma função responsável por controlar permissões de acesso dentro da aplicação. Ele garante que, a partir do papel (role) do usuário obtido do token de autenticação, seja possível validar se esse usuário pode ou não executar determinada ação ( `"manage"` | `"view"` | `"create"` | `"update" `| `"delete"`) em recurso específico ( `"all"` | `"Dashboard`" | `"PatientDashboard"` | `"Patients"` | `"Appointments"` | `"Statistics" `| `"Users"`).

**Localização:** **[actions/auth.ts](../../abnmo-frontend/src/actions/auth.ts)**

### Como usar

```ts
// Checa se o usuário pode visualizar o dashboard de paciente.
const canAccess = await canUser('view', 'PatientDashboard')

// Se não puder, a aplicação faz o redirect automático
if (!canAccess) {
  redirect(ROUTES.dashboard.main)
}
```

---

# Cache

Função que recebe uma ou várias tags e força a **revalidação** do cache associado a elas.

**Localização:** **[actions/cache.ts](../../abnmo-frontend/src/actions/cache.ts)**

## Como usar

```ts
// Revalida o cache associado a essa tag
revalidateCache('string-que-representa-o-cache')
```

---

# Cookies

Funções responsáveis por recuperar cookies e seus valores.

**Localização:** **[actions/cookies.ts](../../abnmo-frontend/src/actions/cookies.ts)**

### Como usar

```ts
// Retorna todos os cookies com nome e valor.
const cookies = await getAllCookies()
console.log(cookies)
```

```ts
// Retorna apenas o valor de um cookie específico.
const cookie = await getCookie('cookie')
console.log(cookie)
```

---

# Ibge

Função que busca a lista de cidades de um estado (`UF`) usando a API do IBGE e retorna um array de strings com os nomes das cidades.

- Caso a API não retorne dados válidos para o UF passado, a função retorna null.

**Localização:** **[actions/ibge.ts](../../abnmo-frontend/src/actions/ibge.ts)**

### Como usar

```ts
const cities = await getCitiesByUF(UF)
console.log(cities)
```

---

# Token

Função que busca dados do token de autenticação armazenado no cookie `access_token` e retorna informações do usuário ( `userId`, `userRole`).

- Se não houver token de acesso, retorna null.

**Localização:** **[actions/token.ts](../../abnmo-frontend/src/actions/token.ts)**

### Como usar

```ts
const data = await getDataFromToken()
console.log(data)
```

---

# Users

Função que busca os dados do perfil do usuário autenticado a partir do token de acesso.

- Se não houver `userId` no token, retorna null.

**Localização:** **[actions/users.ts](../../abnmo-frontend/src/actions/users.ts)**

## Como usar

```ts
const user = await getProfile()
console.log(user)
```
