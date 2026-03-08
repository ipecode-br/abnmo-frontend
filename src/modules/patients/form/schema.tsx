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
      dateOfBirth: dateOfBirthSchema,
      cpf: cpfSchema,
      gender: genderSchema,
      race: raceSchema,
      state: stateSchema,
      city: citySchema,
      phone: phoneSchema,
      email: emailSchema,
      hasDisability: yesOrNoSchema,
      disabilityDesc: z
        .string()
        .transform((data) => data.trim())
        .nullable(),
      needLegalAssistance: yesOrNoSchema,
      takeMedication: yesOrNoSchema,
      medicationDesc: z
        .string()
        .transform((data) => data.trim())
        .nullable(),
      nmoDiagnosis: patientNmoDiagnosticSchema,
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

      if (data.hasDisability === 'yes' && !data.disabilityDesc) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['disabilityDesc'],
          message: 'Descrição da deficiência é obrigatória',
        })
      }
      if (data.hasDisability === 'no') {
        data.disabilityDesc = null
      }

      if (data.takeMedication === 'yes' && !data.medicationDesc) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['medicationDesc'],
          message: 'Descrição do medicamento é obrigatória',
        })
      }
      if (data.takeMedication === 'no') {
        data.medicationDesc = null
      }
    })
