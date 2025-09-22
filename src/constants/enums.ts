import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const YES_OR_NO = {
  yes: 'Sim',
  no: 'Não',
} as const
export const YES_OR_NO_TUPLE = Object.keys(YES_OR_NO) as ['yes', 'no']

export const BRAZILIAN_STATES = {
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
}
export const BRAZILIAN_STATES_OPTIONS = convertObjectToOptions(BRAZILIAN_STATES)
