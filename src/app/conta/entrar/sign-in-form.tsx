'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MailIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

import { FormContainer } from '@/components/form/form-container'
import { PasswordInput } from '@/components/form/password-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { NavLink } from '@/components/ui/nav-link'
import { ROUTES } from '@/constants/routes'

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

  function signIn(data: SignInFormSchema) {
    // TODO: implement sign in function when API is available
    console.log(data)
  }

  // TODO: add checkbox for keep logged in option

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

        <div className='flex w-full items-center justify-between py-3 text-sm'>
          <div>Manter conectado</div>
          <NavLink href={ROUTES.auth.forgotPassword}>
            Esqueceu sua senha?
          </NavLink>
        </div>

        <Button variant='fancy' type='submit'>
          Entrar
        </Button>
      </FormContainer>
    </FormProvider>
  )
}
