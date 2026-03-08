import { z } from 'zod'

import { yesOrNoSchema } from '@/schemas'

export const screeningMedicalReportFormSchema = z
  .object({
    hasDisability: yesOrNoSchema,
    disabilityDesc: z
      .string()
      .transform((data) => data?.trim())
      .nullable(),
    needLegalAssistance: yesOrNoSchema,
    takeMedication: yesOrNoSchema,
    medicationDesc: z
      .string()
      .transform((data) => data?.trim())
      .nullable(),
    hasNmoDiagnosis: yesOrNoSchema,
  })
  .refine(
    (data) => {
      if (data.hasDisability === 'yes' && !data.disabilityDesc) {
        return false
      }
      if (data.hasDisability === 'no') {
        data.disabilityDesc = null
      }
      return true
    },
    {
      path: ['disabilityDesc'],
      message: 'Descrição da deficiência é obrigatória',
    },
  )
  .refine(
    (data) => {
      if (data.takeMedication === 'yes' && !data.medicationDesc) {
        return false
      }
      if (data.takeMedication === 'no') {
        data.medicationDesc = null
      }
      return true
    },
    {
      path: ['medicationDesc'],
      message: 'Descrição do medicamento é obrigatória',
    },
  )

export type ScreeningMedicalReportFormSchema = z.infer<
  typeof screeningMedicalReportFormSchema
>

export const screeningMedicalReportFormDefaultValues = {
  hasDisability: '',
  disabilityDesc: '',
  takeMedication: '',
  medicationDesc: '',
  hasNmoDiagnosis: '',
} as unknown as ScreeningMedicalReportFormSchema
