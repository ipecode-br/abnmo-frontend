import { z } from 'zod'

/*
  TODO:

  - refactor to reuse enums

  - if hasDisability === true, disabilityDescription should be filled in
  - if hasDisability === false, disabilityDescription should save as undefined

  - if takeMedication === true, medicationDescription should be filled in
  - if takeMedication === false, medicationDescription should save as undefined
*/

export const screeningMedicalReportFormSchema = z.object({
  hasDisability: z.enum(['yes', 'no'], {
    message: 'Selecione uma opção acima',
  }),
  disabilityDescription: z.string().optional(),
  needLegalAssistance: z.enum(['yes', 'no'], {
    message: 'Selecione uma opção acima',
  }),
  takeMedication: z.enum(['yes', 'no'], {
    message: 'Selecione uma opção acima',
  }),
  medicationDescription: z.string().optional(),
  hasNmoDiagnosis: z.enum(['yes', 'no'], {
    message: 'Selecione uma opção acima',
  }),
})

export type ScreeningMedicalReportFormSchema = z.infer<
  typeof screeningMedicalReportFormSchema
>

export const screeningMedicalReportFormDefaultValues = {
  hasDisability: '',
  disabilityDescription: '',
  takeMedication: '',
  medicationDescription: '',
  hasNmoDiagnosis: '',
} as unknown as ScreeningMedicalReportFormSchema
