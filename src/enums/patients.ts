import {
  AlertTriangleIcon,
  CircleCheckIcon,
  CircleXIcon,
  FlagIcon,
} from 'lucide-react'

import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const PATIENT_RACES = {
  white: 'Branca',
  black: 'Preta',
  yellow: 'Amarela',
  mixed_race: 'Parda',
  indigenous: 'Indígena',
  prefer_not_to_say: 'Prefiro não informar',
  other: 'Outro',
}
export type PatientRace = keyof typeof PATIENT_RACES

export const PATIENT_RACE_OPTIONS = convertObjectToOptions(PATIENT_RACES)

export const PATIENT_RACES_ENUM = Object.keys(PATIENT_RACES) as [PatientRace]

export const PATIENT_GENDERS = {
  male_cis: 'Homem (Cis)',
  female_cis: 'Mulher (Cis)',
  male_trans: 'Homem (Trans)',
  female_trans: 'Mulher (Trans)',
  non_binary: 'Não-binário',
  prefer_not_to_say: 'Prefiro não informar',
  other: 'Outro',
}
export type PatientGender = keyof typeof PATIENT_GENDERS

export const PATIENT_GENDER_OPTIONS = convertObjectToOptions(PATIENT_GENDERS)

export const PATIENT_GENDERS_ENUM = Object.keys(PATIENT_GENDERS) as [
  PatientGender,
]

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

export const PATIENT_NMO_DIAGNOSTICS = {
  anti_aqp4_positive: 'Anti-AQP4 positivo',
  anti_mog_positive: 'Anti-MOG positivo',
  both_negative: 'Negativo para ambos',
  no_diagnosis: 'Não',
} as const
export type PatientNmoDiagnostic = keyof typeof PATIENT_NMO_DIAGNOSTICS

export const PATIENT_NMO_DIAGNOSTIC_OPTIONS = convertObjectToOptions(
  PATIENT_NMO_DIAGNOSTICS,
)
export const PATIENT_NMO_DIAGNOSTICS_ENUM = Object.keys(
  PATIENT_NMO_DIAGNOSTICS,
) as [PatientCondition]

export const PATIENTS_ORDERS = {
  name_asc: 'Nome (Asc.)',
  name_desc: 'Nome (Desc.)',
  date_asc: 'Data (Asc.)',
  date_desc: 'Data (Desc.)',
  email_asc: 'E-mail (Asc.)',
  email_desc: 'E-mail (Desc.)',
}
export type PatientsOrder = keyof typeof PATIENTS_ORDERS

export const PATIENTS_ORDER_OPTIONS = convertObjectToOptions(PATIENTS_ORDERS)
