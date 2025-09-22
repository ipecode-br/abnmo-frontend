import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const MEMBERS_ORDER = {
  name_asc: 'Nome (Crescente)',
  name_desc: 'Nome (Decrescente)',
  date_asc: 'Data (Crescente)',
  date_desc: 'Data (Decrescente)',
  role_asc: 'Função (Crescente)',
  role_desc: 'Função (Decrescente)',
  specialty_desc: 'Especialidade (Decrescente)',
  specialty_asc: 'Especialidade (Crescente)',
}
export type MembersOrderType = keyof typeof MEMBERS_ORDER
export const MEMBERS_ORDER_OPTIONS = convertObjectToOptions(MEMBERS_ORDER)
