import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const APPOINTMENT_STATUSES = {
  scheduled: { variant: 'outlined', label: 'Agendado' },
  canceled: { variant: 'error', label: 'Cancelado' },
  completed: { variant: 'success', label: 'Concluído' },
  no_show: { variant: 'info', label: 'Não compareceu' },
} as const
export type AppointmentStatus = keyof typeof APPOINTMENT_STATUSES

export const APPOINTMENT_STATUS_ENUM = Object.keys(APPOINTMENT_STATUSES) as [
  AppointmentStatus,
]

export const APPOINTMENT_STATUS_OPTIONS = Object.entries(
  APPOINTMENT_STATUSES,
).map(([key, status]) => ({ label: status.label, value: key }))

export const APPOINTMENTS_ORDER = {
  name_asc: 'Nome (Asc.)',
  name_desc: 'Nome (Desc.)',
  date_asc: 'Data (Asc.)',
  date_desc: 'Data (Desc.)',
  status_asc: 'Status (Asc.)',
  status_desc: 'Status (Desc.)',
  category_asc: 'Categoria (Asc.)',
  category_desc: 'Categoria (Desc.)',
  condition_asc: 'Quadro geral (Asc.)',
  condition_desc: 'Quadro geral (Desc.)',
  professional_asc: 'Profissional (Asc.)',
  professional_desc: 'Profissional (Desc.)',
}
export type AppointmentsOrder = keyof typeof APPOINTMENTS_ORDER

export const APPOINTMENTS_ORDER_OPTIONS =
  convertObjectToOptions(APPOINTMENTS_ORDER)
