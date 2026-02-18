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

export const getPatientFormSchema = (mode: 'create' | 'edit' | 'view') =>
  z
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
        .optional(),
    })
    .superRefine((data, ctx) => {
      if (mode === 'create') {
        if (!data.supports || data.supports.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['supports'],
            message: 'Informe ao menos um contato da rede de apoio',
          })
        }
      }

      if (data.has_disability === 'yes' && !data.disability_desc) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['disability_desc'],
          message: 'Descrição da deficiência é obrigatória',
        })
      }
      if (data.has_disability === 'no') {
        data.disability_desc = null
      }

      if (data.take_medication === 'yes' && !data.medication_desc) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['medication_desc'],
          message: 'Descrição do medicamento é obrigatória',
        })
      }
      if (data.take_medication === 'no') {
        data.medication_desc = null
      }
    })
