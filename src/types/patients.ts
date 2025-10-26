import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  CircleXIcon,
  FlagIcon,
} from 'lucide-react'

import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

import { PatientSupportType } from './patient-support'

export type PatientType = {
  id: string
  user_id: string
  gender: GenderType
  date_of_birth: string
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
  created_at: string
  updated_at: string
  name: string
  email: string
  avatar_url: string | null
  supports?: PatientSupportType[]
}

export const GENDERS = {
  male_cis: 'Homem (Cis)',
  female_cis: 'Mulher (Cis)',
  male_trans: 'Homem (Trans)',
  female_trans: 'Mulher (Trans)',
  non_binary: 'Não-binário',
  prefer_not_to_say: 'Prefiro não informar',
  other: 'Outro',
}
export type GenderType = keyof typeof GENDERS
export const GENDERS_OPTIONS = convertObjectToOptions(GENDERS)

export const PATIENT_STATUS = {
  active: 'Ativo',
  inactive: 'Inativo',
}
export type PatientStatusType = keyof typeof PATIENT_STATUS

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

export const PATIENT_CONDITIONS = {
  outbreak: 'Em surto',
  stable: 'Estável',
} as const
export type PatientConditionType = keyof typeof PATIENT_CONDITIONS

export const PATIENT_CONDITION_ICONS_AND_COLOR = {
  outbreak: {
    icon: AlertTriangleIcon,
    tagClassName: 'bg-warning/10 text-warning border-none',
    iconClassName: 'fill-warning text-white',
  },
  stable: {
    icon: FlagIcon,
    tagClassName: 'bg-foreground-soft/5 border-none',
    iconClassName: 'fill-foreground-soft',
  },
}
