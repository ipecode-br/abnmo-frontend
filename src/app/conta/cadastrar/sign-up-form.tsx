'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, MailIcon, User2Icon } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CheckboxInput } from '@/components/form/checkbox-input'
import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { PasswordInput } from '@/components/form/password-input'
import { TextInput } from '@/components/form/text-input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { NavLink } from '@/components/ui/nav-link'
import { wait } from '@/utils/wait'

import {
  signUpFormDefaultValues,
  type SignUpFormSchema,
  signUpFormSchema,
} from './sign-up-form-schema'

export function SignUpForm() {
  const [success, setSuccess] = useState(false)

  const formMethods = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpFormDefaultValues,
    mode: 'onBlur',
  })
  const isSubmitting = formMethods.formState.isSubmitting
  const errorMessage = formMethods.formState.errors.root?.message

  async function registerUser({ email }: SignUpFormSchema) {
    // TODO: implement function when API is available
    setSuccess(false)
    await wait(500)

    if (email === 'erro@ipecode.com.br') {
      return formMethods.setError('root', {
        message: 'Ocorreu algum erro. Por favor, tente novamente.',
      })
    }

    setSuccess(true)
  }

  // TODO: add link to policies

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(registerUser)}>
        <FormField>
          <TextInput
            name='name'
            label='Nome completo'
            icon={User2Icon}
            placeholder='Digite seu nome completo'
            isRequired
          />
          <TextInput
            name='email'
            label='E-mail'
            icon={MailIcon}
            placeholder='Digite seu e-mail'
            isRequired
          />
          <PasswordInput
            name='password'
            label='Senha'
            placeholder='Digite sua senha'
            isRequired
            showRequirements
          />
          <PasswordInput
            name='confirmPassword'
            label='Confirmar senha'
            placeholder='Repita sua senha'
            isRequired
          />
        </FormField>

        <CheckboxInput
          name='consent'
          label={
            <span className='text-xs'>
              Li e concordo com os <NavLink href='#'>Termos de Uso</NavLink> e{' '}
              <NavLink href='#'>Política de Privacidade</NavLink>
            </span>
          }
        />

        <Button variant='fancy' type='submit' disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className='animate-spin' /> : 'Cadastrar'}
        </Button>

        {success && (
          <Alert variant='success' className='text-center'>
            Cadastro realizado com sucesso.
          </Alert>
        )}

        {errorMessage && (
          <Alert error={!!errorMessage} className='text-center'>
            {errorMessage}
          </Alert>
        )}
      </FormContainer>
    </FormProvider>
  )
}
