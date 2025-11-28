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

import { DateInput } from '@/components/form/date-input'
import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import {
  BRAZILIAN_STATES_OPTIONS,
  type UF,
  YES_OR_NO_OPTIONS,
} from '@/constants/enums'
import { ROUTES } from '@/constants/routes'
import { useCities } from '@/hooks/cities'
import { api } from '@/lib/api'
import { queryClient } from '@/lib/tanstack-query'
import { GENDER_OPTIONS, Patient } from '@/types/patients'
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'
import { removeNonNumbers } from '@/utils/sanitizers'

import { ComboboxInput } from '../form/combobox-input'
import { Dialog } from '../ui/dialog'
import CancelPatientCreationModal from './cancel-patient-creation-modal'
import { type PatientsFormSchema, patientsFormSchema } from './form-schema'

type PatientsFormModeType = 'view' | 'edit' | 'create'

interface PatientsFormProps {
  patient?: Patient | null
  mode?: PatientsFormModeType
}

export function PatientsForm({
  patient,
  mode = 'view',
}: Readonly<PatientsFormProps>) {
  const [isCancelConfirmModalOpen, setIsCancelConfirmModalOpen] =
    useState(false)
  const [formState, setFormState] = useState<PatientsFormModeType>(mode)

  const router = useRouter()

  const defaultValues: PatientsFormSchema = {
    name: patient?.name ?? '',
    gender: patient?.gender ?? '',
    date_of_birth: patient?.date_of_birth ?? '',
    city: patient?.city ?? '',
    state: patient?.state ?? '',
    phone: patient?.phone ? formatPhoneNumber(patient.phone) : '',
    cpf: patient?.cpf ? formatCpfNumber(patient.cpf) : '',
    email: patient?.email ?? '',
    has_disability: patient?.has_disability ? 'yes' : 'no',
    disability_desc: patient?.disability_desc ?? '',
    need_legal_assistance: patient?.need_legal_assistance ? 'yes' : 'no',
    take_medication: patient?.take_medication ? 'yes' : 'no',
    medication_desc: patient?.medication_desc ?? '',
    has_nmo_diagnosis: patient?.has_nmo_diagnosis ? 'yes' : 'no',
    supports: patient?.supports?.map((support) => ({
      ...support,
      phone: formatPhoneNumber(support.phone),
    })) ?? [{ name: '', phone: '', kinship: '' }],
  }

  const formMethods = useForm<PatientsFormSchema>({
    resolver: zodResolver(patientsFormSchema),
    defaultValues,
    mode: 'onBlur',
  })
  const { clearErrors, setValue, watch, control } = formMethods
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'supports',
  })

  const patientSupports =
    patient?.supports && patient.supports.length > 0
      ? patient.supports.map((support) => ({
          ...support,
          phone: formatPhoneNumber(support.phone),
        }))
      : []

  const selectedUF = watch('state') as UF
  const cities = useCities(selectedUF)

  const isViewMode = formState === 'view'

  function handleSelectState(value: string) {
    setValue('state', value)
    setValue('city', '')
    clearErrors('state')
    clearErrors('city')
  }

  function handleCancel() {
    if (formState === 'create') {
      setIsCancelConfirmModalOpen(true)
      return
    }
    setFormState('view')
    formMethods.reset()
  }

  async function submitForm(data: PatientsFormSchema) {
    if (formState === 'edit') {
      // TODO: Implement update patient request
      console.log(data)
      return
    }

    const patient = patientsFormSchema.safeParse(data)

    if (!patient.success) {
      toast.error(
        'Verifique se todos os dados estão corretos e tente novamente!',
      )
      return
    }

    const supports =
      data.supports && data.supports.length > 0
        ? data.supports.map((contact) => ({
            ...contact,
            phone: removeNonNumbers(contact.phone),
          }))
        : undefined

    const payload = {
      ...patient.data,
      phone: removeNonNumbers(patient.data.phone),
      cpf: removeNonNumbers(patient.data.cpf),
      has_disability: patient.data.has_disability === 'yes',
      disability_desc: patient.data.disability_desc ?? null,
      need_legal_assistance: patient.data.need_legal_assistance === 'yes',
      take_medication: patient.data.take_medication === 'yes',
      medication_desc: patient.data.medication_desc ?? null,
      has_nmo_diagnosis: patient.data.has_nmo_diagnosis === 'yes',
      supports,
    }

    const response = await api('/patients', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    queryClient.invalidateQueries({ queryKey: [QUERY_CACHE_KEYS.patients] })
    toast.success(response.message)
    formMethods.reset()

    router.push(ROUTES.dashboard.patients.main)
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer
        className='grid gap-x-4 sm:grid-cols-6'
        onSubmit={formMethods.handleSubmit(submitForm)}
      >
        <TextInput
          name='name'
          label='Nome completo'
          maxLength={50}
          readOnly={isViewMode}
          isRequired={!isViewMode}
          placeholder='Insira o nome completo'
          wrapperClassName='sm:col-span-2'
        />
        <DateInput
          name='date_of_birth'
          label='Data de nascimento'
          navMode='dropdown'
          readOnly={isViewMode}
          isRequired={!isViewMode}
          wrapperClassName='sm:col-span-2'
        />
        <TextInput
          name='cpf'
          label='CPF'
          mask='cpf'
          inputMode='numeric'
          readOnly={isViewMode}
          isRequired={!isViewMode}
          placeholder='000.000.000-00'
          wrapperClassName='sm:col-span-2'
        />

        <SelectInput
          name='gender'
          label='Gênero'
          options={GENDER_OPTIONS}
          readOnly={isViewMode}
          isRequired={!isViewMode}
          placeholder='Selecione o gênero'
          className='sm:col-span-2'
        />

        <ComboboxInput
          name='state'
          label='Estado'
          options={BRAZILIAN_STATES_OPTIONS}
          placeholder='Selecione o estado'
          className='sm:col-span-2'
          isRequired={!isViewMode}
          onValueChange={handleSelectState}
        />

        <ComboboxInput
          name='city'
          label='Cidade'
          options={cities}
          readOnly={isViewMode}
          isRequired={!isViewMode}
          disabled={!selectedUF}
          placeholder='Selecione a cidade'
          className='sm:col-span-2'
        />

        <TextInput
          name='phone'
          label='Telefone (WhatsApp)'
          mask='phone'
          inputMode='tel'
          readOnly={isViewMode}
          isRequired={!isViewMode}
          placeholder='(00) 00000-0000'
          wrapperClassName='sm:col-span-3'
        />
        <TextInput
          name='email'
          label='E-mail'
          inputMode='email'
          readOnly={isViewMode}
          isRequired={!isViewMode}
          placeholder='Insira o e-mail'
          wrapperClassName='sm:col-span-3'
        />

        <Divider className='sm:col-span-6' />

        <SelectInput
          name='has_disability'
          label='Possui alguma deficiência?'
          options={YES_OR_NO_OPTIONS}
          readOnly={isViewMode}
          isRequired={!isViewMode}
          className='sm:col-span-2'
        />
        <TextInput
          name='disability_desc'
          label='Se sim, qual?'
          readOnly={isViewMode}
          wrapperClassName='sm:col-span-4'
          disabled={formMethods.watch('has_disability') === 'no'}
        />

        <SelectInput
          name='take_medication'
          label='Usa medicamento regularmente?'
          options={YES_OR_NO_OPTIONS}
          readOnly={isViewMode}
          isRequired={!isViewMode}
          className='sm:col-span-2'
        />
        <TextInput
          name='medication_desc'
          label='Se sim, qual?'
          readOnly={isViewMode}
          wrapperClassName='sm:col-span-4'
          disabled={formMethods.watch('take_medication') === 'no'}
        />

        <SelectInput
          name='has_nmo_diagnosis'
          label='Possui diagnóstico de NMO?'
          options={YES_OR_NO_OPTIONS}
          readOnly={isViewMode}
          isRequired={!isViewMode}
          className='sm:col-span-3'
        />
        <SelectInput
          name='need_legal_assistance'
          label='Precisa de assistência legal?'
          options={YES_OR_NO_OPTIONS}
          readOnly={isViewMode}
          isRequired={!isViewMode}
          className='sm:col-span-3'
        />

        {(formState === 'create' || patientSupports.length >= 1) && (
          <Divider className='sm:col-span-6' />
        )}

        {patientSupports.length >= 1 && (
          <div className='space-y-6 sm:col-span-6'>
            <h1 className='text-xl font-medium'>Rede de apoio</h1>
            <div className='grid gap-x-4 gap-y-6 sm:grid-cols-6'>
              {fields.map((support, index) => (
                <React.Fragment key={support.id}>
                  <TextInput
                    name={`supports.${index}.name`}
                    label='Nome completo'
                    maxLength={50}
                    readOnly={isViewMode}
                    wrapperClassName='sm:col-span-3'
                  />
                  <TextInput
                    name={`supports.${index}.kinship`}
                    label='Parentesco'
                    maxLength={50}
                    readOnly={isViewMode}
                    wrapperClassName='sm:col-span-1'
                  />
                  <div className='flex gap-1 sm:col-span-2'>
                    <TextInput
                      name={`supports.${index}.phone`}
                      label='Telefone (WhatsApp)'
                      readOnly={isViewMode}
                      mask='phone'
                    />
                    <Button
                      variant='ghost'
                      className='text-foreground-soft mt-6'
                      onClick={() => remove(index)}
                      disabled={isViewMode}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <Button
              variant='outline'
              className='text-primary'
              type='button'
              onClick={() => append({ name: '', kinship: '', phone: '' })}
              disabled={isViewMode}
            >
              <PlusIcon /> Adicionar novo contato
            </Button>
          </div>
        )}

        {formState === 'create' && (
          <div className='space-y-6 sm:col-span-6'>
            <h1 className='text-xl font-medium'>Rede de apoio</h1>
            <div className='grid gap-x-4 gap-y-6 sm:grid-cols-6'>
              {fields.map((support, index) => (
                <React.Fragment key={support.id}>
                  <TextInput
                    name={`supports.${index}.name`}
                    label='Nome completo'
                    maxLength={50}
                    isRequired
                    placeholder='Insira o nome completo'
                    wrapperClassName='sm:col-span-3'
                  />
                  <TextInput
                    name={`supports.${index}.kinship`}
                    label='Parentesco'
                    maxLength={50}
                    isRequired
                    placeholder='Selecione o parentesco'
                    wrapperClassName='sm:col-span-1'
                  />
                  <div className='flex items-end gap-1 sm:col-span-2'>
                    <TextInput
                      name={`supports.${index}.phone`}
                      label='Telefone (WhatsApp)'
                      readOnly={isViewMode}
                      mask='phone'
                      isRequired
                    />
                    <Button
                      size='icon'
                      type='button'
                      variant='ghost'
                      className='text-foreground-soft'
                      disabled={index === 0}
                      onClick={() => (index > 0 ? remove(index) : null)}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <Button
              type='button'
              variant='outline'
              onClick={() => append({ name: '', kinship: '', phone: '' })}
              disabled={isViewMode}
            >
              <PlusIcon /> Adicionar novo contato
            </Button>
          </div>
        )}

        <div className='mt-3 flex justify-end gap-2 sm:col-span-6'>
          {isViewMode && (
            <Button
              type='button'
              variant='outline'
              onClick={() => setFormState('edit')}
            >
              <ClipboardEditIcon /> Editar
            </Button>
          )}

          {!isViewMode && (
            <>
              <Button
                type='button'
                variant='outline'
                disabled={formMethods.formState.isSubmitting}
                onClick={handleCancel}
              >
                <CircleXIcon /> Cancelar
              </Button>
              <Button
                type='submit'
                loading={formMethods.formState.isSubmitting}
              >
                {formState === 'create' ? (
                  <>
                    <UserPlus2Icon />
                    <span>Cadastrar</span>
                  </>
                ) : (
                  <>
                    <CircleCheckIcon />
                    <span>Salvar</span>
                  </>
                )}
              </Button>
            </>
          )}
        </div>

        <Dialog
          open={isCancelConfirmModalOpen}
          onOpenChange={setIsCancelConfirmModalOpen}
        >
          {isCancelConfirmModalOpen && (
            <CancelPatientCreationModal onConfirm={() => router.back()} />
          )}
        </Dialog>
      </FormContainer>
    </FormProvider>
  )
}
