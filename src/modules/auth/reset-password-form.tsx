'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { PasswordInput } from '@/components/form/password-input'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { api } from '@/lib/api'
import { passwordSchema } from '@/schemas'

export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirm_password: z.string(),
    reset_token: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Suas senhas não coincidem',
    path: ['confirm_password'],
  })
export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: Readonly<ResetPasswordFormProps>) {
  const router = useRouter()

  const formMethods = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { password: '', confirm_password: '', reset_token: token },
    mode: 'onBlur',
  })

  async function submitForm({
    password,
    reset_token,
  }: ResetPasswordFormSchema) {
    const response = await api('/reset-password', {
      method: 'POST',
      body: JSON.stringify({ password, reset_token }),
    })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    toast.success(response.message)
    router.push(ROUTES.dashboard.main)
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(submitForm)}>
        <FormField>
          <PasswordInput
            name='password'
            label='Senha'
            placeholder='Digite sua senha'
            showRequirements
            isRequired
          />
          <PasswordInput
            name='confirm_password'
            label='Confirmar senha'
            placeholder='Repita sua senha'
            isRequired
          />
        </FormField>

        <Button type='submit' loading={formMethods.formState.isSubmitting}>
          Redefinir senha
        </Button>
      </FormContainer>
    </FormProvider>
  )
}
