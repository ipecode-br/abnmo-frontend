import { z } from 'zod'

import { PASSWORD_MIN_LENGTH } from '@/constants/auth'
import {
  NAME_REGEX,
  NON_SPECIAL_CHAR_REGEX,
  PASSWORD_REGEX,
} from '@/constants/regex'

export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Insira seu nome completo')
      .min(3, 'O nome deve conter mais de 3 caracteres')
      .regex(
        NON_SPECIAL_CHAR_REGEX,
        'Números e caracteres especiais são inválidos',
      )
      .regex(NAME_REGEX, 'Insira seu nome e sobrenome'),
    email: z.string().email('Insira um e-mail válido'),
    password: z
      .string()
      .min(1, 'Insira sua senha')
      .min(
        PASSWORD_MIN_LENGTH,
        `Sua senha precisa conter ${PASSWORD_MIN_LENGTH} ou mais caracteres`,
      )
      .regex(PASSWORD_REGEX, 'Senha inválida'),
    confirmPassword: z.string(),
    consent: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Suas senhas não coincidem',
    path: ['confirmPassword'],
  })
  .refine((data) => data.consent === true, {
    message: 'Seu consentimento é obrigatório',
    path: ['consent'],
  })

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>

export const signUpFormDefaultValues: SignUpFormSchema = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  consent: false,
}
