export const QUERY_PARAM_KEYS = {
  page: 'page',
  search: 'search',
  order: 'order',
  orderBy: 'orderBy',
  status: 'status',
  category: 'category',
  startDate: 'startDate',
  endDate: 'endDate',
} as const

export type QueryParamKey =
  (typeof QUERY_PARAM_KEYS)[keyof typeof QUERY_PARAM_KEYS]
