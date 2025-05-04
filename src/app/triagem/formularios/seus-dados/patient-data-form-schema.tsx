import { z } from 'zod'

import {
  CPF_REGEX,
  NAME_REGEX,
  NON_SPECIAL_CHAR_REGEX,
  PHONE_REGEX,
} from '@/constants/regex'

export const patientDataFormSchema = z.object({
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
  dateBirth: z.string().refine(
    (d) => {
      const date = new Date(d)
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
    .refine((c) => c.trim(), { message: 'Informe a sua cidade' }),
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

export type PatientDataFormSchema = z.infer<typeof patientDataFormSchema>

export const patientDataFormDefaultValues: PatientDataFormSchema = {
  name: '',
  gender: '',
  dateBirth: '',
  city: '',
  state: '',
  phone: '',
  cpf: '',
}
