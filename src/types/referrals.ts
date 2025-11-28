import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

import type { PatientCondition } from './patients'

export type Referral = {
  id: string
  patient_id: string
  date: string
  category: ReferralCategory
  condition: PatientCondition
  annotation: string | null
  status: string
  referred_to: string | null
  referred_by: string | null
  created_at: string
  updated_at: string
  patient: {
    id: string
    name: string
    avatar_url: string | null
  }
}

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

export const REFERRAL_CATEGORIES = {
  medical_care: 'Medicina',
  legal: 'Jurídico',
  nursing: 'Enfermagem',
  psychology: 'Psicologia',
  nutrition: 'Nutrição',
  physical_training: 'Preparação Física',
  social_work: 'Serviço Social',
  psychiatry: 'Psiquiatria',
  neurology: 'Neurologia',
  ophthalmology: 'Oftalmologia',
} as const
export type ReferralCategory = keyof typeof REFERRAL_CATEGORIES

export const REFERRAL_CATEGORY_OPTIONS =
  convertObjectToOptions(REFERRAL_CATEGORIES)

export const REFERRAL_CATEGORY_ENUM = Object.keys(REFERRAL_CATEGORIES) as [
  ReferralCategory,
]
