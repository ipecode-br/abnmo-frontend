'use client'

import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { DateInput } from '@/components/form/date-input'
import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { FormModal } from '@/components/form/form-modal'
import { SelectInput } from '@/components/form/select-input'
import { TextareaInput } from '@/components/form/text-area'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'

interface NewServiceFormData {
  patientName: string
  responsible: string
  specialty: string
  date: string
  status?: string
  notes?: string
}

export default function NewServiceModal() {
  const [isOpen, setIsOpen] = useState(false)

  const methods = useForm<NewServiceFormData>({
    defaultValues: {
      patientName: '',
      responsible: '',
      specialty: '',
      date: '',
      status: '',
      notes: '',
    },
  })

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleSubmit = methods.handleSubmit((data) => {
    console.log('Form Data:', data)
    closeModal()
    methods.reset()
  })

  return (
    <>
      <Button variant='default' onClick={openModal}>
        Novo Atendimento
      </Button>

      <FormModal
        isOpen={isOpen}
        title='Cadastrar novo atendimento'
        description='Preencha as informações abaixo para cadastrar um novo atendimento.'
        onClose={closeModal}
      >
        <FormProvider {...methods}>
          <FormContainer onSubmit={handleSubmit}>
            <FormField>
              <TextInput
                name='patientName'
                label='Nome do paciente'
                isRequired
                placeholder='Digite o nome do paciente'
              />
            </FormField>

            <FormField className='flex flex-row gap-4'>
              <TextInput
                name='responsible'
                label='Profissional responsável'
                isRequired
                placeholder='Nome do profissional'
                wrapperClassName='flex-1'
              />
              <TextInput
                name='specialty'
                label='Especialidade médica'
                isRequired
                placeholder='Digite a especialidade'
                wrapperClassName='flex-1'
              />
            </FormField>

            <FormField>
              <DateInput
                name='date'
                label='Data do atendimento'
                isRequired
                blockFutureDates
              />
            </FormField>

            <FormField>
              <SelectInput
                name='status'
                label='Quadro geral'
                placeholder='Selecionar'
                options={[
                  { label: 'Leve', value: 'leve' },
                  { label: 'Moderado', value: 'moderado' },
                  { label: 'Grave', value: 'grave' },
                ]}
              />
            </FormField>

            <FormField>
              <TextareaInput
                name='notes'
                label='Observações'
                placeholder='Insira observações sobre o paciente'
                maxLength={200}
              />
            </FormField>

            <div className='mt-4 flex justify-end gap-3'>
              <Button type='button' variant='outline' onClick={closeModal}>
                Cancelar
              </Button>
              <Button type='submit' variant='default'>
                Confirmar
              </Button>
            </div>
          </FormContainer>
        </FormProvider>
      </FormModal>
    </>
  )
}
