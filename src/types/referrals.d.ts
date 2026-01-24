import type { ReferralStatus } from '@/enums/referrals'
import type { Specialty } from '@/enums/shared'

import type { PatientCondition } from './patients'

export type Referral = {
  id: string
  patient_id: string
  date: string
  status: ReferralStatus
  category: Specialty
  condition: PatientCondition
  annotation: string | null
  professional_name: string | null
  created_at: string
  updated_at: string
  patient: {
    id: string
    name: string
    avatar_url: string | null
  }
}
