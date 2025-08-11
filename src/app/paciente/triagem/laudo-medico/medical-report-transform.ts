import type { ScreeningMedicalReportFormSchema } from './medical-report-form-schema'

export function transformMedicalReportFormData(
  formData: ScreeningMedicalReportFormSchema,
) {
  return {
    has_disability: formData.hasDisability === 'yes',
    disability_desc: formData.disabilityDescription ?? null,
    has_nmo_diagnosis: formData.hasNmoDiagnosis === 'yes',
    medication_desc: formData.medicationDescription ?? null,
    need_legal_assistance: formData.needLegalAssistance === 'yes',
    take_medication: formData.takeMedication === 'yes',
  }
}
