import { z } from 'zod'

import {
  citySchema,
  cpfSchema,
  dateOfBirthSchema,
  emailSchema,
  genderSchema,
  kinshipSchema,
  nameSchema,
  patientNmoDiagnosticSchema,
  phoneSchema,
  raceSchema,
  stateSchema,
  yesOrNoSchema,
} from '@/schemas'

export const patientFormSchema = z
  .object({
    name: nameSchema,
    date_of_birth: dateOfBirthSchema,
    cpf: cpfSchema,
    gender: genderSchema,
    race: raceSchema,
    state: stateSchema,
    city: citySchema,
    phone: phoneSchema,
    email: emailSchema,
    has_disability: yesOrNoSchema,
    disability_desc: z
      .string()
      .transform((data) => data.trim())
      .nullable(),
    need_legal_assistance: yesOrNoSchema,
    take_medication: yesOrNoSchema,
    medication_desc: z
      .string()
      .transform((data) => data.trim())
      .nullable(),
    nmo_diagnosis: patientNmoDiagnosticSchema,
    supports: z
      .array(
        z.object({
          name: nameSchema,
          kinship: kinshipSchema,
          phone: phoneSchema,
        }),
      )
      .min(1),
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

export type PatientFormSchema = z.infer<typeof patientFormSchema>
