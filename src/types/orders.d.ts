export type QueryOrderMapping<
  T extends string,
  OrderByType extends string,
> = Record<T, { orderBy: OrderByType; order: QueryOrder }>

export type QueryOrder = 'ASC' | 'DESC'

export type PatientsOrderBy = 'name' | 'email' | 'status' | 'date'

export type AppointmentsOrderBy =
  | 'date'
  | 'patient'
  | 'status'
  | 'category'
  | 'condition'
  | 'professional'

export type PatientRequirementsOrderBy =
  | 'patient'
  | 'status'
  | 'type'
  | 'date'
  | 'approved_at'
  | 'submitted_at'
