import { z } from 'zod'

export const recoverFormSchema = z.object({
  email: z.string().email('Insira um e-mail válido'),
})

export type RecoverFormSchema = z.infer<typeof recoverFormSchema>

export const recoverFormDefaultValues: RecoverFormSchema = {
  email: '',
}
