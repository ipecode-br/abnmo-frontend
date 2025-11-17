'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { TextareaInput } from '@/components/form/textarea-input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog/close'
import { DialogContainer } from '@/components/ui/dialog/container'
import { DialogContent } from '@/components/ui/dialog/content'
import { DialogDescription } from '@/components/ui/dialog/description'
import { DialogFooter } from '@/components/ui/dialog/footer'
import { DialogHeader } from '@/components/ui/dialog/header'
import { DialogTitle } from '@/components/ui/dialog/title'
import { PATIENT_REQUIREMENT_TYPE_OPTIONS } from '@/types/patient-requirements'

const patientRequirementFormSchema = z.object({
  name: z.string().min(1, 'O nome do paciente é obrigatório'),
  type: z.enum(['medical_report', 'screening']),
  description: z
    .string()
    .max(500)
    .transform((value) => (!value ? null : value))
    .nullable(),
})
type PatientRequirementFormSchema = z.infer<typeof patientRequirementFormSchema>

interface PatientRequirementModalProps {
  onOpenChange: (open: boolean) => void
}

export function PatientRequirementModal({
  onOpenChange,
}: Readonly<PatientRequirementModalProps>) {
  const formMethods = useForm<PatientRequirementFormSchema>({
    resolver: zodResolver(patientRequirementFormSchema),
    defaultValues: {
      patient_name: '',
      document_type: '',
      description: '',
    } as unknown as PatientRequirementFormSchema,
    mode: 'onBlur',
  })

  async function submitForm(data: PatientRequirementFormSchema) {
    // TODO: submit form data to API
    console.log(data)
    onOpenChange(false)
  }

  return (
    <DialogContainer>
      <DialogHeader>
        <DialogTitle>Adicionar solicitação</DialogTitle>
        <DialogDescription>
          Crie uma nova solicitação para este paciente e mantenha o
          acompanhamento atualizado.
        </DialogDescription>
      </DialogHeader>

      <FormProvider {...formMethods}>
        <FormContainer
          onSubmit={formMethods.handleSubmit(submitForm)}
          className='flex flex-1 flex-col justify-between'
        >
          <DialogContent className='space-y-6'>
            <TextInput name='name' label='Paciente' isRequired />

            <SelectInput
              name='type'
              label='Tipo da solicitação'
              options={PATIENT_REQUIREMENT_TYPE_OPTIONS}
              isRequired
            />

            <TextareaInput
              rows={6}
              maxLength={500}
              name='description'
              label='Descrição (opcional)'
              placeholder='Adicione detalhes sobre a solicitação...'
            />
          </DialogContent>

          <DialogFooter>
            <Button
              type='submit'
              className='flex-1'
              loading={formMethods.formState.isSubmitting}
            >
              Confirmar
            </Button>
            <DialogClose className='flex-1'>Cancelar</DialogClose>
          </DialogFooter>
        </FormContainer>
      </FormProvider>
    </DialogContainer>
  )
}
