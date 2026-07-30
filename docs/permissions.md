# Sistema de Permissões

O sistema de permissões usa o modelo de **Features** — cada funcionalidade do sistema é representada por uma string no formato `action:resource:scope`.

## Como funciona

### Formato

```
action:resource:scope
```

- **action**: `read`, `create`, `update`, `delete`, `activate`, `deactivate`, `cancel`, `review`
- **resource**: `survey`, `patient`, `user`, `user-invite`, `appointment`, `referral`, `statistic`
- **scope**: (opcional) `others` — ignora verificação de ownership

### Exemplos

| Feature                  | Significado                        |
| ------------------------ | ---------------------------------- |
| `read:patient:others`    | Ver todos os pacientes             |
| `create:appointment`     | Criar atendimentos próprios        |
| `update:user:others`     | Atualizar dados de qualquer membro |
| `cancel:survey:others`   | Cancelar qualquer catalogação      |
| `read:statistic:patient` | Ver estatísticas de pacientes      |

## Regras

- **Admin**: acesso total a todas as features (bypass)
- **Ownership**: sem o sufixo `:others`, o usuário só pode agir sobre recursos próprios (compara `user.id` com `compareToId`)
- **Múltiplas features**: passa um array — basta uma dar match (OR)

## Grupos de features

Definidos em `src/enums/features.ts`:

| Grupo         | Features                                                   |
| ------------- | ---------------------------------------------------------- |
| `survey`      | `read`, `review`, `update`, `cancel` (todas com `:others`) |
| `patient`     | `read:others`, `update:others`, `activate`, `deactivate`   |
| `user`        | `read:others`, `update:others`, `activate`, `deactivate`   |
| `user-invite` | `create`, `read`, `delete`                                 |
| `appointment` | `create`, `read`, `update`, `cancel` (com/sem `:others`)   |
| `referral`    | `create`, `read`, `update`, `cancel` (com/sem `:others`)   |
| `statistic`   | `read` geral + `patient`, `appointment`, `referral`        |

## Uso no código

### Server Action

```ts
// src/actions/auth/can-user.ts
const canViewAllPatients = await canUser('read:patient:others')
const canUpdateAppointment = await canUser('update:appointment', appointmentId)
```

### Client-side (via Zustand store)

```ts
// src/store/permissions.ts
const can = usePermissionsStore((s) => s.can)
can('create:appointment')
can(['read:statistic:patient', 'read:statistic'])
```

### Core

```ts
// src/lib/can.ts
can(user, 'read:patient:others')
can(user, ['create:appointment', 'update:appointment'], targetId)
```

## Provider

O `PermissionsProvider` (`src/providers/permissions-provider.tsx`) inicializa a store de permissões com o usuário autenticado no layout do dashboard.
