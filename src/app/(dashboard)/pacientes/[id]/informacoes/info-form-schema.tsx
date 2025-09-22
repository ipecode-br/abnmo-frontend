import { z } from 'zod'

import {
  CPF_REGEX,
  NAME_REGEX,
  NON_SPECIAL_CHAR_REGEX,
  PHONE_REGEX,
} from '@/constants/regex'

export const patientsInfoFormSchema = z.object({
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
  date_of_birth: z.string().date(),
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
  email: z.string().email('Insira um e-mail válido'),
  has_disability: z.enum(['yes', 'no']),
  disability_desc: z.string().optional(),
  need_legal_assistance: z.enum(['yes', 'no']),
  take_medication: z.enum(['yes', 'no']),
  medication_desc: z.string().optional(),
  has_nmo_diagnosis: z.enum(['yes', 'no']),
  supports: z
    .array(
      z.object({
        name: z.string().nonempty('Informe o nome do contato de apoio'),
        kinship: z.string().nonempty('Informe o grau de parentesco'),
        phone: z
          .string()
          .nonempty('Informe o telefone do contato de apoio')
          .regex(PHONE_REGEX, 'Insira um número de telefone válido'),
      }),
    )
    .optional(),
})

export type PatientsInfoFormSchema = z.infer<typeof patientsInfoFormSchema>
