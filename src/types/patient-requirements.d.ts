import type {
  PatientRequirementStatus,
  PatientRequirementType,
} from '@/enums/patient-requirements'

export type PatientRequirement = {
  id: string
  type: PatientRequirementType
  title: string
  description: string | null
  status: PatientRequirementStatus
  submittedAt: string | null
  createdAt: string
  patient: {
    id: string
    name: string
  }
}
