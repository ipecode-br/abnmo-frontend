import {
  AlertTriangleIcon,
  CircleCheckIcon,
  CircleXIcon,
  FlagIcon,
} from 'lucide-react'

import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

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
  pending: {
    variant: 'default',
    label: 'Pendente',
    icon: AlertTriangleIcon,
    color: '[&_svg]:text-warning',
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

export const PATIENT_APPOINTMENTS_ORDER = {
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
export type PatientAppointmentsOrder = keyof typeof PATIENT_APPOINTMENTS_ORDER

export const PATIENT_APPOINTMENTS_ORDER_OPTIONS = convertObjectToOptions(
  PATIENT_APPOINTMENTS_ORDER,
)

export const PATIENT_REFERRALS_ORDER = {
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
export type PatientReferralsOrder = keyof typeof PATIENT_REFERRALS_ORDER

export const PATIENT_REFERRALS_ORDER_OPTIONS = convertObjectToOptions(
  PATIENT_REFERRALS_ORDER,
)
