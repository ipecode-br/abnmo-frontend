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
  PATIENT_GENDERS_ENUM,
  PATIENT_NMO_DIAGNOSTICS_ENUM,
  PATIENT_RACES_ENUM,
} from '@/enums/patients'
import {
  BRAZILIAN_STATES_ENUM,
  SPECIALTIES_ENUM,
  YES_OR_NO_TUPLE,
} from '@/enums/shared'
import { USERS_ROLE_ENUM } from '@/enums/users'

export const nameSchema = z
  .string()
  .min(1, 'Insira o nome completo')
  .min(3, 'O nome deve conter mais de 3 caracteres')
  .regex(NON_SPECIAL_CHAR_REGEX, 'Números e caracteres especiais são inválidos')
  .regex(NAME_REGEX, 'Informe o nome e sobrenome')

export const emailSchema = z.string().email('Insira um e-mail válido')

export const passwordSchema = z
  .string()
  .min(1, 'Insira sua senha')
  .min(
    PASSWORD_MIN_LENGTH,
    `Sua senha precisa conter ${PASSWORD_MIN_LENGTH} ou mais caracteres`,
  )
  .regex(PASSWORD_REGEX, 'Senha inválida')

export const avatarSchema = z.string().url()

export const userRoleSchema = z.enum(USERS_ROLE_ENUM)

export const phoneSchema = z
  .string()
  .nonempty('Insira o telefone')
  .regex(PHONE_REGEX, 'Insira um número de telefone válido')

export const genderSchema = z.enum(PATIENT_GENDERS_ENUM, {
  message: 'Selecione um gênero',
})

export const raceSchema = z.enum(PATIENT_RACES_ENUM, {
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

export const stateSchema = z.enum(BRAZILIAN_STATES_ENUM, {
  message: 'Selecione o estado',
})

export const citySchema = z
  .string()
  .nonempty('Selecione a cidade')
  .refine((input) => input.trim(), { message: 'Selecione a cidade' })

export const cpfSchema = z
  .string()
  .nonempty('Insira o CPF')
  .regex(CPF_REGEX, 'Insira um CPF válido')

export const kinshipSchema = z
  .string()
  .min(1, 'Insira o parentesco')
  .min(3, 'O parentesco deve conter mais de 3 caracteres')
  .regex(NON_SPECIAL_CHAR_REGEX, 'Números e caracteres especiais são inválidos')

export const yesOrNoSchema = z.enum(YES_OR_NO_TUPLE, {
  message: 'Selecione "Sim" ou "Não"',
})

export const dateSchema = z.string().datetime('A data é obrigatória')

export const specialtySchema = z.enum(SPECIALTIES_ENUM, {
  message: 'Categoria é obrigatório',
})

export const patientConditionSchema = z.enum(PATIENT_CONDITION_ENUM, {
  message: 'O quadro é obrigatório',
})

export const patientNmoDiagnosticSchema = z.enum(PATIENT_NMO_DIAGNOSTICS_ENUM, {
  message: 'Este campo é obrigatório',
})

export const professionalNameSchema = z
  .string()
  .nullable()
  .transform((value) => (!value ? null : value))
