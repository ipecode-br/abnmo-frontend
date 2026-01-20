import { z } from 'zod'

import {
  citySchema,
  cpfSchema,
  dateOfBirthSchema,
  emailSchema,
  genderSchema,
  kinshipSchema,
  nameSchema,
  phoneSchema,
  stateSchema,
  yesOrNoSchema,
} from '@/schemas'

export const patientsFormSchema = z
  .object({
    name: nameSchema,
    date_of_birth: dateOfBirthSchema,
    cpf: cpfSchema,
    gender: genderSchema,
    state: stateSchema,
    city: citySchema,
    phone: phoneSchema,
    email: emailSchema,
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
    supports: z
      .array(
        z.object({
          name: nameSchema,
          kinship: kinshipSchema,
          phone: phoneSchema,
        }),
      )
      .optional(),
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

export type PatientsFormSchema = z.infer<typeof patientsFormSchema>
