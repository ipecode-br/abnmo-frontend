import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const INVITES_ORDERS = {
  email_asc: 'Email (Asc.)',
  email_desc: 'Email (Desc.)',
  date_asc: 'Data (Asc.)',
  date_desc: 'Data (Desc.)',
}
export type InvitesOrder = keyof typeof INVITES_ORDERS
export const INVITES_ORDER_OPTIONS = convertObjectToOptions(INVITES_ORDERS)
