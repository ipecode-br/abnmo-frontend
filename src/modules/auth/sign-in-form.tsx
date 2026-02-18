'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MailIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { CheckboxInput } from '@/components/form/checkbox-input'
import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { PasswordInput } from '@/components/form/password-input'
import { TextInput } from '@/components/form/text-input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { NavLink } from '@/components/ui/nav-link'
import { ROUTES } from '@/constants/routes'
import { api } from '@/lib/api'

export const signInFormSchema = z.object({
  email: z.string().email('Insira um e-mail válido'),
  password: z.string().min(8, 'Sua senha deve conter 8 ou mais caracteres'),
  keepLoggedIn: z.boolean().optional(),
})
export type SignInFormSchema = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const router = useRouter()

  const formMethods = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: '', password: '', keepLoggedIn: false },
    mode: 'onBlur',
  })
  const formErrorMessage = formMethods.formState.errors.root?.message

  async function submitForm({
    email,
    password,
    keepLoggedIn,
  }: SignInFormSchema) {
    const response = await api<{ account_type: 'user' | 'patient' }>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, keep_logged_in: keepLoggedIn }),
    })

    if (!response.success) {
      formMethods.setError('root', { message: response.message })
      return
    }

    router.push(
      response.data?.account_type === 'user'
        ? ROUTES.dashboard.main
        : ROUTES.patient.main,
    )
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(submitForm)}>
        <FormField className='gap-4'>
          <TextInput
            name='email'
            label='E-mail'
            icon={MailIcon}
            placeholder='Digite seu e-mail'
          />
          <PasswordInput
            name='password'
            label='Senha'
            placeholder='Digite sua senha'
          />
        </FormField>

        <div className='flex items-center justify-between gap-x-3 gap-y-5 text-sm max-[28rem]:flex-col'>
          <CheckboxInput name='keepLoggedIn' label='Manter conectado' />

          <NavLink
            href={ROUTES.auth.forgotPassword}
            className='whitespace-nowrap'
          >
            Esqueceu sua senha?
          </NavLink>
        </div>

        <Button type='submit' loading={formMethods.formState.isSubmitting}>
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
