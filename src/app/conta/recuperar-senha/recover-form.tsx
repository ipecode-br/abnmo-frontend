'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { FormContainer } from '@/components/form/form-container'
import { TextInput } from '@/components/form/text-input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Loader2Icon, MailIcon } from '@/components/ui/icons'
import { wait } from '@/utils/wait'

import {
  recoverFormDefaultValues,
  type RecoverFormSchema,
  recoverFormSchema,
} from './recover-form-schema'

type SuccessMessage = {
  message: string
  email: string
}

export function RecoverForm() {
  const [successMessage, setSuccessMessage] = useState<SuccessMessage | null>(
    null,
  )

  const formMethods = useForm<RecoverFormSchema>({
    resolver: zodResolver(recoverFormSchema),
    defaultValues: recoverFormDefaultValues,
    mode: 'onBlur',
  })
  const isSubmitting = formMethods.formState.isSubmitting
  const errorMessage = formMethods.formState.errors.root?.message

  async function sendRecoverEmail({ email }: RecoverFormSchema) {
    // TODO: implement function when API is available
    setSuccessMessage(null)
    await wait(500)

    if (email === 'erro@ipecode.com.br') {
      return formMethods.setError('root', {
        message: 'Ocorreu algum erro. Por favor, tente novamente.',
      })
    }

    setSuccessMessage({
      message: 'E-mail de recuperação de senha enviado para ',
      email,
    })
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(sendRecoverEmail)}>
        <TextInput
          name='email'
          label='E-mail'
          icon={MailIcon}
          placeholder='Digite seu e-mail'
        />

        <Button variant='fancy' type='submit' disabled={isSubmitting}>
          {isSubmitting ? <Loader2Icon className='animate-spin' /> : 'Enviar'}
        </Button>

        {successMessage && (
          <Alert variant='success' className='text-center'>
            {successMessage.message}
            <strong>{successMessage.email}</strong>
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
