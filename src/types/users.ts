import { CheckCircle2Icon, CircleXIcon } from 'lucide-react'

import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

import type { PatientType } from './patients'

export type UserType = {
  id: string
  name: string
  email: string
  role: 'admin' | 'nurse' | 'specialist' | 'manager' | 'patient'
  avatar_url: string | null
  created_at: Date
  updated_at: Date
  patient: PatientType | null
}

export const USER_ROLES = {
  admin: 'Administração',
  nurse: 'Enfermagem',
  specialist: 'Especialista',
  manager: 'Manager',
  patient: 'Paciente',
}

export const USER_STATUS = {
  active: 'Ativo',
  inactive: 'Inativo',
}
export type PatientStatusType = keyof typeof USER_STATUS

const PATIENT_STATUS_ICONS_AND_COLOR = {
  active: { icon: CheckCircle2Icon, color: '[&_svg]:text-success' },
  inactive: { icon: CircleXIcon, color: '[&_svg]:text-error' },
}
export const PATIENT_STATUS_OPTIONS = convertObjectToOptions(USER_STATUS).map(
  (option) => ({
    ...option,
    ...PATIENT_STATUS_ICONS_AND_COLOR[option.value as PatientStatusType],
  }),
)
