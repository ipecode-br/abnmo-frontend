import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const REFERRAL_STATUSES = {
  scheduled: 'Agendado',
  canceled: 'Cancelado',
  completed: 'Concluído',
  no_show: 'Não compareceu',
} as const
export type ReferralStatus = keyof typeof REFERRAL_STATUSES

export const REFERRAL_STATUS_OPTIONS = convertObjectToOptions(REFERRAL_STATUSES)

export const REFERRAL_STATUS_ENUM = Object.keys(REFERRAL_STATUSES) as [
  ReferralStatus,
]
