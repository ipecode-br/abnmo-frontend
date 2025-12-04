export type PatientHistoryStatus = 'stable' | 'crisis'

export type PatientHistoryCategory =
  | 'medicine'
  | 'lawyer'
  | 'nurse'
  | 'psychologist'
  | 'nutritionist'
  | 'physical_trainer'
  | 'social_service'
  | 'psychiatry'
  | 'neurologist'
  | 'ophthalmologist'

export interface PatientHistory {
  id: string
  date: string
  professional_name?: string | null
  category: PatientHistoryCategory
  status: PatientHistoryStatus
  observations: string
}

export type PatientHistoryOrder =
  | 'date_asc'
  | 'date_desc'
  | 'status_asc'
  | 'status_desc'
