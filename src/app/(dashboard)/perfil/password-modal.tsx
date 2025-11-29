'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, RectangleEllipsisIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { PasswordInput } from '@/components/form/password-input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog/close'
import { DialogContainer } from '@/components/ui/dialog/container'
import { DialogContent } from '@/components/ui/dialog/content'
import { DialogFooter } from '@/components/ui/dialog/footer'
import { DialogHeader } from '@/components/ui/dialog/header'
import { DialogTitle } from '@/components/ui/dialog/title'

// TODO: create a shared schema for password change and new password forms
const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Insira sua senha')
      .min(8, 'Sua senha precisa conter 8 ou mais caracteres')
      .regex(/^(?=.*[A-Z])(?=.*\d)/, 'Senha inválida'),
    confirmPassword: z.string(),
    currentPassword: z.string().min(1, 'Digite sua senha atual'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Suas senhas não coincidem',
    path: ['confirmPassword'],
  })

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

interface PasswordModalProps {
  onOpenChange: (open: boolean) => void
}

export default function PasswordModal({ onOpenChange }: PasswordModalProps) {
  const methods = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { password: '', confirmPassword: '', currentPassword: '' },
    mode: 'onBlur',
  })

  const isSubmitting = methods.formState.isSubmitting
  const errorMessage = methods.formState.errors.root?.message
  const success = false

  async function onSubmit(data: ChangePasswordSchema) {
    console.log('Dados enviados para troca de senha:', data)
    onOpenChange(false)
  }

  return (
    <DialogContainer>
      <DialogHeader
        icon={RectangleEllipsisIcon}
        iconClassName='border border-border bg-transparent'
      >
        <DialogTitle>Alterar Senha</DialogTitle>
      </DialogHeader>

      <FormProvider {...methods}>
        <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
          <DialogContent className='flex flex-col gap-8'>
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

            <DialogFooter>
              <Button type='submit' disabled={isSubmitting} className='flex-1'>
                {isSubmitting ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  'Aplicar alterações'
                )}
              </Button>
              <DialogClose
                className='flex-1'
                disabled={methods.formState.isSubmitting}
              >
                Cancelar
              </DialogClose>
            </DialogFooter>

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
          </DialogContent>
        </FormContainer>
      </FormProvider>
    </DialogContainer>
  )
}
