import {
  AlertTriangleIcon,
  CircleCheckIcon,
  CircleXIcon,
  FlagIcon,
} from 'lucide-react'

import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

import { PatientSupportType } from './patient-support'

export type Patient = {
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
  active: {
    variant: 'success',
    label: 'Ativo',
    icon: CircleCheckIcon,
    color: '[&_svg]:text-success',
  },
  inactive: {
    variant: 'error',
    label: 'Inativo',
    icon: CircleXIcon,
    color: '[&_svg]:text-error',
  },
} as const
export type PatientStatusType = keyof typeof PATIENT_STATUS

export const PATIENT_STATUS_OPTIONS = Object.entries(PATIENT_STATUS).map(
  ([key, status]) => ({
    label: status.label,
    value: key,
    icon: status.icon,
    color: status.color,
  }),
)

export const PATIENT_CONDITIONS = {
  in_crisis: {
    variant: 'warning',
    label: 'Em surto',
    icon: AlertTriangleIcon,
  },
  stable: {
    variant: 'info',
    label: 'Estável',
    icon: FlagIcon,
  },
} as const
export type PatientCondition = keyof typeof PATIENT_CONDITIONS

export const PATIENT_CONDITION_OPTIONS = Object.entries(PATIENT_CONDITIONS).map(
  ([key, status]) => ({ label: status.label, value: key }),
)
export const PATIENT_CONDITION_ENUM = Object.keys(PATIENT_CONDITIONS) as [
  PatientCondition,
]

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
