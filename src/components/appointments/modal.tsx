'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SmilePlusIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog/close'
import { DialogContainer } from '@/components/ui/dialog/container'
import { DialogContent } from '@/components/ui/dialog/content'
import { DialogFooter } from '@/components/ui/dialog/footer'
import { DialogHeader } from '@/components/ui/dialog/header'
import { DialogTitle } from '@/components/ui/dialog/title'
import { api } from '@/lib/api'

import { DateInput } from '../form/date-input'
import { FormContainer } from '../form/form-container'

interface AppointmentModalProps {
  onOpenChange: (open: boolean) => void
}

const appointmentFormSchema = z.object({
  patient_name: z.string().min(1, 'O nome do paciente é obrigatório'),
  appointment_date: z.string().datetime(),
  specialist_id: z.string().uuid(),
  specialist_specialty: z.string(),
  condition: z.string().nullable(),
  annotation: z.string().max(200).nullable(),
})
type AppointmentFormSchema = z.infer<typeof appointmentFormSchema>

export function AppointmentModal({ onOpenChange }: AppointmentModalProps) {
  const formMethods = useForm<AppointmentFormSchema>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      patient_name: '',
      appointment_date: '',
      specialist_id: '',
      specialist_specialty: '',
      condition: '',
      annotation: '',
    },
    mode: 'onBlur',
  })

  async function submitForm(data: AppointmentFormSchema) {
    const response = await api('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    toast.success(response.message)
    onOpenChange(false)
  }

  return (
    <DialogContainer className='max-w-2xl'>
      <DialogHeader
        icon={SmilePlusIcon}
        iconClassName='border border-border bg-transparent'
      >
        <DialogTitle>Novo atendimento</DialogTitle>
      </DialogHeader>

      <FormProvider {...formMethods}>
        <FormContainer
          className='gap-2'
          onSubmit={formMethods.handleSubmit(submitForm)}
        >
          <DialogContent className='grid gap-4 sm:grid-cols-5'>
            <TextInput
              name='patient_name'
              label='Nome do paciente'
              wrapperClassName='sm:col-span-3'
              isRequired
            />
            <DateInput
              modal
              name='appointment_date'
              label='Data do atendimento'
              wrapperClassName='sm:col-span-2'
              allowFutureDates
              isRequired
            />
            <TextInput
              name='specialist_id'
              label='Nome do especialista'
              wrapperClassName='sm:col-span-3'
              isRequired
            />
            <TextInput
              name='specialist_specialty'
              label='Especialidade médica'
              wrapperClassName='sm:col-span-2'
              isRequired
            />
            <TextInput
              name='condition'
              label='Quadro geral'
              wrapperClassName='sm:col-span-5'
            />
            <TextInput
              name='annotation'
              label='Observações'
              placeholder='Insira observações sobre o paciente'
              wrapperClassName='sm:col-span-5'
            />
          </DialogContent>

          <DialogFooter>
            <Button
              type='submit'
              className='flex-1'
              loading={formMethods.formState.isSubmitting}
            >
              Cadastrar
            </Button>
            <DialogClose
              className='flex-1'
              disabled={formMethods.formState.isSubmitting}
            >
              Cancelar
            </DialogClose>
          </DialogFooter>
        </FormContainer>
      </FormProvider>
    </DialogContainer>
  )
}
