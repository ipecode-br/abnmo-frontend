'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  CircleCheckIcon,
  CircleXIcon,
  ClipboardEditIcon,
  PlusIcon,
  Trash2Icon,
  UserPlus2Icon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { ComboboxInput } from '@/components/form/combobox-input'
import { DateInput } from '@/components/form/date-input'
import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { Label, LabelWrapper } from '@/components/ui/label'
import { NEXT_CACHE_TAGS, QUERY_CACHE_KEYS } from '@/constants/cache'
import { ROUTES } from '@/constants/routes'
import { PATIENT_NMO_DIAGNOSTIC_OPTIONS } from '@/enums/patients'
import {
  BRAZIL_STATE_OPTIONS,
  type BrazilState,
  GENDER_OPTIONS,
  RACE_OPTIONS,
  YES_OR_NO_OPTIONS,
} from '@/enums/shared'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { useCities } from '@/hooks/cities'
import { usePermissions } from '@/hooks/use-permissions'
import { api } from '@/lib/api'
import type { Patient } from '@/types/patients.d.ts'
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'
import { parseDateOnly } from '@/utils/parse-date-only'
import { removeNonNumbers } from '@/utils/sanitizers'

import CancelPatientFormModal from './cancel-modal'
import { getPatientFormSchema } from './schema'

type Mode = 'view' | 'edit' | 'create'

interface PatientFormProps {
  patient?: Patient
  mode?: Mode
}

export function PatientForm({
  patient,
  mode = 'view',
}: Readonly<PatientFormProps>) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [action, setAction] = useState<Mode>(mode)
  const { canUser } = usePermissions()
  const router = useRouter()

  const canUpdatePatient = canUser('update:patient')
  const isCreateForm = action === 'create'
  const isViewMode = action === 'view'

  const patientFormSchema = useMemo(
    () => getPatientFormSchema(action),
    [action],
  )
  type PatientFormSchema = z.infer<typeof patientFormSchema>

  const formMethods = useForm<PatientFormSchema>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: patient?.name || '',
      dateOfBirth: patient?.dateOfBirth
        ? parseDateOnly(patient.dateOfBirth).toISOString()
        : '',
      cpf: patient?.cpf ? formatCpfNumber(patient.cpf) : '',
      gender: patient?.gender || '',
      race: patient?.race || '',
      phone: patient?.phone ? formatPhoneNumber(patient.phone) : '',
      email: patient?.email || '',
      supports: isCreateForm
        ? [{ name: '', phone: '', kinship: '' }]
        : undefined,
    } as unknown as PatientFormSchema,
    mode: 'onBlur',
  })

  const supportMethods = useFieldArray({
    control: formMethods.control,
    name: 'supports',
  })

  const [selectedUF, hasDisability, takeMedication] = useWatch({
    control: formMethods.control,
    name: ['state', 'hasDisability', 'takeMedication'],
  })
  const cityOptions = useCities(selectedUF)

  const submitButtons = {
    create: { icon: <UserPlus2Icon />, label: 'Cadastrar' },
    edit: { icon: <CircleCheckIcon />, label: 'Salvar' },
    view: null,
  }
  const submitButton = submitButtons[action]

  function handleSelectState(value: string) {
    formMethods.setValue('state', value as BrazilState)
    formMethods.setValue('city', '')
    formMethods.clearErrors('state')
    formMethods.clearErrors('city')
  }

  function handleCancel() {
    if (isCreateForm) {
      setIsCancelModalOpen(true)
      return
    }
    formMethods.reset()
    setAction('view')
  }

  async function submitForm(data: PatientFormSchema) {
    const body = {
      ...data,
      phone: removeNonNumbers(data.phone),
      cpf: removeNonNumbers(data.cpf),
      hasDisability: data.hasDisability === 'yes',
      needLegalAssistance: data.needLegalAssistance === 'yes',
      takeMedication: data.takeMedication === 'yes',
      supports: isCreateForm
        ? data.supports?.map((support) => ({
            ...support,
            phone: removeNonNumbers(support.phone),
          }))
        : undefined,
    }

    const response = isCreateForm
      ? await api('/patients', { method: 'POST', body })
      : await api(`/patients/${patient?.id}`, { method: 'PUT', body })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    toast.success(response.message)

    revalidateClientCache([
      QUERY_CACHE_KEYS.patients.main,
      QUERY_CACHE_KEYS.patients.allOptions,
    ])

    if (patient) {
      revalidateServerCache(NEXT_CACHE_TAGS.patient(patient.id))
      setAction('view')
    }

    if (isCreateForm) {
      revalidateServerCache(NEXT_CACHE_TAGS.statistics.totalPatients.main)
      router.push(ROUTES.dashboard.patients.main)
    }
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(submitForm)}>
        <LabelWrapper className='lg:col-span-3'>
          <Label isRequired>Nome completo</Label>
          <TextInput
            name='name'
            maxLength={64}
            placeholder='Insira o nome completo'
            readOnly={isViewMode}
          />
        </LabelWrapper>
        <LabelWrapper className='lg:col-span-2'>
          <Label>Data de nascimento</Label>
          <DateInput name='dateOfBirth' disabled={isViewMode} />
        </LabelWrapper>
        <LabelWrapper className='lg:col-span-2'>
          <Label isRequired>CPF</Label>
          <TextInput
            name='cpf'
            mask='cpf'
            inputMode='numeric'
            maxLength={14}
            placeholder='000.000.000-00'
            readOnly={isViewMode}
          />
        </LabelWrapper>

        <LabelWrapper className='lg:col-span-2'>
          <Label isRequired>Telefone (WhatsApp)</Label>
          <TextInput
            name='phone'
            mask='phone'
            inputMode='tel'
            maxLength={15}
            placeholder='(00) 00000-0000'
            readOnly={isViewMode}
          />
        </LabelWrapper>
        <LabelWrapper className='lg:col-span-2'>
          <Label isRequired>Estado</Label>
          <ComboboxInput
            name='state'
            options={BRAZIL_STATE_OPTIONS}
            onChange={handleSelectState}
            placeholder='Selecione o estado'
            readOnly={isViewMode}
          />
        </LabelWrapper>
        <LabelWrapper className='lg:col-span-2'>
          <Label isRequired>Cidade</Label>
          <ComboboxInput
            name='city'
            options={cityOptions}
            placeholder='Selecione a cidade'
            readOnly={isViewMode}
            disabled={!selectedUF}
          />
        </LabelWrapper>

        <LabelWrapper className='lg:col-span-2'>
          <Label isRequired>Gênero</Label>
          <SelectInput
            name='gender'
            options={GENDER_OPTIONS}
            readOnly={isViewMode}
          />
        </LabelWrapper>
        <LabelWrapper className='lg:col-span-2'>
          <Label isRequired>Raça ou Cor</Label>
          <SelectInput
            name='race'
            options={RACE_OPTIONS}
            readOnly={isViewMode}
          />
        </LabelWrapper>
        <LabelWrapper className='lg:col-span-3'>
          <Label isRequired>E-mail</Label>
          <TextInput
            name='email'
            inputMode='email'
            maxLength={64}
            placeholder='Insira o e-mail'
            readOnly={isViewMode}
          />
        </LabelWrapper>

        <Divider />

        <LabelWrapper className='lg:col-span-1'>
          <Label isRequired>Possui alguma deficiência?</Label>
          <SelectInput
            name='hasDisability'
            options={YES_OR_NO_OPTIONS}
            readOnly={isViewMode}
          />
        </LabelWrapper>
        <LabelWrapper className='lg:col-span-2'>
          <Label>Se sim, qual?</Label>
          <TextInput
            name='disabilityDesc'
            maxLength={500}
            readOnly={isViewMode}
            disabled={hasDisability === 'no'}
          />
        </LabelWrapper>

        <LabelWrapper className='lg:col-span-1'>
          <Label isRequired>Usa medicamento regularmente?</Label>
          <SelectInput
            name='takeMedication'
            options={YES_OR_NO_OPTIONS}
            readOnly={isViewMode}
          />
        </LabelWrapper>
        <LabelWrapper className='lg:col-span-2'>
          <Label>Se sim, qual?</Label>
          <TextInput
            name='medicationDesc'
            maxLength={500}
            readOnly={isViewMode}
            disabled={takeMedication === 'no'}
          />
        </LabelWrapper>

        <LabelWrapper className='lg:col-span-2'>
          <Label isRequired>Possui diagnóstico de NMO?</Label>
          <SelectInput
            name='nmoDiagnosis'
            options={PATIENT_NMO_DIAGNOSTIC_OPTIONS}
            readOnly={isViewMode}
          />
        </LabelWrapper>
        <LabelWrapper className='lg:col-span-1'>
          <Label isRequired>Precisa de assistência legal?</Label>
          <SelectInput
            name='needLegalAssistance'
            options={YES_OR_NO_OPTIONS}
            readOnly={isViewMode}
          />
        </LabelWrapper>

        {isCreateForm && (
          <>
            <Divider />
            <section>
              <h2 className='text-xl font-medium'>Rede de apoio</h2>
              <div className='mt-6 space-y-6'>
                {supportMethods.fields.map((support, index) => (
                  <fieldset
                    data-first={index === 0}
                    className='border-border flex items-start gap-4 max-lg:flex-col data-[first=false]:max-lg:border-t data-[first=false]:max-lg:pt-4'
                    key={support.id}
                  >
                    <LabelWrapper className='flex-1'>
                      <Label isRequired>Nome completo</Label>
                      <TextInput
                        name={`supports.${index}.name`}
                        maxLength={64}
                        placeholder='Insira o nome completo'
                      />
                    </LabelWrapper>
                    <LabelWrapper className='lg:w-44'>
                      <Label isRequired>Parentesco</Label>
                      <TextInput
                        name={`supports.${index}.kinship`}
                        maxLength={32}
                        placeholder='Insira o parentesco'
                      />
                    </LabelWrapper>
                    <LabelWrapper
                      className={
                        index === 0 && !isViewMode ? 'lg:w-58' : 'lg:w-44'
                      }
                    >
                      <Label isRequired>Telefone (WhatsApp)</Label>
                      <TextInput
                        name={`supports.${index}.phone`}
                        mask='phone'
                        maxLength={15}
                        placeholder='(00) 00000-0000'
                        readOnly={isViewMode}
                      />
                    </LabelWrapper>
                    {index > 0 && !isViewMode && (
                      <Button
                        type='button'
                        variant='ghost'
                        className='text-error size-10 max-lg:w-full max-lg:border lg:mt-7'
                        onClick={() => supportMethods.remove(index)}
                      >
                        <Trash2Icon />
                      </Button>
                    )}
                  </fieldset>
                ))}
                <Button
                  size='sm'
                  type='button'
                  variant='outline'
                  onClick={() =>
                    supportMethods.append({ name: '', kinship: '', phone: '' })
                  }
                >
                  <PlusIcon /> Adicionar contato
                </Button>
              </div>
            </section>
          </>
        )}

        <div className='flex flex-row-reverse gap-2 max-lg:mt-4 max-lg:flex-col'>
          {isViewMode && patient?.status === 'active' && canUpdatePatient && (
            <Button
              type='button'
              variant='outline'
              onClick={() => setAction('edit')}
            >
              <ClipboardEditIcon /> Editar
            </Button>
          )}

          {!isViewMode && (
            <Button
              type='submit'
              className='min-w-36'
              loading={formMethods.formState.isSubmitting}
            >
              {submitButton?.icon} {submitButton?.label}
            </Button>
          )}

          {!isViewMode && (
            <Button
              type='button'
              variant='outline'
              disabled={formMethods.formState.isSubmitting}
              onClick={handleCancel}
            >
              <CircleXIcon /> Cancelar
            </Button>
          )}
        </div>

        <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
          <CancelPatientFormModal
            onConfirm={() => router.push(ROUTES.dashboard.patients.main)}
          />
        </Dialog>
      </FormContainer>
    </FormProvider>
  )
}
