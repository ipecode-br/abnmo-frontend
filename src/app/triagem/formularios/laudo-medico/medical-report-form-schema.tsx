import { z } from 'zod'

import { yesOrNoEnum } from '@/constants/yes-no-enums'

export const screeningMedicalReportFormSchema = z
  .object({
    hasDisability: z.enum([yesOrNoEnum.YES, yesOrNoEnum.NO], {
      message: 'Selecione uma opção acima',
    }),
    disabilityDescription: z.string().optional(),
    needLegalAssistance: z.enum([yesOrNoEnum.YES, yesOrNoEnum.NO], {
      message: 'Selecione uma opção acima',
    }),
    takeMedication: z.enum([yesOrNoEnum.YES, yesOrNoEnum.NO], {
      message: 'Selecione uma opção acima',
    }),
    medicationDescription: z.string().optional(),
    hasNmoDiagnosis: z.enum([yesOrNoEnum.YES, yesOrNoEnum.NO], {
      message: 'Selecione uma opção acima',
    }),
  })
  .refine(
    (data) =>
      data.hasDisability === yesOrNoEnum.NO ||
      (data.disabilityDescription && data.disabilityDescription.trim() !== ''),
    {
      path: ['disabilityDescription'],
      message: 'Descrição da deficiência é obrigatória',
    },
  )
  .refine(
    (data) =>
      data.takeMedication === yesOrNoEnum.NO ||
      (data.medicationDescription && data.medicationDescription.trim() !== ''),
    {
      path: ['medicationDescription'],
      message: 'Descrição do medicamento é obrigatória',
    },
  )
  .transform((data) => ({
    ...data,
    disabilityDescription:
      data.hasDisability === yesOrNoEnum.NO
        ? undefined
        : data.disabilityDescription,
    medicationDescription:
      data.takeMedication === yesOrNoEnum.NO
        ? undefined
        : data.medicationDescription,
  }))

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
