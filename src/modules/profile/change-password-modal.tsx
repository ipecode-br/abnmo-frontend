'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCcwKeyIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { PasswordInput } from '@/components/form/password-input'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from '@/components/ui/dialog'
import { api } from '@/lib/api'
import { passwordSchema } from '@/schemas'

const changeUserPasswordSchema = z
  .object({
    password: z.string().min(1, 'Insira sua senha atual'),
    new_password: passwordSchema,
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Repita sua nova senha corretamente',
    path: ['confirm_password'],
  })

type ChangeUserPasswordSchema = z.infer<typeof changeUserPasswordSchema>

interface ChangeUserPasswordModalProps {
  onClose: () => void
}

export function ChangeUserPasswordModal({
  onClose,
}: ChangeUserPasswordModalProps) {
  const formMethods = useForm<ChangeUserPasswordSchema>({
    resolver: zodResolver(changeUserPasswordSchema),
    defaultValues: { password: '', new_password: '', confirm_password: '' },
    mode: 'onBlur',
  })

  async function submitForm({
    password,
    new_password,
  }: ChangeUserPasswordSchema) {
    const response = await api(`/change-password`, {
      method: 'POST',
      body: JSON.stringify({ password, new_password }),
    })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    toast.success(response.message)
    onClose()
  }

  return (
    <DialogContainer>
      <DialogHeader icon={<DialogIcon icon={RotateCcwKeyIcon} />}>
        <DialogTitle>Alterar senha</DialogTitle>
      </DialogHeader>

      <FormProvider {...formMethods}>
        <FormContainer onSubmit={formMethods.handleSubmit(submitForm)}>
          <DialogContent>
            <FormField>
              <PasswordInput
                name='password'
                label='Senha atual'
                placeholder='Digite sua senha atual'
                isRequired
              />

              <PasswordInput
                name='new_password'
                label='Nova senha'
                placeholder='Crie uma nova senha'
                showRequirements
                isRequired
              />

              <PasswordInput
                name='confirm_password'
                label='Confirmar nova senha'
                placeholder='Repita a nova senha'
                isRequired
              />
            </FormField>
          </DialogContent>
        </FormContainer>
      </FormProvider>

      <DialogFooter>
        <Button
          type='submit'
          loading={formMethods.formState.isSubmitting}
          onClick={formMethods.handleSubmit(submitForm)}
          className='flex-1'
        >
          Alterar
        </Button>
        <DialogClose
          disabled={formMethods.formState.isSubmitting}
          className='flex-1'
        >
          Voltar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
