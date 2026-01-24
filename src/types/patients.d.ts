import type { PatientGender, PatientStatus } from '@/enums/patients'

import type { PatientSupport } from './patient-support'

export type Patient = {
  id: string
  user_id: string
  gender: PatientGender
  date_of_birth: string
  phone: string
  status: PatientStatus
  cpf: string
  state: string
  city: string
  has_disability: boolean
  disability_desc: string | null
  need_legal_assistance: boolean
  take_medication: boolean
  medication_desc: string | null
  has_nmo_diagnosis: boolean
  created_at: string
  updated_at: string
  name: string
  email: string
  avatar_url: string | null
  supports?: PatientSupport[]
}

export type PatientDocument = {
  id: string
  name: string
  url: string
  created_at: string
  size: string
}
