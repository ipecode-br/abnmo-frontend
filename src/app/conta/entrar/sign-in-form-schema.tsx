import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z.string().email('Insira um e-mail válido'),
  password: z.string().min(8, 'Sua senha deve conter 8 ou mais caracteres'),
  rememberMe: z.boolean().optional(),
})

export type SignInFormSchema = z.infer<typeof signInFormSchema>

export const signInFormDefaultValues: SignInFormSchema = {
  email: '',
  password: '',
  rememberMe: false,
}
