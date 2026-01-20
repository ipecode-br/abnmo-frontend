import type { Patient } from './patients'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  avatar_url: string | null
  created_at: Date
  updated_at: Date
  patient: Patient | null
}

export const USER_ROLES = {
  admin: 'Administração',
  nurse: 'Enfermagem',
  specialist: 'Especialista',
  manager: 'Manager',
  patient: 'Paciente',
}
export type UserRole = keyof typeof USER_ROLES

export const USER_STATUS = {
  active: 'Ativo',
  inactive: 'Inativo',
}
export type UserStatus = keyof typeof USER_STATUS
