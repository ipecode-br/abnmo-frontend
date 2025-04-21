'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { NewPasswordInput } from '@/components/form/new-password-input'
import { PasswordInput } from '@/components/form/password-input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { wait } from '@/utils/wait'

import {
  newPasswordFormDefaultValues,
  type NewPasswordFormSchema,
  newPasswordFormSchema,
} from './new-password-form-schema'

export function NewPasswordForm() {
  const [success, setSuccess] = useState(false)

  const formMethods = useForm<NewPasswordFormSchema>({
    resolver: zodResolver(newPasswordFormSchema),
    defaultValues: newPasswordFormDefaultValues,
    mode: 'onBlur',
  })
  const isSubmitting = formMethods.formState.isSubmitting
  const errorMessage = formMethods.formState.errors.root?.message

  async function saveNewPassword(data: NewPasswordFormSchema) {
    // TODO: implement function when API is available
    setSuccess(false)
    await wait(500)
    console.log(data)

    setSuccess(true)
    setTimeout(() => redirect(ROUTES.auth.signIn), 2000)
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(saveNewPassword)}>
        <FormField>
          <NewPasswordInput
            name='password'
            label='Senha'
            placeholder='Digite sua senha'
            isRequired
          />
          <PasswordInput
            name='confirmPassword'
            label='Confirmar senha'
            placeholder='Repita sua senha'
            isRequired
          />
        </FormField>

        <Button variant='fancy' type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className='animate-spin' />
          ) : (
            'Redefinir senha'
          )}
        </Button>

        {success && (
          <Alert variant='success' className='text-center'>
            Senha atualizada com sucesso.
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
