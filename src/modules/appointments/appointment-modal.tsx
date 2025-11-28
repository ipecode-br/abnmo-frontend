'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { SmilePlusIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { revalidateCache } from '@/actions/cache'
import { ComboboxInput } from '@/components/form/combobox-input'
import { DateInput } from '@/components/form/date-input'
import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { TextareaInput } from '@/components/form/textarea-input'
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
import { NEXT_CACHE_TAGS, QUERY_CACHE_KEYS } from '@/constants/cache'
import { api } from '@/lib/api'
import { queryClient } from '@/lib/tanstack-query'
import {
  PATIENT_CONDITION_ENUM,
  PATIENT_CONDITION_OPTIONS,
  type PatientType,
} from '@/types/patients'
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'

const appointmentFormSchema = z.object({
  patient_id: z.string().uuid('O nome do paciente é obrigatório'),
  date: z.string().datetime('A data é obrigatória'),
  referred_to: z
    .string()
    .nullable()
    .transform((value) => (!value ? null : value)),
  condition: z.enum(PATIENT_CONDITION_ENUM, {
    message: 'O quadro é obrigatório',
  }),
  annotation: z
    .string()
    .max(500)
    .nullable()
    .transform((value) => (!value ? null : value)),
})
type AppointmentFormSchema = z.infer<typeof appointmentFormSchema>

interface AppointmentModalProps {
  onClose: () => void
}

export function AppointmentModal({ onClose }: Readonly<AppointmentModalProps>) {
  const { data: response } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.patients.all],
    queryFn: () =>
      api<{ patients: PatientType[] }>('/patients', { params: { all: true } }),
  })

  const formMethods = useForm<AppointmentFormSchema>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      patient_id: '',
      date: '',
      referred_to: '',
      condition: '',
      annotation: '',
    } as unknown as AppointmentFormSchema,
    mode: 'onBlur',
  })

  const patients =
    response?.data?.patients.map((patient) => ({
      value: patient.id,
      label: patient.name,
      description: `CPF: ${formatCpfNumber(patient.cpf)}`,
    })) || []

  async function submitForm(data: AppointmentFormSchema) {
    const response = await api('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    queryClient.invalidateQueries({
      queryKey: [QUERY_CACHE_KEYS.referrals.list],
    })
    revalidateCache(NEXT_CACHE_TAGS.patient(data.patient_id))
    toast.success(response.message)
    onClose()
  }

  return (
    <DialogContainer className='max-w-2xl'>
      <DialogHeader icon={<DialogIcon icon={SmilePlusIcon} />}>
        <DialogTitle>Novo atendimento</DialogTitle>
      </DialogHeader>

      <DialogContent>
        <FormProvider {...formMethods}>
          <FormContainer
            className='grid gap-4 sm:grid-cols-5'
            onSubmit={formMethods.handleSubmit(submitForm)}
          >
            <ComboboxInput
              name='patient_id'
              label='Paciente'
              className='sm:col-span-3'
              placeholder='Selecione um paciente'
              options={patients}
              isRequired
            />
            <DateInput
              name='date'
              label='Data do atendimento'
              wrapperClassName='sm:col-span-2'
              allowFutureDates
              isRequired
            />
            <TextInput
              name='referred_to'
              label='Nome do especialista'
              wrapperClassName='sm:col-span-3'
            />
            <SelectInput
              name='condition'
              label='Quadro geral'
              options={PATIENT_CONDITION_OPTIONS}
              className='sm:col-span-2'
            />
            <TextareaInput
              rows={8}
              maxLength={500}
              name='annotation'
              label='Observações'
              placeholder='Insira observações sobre o paciente'
              wrapperClassName='sm:col-span-5'
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
          Cadastrar
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
