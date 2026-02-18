import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const USER_ROLES = {
  admin: 'Administração',
  nurse: 'Enfermagem',
  specialist: 'Especialista',
  manager: 'Gestão',
}
export type UserRole = keyof typeof USER_ROLES
export const USERS_ROLE_OPTIONS = convertObjectToOptions(USER_ROLES)
export const USERS_ROLE_ENUM = Object.keys(USER_ROLES) as [UserRole]

export const USER_STATUSES = {
  active: { variant: 'success', label: 'Ativo' },
  inactive: { variant: 'error', label: 'Inativo' },
} as const
export type UserStatus = keyof typeof USER_STATUSES

export const USER_STATUS_OPTIONS = Object.entries(USER_STATUSES).map(
  ([key, status]) => ({ label: status.label, value: key }),
)

export const USERS_ORDERS = {
  name_asc: 'Nome (Asc.)',
  name_desc: 'Nome (Desc.)',
  date_asc: 'Data (Asc.)',
  date_desc: 'Data (Desc.)',
  role_asc: 'Cargo (Asc.)',
  role_desc: 'Cargo (Desc.)',
  status_desc: 'Status (Desc.)',
  status_asc: 'Status (Asc.)',
}
export type UsersOrder = keyof typeof USERS_ORDERS
export const USERS_ORDER_OPTIONS = convertObjectToOptions(USERS_ORDERS)
