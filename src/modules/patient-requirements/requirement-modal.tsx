'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { TextareaInput } from '@/components/form/textarea-input'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { api } from '@/lib/api'
import {
  PATIENT_REQUIREMENT_TYPE_ENUM,
  PATIENT_REQUIREMENT_TYPE_OPTIONS,
} from '@/types/patient-requirements'

const patientRequirementFormSchema = z.object({
  patient_id: z.string().uuid('Paciente é obrigatório'),
  type: z.enum(PATIENT_REQUIREMENT_TYPE_ENUM),
  description: z
    .string()
    .max(500)
    .transform((value) => (!value ? null : value))
    .nullable(),
})
type PatientRequirementFormSchema = z.infer<typeof patientRequirementFormSchema>

interface PatientRequirementModalProps {
  onClose: () => void
}

export function PatientRequirementModal({
  onClose,
}: Readonly<PatientRequirementModalProps>) {
  const formMethods = useForm<PatientRequirementFormSchema>({
    resolver: zodResolver(patientRequirementFormSchema),
    defaultValues: {
      patient_id: '',
      type: '',
      description: '',
    } as unknown as PatientRequirementFormSchema,
    mode: 'onBlur',
  })

  async function submitForm(data: PatientRequirementFormSchema) {
    const response = await api('/patient-requirements', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    // TODO: revalidate the patient requirements list cache
    toast.success(response.message)
    onClose()
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

      <DialogContent>
        <FormProvider {...formMethods}>
          <FormContainer onSubmit={formMethods.handleSubmit(submitForm)}>
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
          </FormContainer>
        </FormProvider>
      </DialogContent>

      <DialogFooter>
        <Button
          className='flex-1'
          loading={formMethods.formState.isSubmitting}
          onClick={formMethods.handleSubmit(submitForm)}
        >
          Confirmar
        </Button>
        <DialogClose
          className='flex-1'
          disabled={formMethods.formState.isSubmitting}
        >
          Cancelar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
