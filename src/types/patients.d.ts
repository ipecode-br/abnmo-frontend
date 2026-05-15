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
  avatarUrl: string | null
  gender: PatientGender
  race: PatientRace
  dateOfBirth: string
  phone: string
  status: PatientStatus
  cpf: string
  state: UF
  city: string
  hasDisability: boolean
  disabilityDesc: string | null
  needLegalAssistance: boolean
  takeMedication: boolean
  medicationDesc: string | null
  nmoDiagnosis: PatientNmoDiagnostic
  createdAt: string
  updatedAt: string
  supports?: PatientSupport[]
}

export type PatientListItem = Pick<
  Patient,
  'id' | 'name' | 'email' | 'phone' | 'avatarUrl' | 'status' | 'createdAt'
>

export type PatientDocument = {
  id: string
  name: string
  url: string
  createdAt: string
  size: string
}
