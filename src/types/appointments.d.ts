import type { AppointmentStatus } from '@/enums/appointments'
import type { PatientCondition } from '@/enums/patients'
import type { Specialty } from '@/enums/shared'

export type Appointment = {
  id: string
  date: string
  status: AppointmentStatus
  category: Specialty
  condition: PatientCondition
  annotation: string | null
  professionalName: string | null
  updatedAt: string
  createdAt: string
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
