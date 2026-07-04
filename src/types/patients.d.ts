import type {
  PatientGender,
  PatientRace,
  PatientStatus,
} from '@/enums/patients'
import type { BrazilState } from '@/enums/shared'

type SupportContact = {
  name: string
  kinship: string
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
  gender: PatientGender
  race: PatientRace
  maritalStatus: string
  addressCep: string
  addressState: BrazilState
  addressCity: string
  addressStreet: string
  addressNumber: string
  diagnosis: string
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
