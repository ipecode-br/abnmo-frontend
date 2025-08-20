'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { PatientType } from '@/types/patients'

interface PatientsInfoFormProps {
  patient?: PatientType
  mode?: 'view' | 'edit'
}

export function PatientsInfoForm({ patient, mode }: PatientsInfoFormProps) {
  const formMethods = useForm({
    defaultValues: patient,
    mode: 'onBlur',
  })
  const isDisabled = mode === 'view'

  const genderOptions: { label: string; value: string }[] = patient?.gender
    ? [{ label: patient.gender, value: patient.gender }]
    : [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
      ]

  const stateOptions: { label: string; value: string }[] = patient?.state
    ? [{ label: patient.state, value: patient.state }]
    : [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
      ]
  const cityOptions: { label: string; value: string }[] = patient?.city
    ? [{ label: patient.city, value: patient.city }]
    : [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
      ]

  return (
    <FormProvider {...formMethods}>
      <FormContainer>
        <div className='flex gap-x-4'>
          <TextInput
            label='Nome completo'
            {...formMethods.register('user.name')}
            disabled={isDisabled}
          />
          <TextInput
            label='Data de nascimento'
            {...formMethods.register('date_of_birth')}
            disabled={isDisabled}
          />
          <TextInput
            label='CPF'
            {...formMethods.register(`cpf`)}
            disabled={isDisabled}
          />
        </div>

        <div className='flex flex-auto gap-x-4'>
          <SelectInput
            label='Gênero'
            options={genderOptions}
            {...formMethods.register('gender')}
            disabled={isDisabled}
          />
          <SelectInput
            label='Estado'
            options={stateOptions}
            {...formMethods.register('state')}
            disabled={isDisabled}
          />
          <SelectInput
            label='Cidade'
            options={cityOptions}
            {...formMethods.register('city')}
            disabled={isDisabled}
          />
          <TextInput
            label='Telefone'
            {...formMethods.register('phone')}
            disabled={isDisabled}
          />
        </div>

        <div className='flex gap-x-4'>
          <SelectInput
            label='Você possui alguma deficiência?'
            options={[
              { label: 'sim', value: 'sim' },
              { label: 'nao', value: 'Não' },
            ]}
            {...formMethods.register('disability_desc')}
            disabled={isDisabled}
          />
          <TextInput
            label='Se sim, qual? '
            {...formMethods.register('disability_desc')}
            disabled={isDisabled}
          />
        </div>
        <div className='flex gap-x-4'>
          <SelectInput
            label='Faz uso de algum medicamento regularmente?'
            options={[
              { label: 'sim', value: 'sim' },
              { label: 'nao', value: 'Não' },
            ]}
            {...formMethods.register('disability_desc')}
            disabled={isDisabled}
          />
          <TextInput
            label='Se sim, qual? '
            {...formMethods.register('medication_desc')}
            disabled={isDisabled}
          />
        </div>
        <div className='flex gap-x-4'>
          <SelectInput
            label='Possui diagnóstico de NMO?'
            options={[
              { label: 'sim', value: 'sim' },
              { label: 'nao', value: 'Não' },
            ]}
            {...formMethods.register('disability_desc')}
            disabled={isDisabled}
          />
          <TextInput
            label='Precisa de assistência legal?'
            {...formMethods.register('medication_desc')}
            disabled={isDisabled}
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
                disabled={isDisabled}
              />
              <TextInput
                label='Parentesco'
                {...formMethods.register('user.name')}
                disabled={isDisabled}
              />
              <TextInput
                label='Telefone para contato (Whatsapp)'
                {...formMethods.register('phone')}
                disabled={isDisabled}
              />
            </div>
          </>
        )}
        <Button variant='outline' className='text-primary ml-auto max-w-20'>
          Editar
        </Button>
      </FormContainer>
    </FormProvider>
  )
}
