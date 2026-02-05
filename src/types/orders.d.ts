export type QueryOrderMapping<T extends string> = Record<
  T,
  { orderBy: string; order: string }
>

export type QueryOrder = 'ASC' | 'DESC'

export type AppointmentsOrderBy =
  | 'date'
  | 'patient'
  | 'status'
  | 'category'
  | 'condition'
  | 'professional'
