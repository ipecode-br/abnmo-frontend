import type {
  PatientRequirementStatus,
  PatientRequirementType,
} from '@/enums/patient-requirements'

export type PatientRequirement = {
  id: string
  type: PatientRequirementType
  status: PatientRequirementStatus
  description: string | null
  submittedAt: string | null
  approvedAt: string | null
  createdAt: string
  patient: {
    id: string
    name: string
    avatarUrl: string | null
  }
}
