import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const QUERY_PERIODS = {
  'last-year': 'No último ano',
  'last-month': 'No último mês',
  'last-week': 'Na última semana',
}
export type QueryPeriodType = keyof typeof QUERY_PERIODS

export const QUERY_PERIODS_OPTIONS = convertObjectToOptions(QUERY_PERIODS)
