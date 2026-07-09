'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { TextInput } from '@/components/form-v2/text-input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label, LabelWrapper } from '@/components/ui-v2/label'
import { api } from '@/lib/api'
import { emailSchema } from '@/schemas'

export const recoverPasswordFormSchema = z.object({
  email: emailSchema,
})
export type RecoverPasswordFormSchema = z.infer<
  typeof recoverPasswordFormSchema
>

export function RecoverPasswordForm() {
  const [successMessage, setSuccessMessage] = useState('')

  const formMethods = useForm<RecoverPasswordFormSchema>({
    resolver: zodResolver(recoverPasswordFormSchema),
    defaultValues: { email: '' },
    mode: 'onBlur',
  })

  const errorMessage = formMethods.formState.errors.root?.message

  async function submitForm({ email }: RecoverPasswordFormSchema) {
    setSuccessMessage('')

    const response = await api('/recover-password', {
      method: 'POST',
      body: { email },
    })

    if (!response.success) {
      return formMethods.setError('root', { message: response.message })
    }

    setSuccessMessage(
      'Solicitação enviada com sucesso! Caso o e-mail esteja registrado, você receberá um link para redefinição da senha em seu e-mail.',
    )
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(submitForm)}>
        <LabelWrapper>
          <Label isRequired>E-mail</Label>
          <TextInput name='email' placeholder='Digite seu e-mail' />
        </LabelWrapper>

        <Button
          type='submit'
          className='mt-2'
          loading={formMethods.formState.isSubmitting}
        >
          Enviar
        </Button>

        {successMessage && (
          <Alert variant='success' className='text-center'>
            {successMessage}
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
