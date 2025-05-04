'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { CpfInput } from '@/components/form/cpf-input'
import { FormContainer } from '@/components/form/form-container'
import { PhoneInput } from '@/components/form/phone-input'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { BRAZILIAN_STATES } from '@/constants/brazilian-states'
import { GENDERS } from '@/constants/genders'
import { ROUTES } from '@/constants/routes'
import { SCREENING_STORAGE_KEYS } from '@/constants/storage-keys'

import { useFormNavigation } from '../hooks/use-form-navigation'
import {
  patientDataFormDefaultValues,
  type PatientDataFormSchema,
  patientDataFormSchema,
} from './patient-data-form-schema'

export function PatientDataForm() {
  const { goPage, getStored } = useFormNavigation(
    SCREENING_STORAGE_KEYS.screening.patientData,
  )

  const formMethods = useForm<PatientDataFormSchema>({
    resolver: zodResolver(patientDataFormSchema),
    defaultValues: {
      ...patientDataFormDefaultValues,
      ...getStored(patientDataFormSchema),
    },
    mode: 'onBlur',
  })
  return (
    <FormProvider {...formMethods}>
      <FormContainer
        className='grid max-w-xl grid-cols-2'
        onSubmit={formMethods.handleSubmit((data) =>
          goPage({ data, path: ROUTES.screening.forms.medicalReport }),
        )}
      >
        <TextInput
          maxLength={100}
          name='name'
          label='Nome completo'
          placeholder='Insira seu nome completo'
          wrapperClassName='col-span-full'
          isRequired
        />

        <SelectInput
          name='gender'
          options={GENDERS}
          label='Gênero'
          placeholder='Selecione seu gênero'
          isRequired
        />
        <TextInput
          type='date'
          name='dateBirth'
          label='Data de nascimento'
          isRequired
        />

        <TextInput
          name='city'
          maxLength={50}
          label='Cidade'
          placeholder='Insira sua cidade'
          isRequired
        />
        <SelectInput
          name='state'
          label='Estado'
          isRequired
          placeholder='Selecione seu estado'
          options={BRAZILIAN_STATES}
        />
        <PhoneInput
          name='phone'
          label='Telefone'
          placeholder='Insira seu telefone'
          isRequired
        />

        <CpfInput
          name='cpf'
          label='CPF'
          placeholder='Insira seu CPF'
          isRequired
        />

        <Button type='submit' className='col-span-full mt-6'>
          Avançar
        </Button>
      </FormContainer>
    </FormProvider>
  )
}
