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

export const BRAZIL_STATES = {
  AC: 'Acre',
  AP: 'Amapá',
  AL: 'Alagoas',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
} as const
export type BrazilState = keyof typeof BRAZIL_STATES
export const BRAZIL_STATES_OPTIONS = convertObjectToOptions(BRAZIL_STATES)
export const BRAZIL_STATES_ENUM = Object.keys(BRAZIL_STATES) as [BrazilState]

export const YES_OR_NO = {
  yes: 'Sim',
  no: 'Não',
} as const
export const YES_OR_NO_TUPLE = Object.keys(YES_OR_NO) as ['yes', 'no']
export const YES_OR_NO_OPTIONS = convertObjectToOptions(YES_OR_NO)
