import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const TEAMS_ORDER = {
  name_asc: 'Nome (Crescente)',
  name_desc: 'Nome (Decrescente)',
  date_asc: 'Data (Crescente)',
  date_desc: 'Data (Decrescente)',
  role_asc: 'Função (Crescente)',
  role_desc: 'Função (Decrescente)',
  specialty_desc: 'Especialidade (Decrescente)',
  specialty_asc: 'Especialidade (Crescente)',
}
export type TeamsOrderType = keyof typeof TEAMS_ORDER
export const TEAMS_ORDER_OPTIONS = convertObjectToOptions(TEAMS_ORDER)
