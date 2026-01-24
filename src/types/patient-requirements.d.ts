import type {
  PatientRequirementStatus,
  PatientRequirementType,
} from '@/enums/patient-requirements'

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
