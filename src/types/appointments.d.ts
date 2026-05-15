import type { AppointmentStatus } from '@/enums/appointments'
import type { PatientCondition } from '@/enums/patients'
import type { Specialty } from '@/enums/shared'

export type Appointment = {
  id: string
  patientId: string
  date: string
  status: AppointmentStatus
  category: Specialty
  condition: PatientCondition
  annotation: string | null
  professionalName: string | null
  createdAt: string
  updatedAt: string
  patient: {
    id: string
    name: string
    avatarUrl: string | null
  }
}
