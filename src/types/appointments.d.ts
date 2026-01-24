import type { AppointmentStatus } from '@/enums/appointments'
import type { Specialty } from '@/enums/shared'

import type { PatientCondition } from './patients'

export type Appointment = {
  id: string
  patient_id: string
  date: string
  status: AppointmentStatus
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
