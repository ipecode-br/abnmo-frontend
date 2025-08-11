import type { ScreeningPatientDataFormSchema } from './patient-data-form-schema'

export function transformPatientFormData(
  formData: ScreeningPatientDataFormSchema,
) {
  return {
    name: formData.name,
    cpf: formData.cpf.replace(/\D/g, ''),
    phone: formData.phone.replace(/\D/g, ''),
    date_of_birth: new Date(formData.dateBirth),
    gender: formData.gender,
    state: formData.state,
    city: formData.city,
  }
}
