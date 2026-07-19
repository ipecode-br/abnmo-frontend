'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { PasswordInput } from '@/components/form/password-input'
import { Button } from '@/components/ui/button'
import { Label, LabelWrapper } from '@/components/ui/label'
import { ROUTES } from '@/constants/routes'
import { api } from '@/lib/api'
import { passwordSchema } from '@/schemas'

export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
    resetToken: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Suas senhas não coincidem',
    path: ['confirmPassword'],
  })
export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: Readonly<ResetPasswordFormProps>) {
  const router = useRouter()

  const formMethods = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { password: '', confirmPassword: '', resetToken: token },
    mode: 'onBlur',
  })

  async function submitForm({ password, resetToken }: ResetPasswordFormSchema) {
    const response = await api('/reset-password', {
      method: 'POST',
      body: { password, resetToken },
    })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    toast.success(response.message)
    router.push(ROUTES.main)
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(submitForm)}>
        <LabelWrapper>
          <Label isRequired>Senha</Label>
          <PasswordInput
            name='password'
            showRequirements
            placeholder='Digite sua senha'
          />
        </LabelWrapper>
        <LabelWrapper>
          <Label isRequired>Confirmar senha</Label>
          <PasswordInput
            name='confirmPassword'
            placeholder='Repita sua senha'
          />
        </LabelWrapper>

        <Button
          type='submit'
          className='mt-2'
          loading={formMethods.formState.isSubmitting}
        >
          Redefinir senha
        </Button>
      </FormContainer>
    </FormProvider>
  )
}
