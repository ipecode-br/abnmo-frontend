import { CheckCircle2Icon, CircleXIcon } from 'lucide-react'

import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const GENDERS = {
  male_cis: 'Homem (Cis)',
  female_cis: 'Mulher (Cis)',
  male_trans: 'Homem (Trans)',
  female_trans: 'Mulher (Trans)',
  non_binary: 'Bão binário',
  prefer_not_to_say: 'Prefiro não informar',
}
export type GenderType = keyof typeof GENDERS

export const PATIENT_STATUS = {
  active: 'Ativo',
  inactive: 'Inativo',
}
export type PatientStatusType = keyof typeof PATIENT_STATUS

export type PatientType = {
  id: string
  user_id: string
  gender: GenderType
  date_of_birth: Date
  phone: string
  status: PatientStatusType
  cpf: string
  state: string
  city: string
  has_disability: boolean
  disability_desc: string | null
  need_legal_assistance: boolean
  take_medication: boolean
  medication_desc: string | null
  has_nmo_diagnosis: boolean
  created_at: Date
  updated_at: Date
}

const PATIENT_STATUS_ICONS_AND_COLOR = {
  active: { icon: CheckCircle2Icon, color: '[&_svg]:text-success' },
  inactive: { icon: CircleXIcon, color: '[&_svg]:text-error' },
}
export const PATIENT_STATUS_OPTIONS = convertObjectToOptions(
  PATIENT_STATUS,
).map((option) => ({
  ...option,
  ...PATIENT_STATUS_ICONS_AND_COLOR[option.value as PatientStatusType],
}))

export const PATIENTS_ORDER = {
  name_asc: 'Nome (Crescente)',
  name_desc: 'Nome (Decrescente)',
  date_asc: 'Data (Crescente)',
  date_desc: 'Data (Decrescente)',
  email_asc: 'E-mail (Crescente)',
  email_desc: 'E-mail (Decrescente)',
}
export type PatientsOrderType = keyof typeof PATIENTS_ORDER
export const PATIENTS_ORDER_OPTIONS = convertObjectToOptions(PATIENTS_ORDER)
