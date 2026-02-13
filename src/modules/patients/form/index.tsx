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
import { useState } from 'react'
import React from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ComboboxInput } from '@/components/form/combobox-input'
import { DateInput } from '@/components/form/date-input'
import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { NEXT_CACHE_TAGS, QUERY_CACHE_KEYS } from '@/constants/cache'
import { ROUTES } from '@/constants/routes'
import {
  PATIENT_GENDER_OPTIONS,
  PATIENT_NMO_DIAGNOSTIC_OPTIONS,
  PATIENT_RACE_OPTIONS,
} from '@/enums/patients'
import {
  BRAZILIAN_STATES_OPTIONS,
  type UF,
  YES_OR_NO_OPTIONS,
} from '@/enums/shared'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { useCities } from '@/hooks/cities'
import { api } from '@/lib/api'
import type { Patient } from '@/types/patients.d.ts'
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'
import { removeNonNumbers } from '@/utils/sanitizers'

import CancelPatientFormModal from './cancel-modal'
import { type PatientFormSchema, patientFormSchema } from './schema'

type Action = 'view' | 'edit' | 'create'

interface PatientFormProps {
  patient?: Patient
  mode?: Action
}

export function PatientForm({
  patient,
  mode = 'view',
}: Readonly<PatientFormProps>) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [action, setAction] = useState<Action>(mode)

  const router = useRouter()

  const patientSupports = patient?.supports?.map((support) => ({
    ...support,
    phone: formatPhoneNumber(support.phone),
  })) ?? [{ name: '', phone: '', kinship: '' }]

  const formMethods = useForm<PatientFormSchema>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: patient?.name || '',
      date_of_birth: patient?.date_of_birth || '',
      cpf: patient?.cpf ? formatCpfNumber(patient.cpf) : '',
      gender: patient?.gender || '',
      race: patient?.race || '',
      phone: patient?.phone ? formatPhoneNumber(patient.phone) : '',
      state: patient?.state || '',
      city: patient?.city || '',
      email: patient?.email || '',
      has_disability: patient?.has_disability ? 'yes' : 'no',
      disability_desc: patient?.disability_desc || '',
      take_medication: patient?.take_medication ? 'yes' : 'no',
      medication_desc: patient?.medication_desc || '',
      nmo_diagnosis: patient?.nmo_diagnosis || '',
      need_legal_assistance: patient?.need_legal_assistance ? 'yes' : 'no',
      supports: patientSupports,
    } as unknown as PatientFormSchema,
    mode: 'onBlur',
  })

  const supportMethods = useFieldArray({
    control: formMethods.control,
    name: 'supports',
  })

  const selectedUF = formMethods.watch('state') as UF
  const cityOptions = useCities(selectedUF)
  const isViewMode = action === 'view'

  const submitButtonContent = {
    create: { icon: <UserPlus2Icon />, label: 'Cadastrar' },
    edit: { icon: <CircleCheckIcon />, label: 'Salvar' },
    view: null,
  }
  const submitButton = submitButtonContent[action]

  function handleSelectState(value: UF) {
    formMethods.setValue('state', value)
    formMethods.setValue('city', '')
    formMethods.clearErrors('state')
    formMethods.clearErrors('city')
  }

  function handleCancel() {
    if (action === 'create') {
      setIsCancelModalOpen(true)
      return
    }
    setAction('view')
    formMethods.reset()
  }

  async function createPatient(data: PatientFormSchema) {
    const payload = {
      ...data,
      phone: removeNonNumbers(data.phone),
      cpf: removeNonNumbers(data.cpf),
      has_disability: data.has_disability === 'yes',
      need_legal_assistance: data.need_legal_assistance === 'yes',
      take_medication: data.take_medication === 'yes',
      supports: data.supports.map((support) => ({
        ...support,
        phone: removeNonNumbers(support.phone),
      })),
    }

    return await api('/patients', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  async function submitForm(data: PatientFormSchema) {
    if (action === 'edit') {
      // TODO: Implement update patient request
      console.log(data)
      return
    }

    const response = await createPatient(data)

    if (!response.success) {
      toast.error(response.message)
      return
    }

    revalidateClientCache([
      QUERY_CACHE_KEYS.patients.main,
      QUERY_CACHE_KEYS.patients.allOptions,
    ])

    if (action === 'create') {
      revalidateServerCache(NEXT_CACHE_TAGS.statistics.totalPatients.main)
    }

    toast.success(response.message)
    router.push(ROUTES.dashboard.patients.main)
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(submitForm)}>
        <FormField className='grid gap-4 lg:grid-cols-7'>
          <TextInput
            name='name'
            label='Nome completo'
            maxLength={64}
            placeholder='Insira o nome completo'
            wrapperClassName='lg:col-span-3'
            isRequired={!isViewMode}
            readOnly={isViewMode}
          />
          <DateInput
            name='date_of_birth'
            label='Data de nascimento'
            navMode='dropdown'
            placeholder='Selecione a data'
            wrapperClassName='lg:col-span-2'
            isRequired={!isViewMode}
            readOnly={isViewMode}
          />
          <TextInput
            name='cpf'
            label='CPF'
            mask='cpf'
            inputMode='numeric'
            maxLength={14}
            placeholder='000.000.000-00'
            wrapperClassName='lg:col-span-2'
            isRequired={!isViewMode}
            readOnly={isViewMode}
          />

          <TextInput
            name='phone'
            label='Telefone (WhatsApp)'
            mask='phone'
            inputMode='tel'
            maxLength={15}
            placeholder='(00) 00000-0000'
            wrapperClassName='lg:col-span-2'
            isRequired={!isViewMode}
            readOnly={isViewMode}
          />
          <ComboboxInput
            name='state'
            label='Estado'
            options={BRAZILIAN_STATES_OPTIONS}
            onValueChange={handleSelectState}
            placeholder='Selecione o estado'
            className='lg:col-span-2'
            isRequired={!isViewMode}
            readOnly={isViewMode}
          />
          <ComboboxInput
            name='city'
            label='Cidade'
            options={cityOptions}
            placeholder='Selecione a cidade'
            className='lg:col-span-3'
            isRequired={!isViewMode}
            readOnly={isViewMode}
            disabled={!selectedUF}
          />

          <SelectInput
            name='gender'
            label='Gênero'
            options={PATIENT_GENDER_OPTIONS}
            placeholder='Selecione o gênero'
            className='lg:col-span-2'
            isRequired={!isViewMode}
            readOnly={isViewMode}
          />
          <SelectInput
            name='race'
            label='Raça ou Cor'
            options={PATIENT_RACE_OPTIONS}
            placeholder='Selecione a raça ou cor'
            className='lg:col-span-2'
            isRequired={!isViewMode}
            readOnly={isViewMode}
          />
          <TextInput
            name='email'
            label='E-mail'
            inputMode='email'
            maxLength={64}
            placeholder='Insira o e-mail'
            wrapperClassName='lg:col-span-3'
            isRequired={!isViewMode}
            readOnly={isViewMode}
          />
        </FormField>

        <Divider />

        <FormField className='grid gap-4 lg:grid-cols-3'>
          <SelectInput
            name='has_disability'
            label='Possui alguma deficiência?'
            options={YES_OR_NO_OPTIONS}
            placeholder='Teste'
            className='lg:col-span-1'
            isRequired={!isViewMode}
            readOnly={isViewMode}
          />
          <TextInput
            name='disability_desc'
            label='Se sim, qual?'
            maxLength={500}
            wrapperClassName='lg:col-span-2'
            readOnly={isViewMode}
            disabled={formMethods.watch('has_disability') === 'no'}
          />

          <SelectInput
            name='take_medication'
            label='Usa medicamento regularmente?'
            options={YES_OR_NO_OPTIONS}
            isRequired={!isViewMode}
            className='lg:col-span-1'
            readOnly={isViewMode}
          />
          <TextInput
            name='medication_desc'
            label='Se sim, qual?'
            maxLength={500}
            wrapperClassName='lg:col-span-2'
            readOnly={isViewMode}
            disabled={formMethods.watch('take_medication') === 'no'}
          />

          <SelectInput
            name='nmo_diagnosis'
            label='Possui diagnóstico de NMO?'
            options={PATIENT_NMO_DIAGNOSTIC_OPTIONS}
            className='lg:col-span-2'
            isRequired={!isViewMode}
            readOnly={isViewMode}
          />
          <SelectInput
            name='need_legal_assistance'
            label='Precisa de assistência legal?'
            options={YES_OR_NO_OPTIONS}
            className='lg:col-span-1'
            isRequired={!isViewMode}
            readOnly={isViewMode}
          />
        </FormField>

        <Divider />

        <section>
          <h1 className='text-xl font-medium'>Rede de apoio</h1>
          <div className='mt-6 space-y-6'>
            {supportMethods.fields.map((support, index) => (
              <fieldset
                data-first={index === 0}
                className='border-border flex items-start gap-4 max-lg:flex-col data-[first=false]:max-lg:border-t data-[first=false]:max-lg:pt-4'
                key={support.id}
              >
                <TextInput
                  name={`supports.${index}.name`}
                  label='Nome completo'
                  maxLength={64}
                  placeholder='Insira o nome completo'
                  wrapperClassName='flex-1'
                  isRequired
                />
                <TextInput
                  name={`supports.${index}.kinship`}
                  label='Parentesco'
                  maxLength={32}
                  placeholder='Insira o parentesco'
                  wrapperClassName='lg:w-44'
                  isRequired
                />
                <TextInput
                  name={`supports.${index}.phone`}
                  label='Telefone (WhatsApp)'
                  mask='phone'
                  maxLength={15}
                  placeholder='(00) 00000-0000'
                  wrapperClassName={
                    index === 0 && !isViewMode ? 'lg:w-58' : 'lg:w-44'
                  }
                  readOnly={isViewMode}
                  isRequired
                />
                {index > 0 && !isViewMode && (
                  <Button
                    size='icon'
                    type='button'
                    variant='ghost'
                    className='text-error max-lg:w-full max-lg:border lg:mt-7'
                    onClick={() => supportMethods.remove(index)}
                  >
                    <Trash2Icon />
                  </Button>
                )}
              </fieldset>
            ))}
            {action !== 'view' && (
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  supportMethods.append({ name: '', kinship: '', phone: '' })
                }
              >
                <PlusIcon /> Adicionar novo contato
              </Button>
            )}
          </div>
        </section>

        <div className='mt-3 flex flex-row-reverse gap-2 max-lg:flex-col'>
          {isViewMode && (
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
              className='lg:w-48'
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
          {isCancelModalOpen && (
            <CancelPatientFormModal onConfirm={() => router.back()} />
          )}
        </Dialog>
      </FormContainer>
    </FormProvider>
  )
}
