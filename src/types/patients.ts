import { CheckCircle2Icon, CircleXIcon } from 'lucide-react'

import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

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
