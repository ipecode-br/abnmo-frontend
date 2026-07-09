'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { PasswordInput } from '@/components/form/password-input'
import { CheckboxInput } from '@/components/form-v2/checkbox-input'
import { TextInput } from '@/components/form-v2/text-input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { NavLink } from '@/components/ui/nav-link'
import { Label, LabelWrapper } from '@/components/ui-v2/label'
import { ROUTES } from '@/constants/routes'
import { api } from '@/lib/api'
import { emailSchema } from '@/schemas'

export const signInFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, 'Sua senha deve conter 8 ou mais caracteres'),
  keepLoggedIn: z.boolean().optional(),
})
export type SignInFormSchema = z.infer<typeof signInFormSchema>

// TODO: redirect patients to new screening flow when it's ready
export function SignInForm() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const formMethods = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: '', password: '', keepLoggedIn: false },
    mode: 'onBlur',
  })
  const formErrorMessage = formMethods.formState.errors.root?.message

  async function submitForm(body: SignInFormSchema) {
    startTransition(async () => {
      const response = await api<{ role: string }>('/login', {
        method: 'POST',
        body: body,
      })

      if (!response.success) {
        formMethods.setError('root', { message: response.message })
        return
      }

      router.push(
        response.data?.role === 'patient'
          ? ROUTES.patient.main
          : ROUTES.dashboard.main,
      )
    })
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(submitForm)}>
        <LabelWrapper>
          <Label isRequired>E-mail</Label>
          <TextInput name='email' placeholder='Digite seu e-mail' />
        </LabelWrapper>
        <LabelWrapper>
          <Label isRequired>Senha</Label>
          <PasswordInput name='password' placeholder='Digite sua senha' />
        </LabelWrapper>

        <div className='flex items-center justify-between gap-4 max-[28rem]:flex-col'>
          <CheckboxInput name='keepLoggedIn' label='Manter conectado' />

          <NavLink
            href={ROUTES.auth.forgotPassword}
            className='whitespace-nowrap'
          >
            Esqueceu sua senha?
          </NavLink>
        </div>

        <Button type='submit' loading={isPending} className='mt-2'>
          Entrar
        </Button>

        {formErrorMessage && (
          <Alert error className='text-center'>
            {formErrorMessage}
          </Alert>
        )}
      </FormContainer>
    </FormProvider>
  )
}
