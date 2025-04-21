import { z } from 'zod'

import { PASSWORD_MIN_LENGTH } from '@/constants/auth'
import { PASSWORD_REGEX } from '@/constants/regex'

export const newPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Insira sua senha')
      .min(
        PASSWORD_MIN_LENGTH,
        `Sua senha precisa conter ${PASSWORD_MIN_LENGTH} ou mais caracteres`,
      )
      .regex(PASSWORD_REGEX, 'Senha inválida'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Suas senhas não coincidem',
    path: ['confirmPassword'],
  })

export type NewPasswordFormSchema = z.infer<typeof newPasswordFormSchema>

export const newPasswordFormDefaultValues: NewPasswordFormSchema = {
  password: '',
  confirmPassword: '',
}
