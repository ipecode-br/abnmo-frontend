import { z } from 'zod'

import { DOCUMENTS_TUPLE } from '@/constants/documents'
import { UF_LIST, YES_OR_NO_TUPLE } from '@/constants/enums'
import {
  CPF_REGEX,
  NAME_REGEX,
  NON_SPECIAL_CHAR_REGEX,
  PHONE_REGEX,
} from '@/constants/regex'

export const nameSchema = z
  .string()
  .min(1, 'Insira o nome completo')
  .min(3, 'O nome deve conter mais de 3 caracteres')
  .regex(NON_SPECIAL_CHAR_REGEX, 'Números e caracteres especiais são inválidos')
  .regex(NAME_REGEX, 'Informe o nome e sobrenome')

export const emailSchema = z.string().email('Insira um e-mail válido')

export const phoneSchema = z
  .string()
  .nonempty('Informe o telefone')
  .regex(PHONE_REGEX, 'Insira um número de telefone válido')

export const genderSchema = z.string().nonempty('Informe o gênero')

export const dateOfBirthSchema = z
  .string()
  .datetime('Informe uma data válida')
  .refine(
    (value) => {
      const date = new Date(value)
      return date >= new Date('1900-01-01') && date <= new Date()
    },
    { message: 'Informe uma data válida' },
  )

export const stateSchema = z
  .string()
  .nonempty('Informe o estado')
  .refine((value) => value in UF_LIST, {
    message: 'Selecione um estado válido',
  })

export const citySchema = z
  .string()
  .nonempty('Informe a cidade')
  .refine((input) => input.trim(), { message: 'Informe a cidade' })

export const cpfSchema = z
  .string()
  .nonempty('Informe o CPF')
  .regex(CPF_REGEX, 'Informe um CPF válido')

export const kinshipSchema = z
  .string()
  .min(1, 'Insira o parentesco')
  .min(3, 'O parentesco deve conter mais de 3 caracteres')
  .regex(NON_SPECIAL_CHAR_REGEX, 'Números e caracteres especiais são inválidos')

export const yesOrNoSchema = z.enum(YES_OR_NO_TUPLE, {
  message: 'Selecione "Sim" ou "Não"',
})

export const documentTypeSchema = z.enum(DOCUMENTS_TUPLE, {
  message: 'Selecione um tipo de documento válido',
})
