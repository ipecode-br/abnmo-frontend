import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const PATIENT_REQUIREMENTS_ORDERS = {
  name_asc: 'Nome (Crescente)',
  name_desc: 'Nome (Decrescente)',
  date_asc: 'Data (Crescente)',
  date_desc: 'Data (Decrescente)',
  type_asc: 'Tipo (Crescente)',
  type_desc: 'Tipo (Decrescente)',
}
export type PatientRequirementsOrder = keyof typeof PATIENT_REQUIREMENTS_ORDERS
export const PATIENT_REQUIREMENTS_ORDER_OPTIONS = convertObjectToOptions(
  PATIENT_REQUIREMENTS_ORDERS,
)

export const PATIENT_REQUIREMENT_STATUS = {
  pending: 'Pendente',
  under_review: 'Em análise',
  approved: 'Aprovado',
  declined: 'Recusado',
}
export type PatientRequirementStatus = keyof typeof PATIENT_REQUIREMENT_STATUS

export const PATIENT_REQUIREMENT_TYPES = {
  screening: 'Triagem',
  medical_report: 'Laudo',
}
export type PatientRequirementsType = keyof typeof PATIENT_REQUIREMENT_TYPES

export type PatientRequirement = {
  id: string
  type: PatientRequirementsType
  status: PatientRequirementStatus
  description: string | null
  submitted_at: string
  approved_at: string
  created_at: string
  patient: {
    id: string
    name: string
    avatar_url: string | null
  }
}
