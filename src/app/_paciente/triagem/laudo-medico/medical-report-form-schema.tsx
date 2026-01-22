import { z } from 'zod'

import { yesOrNoSchema } from '@/schemas'

export const screeningMedicalReportFormSchema = z
  .object({
    has_disability: yesOrNoSchema,
    disability_desc: z
      .string()
      .transform((data) => data?.trim())
      .nullable(),
    need_legal_assistance: yesOrNoSchema,
    take_medication: yesOrNoSchema,
    medication_desc: z
      .string()
      .transform((data) => data?.trim())
      .nullable(),
    has_nmo_diagnosis: yesOrNoSchema,
  })
  .refine(
    (data) => {
      if (data.has_disability === 'yes' && !data.disability_desc) {
        return false
      }
      if (data.has_disability === 'no') {
        data.disability_desc = null
      }
      return true
    },
    {
      path: ['disability_desc'],
      message: 'Descrição da deficiência é obrigatória',
    },
  )
  .refine(
    (data) => {
      if (data.take_medication === 'yes' && !data.medication_desc) {
        return false
      }
      if (data.take_medication === 'no') {
        data.medication_desc = null
      }
      return true
    },
    {
      path: ['medication_desc'],
      message: 'Descrição do medicamento é obrigatória',
    },
  )

export type ScreeningMedicalReportFormSchema = z.infer<
  typeof screeningMedicalReportFormSchema
>

export const screeningMedicalReportFormDefaultValues = {
  has_disability: '',
  disability_desc: '',
  take_medication: '',
  medication_desc: '',
  has_nmo_diagnosis: '',
} as unknown as ScreeningMedicalReportFormSchema
