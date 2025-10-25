'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { CheckboxInput } from '@/components/form/checkbox-input'
import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { PasswordInput } from '@/components/form/password-input'
import { TextInput } from '@/components/form/text-input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { MailIcon, User2Icon } from '@/components/ui/icons'
import { NavLink } from '@/components/ui/nav-link'
import { ROUTES } from '@/constants/routes'
import { api } from '@/lib/api'

import {
  signUpFormDefaultValues,
  type SignUpFormSchema,
  signUpFormSchema,
} from './sign-up-form-schema'

export function SignUpForm() {
  const router = useRouter()
  const formMethods = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpFormDefaultValues,
    mode: 'onBlur',
  })

  const isSubmitting = formMethods.formState.isSubmitting
  const errorMessage = formMethods.formState.errors.root?.message

  async function registerUser({ name, email, password }: SignUpFormSchema) {
    const response = await api('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })

    if (!response.success) {
      return formMethods.setError('root', { message: response.message })
    }

    toast.success(response.message)
    router.push(ROUTES.patient.main)
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

        <Button variant='fancy' type='submit' loading={isSubmitting}>
          Cadastrar
        </Button>

        {errorMessage && (
          <Alert error={!!errorMessage} className='text-center'>
            {errorMessage}
          </Alert>
        )}
      </FormContainer>
    </FormProvider>
  )
}
