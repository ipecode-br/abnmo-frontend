import { z } from 'zod'

import { YesOrNoTuple } from '@/constants/enums'

export const screeningMedicalReportFormSchema = z
  .object({
    hasDisability: z.enum(YesOrNoTuple, {
      message: 'Selecione uma opção acima',
    }),
    disabilityDescription: z
      .string()
      .optional()
      .transform((data) => data?.trim()),
    needLegalAssistance: z.enum(YesOrNoTuple, {
      message: 'Selecione uma opção acima',
    }),
    takeMedication: z.enum(YesOrNoTuple, {
      message: 'Selecione uma opção acima',
    }),
    medicationDescription: z
      .string()
      .optional()
      .transform((data) => data?.trim()),
    hasNmoDiagnosis: z.enum(YesOrNoTuple, {
      message: 'Selecione uma opção acima',
    }),
  })
  .refine(
    (data) => {
      if (data.hasDisability === 'yes' && !data.disabilityDescription) {
        return false
      }
      if (data.hasDisability === 'no') {
        data.disabilityDescription = undefined
      }
      return true
    },
    {
      path: ['disabilityDescription'],
      message: 'Descrição da deficiência é obrigatória',
    },
  )
  .refine(
    (data) => {
      if (data.takeMedication === 'yes' && !data.medicationDescription) {
        return false
      }
      if (data.takeMedication === 'no') {
        data.medicationDescription = undefined
      }
      return true
    },
    {
      path: ['medicationDescription'],
      message: 'Descrição do medicamento é obrigatória',
    },
  )

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
