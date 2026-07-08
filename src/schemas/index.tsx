import { z } from 'zod'

import { PASSWORD_MIN_LENGTH } from '@/constants/auth'
import {
  CPF_REGEX,
  NAME_REGEX,
  NON_SPECIAL_CHAR_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
} from '@/constants/regex'
import {
  PATIENT_CONDITION_ENUM,
  PATIENT_NMO_DIAGNOSTICS_ENUM,
} from '@/enums/patients'
import {
  BRAZIL_STATES_ENUM,
  GENDERS_ENUM,
  RACES_ENUM,
  SPECIALTIES_ENUM,
  YES_OR_NO_ENUM,
} from '@/enums/shared'
import { USERS_ROLE_ENUM } from '@/enums/users'

export function getNullableStringSchema(maxLength = 5000) {
  return z
    .string()
    .max(maxLength)
    .nullable()
    .transform((value) => {
      const trimmedValue = value?.trim()
      return !!trimmedValue ? trimmedValue : null
    })
}

export const specialtySchema = z.enum(SPECIALTIES_ENUM, {
  message: 'Categoria é obrigatória',
})

export const patientConditionSchema = z.enum(PATIENT_CONDITION_ENUM, {
  message: 'O quadro é obrigatório',
})

export const professionalNameSchema = getNullableStringSchema()

// TODO: review outdated or unused schemas below

export const nameSchema = z
  .string()
  .trim()
  .min(1, 'Insira o nome completo')
  .min(3, 'O nome deve conter mais de 3 caracteres')
  .regex(NON_SPECIAL_CHAR_REGEX, 'Números e caracteres especiais são inválidos')
  .regex(NAME_REGEX, 'Informe o nome e sobrenome')

export const emailSchema = z.string().email('Insira um e-mail válido')

export const passwordSchema = z
  .string()
  .trim()
  .min(1, 'Insira sua senha')
  .min(
    PASSWORD_MIN_LENGTH,
    `Sua senha precisa conter ${PASSWORD_MIN_LENGTH} ou mais caracteres`,
  )
  .regex(PASSWORD_REGEX, 'Senha inválida')

export const avatarSchema = z.string().url()

export const userRoleSchema = z.enum(USERS_ROLE_ENUM)

export const userRegistrationId = z.string().trim().max(32)

export const phoneSchema = z
  .string()
  .nonempty('Insira o telefone')
  .regex(PHONE_REGEX, 'Insira um número de telefone válido')

export const genderSchema = z.enum(GENDERS_ENUM, {
  message: 'Selecione um gênero',
})

export const raceSchema = z.enum(RACES_ENUM, {
  message: 'Selecione uma raça ou cor',
})

export const dateOfBirthSchema = z
  .string()
  .datetime('Insira uma data válida')
  .refine(
    (value) => {
      const date = new Date(value)
      return date >= new Date('1900-01-01') && date <= new Date()
    },
    { message: 'Insira uma data válida' },
  )

export const stateSchema = z.enum(BRAZIL_STATES_ENUM, {
  message: 'Selecione o estado',
})

export const citySchema = z
  .string()
  .nonempty('Selecione a cidade')
  .refine((value) => value, { message: 'Selecione a cidade' })

export const cpfSchema = z
  .string()
  .nonempty('Insira o CPF')
  .regex(CPF_REGEX, 'Insira um CPF válido')

export const kinshipSchema = z
  .string()
  .trim()
  .min(1, 'Insira o parentesco')
  .min(3, 'O parentesco deve conter mais de 3 caracteres')
  .regex(NON_SPECIAL_CHAR_REGEX, 'Números e caracteres especiais são inválidos')

export const yesOrNoSchema = z.enum(YES_OR_NO_ENUM, {
  message: 'Selecione "Sim" ou "Não"',
})

export const dateSchema = z.string().datetime('A data é obrigatória')

export const patientNmoDiagnosticSchema = z.enum(PATIENT_NMO_DIAGNOSTICS_ENUM, {
  message: 'Este campo é obrigatório',
})
