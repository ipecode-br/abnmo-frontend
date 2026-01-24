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
