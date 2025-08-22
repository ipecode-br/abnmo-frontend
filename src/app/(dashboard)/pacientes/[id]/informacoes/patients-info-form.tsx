'use client'

import { useQuery } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'

import { getCitiesByUF } from '@/actions/ibge'
import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { BRAZILIAN_STATES } from '@/constants/brazilian-states'
import { GENDERS } from '@/constants/genders'
import { PatientType } from '@/types/patients'

interface PatientsInfoFormProps {
  patient?: PatientType
  mode?: 'view' | 'edit'
}

export function PatientsInfoForm({ patient, mode }: PatientsInfoFormProps) {
  const formMethods = useForm({
    defaultValues: {
      ...patient,

      has_disability: patient?.has_disability ? 'Sim' : 'Não',
      take_medication: patient?.take_medication ? 'Sim' : 'Não',
      has_nmo_diagnosis: patient?.has_nmo_diagnosis ? 'Sim' : 'Não',
      need_legal_assistance: patient?.need_legal_assistance ? 'Sim' : 'Não',
    },
    mode: 'onBlur',
  })
  const { watch } = formMethods
  const UF = watch('state') || ''
  const { data: cities, isLoading: isLoadingCities } = useQuery({
    queryKey: [`cities/${UF}`],
    queryFn: () => getCitiesByUF(UF),
  })

  const cityOptions = cities
    ? cities.map((city) => ({ label: city, value: city }))
    : []

  const booleanOptions = [
    { label: 'Sim', value: 'Sim' },
    { label: 'Não', value: 'Não' },
  ]

  return (
    <FormProvider {...formMethods}>
      <FormContainer>
        <div className='flex gap-x-4'>
          <TextInput
            label='Nome completo'
            maxLength={50}
            {...formMethods.register('user.name')}
            placeholder='Insira seu nome completo'
            disabled={mode === 'view'}
            isRequired={mode === 'edit'}
          />

          <TextInput
            name='date_of_birth'
            label='Data de nascimento'
            disabled={mode === 'view'}
            isRequired={mode === 'edit'}
          />
          <TextInput
            name='cpf'
            label='CPF'
            mask='cpf'
            placeholder='Insira seu CPF'
            message={mode === 'view' ? '' : 'Insira somente números'}
            inputMode='numeric'
            disabled={mode === 'view'}
            isRequired={mode === 'edit'}
          />
        </div>

        <div className='flex flex-auto gap-x-4'>
          <SelectInput
            name='gender'
            label='Gênero'
            options={GENDERS}
            placeholder='Selecione seu gênero'
            disabled={mode === 'view'}
            isRequired={mode === 'edit'}
          />
          <SelectInput
            name='state'
            label='Estado'
            options={BRAZILIAN_STATES}
            disabled={mode === 'view'}
            isRequired={mode === 'edit'}
          />
          <SelectInput
            name='city'
            label='Cidade'
            options={cityOptions}
            loading={!!UF && isLoadingCities}
            disabled={mode === 'view'}
            isRequired={mode === 'edit'}
          />
          <TextInput
            name='phone'
            label='Telefone'
            mask='phone'
            placeholder='Insira seu telefone'
            message={mode === 'view' ? '' : 'Insira somente números'}
            inputMode='tel'
            disabled={mode === 'view'}
            isRequired={mode === 'edit'}
          />
        </div>

        <div className='flex gap-x-4'>
          <SelectInput
            name='has_disability'
            label='Você possui alguma deficiência?'
            options={booleanOptions}
            disabled={mode === 'view'}
            isRequired={mode === 'edit'}
          />
          <TextInput
            name='disability_desc'
            label='Se sim, qual?'
            disabled={mode === 'view'}
          />
        </div>

        <div className='flex gap-x-4'>
          <SelectInput
            name='take_medication'
            label='Faz uso de algum medicamento regularmente?'
            options={booleanOptions}
            disabled={mode === 'view'}
            isRequired={mode === 'edit'}
          />
          <TextInput
            name='medication_desc'
            label='Se sim, qual?'
            disabled={mode === 'view'}
          />
        </div>

        <div className='flex gap-x-4'>
          <SelectInput
            name='has_nmo_diagnosis'
            label='Possui diagnóstico de NMO?'
            options={booleanOptions}
            disabled={mode === 'view'}
            isRequired={mode === 'edit'}
          />
          <SelectInput
            name='need_legal_assistance'
            label='Precisa de assistência legal?'
            options={booleanOptions}
            disabled={mode === 'view'}
          />
        </div>
        <Divider />
        {patient?.need_legal_assistance && (
          <>
            <h1 className='text-xl font-medium'>Rede de apoio</h1>

            <div className='flex gap-x-4'>
              <TextInput
                label='Nome do contato'
                {...formMethods.register('user.name')}
                disabled={mode === 'view'}
                isRequired={mode === 'edit'}
              />
              <TextInput
                label='Parentesco'
                {...formMethods.register('user.name')}
                disabled={mode === 'view'}
                isRequired={mode === 'edit'}
              />
              <TextInput
                name='phone'
                label='Telefone para contato (Whatsapp)'
                disabled={mode === 'view'}
                isRequired={mode === 'edit'}
              />
            </div>
          </>
        )}
        <Button
          type='button'
          variant='outline'
          className='text-primary ml-auto max-w-20'
        >
          Editar
        </Button>
      </FormContainer>
    </FormProvider>
  )
}
