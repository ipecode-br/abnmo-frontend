'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, MailIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

import { CheckboxInput } from '@/components/form/checkbox-input'
import { FormContainer } from '@/components/form/form-container'
import { PasswordInput } from '@/components/form/password-input'
import { TextInput } from '@/components/form/text-input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { NavLink } from '@/components/ui/nav-link'
import { ROUTES } from '@/constants/routes'
import { wait } from '@/utils/wait'

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
    // TODO: implement sign in function when API is available
    await wait(500)

    if (data.email === 'erro@ipecode.com.br') {
      formMethods.setError('root', {
        message: 'Credenciais inválidas. Por favor, tente novamente.',
      })
      return
    }

    console.log(data)
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(signIn)}>
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

        <div className='flex w-full flex-wrap items-center justify-between gap-3 py-3 text-sm'>
          <CheckboxInput name='keepLoggedIn' label='Manter conectado' />

          <NavLink
            href={ROUTES.auth.forgotPassword}
            className='whitespace-nowrap'
          >
            Esqueceu sua senha?
          </NavLink>
        </div>

        <Button variant='fancy' type='submit' disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className='animate-spin' /> : 'Entrar'}
        </Button>

        {formErrorMessage && <Alert error>{formErrorMessage}</Alert>}
      </FormContainer>
    </FormProvider>
  )
}
