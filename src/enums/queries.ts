import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const QUERY_PERIODS = {
  today: 'Hoje',
  'last-week': 'Última semana',
  'last-month': 'Último mês',
  'last-year': 'Último ano',
}
export type QueryPeriod = keyof typeof QUERY_PERIODS

export const QUERY_PERIODS_OPTIONS = convertObjectToOptions(QUERY_PERIODS)
