import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export type PatientRequirement = {
  id: string
  type: PatientRequirementType
  status: PatientRequirementStatus
  description: string | null
  submitted_at: string | null
  approved_at: string | null
  created_at: string
  patient: {
    id: string
    name: string
    avatar_url: string | null
  }
}

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

export const PATIENT_REQUIREMENT_STATUSES = {
  pending: 'Pendente',
  under_review: 'Em análise',
  approved: 'Aprovado',
  declined: 'Recusado',
}
export type PatientRequirementStatus = keyof typeof PATIENT_REQUIREMENT_STATUSES

export const PATIENT_REQUIREMENT_TYPES = {
  screening: 'Triagem',
  medical_report: 'Laudo',
}
export type PatientRequirementType = keyof typeof PATIENT_REQUIREMENT_TYPES

export const PATIENT_REQUIREMENT_TYPE_OPTIONS = convertObjectToOptions(
  PATIENT_REQUIREMENT_TYPES,
)
export const PATIENT_REQUIREMENT_TYPE_ENUM = Object.keys(
  PATIENT_REQUIREMENT_TYPES,
) as [PatientRequirementType]
