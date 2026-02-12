import type {
  PatientGender,
  PatientNmoDiagnostic,
  PatientRace,
  PatientStatus,
} from '@/enums/patients'
import type { UF } from '@/enums/shared'

import type { PatientSupport } from './patient-support'

export type Patient = {
  id: string
  name: string
  email: string
  avatar_url: string | null
  gender: PatientGender
  race: PatientRace
  date_of_birth: string
  phone: string
  status: PatientStatus
  cpf: string
  state: UF
  city: string
  has_disability: boolean
  disability_desc: string | null
  need_legal_assistance: boolean
  take_medication: boolean
  medication_desc: string | null
  nmo_diagnosis: PatientNmoDiagnostic
  created_at: string
  updated_at: string
  supports?: PatientSupport[]
}

export type PatientDocument = {
  id: string
  name: string
  url: string
  created_at: string
  size: string
}
