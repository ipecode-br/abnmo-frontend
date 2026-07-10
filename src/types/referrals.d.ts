import type { PatientCondition } from '@/enums/patients'
import type { ReferralStatus } from '@/enums/referrals'
import type { Specialty } from '@/enums/shared'

export type Referral = {
  id: string
  date: string
  status: ReferralStatus
  category: Specialty
  condition: PatientCondition
  annotation: string | null
  professionalName: string | null
  createdAt: string
  updatedAt: string
  patient: {
    id: string
    name: string
    email: string
    avatarUrl: string | null
  }
  specialist: {
    id: string
    name: string
    email: string
    avatarUrl: string | null
  }
}
