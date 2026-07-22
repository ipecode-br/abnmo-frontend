'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { RotateCcwKeyIcon } from 'lucide-react'
import { useId } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
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
import { Label, LabelWrapper } from '@/components/ui/label'
import { api } from '@/lib/api'
import { passwordSchema } from '@/schemas'

const changeUserPasswordSchema = z
  .object({
    password: z.string().min(1, 'Insira sua senha atual'),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Repita sua nova senha corretamente',
    path: ['confirmPassword'],
  })
type ChangeUserPasswordSchema = z.infer<typeof changeUserPasswordSchema>

interface ChangeUserPasswordModalProps {
  onClose: () => void
}

export function ChangeUserPasswordModal({
  onClose,
}: ChangeUserPasswordModalProps) {
  const formId = useId()

  const formMethods = useForm<ChangeUserPasswordSchema>({
    resolver: zodResolver(changeUserPasswordSchema),
    defaultValues: { password: '', newPassword: '', confirmPassword: '' },
    mode: 'onBlur',
  })

  async function submitForm({
    password,
    newPassword,
  }: ChangeUserPasswordSchema) {
    const response = await api(`/change-password`, {
      method: 'POST',
      body: { password, newPassword },
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

      <DialogContent>
        <FormProvider {...formMethods}>
          <FormContainer
            id={formId}
            className='gap-4'
            onSubmit={formMethods.handleSubmit(submitForm)}
          >
            <LabelWrapper>
              <Label isRequired>Senha atual</Label>
              <PasswordInput
                name='password'
                placeholder='Digite sua senha atual'
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label isRequired>Nova senha</Label>
              <PasswordInput
                name='newPassword'
                showRequirements
                placeholder='Crie uma nova senha'
              />
            </LabelWrapper>

            <LabelWrapper>
              <Label isRequired>Confirme a nova senha</Label>
              <PasswordInput
                name='confirmPassword'
                placeholder='Repita a nova senha'
              />
            </LabelWrapper>
          </FormContainer>
        </FormProvider>
      </DialogContent>

      <DialogFooter>
        <Button
          type='submit'
          form={formId}
          className='md:flex-1'
          loading={formMethods.formState.isSubmitting}
          onClick={formMethods.handleSubmit(submitForm)}
        >
          Alterar
        </Button>
        <DialogClose
          className='md:flex-1'
          disabled={formMethods.formState.isSubmitting}
        >
          Voltar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
