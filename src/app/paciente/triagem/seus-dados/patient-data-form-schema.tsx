import { z } from 'zod'

import {
  CPF_REGEX,
  NAME_REGEX,
  NON_SPECIAL_CHAR_REGEX,
  PHONE_REGEX,
} from '@/constants/regex'

export const screeningPatientDataFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Insira seu nome completo')
    .min(3, 'O nome deve conter mais de 3 caracteres')
    .regex(
      NON_SPECIAL_CHAR_REGEX,
      'Números e caracteres especiais são inválidos',
    )
    .regex(NAME_REGEX, 'Insira seu nome e sobrenome'),
  gender: z.string().nonempty('Informe seu gênero'),
  dateOfBirth: z.string().refine(
    (input) => {
      const date = new Date(input)
      return date >= new Date('1900-01-01') && date <= new Date()
    },
    {
      message: 'Informe uma data válida',
    },
  ),
  city: z
    .string()
    .nonempty('Informe a sua cidade')
    .regex(
      NON_SPECIAL_CHAR_REGEX,
      'A cidade não pode conter números ou caracteres especiais',
    )
    .refine((input) => input.trim(), { message: 'Informe a sua cidade' }),
  state: z.string().nonempty('Informe o seu estado'),
  phone: z
    .string()
    .nonempty('Informe o seu telefone')
    .regex(PHONE_REGEX, 'Insira um número de telefone válido'),
  cpf: z
    .string()
    .nonempty('Informe o seu CPF')
    .regex(CPF_REGEX, 'Informe um CPF válido'),
})

export type ScreeningPatientDataFormSchema = z.infer<
  typeof screeningPatientDataFormSchema
>

export const screeningPatientDataFormDefaultValues: ScreeningPatientDataFormSchema =
  {
    name: '',
    gender: '',
    dateOfBirth: '',
    city: '',
    state: '',
    phone: '',
    cpf: '',
  }
