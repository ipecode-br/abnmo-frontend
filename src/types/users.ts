export type User = {
  id: string
  name: string
  email: string
  avatar_url: string | null
  status: UserStatus
  role: UserRole
  updated_at: Date
  created_at: Date
}

export const USER_ROLES = {
  admin: 'Administração',
  nurse: 'Enfermagem',
  specialist: 'Especialista',
  manager: 'Manager',
}
export type UserRole = keyof typeof USER_ROLES

export const USER_STATUSES = {
  active: 'Ativo',
  inactive: 'Inativo',
}
export type UserStatus = keyof typeof USER_STATUSES
