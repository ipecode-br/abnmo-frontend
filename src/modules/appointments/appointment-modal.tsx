'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SmilePlusIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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
import { PATIENT_CONDITION_OPTIONS } from '@/enums/patients'
import { SPECIALTIES_OPTIONS } from '@/enums/shared'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { usePatientOptions } from '@/hooks/use-patient-otions'
import { usePermissions } from '@/hooks/use-permissions'
import { api } from '@/lib/api'
import {
  dateSchema,
  patientConditionSchema,
  professionalNameSchema,
  specialtySchema,
  userRoleSchema,
} from '@/schemas'
import type { Appointment } from '@/types/appointments'

const appointmentFormSchema = z
  .object({
    role: userRoleSchema,
    patient_id: z.string().uuid('Paciente é obrigatório'),
    date: dateSchema,
    category: specialtySchema.optional(),
    condition: patientConditionSchema,
    professional_name: professionalNameSchema,
    annotation: z
      .string()
      .max(500)
      .nullable()
      .transform((value) => (!value ? null : value.trim())),
  })
  .superRefine((data, ctx) => {
    if (data.role !== 'specialist' && !data.category) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Categoria é obrigatória',
        path: ['category'],
      })
    }
  })
type AppointmentFormSchema = z.infer<typeof appointmentFormSchema>

interface AppointmentModalProps {
  patientId?: string
  appointment?: Appointment
  onClose: () => void
}

export function AppointmentModal({
  patientId,
  appointment,
  onClose,
}: Readonly<AppointmentModalProps>) {
  const { patientOptions } = usePatientOptions()
  const { user } = usePermissions()

  const isCreateMode = !!patientId || !appointment
  const isUserSpecialist = user?.role === 'specialist'

  const formMethods = useForm<AppointmentFormSchema>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      role: user?.role,
      patient_id: patientId ?? (appointment?.patient_id || ''),
      date: appointment?.date || '',
      condition: appointment?.condition || '',
      category: isUserSpecialist ? undefined : appointment?.category || '',
      professional_name: appointment?.professional_name || '',
      annotation: appointment?.annotation || '',
    } as AppointmentFormSchema,
    mode: 'onBlur',
  })

  async function submitForm({
    patient_id,
    date,
    category,
    condition,
    professional_name,
    annotation,
  }: AppointmentFormSchema) {
    const payload: Partial<AppointmentFormSchema> = {
      date,
      condition,
      annotation,
    }

    if (isCreateMode) {
      payload.patient_id = patient_id
      payload.category = isUserSpecialist ? undefined : category
      payload.professional_name = professional_name
    }

    const response = isCreateMode
      ? await api('/appointments', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      : await api(`/appointments/${appointment?.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    revalidateClientCache([
      QUERY_CACHE_KEYS.appointments.main,
      QUERY_CACHE_KEYS.statistics.totalAppointmentsByCategory,
      QUERY_CACHE_KEYS.statistics.totalAppointmentsByState,
      QUERY_CACHE_KEYS.statistics.totalAppointments,
    ])
    revalidateServerCache([
      NEXT_CACHE_TAGS.patient(patient_id),
      NEXT_CACHE_TAGS.appointments.main,
      NEXT_CACHE_TAGS.statistics.totalAppointments.main,
      NEXT_CACHE_TAGS.statistics.totalPatientsWithAppointments.main,
    ])

    toast.success(response.message)
    onClose()
  }

  return (
    <DialogContainer className='max-w-xl'>
      <DialogHeader icon={<DialogIcon icon={SmilePlusIcon} />}>
        <DialogTitle>
          {isCreateMode ? 'Novo atendimento' : 'Atualizar atendimento'}
        </DialogTitle>
      </DialogHeader>

      <DialogContent>
        <FormProvider {...formMethods}>
          <FormContainer
            className='grid gap-4 sm:grid-cols-2'
            onSubmit={formMethods.handleSubmit(submitForm)}
          >
            <ComboboxInput
              name='patient_id'
              label='Paciente'
              options={patientOptions}
              className='sm:col-span-full'
              placeholder='Selecione um paciente'
              readOnly={!isCreateMode || !!appointment}
              isRequired
            />
            <DateInput
              name='date'
              label='Data do atendimento'
              placeholder='Selecione uma data'
              wrapperClassName='sm:col-span-1'
              allowFutureDates
              isRequired
            />
            <SelectInput
              name='condition'
              label='Quadro geral'
              options={PATIENT_CONDITION_OPTIONS}
              className='sm:col-span-1'
              isRequired
            />

            {!isUserSpecialist && (
              <>
                <SelectInput
                  name='category'
                  label='Categoria'
                  options={SPECIALTIES_OPTIONS}
                  className='sm:col-span-1'
                  readOnly={!isCreateMode}
                  isRequired
                />
                <TextInput
                  name='professional_name'
                  label='Profissional responsável'
                  placeholder='Insira o nome'
                  wrapperClassName='sm:col-span-1'
                  readOnly={!isCreateMode}
                />
              </>
            )}

            <TextareaInput
              rows={8}
              maxLength={500}
              name='annotation'
              label='Observações'
              placeholder='Insira observações sobre o paciente'
              wrapperClassName='sm:col-span-full'
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
          {isCreateMode ? 'Cadastrar' : 'Atualizar'}
        </Button>
        <DialogClose
          className='flex-1'
          disabled={formMethods.formState.isSubmitting}
        >
          Voltar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
