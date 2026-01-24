import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const APPOINTMENT_STATUSES = {
  scheduled: 'Agendado',
  canceled: 'Cancelado',
  completed: 'Concluído',
  no_show: 'Não compareceu',
} as const
export type AppointmentStatus = keyof typeof APPOINTMENT_STATUSES

export const APPOINTMENT_STATUS_OPTIONS =
  convertObjectToOptions(APPOINTMENT_STATUSES)

export const APPOINTMENT_STATUS_ENUM = Object.keys(APPOINTMENT_STATUSES) as [
  AppointmentStatus,
]
