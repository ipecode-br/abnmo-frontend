'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheckIcon, CircleXIcon, ClipboardEditIcon } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { BRAZILIAN_STATES_OPTIONS, YES_OR_NO } from '@/constants/enums'
import { convertObjectToOptions } from '@/helpers/convert-object-to-options'
import { GENDERS_OPTIONS, PatientType } from '@/types/patients'
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'
import { formatDate } from '@/utils/formatters/format-date'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

import {
  type PatientsInfoFormSchema,
  patientsInfoFormSchema,
} from './info-form-schema'

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
    name: patient?.user.name ?? '',
    gender: patient?.gender ?? '',
    date_of_birth: patient?.date_of_birth
      ? formatDate(patient.date_of_birth, { dateStyle: 'short' })
      : '',
    city: patient?.city ?? '',
    state: patient?.state ?? '',
    phone: patient?.phone ? formatPhoneNumber(patient.phone) : '',
    cpf: patient?.cpf ? formatCpfNumber(patient.cpf) : '',
    email: patient?.user.email ?? '',
    has_disability: patient?.has_disability ? 'yes' : 'no',
    disability_desc: patient?.disability_desc ?? '',
    need_legal_assistance: patient?.need_legal_assistance ? 'yes' : 'no',
    take_medication: patient?.take_medication ? 'yes' : 'no',
    medication_desc: patient?.medication_desc ?? '',
    has_nmo_diagnosis: patient?.has_nmo_diagnosis ? 'yes' : 'no',
    supports: patient?.supports ?? [],
  }

  const formMethods = useForm<PatientsInfoFormSchema>({
    resolver: zodResolver(patientsInfoFormSchema),
    defaultValues,
    mode: 'onBlur',
  })

  const isViewMode = formState === 'view'
  const patientSupports = patient?.supports || []

  const yesOrNoOptions = convertObjectToOptions(YES_OR_NO)

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
          wrapperClassName='sm:col-span-2'
          readOnly={isViewMode}
          isRequired
        />
        <TextInput
          name='date_of_birth'
          label='Data de nascimento'
          wrapperClassName='sm:col-span-2'
          readOnly={isViewMode}
          isRequired
        />
        <TextInput
          name='cpf'
          label='CPF'
          mask='cpf'
          inputMode='numeric'
          readOnly={isViewMode}
          wrapperClassName='sm:col-span-2'
          message={mode === 'view' ? '' : 'Insira somente números'}
          isRequired
        />

        <SelectInput
          name='gender'
          label='Gênero'
          options={GENDERS_OPTIONS}
          readOnly={isViewMode}
          wrapperClassName='sm:col-span-2'
          isRequired
        />
        <SelectInput
          name='state'
          label='Estado'
          options={BRAZILIAN_STATES_OPTIONS}
          readOnly={isViewMode}
          wrapperClassName='sm:col-span-2'
          isRequired
        />
        <SelectInput
          name='city'
          label='Cidade'
          options={[]}
          readOnly={isViewMode}
          wrapperClassName='sm:col-span-2'
          isRequired
        />

        <TextInput
          name='phone'
          label='Telefone (WhatsApp)'
          mask='phone'
          inputMode='tel'
          readOnly={isViewMode}
          message={mode === 'view' ? '' : 'Insira somente números'}
          wrapperClassName='sm:col-span-3'
          isRequired
        />
        <TextInput
          name='email'
          label='E-mail'
          inputMode='email'
          readOnly={isViewMode}
          wrapperClassName='sm:col-span-3'
          isRequired
        />

        <Divider className='sm:col-span-6' />

        <SelectInput
          name='has_disability'
          label='Possui alguma deficiência?'
          options={yesOrNoOptions}
          readOnly={isViewMode}
          wrapperClassName='sm:col-span-2'
          isRequired
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
          options={yesOrNoOptions}
          readOnly={isViewMode}
          wrapperClassName='sm:col-span-2'
          isRequired
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
          options={yesOrNoOptions}
          readOnly={isViewMode}
          wrapperClassName='sm:col-span-3'
          isRequired
        />
        <SelectInput
          name='need_legal_assistance'
          label='Precisa de assistência legal?'
          options={yesOrNoOptions}
          readOnly={isViewMode}
          wrapperClassName='sm:col-span-3'
          isRequired
        />

        <Divider className='sm:col-span-6' />

        <div className='space-y-6 sm:col-span-6'>
          <h1 className='text-xl font-medium'>Rede de apoio</h1>
          <div className='grid gap-x-4 gap-y-6 sm:grid-cols-6'>
            {patientSupports.length >= 1 && (
              <>
                <TextInput
                  name='support_name'
                  label='Nome completo'
                  maxLength={50}
                  readOnly={isViewMode}
                  wrapperClassName='sm:col-span-3'
                />
                <TextInput
                  name='support_kinship'
                  label='Parentesco'
                  maxLength={50}
                  readOnly={isViewMode}
                  wrapperClassName='sm:col-span-1'
                />
                <TextInput
                  name='support_phone'
                  label='Telefone (WhatsApp)'
                  readOnly={isViewMode}
                  wrapperClassName='sm:col-span-2'
                />
              </>
            )}
          </div>
        </div>

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
