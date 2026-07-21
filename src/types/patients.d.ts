import type { PatientStatus } from '@/enums/patients'
import type {
  BrazilState,
  Gender,
  Kinship,
  MaritalStatus,
  Race,
} from '@/enums/shared'
import { Diagnosis } from '@/enums/surveys'

type SupportContact = {
  name: string
  kinship: Kinship
  phone: string
}

export type Patient = {
  id: string
  name: string
  email: string
  phone: string
  cpf: string
  susId: string
  status: PatientStatus
  avatarUrl: string | null
  updatedAt: string
  createdAt: string
  supportContacts: SupportContact[]
  dateOfBirth: string
  gender: Gender
  race: Race
  maritalStatus: MaritalStatus
  addressCep: string
  addressState: BrazilState
  addressCity: string
  addressStreet: string
  addressNumber: string
  diagnosis: Diagnosis
  nmoMedications: []
  generalMedications: []
  hasVisualAlteration: boolean
  usesVisualCane: boolean
  usesWheelchair: boolean
  hasMotorSequelae: boolean
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
