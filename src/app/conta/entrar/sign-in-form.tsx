'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MailIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

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

import {
  signInFormDefaultValues,
  type SignInFormSchema,
  signInFormSchema,
} from './sign-in-form-schema'

export function SignInForm() {
  const formMethods = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: signInFormDefaultValues,
    mode: 'onBlur',
  })
  const isSubmitting = formMethods.formState.isSubmitting
  const formErrorMessage = formMethods.formState.errors.root?.message

  async function signIn(data: SignInFormSchema) {
    // TODO: redirect to initial page according to user role
    // TODO: implement keep me logged in option when API is updated with refresh token

    const response = await api('/login', {
      method: 'POST',
      body: JSON.stringify({ email: data.email, password: data.password }),
    })

    if (!response.success) {
      formMethods.setError('root', { message: response.message })
    }
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(signIn)}>
        <FormField>
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

        <div className='flex items-center justify-between gap-x-3 gap-y-5 text-sm max-[26rem]:flex-col'>
          <CheckboxInput name='keepLoggedIn' label='Manter conectado' />

          <NavLink
            href={ROUTES.auth.forgotPassword}
            className='whitespace-nowrap'
          >
            Esqueceu sua senha?
          </NavLink>
        </div>

        <Button variant='fancy' type='submit' loading={isSubmitting}>
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
