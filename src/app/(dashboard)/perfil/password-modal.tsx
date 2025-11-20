'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { PasswordInput } from '@/components/form/password-input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  newPasswordFormDefaultValues,
  newPasswordFormSchema,
} from '../../conta/nova-senha/new-password-form-schema'

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

interface PasswordModalProps {
  open: boolean
  onClose: () => void
}

export default function PasswordModal({ open, onClose }: PasswordModalProps) {
  const extendedSchema = newPasswordFormSchema.extend({
    currentPassword: z.string().min(1, 'Digite sua senha atual'),
  })

  type ExtendedSchema = z.infer<typeof extendedSchema>

  const defaultValues: ExtendedSchema = {
    ...newPasswordFormDefaultValues,
    currentPassword: '',
  }

  const methods = useForm<ExtendedSchema>({
    resolver: zodResolver(extendedSchema),
    defaultValues,
    mode: 'onBlur',
  })

  const isSubmitting = methods.formState.isSubmitting
  const errorMessage = methods.formState.errors.root?.message
  const success = false

  async function onSubmit(data: ExtendedSchema) {
    console.log('Dados enviados para troca de senha:', data)

    await wait(500)

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>Alterar senha</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
            <FormField>
              <PasswordInput
                name='currentPassword'
                label='Senha atual'
                placeholder='Digite sua senha atual'
                isRequired
              />

              <PasswordInput
                name='password'
                label='Nova senha'
                placeholder='Crie uma nova senha'
                isRequired
                showRequirements
              />

              <PasswordInput
                name='confirmPassword'
                label='Confirmar nova senha'
                placeholder='Repita a nova senha'
                isRequired
              />
            </FormField>

            <div className='flex justify-end gap-2 pt-2'>
              <Button variant='outline' type='button' onClick={onClose}>
                Cancelar
              </Button>

              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  'Aplicar alterações'
                )}
              </Button>
            </div>

            {success && (
              <Alert variant='success' className='text-center'>
                Senha atualizada com sucesso.
              </Alert>
            )}

            {errorMessage && (
              <Alert error className='text-center'>
                {errorMessage}
              </Alert>
            )}
          </FormContainer>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
