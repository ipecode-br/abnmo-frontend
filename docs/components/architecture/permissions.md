# Sistema de Permissões

## 1. Introdução

O sistema de permissões define quais ações cada **Role** (função) pode executar sobre determinados **Subjects** (entidades) dentro da aplicação.

O modelo utiliza **Zod** para validação de tipos e uma função utilitária para checar permissões de forma segura.

---

## 2. Schemas

### Role

Define os tipos de usuário existentes.

```ts
export const roleSchema = z.union([
  z.literal('admin'),
  z.literal('nurse'),
  z.literal('specialist'),
  z.literal('manager'),
  z.literal('patient'),
])
export type Role = z.infer<typeof roleSchema>
```

### Action

Define as ações que podem ser executadas.

```ts
export const actionSchema = z.union([
  z.literal('manage'),
  z.literal('view'),
  z.literal('create'),
  z.literal('update'),
  z.literal('delete'),
])
export type Action = z.infer<typeof actionSchema>
```

### Subject

Define os recursos ou entidades que podem ser manipulados.

```ts
export const subjectSchema = z.union([
  z.literal('all'),
  z.literal('Dashboard'),
  z.literal('PatientDashboard'),
  z.literal('Patients'),
  z.literal('Appointments'),
  z.literal('Statistics'),
  z.literal('Users'),
])
export type Subject = z.infer<typeof subjectSchema>
```

---

## 3. Permissões por Role

```ts
export const permissions: RolePermissions = {
  admin: [{ action: 'manage', subject: 'all' }],
  manager: [
    {
      action: ['view', 'manage'],
      subject: ['Appointments', 'Dashboard', 'Patients', 'Statistics', 'Users'],
    },
  ],
  nurse: [
    {
      action: ['view', 'manage'],
      subject: ['Appointments', 'Dashboard', 'Patients', 'Statistics'],
    },
  ],
  specialist: [
    {
      action: ['view', 'update'],
      subject: ['Appointments', 'Dashboard', 'Patients'],
    },
  ],
  patient: [
    {
      action: ['view', 'manage'],
      subject: ['Appointments', 'PatientDashboard'],
    },
  ],
}
```

### Descrição das Roles

- **admin**: acesso total (`manage` em `all`).
- **manager**: pode visualizar e gerenciar `Appointments`, `Dashboard`, `Patients`, `Statistics` e `Users`.
- **nurse**: pode visualizar e gerenciar `Appointments`, `Dashboard`, `Patients` e `Statistics`.
- **specialist**: pode visualizar e atualizar `Appointments`, `Dashboard` e `Patients`.
- **patient**: pode visualizar e gerenciar seus próprios `Appointments` e acessar `PatientDashboard`.

---

## 4. Função de Verificação de Permissões

A função `definePermissionsFor` retorna um objeto com o método `can`, que verifica se uma determinada Role possui permissão para executar uma ação sobre um subject.

```ts
export function definePermissionsFor(role: Role) {
  const rolePermissions = permissions[role] ?? []

  function can(action: Action, subject: Subject): boolean {
    return rolePermissions.some((permission) => {
      const actions = Array.isArray(permission.action)
        ? permission.action
        : [permission.action]
      const subjects = Array.isArray(permission.subject)
        ? permission.subject
        : [permission.subject]

      const matchesAction =
        actions.includes(action) || actions.includes('manage')
      const matchesSubject =
        subjects.includes(subject) || subjects.includes('all')

      return matchesAction && matchesSubject
    })
  }

  return { can }
}
```

### Exemplo de Uso

```ts
const { can } = definePermissionsFor('manager')

console.log(can('view', 'Dashboard')) // true
console.log(can('delete', 'Users')) // true
console.log(can('update', 'PatientDashboard')) // false
```

---

## 5. Considerações

- A permissão `manage` funciona como uma permissão global, permitindo qualquer ação dentro de um subject.
- O subject `all` concede acesso a todas as entidades.
- O sistema é extensível: novas roles, actions ou subjects podem ser adicionados conforme necessidade.
