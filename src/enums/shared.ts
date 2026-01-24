import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const SPECIALTIES = {
  medical_care: 'Medicina',
  legal: 'Jurídico',
  nursing: 'Enfermagem',
  psychology: 'Psicologia',
  nutrition: 'Nutrição',
  physical_training: 'Preparação Física',
  social_work: 'Serviço Social',
  psychiatry: 'Psiquiatria',
  neurology: 'Neurologia',
  ophthalmology: 'Oftalmologia',
} as const
export type Specialty = keyof typeof SPECIALTIES

export const SPECIALTIES_OPTIONS = convertObjectToOptions(SPECIALTIES)

export const SPECIALTIES_ENUM = Object.keys(SPECIALTIES) as [Specialty]
