'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheckIcon, CircleXIcon, ClipboardEditIcon } from 'lucide-react'
import { useState } from 'react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { DateInput } from '@/components/form/date-input'
import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import {
  BRAZILIAN_STATES_OPTIONS,
  type UFType,
  YES_OR_NO_OPTIONS,
} from '@/constants/enums'
import { useCities } from '@/hooks/cities'
import { GENDERS_OPTIONS, PatientType } from '@/types/patients'
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'
import { formatDate } from '@/utils/formatters/format-date'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

import {
  type PatientsInfoFormSchema,
  patientsInfoFormSchema,
} from './form-schema'

type FormStateType = 'view' | 'edit'

interface PatientsInfoFormProps {
  patient?: PatientType | null
  mode?: FormStateType
}

export function PatientsInfoForm({
  patient,
  mode = 'view',
}: PatientsInfoFormProps) {
  const [formState, setFormState] = useState<FormStateType>(mode)

  const defaultValues: PatientsInfoFormSchema = {
    name: patient?.name ?? '',
    gender: patient?.gender ?? '',
    date_of_birth: patient?.date_of_birth
      ? formatDate(patient.date_of_birth, { dateStyle: 'short' })
      : '',
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
  }

  const formMethods = useForm<PatientsInfoFormSchema>({
    resolver: zodResolver(patientsInfoFormSchema),
    defaultValues,
    mode: 'onBlur',
  })
  const { clearErrors, setValue, watch } = formMethods

  const patientSupports =
    patient?.supports && patient.supports.length > 0
      ? patient.supports.map((support) => ({
          ...support,
          phone: formatPhoneNumber(support.phone),
        }))
      : []

  const selectedUF = watch('state') as UFType
  const cities = useCities(selectedUF)
  const isViewMode = formState === 'view'
  const showPatientSupports = patientSupports.length > 0

  function handleSelectState(value: UFType) {
    setValue('state', value)
    setValue('city', '')
    clearErrors('state')
    clearErrors('city')
  }

  function submitForm(data: PatientsInfoFormSchema) {
    console.log(data)
  }

  function handleCancel() {
    formMethods.reset(defaultValues)
    setFormState('view')
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
          wrapperClassName='sm:col-span-2'
        />
        <DateInput
          name='date_of_birth'
          label='Data de nascimento'
          navMode='dropdown'
          blockFutureDates
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
          wrapperClassName='sm:col-span-2'
          message={mode === 'view' ? '' : 'Insira somente números'}
        />

        <SelectInput
          name='gender'
          label='Gênero'
          options={GENDERS_OPTIONS}
          readOnly={isViewMode}
          isRequired={!isViewMode}
          wrapperClassName='sm:col-span-2'
        />
        <SelectInput
          name='state'
          label='Estado'
          options={BRAZILIAN_STATES_OPTIONS}
          onValueChange={handleSelectState}
          readOnly={isViewMode}
          disabled={!selectedUF}
          isRequired={!isViewMode}
          wrapperClassName='sm:col-span-2'
        />
        <SelectInput
          name='city'
          label='Cidade'
          options={cities}
          readOnly={isViewMode}
          isRequired={!isViewMode}
          wrapperClassName='sm:col-span-2'
          placeholder='Selecione sua cidade'
        />

        <TextInput
          name='phone'
          label='Telefone (WhatsApp)'
          mask='phone'
          inputMode='tel'
          readOnly={isViewMode}
          isRequired={!isViewMode}
          wrapperClassName='sm:col-span-3'
          message={mode === 'view' ? '' : 'Insira somente números'}
        />
        <TextInput
          name='email'
          label='E-mail'
          inputMode='email'
          readOnly={isViewMode}
          isRequired={!isViewMode}
          wrapperClassName='sm:col-span-3'
        />

        <Divider className='sm:col-span-6' />

        <SelectInput
          name='has_disability'
          label='Possui alguma deficiência?'
          options={YES_OR_NO_OPTIONS}
          readOnly={isViewMode}
          isRequired={!isViewMode}
          wrapperClassName='sm:col-span-2'
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
          wrapperClassName='sm:col-span-2'
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
          wrapperClassName='sm:col-span-3'
        />
        <SelectInput
          name='need_legal_assistance'
          label='Precisa de assistência legal?'
          options={YES_OR_NO_OPTIONS}
          readOnly={isViewMode}
          isRequired={!isViewMode}
          wrapperClassName='sm:col-span-3'
        />

        {showPatientSupports && (
          <>
            <Divider className='sm:col-span-6' />
            <div className='space-y-6 sm:col-span-6'>
              <h1 className='text-xl font-medium'>Rede de apoio</h1>
              <div className='grid gap-x-4 gap-y-6 sm:grid-cols-6'>
                {patientSupports.length >= 1 &&
                  patientSupports.map((support) => (
                    <React.Fragment key={support.id}>
                      <TextInput
                        name={`support_name_${support.id}`}
                        label='Nome completo'
                        value={support.name}
                        maxLength={50}
                        readOnly={isViewMode}
                        wrapperClassName='sm:col-span-3'
                      />
                      <TextInput
                        name={`support_kinship_${support.id}`}
                        label='Parentesco'
                        value={support.kinship}
                        maxLength={50}
                        readOnly={isViewMode}
                        wrapperClassName='sm:col-span-1'
                      />
                      <TextInput
                        name={`support_phone_${support.id}`}
                        label='Telefone (WhatsApp)'
                        value={support.phone}
                        readOnly={isViewMode}
                        wrapperClassName='sm:col-span-2'
                      />
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </>
        )}

        <div className='mt-3 flex justify-end gap-2 sm:col-span-6'>
          {formState === 'edit' ? (
            <>
              <Button
                type='button'
                variant='outline'
                className='w-fit'
                onClick={handleCancel}
              >
                <CircleXIcon /> Cancelar
              </Button>
              <Button
                type='submit'
                className='w-fit'
                onClick={() => setFormState('edit')}
              >
                <CircleCheckIcon /> Salvar
              </Button>
            </>
          ) : (
            <Button
              type='button'
              variant='outline'
              className='w-fit'
              onClick={() => setFormState('edit')}
            >
              <ClipboardEditIcon /> Editar
            </Button>
          )}
        </div>
      </FormContainer>
    </FormProvider>
  )
}
