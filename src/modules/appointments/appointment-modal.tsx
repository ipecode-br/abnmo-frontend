'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SmilePlusIcon } from 'lucide-react'
import { useId } from 'react'
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
import { Label, LabelWrapper } from '@/components/ui/label'
import { NEXT_CACHE_TAGS, QUERY_CACHE_KEYS } from '@/constants/cache'
import { PATIENT_CONDITION_OPTIONS } from '@/enums/patients'
import { SPECIALTIES_OPTIONS } from '@/enums/shared'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { usePatientOptions } from '@/hooks/use-patient-otions'
import { usePermissions } from '@/hooks/use-permissions'
import { api } from '@/lib/api'
import {
  getNullableStringSchema,
  patientConditionSchema,
  professionalNameSchema,
  specialtySchema,
  userRoleSchema,
} from '@/schemas'
import type { Appointment } from '@/types/appointments'
import { parseDate } from '@/utils/parsers/parse-date'
import { validateDate } from '@/utils/validators/validate-date'

const TODAY = new Date()
const MAX_APPOINTMENT_YEAR = TODAY.getFullYear() + 1
const MAX_ANNOTATION_LENGTH = 500

const appointmentFormSchema = z
  .object({
    role: userRoleSchema,
    patientId: z.string().uuid('Paciente é obrigatório'),
    // TODO: review date validation
    date: z
      .string()
      .min(1, 'A data é obrigatória')
      .refine(
        (value) => validateDate(value, { endYear: MAX_APPOINTMENT_YEAR }),
        'Insira uma data válida',
      ),
    category: specialtySchema.optional(),
    condition: patientConditionSchema,
    professionalName: professionalNameSchema,
    annotation: getNullableStringSchema(MAX_ANNOTATION_LENGTH),
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
}: AppointmentModalProps) {
  const { patientOptions } = usePatientOptions()
  const { user } = usePermissions()
  const formId = useId()

  const isCreateMode = !appointment
  const isUserSpecialist = user?.role === 'specialist'

  const formMethods = useForm<AppointmentFormSchema>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      role: user?.role,
      patientId: patientId ?? (appointment?.patient.id || ''),
      date: appointment?.date
        ? parseDate(new Date(appointment.date), { output: 'DD/MM/YYYY' })
        : '',
      condition: appointment?.condition || '',
      category: isUserSpecialist ? undefined : appointment?.category || '',
      professionalName: appointment?.professionalName || '',
      annotation: appointment?.annotation || '',
    } as AppointmentFormSchema,
    mode: 'onBlur',
  })

  async function submitForm({
    patientId,
    date,
    category,
    condition,
    professionalName,
    annotation,
  }: AppointmentFormSchema) {
    const body: Partial<AppointmentFormSchema> = {
      date: parseDate(date, { input: 'DD/MM/YYYY' }) as string,
      condition,
      annotation,
    }

    if (isCreateMode) {
      body.patientId = patientId
      body.category = isUserSpecialist ? undefined : category
      body.professionalName = professionalName
    }

    const response = isCreateMode
      ? await api('/appointments', { method: 'POST', body })
      : await api(`/appointments/${appointment?.id}`, { method: 'PUT', body })

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
      NEXT_CACHE_TAGS.patient(patientId),
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
            id={formId}
            className='grid gap-4 sm:grid-cols-2'
            onSubmit={formMethods.handleSubmit(submitForm)}
          >
            <LabelWrapper className='col-span-full'>
              <Label isRequired>Paciente</Label>
              <ComboboxInput
                name='patientId'
                options={patientOptions}
                placeholder='Selecione um paciente'
                readOnly={!!appointment || !!patientId}
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label isRequired>Data do atendimento</Label>
              <DateInput
                name='date'
                allowFutureDates
                startYear={TODAY.getFullYear() - 4}
                endYear={MAX_APPOINTMENT_YEAR}
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label isRequired>Quadro geral</Label>
              <SelectInput
                name='condition'
                options={PATIENT_CONDITION_OPTIONS}
              />
            </LabelWrapper>

            {!isUserSpecialist && (
              <>
                <LabelWrapper>
                  <Label isRequired>Categoria</Label>
                  <SelectInput
                    name='category'
                    readOnly={!isCreateMode}
                    options={SPECIALTIES_OPTIONS}
                  />
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Profissional responsável</Label>
                  <TextInput
                    name='professionalName'
                    readOnly={!isCreateMode}
                    placeholder='Insira o nome'
                  />
                </LabelWrapper>
              </>
            )}

            <LabelWrapper className='col-span-full'>
              <Label>Observações</Label>
              <TextareaInput
                rows={9}
                showCounter
                maxLength={500}
                name='annotation'
                placeholder='Insira observações sobre o paciente'
              />
            </LabelWrapper>
          </FormContainer>
        </FormProvider>
      </DialogContent>

      <DialogFooter>
        <Button
          form={formId}
          className='md:flex-1'
          loading={formMethods.formState.isSubmitting}
          onClick={formMethods.handleSubmit(submitForm)}
        >
          {isCreateMode ? 'Cadastrar' : 'Atualizar'}
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
