import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const REFERRAL_STATUSES = {
  scheduled: { variant: 'outlined', label: 'Agendado' },
  canceled: { variant: 'error', label: 'Cancelado' },
  completed: { variant: 'success', label: 'Concluído' },
  no_show: { variant: 'info', label: 'Não compareceu' },
} as const
export type ReferralStatus = keyof typeof REFERRAL_STATUSES

export const REFERRAL_STATUS_ENUM = Object.keys(REFERRAL_STATUSES) as [
  ReferralStatus,
]

export const REFERRAL_STATUS_OPTIONS = Object.entries(REFERRAL_STATUSES).map(
  ([key, status]) => ({ label: status.label, value: key }),
)

export const REFERRALS_ORDER = {
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
export type ReferralsOrder = keyof typeof REFERRALS_ORDER

export const REFERRALS_ORDER_OPTIONS = convertObjectToOptions(REFERRALS_ORDER)
