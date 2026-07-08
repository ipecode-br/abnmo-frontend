import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

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
export const BRAZIL_STATE_OPTIONS = convertObjectToOptions(BRAZIL_STATES)
export const BRAZIL_STATES_ENUM = Object.keys(BRAZIL_STATES) as [BrazilState]

export const MONTHS = {
  0: 'Janeiro',
  1: 'Fevereiro',
  2: 'Março',
  3: 'Abril',
  4: 'Maio',
  5: 'Junho',
  6: 'Julho',
  7: 'Agosto',
  8: 'Setembro',
  9: 'Outubro',
  10: 'Novembro',
  11: 'Dezembro',
}
export const MONTHS_OPTIONS = convertObjectToOptions(MONTHS)

export const YES_OR_NO = { yes: 'Sim', no: 'Não' } as const
export const YES_OR_NO_OPTIONS = convertObjectToOptions(YES_OR_NO)
export const YES_OR_NO_ENUM = Object.keys(YES_OR_NO) as ['yes', 'no']

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

export const GENDERS = {
  male_cis: 'Homem (Cis)',
  female_cis: 'Mulher (Cis)',
  male_trans: 'Homem (Trans)',
  female_trans: 'Mulher (Trans)',
  non_binary: 'Não-binário',
  prefer_not_to_say: 'Prefiro não informar',
  other: 'Outro',
}
export type Gender = keyof typeof GENDERS
export const GENDER_OPTIONS = convertObjectToOptions(GENDERS)
export const GENDERS_ENUM = Object.keys(GENDERS) as [Gender]

export const RACES = {
  yellow: 'Amarela',
  white: 'Branca',
  indigenous: 'Indígena',
  mixed_race: 'Parda',
  black: 'Preta',
  prefer_not_to_say: 'Prefiro não informar',
}
export type Race = keyof typeof RACES
export const RACE_OPTIONS = convertObjectToOptions(RACES)
export const RACES_ENUM = Object.keys(RACES) as [Race]

export const MARITAL_STATUSES = {
  single: 'Solteiro(a)',
  stable_union: 'União estável',
  married: 'Casado(a)',
  divorced: 'Divorciado(a)',
  widowed: 'Viúvo(a)',
}
export type MaritalStatus = keyof typeof MARITAL_STATUSES

export const KINSHIP_TYPES = {
  grandparent: 'Avô/Avó',
  spouse: 'Esposo(a)',
  children: 'Filho(a)',
  sibling: 'Irmã(o)',
  parent: 'Pai/Mãe',
  cousin: 'Primo(a)',
  nephew_niece: 'Sobrinho(a)',
  uncle_aunt: 'Tio(a)',
  other: 'Outro',
}
export type KinshipType = keyof typeof KINSHIP_TYPES

export const TIME_UNITS = {
  days: 'Dia(s)',
  weeks: 'Semana(s)',
  years: 'Ano(s)',
}
export type TimeUnit = keyof typeof TIME_UNITS
