import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z.string().email('Insira um e-mail válido'),
  password: z.string().min(1, 'Insira sua senha'),
})

export type SignInFormSchema = z.infer<typeof signInFormSchema>

export const signInFormDefaultValues: SignInFormSchema = {
  email: '',
  password: '',
}
