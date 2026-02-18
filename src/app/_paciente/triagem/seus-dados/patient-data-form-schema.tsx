import { z } from 'zod'

import {
  citySchema,
  cpfSchema,
  dateOfBirthSchema,
  genderSchema,
  nameSchema,
  phoneSchema,
  stateSchema,
} from '@/schemas'

export const screeningPatientDataFormSchema = z.object({
  name: nameSchema,
  gender: genderSchema,
  date_of_birth: dateOfBirthSchema,
  state: stateSchema,
  city: citySchema,
  phone: phoneSchema,
  cpf: cpfSchema,
})

export type ScreeningPatientDataFormSchema = z.infer<
  typeof screeningPatientDataFormSchema
>
