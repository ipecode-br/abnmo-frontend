export const PATIENT_STATUS = {
  active: 'Ativo',
  inactive: 'Inativo',
}
export type PatientStatusType = keyof typeof PATIENT_STATUS

export const PATIENTS_ORDER = {
  name_asc: 'Nome (Crescente)',
  name_desc: 'Nome (Decrescente)',
  date_asc: 'Data (Crescente)',
  date_desc: 'Data (Decrescente)',
  email_asc: 'E-mail (Crescente)',
  email_desc: 'E-mail (Decrescente)',
}
export type PatientsOrderType = keyof typeof PATIENTS_ORDER
