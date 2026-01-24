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

export const REFERRALS_ORDER = {
  name_asc: 'Nome (Crescente)',
  name_desc: 'Nome (Decrescente)',
  date_asc: 'Data (Crescente)',
  date_desc: 'Data (Decrescente)',
  condition_asc: 'Em surto (Crescente)',
  condition_desc: 'Estável (Decrescente)',
}
export type ReferralsOrder = keyof typeof REFERRALS_ORDER

export const REFERRALS_ORDER_OPTIONS = convertObjectToOptions(REFERRALS_ORDER)
