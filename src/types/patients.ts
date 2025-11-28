import {
  AlertTriangleIcon,
  CircleCheckIcon,
  CircleXIcon,
  FlagIcon,
} from 'lucide-react'

import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

import { PatientSupport } from './patient-support'

export type Patient = {
  id: string
  user_id: string
  gender: Gender
  date_of_birth: string
  phone: string
  status: PatientStatus
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
  supports?: PatientSupport[]
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
export type Gender = keyof typeof GENDERS

export const GENDER_OPTIONS = convertObjectToOptions(GENDERS)

export const PATIENT_STATUSES = {
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
export type PatientStatus = keyof typeof PATIENT_STATUSES

export const PATIENT_STATUS_OPTIONS = Object.entries(PATIENT_STATUSES).map(
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

export const PATIENTS_ORDERS = {
  name_asc: 'Nome (Crescente)',
  name_desc: 'Nome (Decrescente)',
  date_asc: 'Data (Crescente)',
  date_desc: 'Data (Decrescente)',
  email_asc: 'E-mail (Crescente)',
  email_desc: 'E-mail (Decrescente)',
}
export type PatientsOrder = keyof typeof PATIENTS_ORDERS

export const PATIENTS_ORDER_OPTIONS = convertObjectToOptions(PATIENTS_ORDERS)

export type PatientDocument = {
  id: string
  name: string
  url: string
  created_at: string
  size: string
}
