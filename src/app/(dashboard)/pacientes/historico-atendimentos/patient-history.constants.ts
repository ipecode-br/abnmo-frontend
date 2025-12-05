import {
  PatientHistoryCategory,
  PatientHistoryStatus,
} from './patient-history.types'

export const PATIENT_HISTORY_CATEGORY_LABELS: Record<
  PatientHistoryCategory,
  string
> = {
  medicine: 'Medicina',
  lawyer: 'Advogado',
  nurse: 'Enfermeiro',
  psychologist: 'Psicólogo',
  nutritionist: 'Nutricionista',
  physical_trainer: 'Preparador físico',
  social_service: 'Serviço-social',
  psychiatry: 'Psiquiatria',
  neurologist: 'Neurologista',
  ophthalmologist: 'Oftalmologista',
}

export const PATIENT_HISTORY_STATUS_LABELS: Record<
  PatientHistoryStatus,
  string
> = {
  stable: 'Estável',
  crisis: 'Em surto',
}

export const PATIENT_HISTORY_ORDER_OPTIONS = [
  { value: 'date_desc', label: 'Data (mais recente)' },
  { value: 'date_asc', label: 'Data (mais antiga)' },
  { value: 'status_asc', label: 'Quadro (A → Z)' },
  { value: 'status_desc', label: 'Quadro (Z → A)' },
]
