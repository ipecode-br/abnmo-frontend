'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import user from '@images/screening/user-icon.svg'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { FormContainer } from '@/components/form/form-container'
import { TextInput } from '@/components/form/text-input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { SCREENING_STORAGE_KEYS } from '@/constants/storage-keys'

import { useScreeningFormNavigation } from '../hooks'
import {
  screeningSupportNetworkContactsSchema,
  screeningSupportNetworkFormDefaultValues,
  type ScreeningSupportNetworkFormSchema,
  screeningSupportNetworkFormSchema,
} from './support-network-form-schema'

type Contact = ScreeningSupportNetworkFormSchema & { id: string }

export function ScreeningSupportNetworkForm() {
  const router = useRouter()

  const { getStoredFormData, saveFormAndGoToPage } = useScreeningFormNavigation(
    {
      storageKey: SCREENING_STORAGE_KEYS.screening.supportNetwork,
    },
  )

  const formMethods = useForm<ScreeningSupportNetworkFormSchema>({
    resolver: zodResolver(screeningSupportNetworkFormSchema),
    defaultValues: screeningSupportNetworkFormDefaultValues,
    mode: 'onBlur',
  })

  const { handleSubmit, reset, getValues, trigger } = formMethods

  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  useEffect(() => {
    const savedData = getStoredFormData(screeningSupportNetworkContactsSchema)
    console.log('Dados restaurados:', savedData)

    if (savedData?.contacts) {
      setContacts(savedData.contacts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddContact = async () => {
    const isValid = await trigger()

    if (!isValid) return

    const data = getValues()

    const newContact: Contact = {
      ...data,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 15),
    }

    setContacts((prev) => [...prev, newContact])
    reset(screeningSupportNetworkFormDefaultValues)
  }

  const handleRemoveContact = (index: number) => {
    setContacts((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFinalize = async () => {
    setIsLoading(true)
    setAlert(null)

    try {
      // Simula envio à API
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setAlert({
        type: 'success',
        message:
          'Obrigado por enviar suas informações. Estamos analisando seu cadastro e entraremos em contato em breve.',
      })

      await new Promise((resolve) => setTimeout(resolve, 3000))

      saveFormAndGoToPage({
        data: { contacts },
        path: ROUTES.screening.forms.patientData,
      })

      reset()
      setContacts([])
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Erro ao salvar os contatos. Tente novamente.',
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer
        className='grid grid-cols-2'
        onSubmit={(e) => e.preventDefault()}
      >
        <TextInput
          name='fullName'
          label='Nome completo'
          isRequired
          maxLength={50}
          placeholder='Insira o nome completo'
        />

        <TextInput
          name='kinship'
          label='Parentesco'
          isRequired
          maxLength={50}
          placeholder='Ex: Mãe'
        />

        <TextInput
          name='phone'
          label='Telefone para contato (WhatsApp)'
          isRequired
          placeholder='Insira o telefone'
          inputMode='tel'
          mask='phone'
          message='Insira somente números'
          wrapperClassName='col-span-full'
        />

        <Button
          type='button'
          variant='muted'
          className='col-span-full mb-7'
          onClick={handleSubmit(handleAddContact)}
        >
          Adicionar +
        </Button>

        {contacts.length > 0 && (
          <div className='col-span-full'>
            <p className='mb-4 text-sm font-medium'>Contatos adicionados:</p>

            <div className='flex flex-col gap-4'>
              {contacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className='flex items-center justify-between rounded-2xl border border-[#E2E4E9] p-4'
                >
                  <div className='flex items-center gap-2'>
                    <div className='relative h-10 w-10'>
                      <Image
                        src={user}
                        alt='logo de usuário'
                        fill
                        className='object-cover'
                        quality={100}
                        priority
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='text-sm'>{contact.fullName}</p>
                      <p className='text-foreground-soft text-xs'>
                        {contact.kinship} | {contact.phone}
                      </p>
                    </div>
                  </div>

                  <button
                    type='button'
                    disabled={isLoading}
                    className='cursor-pointer text-sm text-red-500 underline'
                    onClick={() => handleRemoveContact(index)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {alert && (
          <Alert
            variant={alert.type === 'success' ? 'success' : 'error'}
            className='col-span-full mt-1'
          >
            {alert.message}
          </Alert>
        )}

        <div className='col-span-full mt-6 flex flex-col gap-2 md:flex-row-reverse md:pb-5'>
          <Button
            type='button'
            className='md:flex-1'
            disabled={contacts.length === 0 || isLoading}
            onClick={handleFinalize}
          >
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {isLoading ? 'Enviando' : 'Finalizar'}
          </Button>

          <Button
            type='button'
            variant='muted'
            className='md:flex-1'
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Voltar
          </Button>
        </div>
      </FormContainer>
    </FormProvider>
  )
}
