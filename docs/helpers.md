# ConvertObjectToOptions

Função que recebe um objeto ou enum e transforma cada par chave/valor em um array de opções no formato `{ value, label }`.

**Localização:** **[helpers/convert-object-to-options.ts](../../abnmo-frontend/src/helpers/convert-object-to-options.ts)**

### Como usar

```ts
const states = { MG: 'Minas Gerais', SP: 'São Paulo' }
console.log(options)
// [
//   { value: "MG", label: "Minas Gerais" },
//   { value: "SP", label: "São Paulo" }
// ]
```

```ts
const booleanOptions = {
  yes: 'Sim',
  no: 'Não',
}
const options = convertObjectToOptions(booleanOptions)
console.log(options)
// [
//   { value: "yes", label: "Sim" },
//   { value: "no", label: "Não" }
// ]
```

---

# LocalStorage

Funções responsáveis por `salvar`, `buscar` e `remover` dados no **localStorage** do navegador.

**Localização:** **[helpers/local-storage.ts](../../abnmo-frontend/src/helpers/local-storage.ts)**

### Como usar

`Salvar`

```ts
// Salva um valor sob a chave passada.
setStorageItem('user', { name: 'John Doe', email: 'johndoe@example.com' })
```

`Buscar`

```ts
// Retorna o valor armazenado ou null se não existir ou ocorrer erro ao parsear.
getStorageItem('user')
```

`Remover`

```ts
// Remove um item
removeStorageItem('user')
// ou remove múltiplos items
removeStorageItem(['user', 'token'])
```

---

# Auth

## getPasswordRequirements

Função que valida uma senha contra regras de segurança e retorna um array indicando quais foram atendidas.

- `type` → o tipo da regra
- `text` → a mensagem para mostrar pro usuário
- `isValid` → se a senha cumpre a regra (true/false)

**Localização:** **[helpers/auth/get-password-requirement.ts](../../abnmo-frontend/src/helpers/auth/get-password-requirement.ts)**

### Como usar

```ts
const password = 'Abc123!'
const requirements = getPasswordRequirements(password)
console.log(requirements)

// [
//    { type: 'uppercase', text: 'Pelo menos 1 letra maiúscula', isValid: true },
//    { type: 'lowercase', text: 'Pelo menos 1 letra minúscula', isValid: true },
//    { type: 'number', text: 'Pelo menos 1 número', isValid: true },
//    { type: 'special_char', text: 'Pelo menos 1 caractere especial', isValid: true },
//    { type: 'length', text: 'Pelo menos 8 caracteres', isValid: false }
// ]
```
