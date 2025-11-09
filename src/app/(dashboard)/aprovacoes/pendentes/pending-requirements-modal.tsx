'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog/close'
import { DialogContainer } from '@/components/ui/dialog/container'
import { DialogContent } from '@/components/ui/dialog/content'
import { DialogDescription } from '@/components/ui/dialog/description'
import { DialogFooter } from '@/components/ui/dialog/footer'
import { DialogHeader } from '@/components/ui/dialog/header'
import { DialogTitle } from '@/components/ui/dialog/title'
import { DOCUMENT_OPTIONS } from '@/constants/documents'
import { documentTypeSchema } from '@/schemas'

import { FormContainer } from '../../../../components/form/form-container'
import { TextareaInput } from '../../../../components/form/textarea-input'

interface PendingModalProps {
  onOpenChange: (open: boolean) => void
}

const pendingRequirementsFormSchema = z.object({
  patient_name: z.string().min(1, 'O nome do paciente é obrigatório'),
  document_type: documentTypeSchema,
  annotation: z
    .string()
    .max(500)
    .nullable()
    .transform((value) => (!value ? null : value)),
})
type PendingRequirementsFormSchema = z.infer<
  typeof pendingRequirementsFormSchema
>

export function PendingRequirementsModal({ onOpenChange }: PendingModalProps) {
  const formMethods = useForm<PendingRequirementsFormSchema>({
    resolver: zodResolver(pendingRequirementsFormSchema),
    defaultValues: {
      patient_name: '',
      document_type: 'laudo',
      annotation: '',
    },
    mode: 'onBlur',
  })

  async function submitForm(data: PendingRequirementsFormSchema) {
    // TODO: Submit form data to API
    console.log(data)
    onOpenChange(false)
  }

  return (
    <DialogContainer>
      <DialogHeader>
        <DialogTitle>Adicionar nova pendência</DialogTitle>
        <DialogDescription>
          Crie uma nova solicitação de pendência para este paciente e mantenha o
          acompanhamento atualizado.
        </DialogDescription>
      </DialogHeader>

      <FormProvider {...formMethods}>
        <FormContainer
          onSubmit={formMethods.handleSubmit(submitForm)}
          className='flex flex-1 flex-col justify-between'
        >
          <DialogContent className='space-y-6'>
            <TextInput name='patient_name' isRequired label='Paciente' />

            <SelectInput
              name='document_type'
              label='Pendência'
              options={DOCUMENT_OPTIONS}
              isRequired
            />

            <TextareaInput
              rows={8}
              maxLength={200}
              name='annotation'
              label='Comentário (Opcional)'
              placeholder='Adicione detalhes sobre a solicitação...'
            />
          </DialogContent>

          <DialogFooter>
            <Button
              className='flex-1'
              type='submit'
              loading={formMethods.formState.isSubmitting}
            >
              Confirmar
            </Button>
            <DialogClose className='flex-1'>Cancelar pendência</DialogClose>
          </DialogFooter>
        </FormContainer>
      </FormProvider>
    </DialogContainer>
  )
}
