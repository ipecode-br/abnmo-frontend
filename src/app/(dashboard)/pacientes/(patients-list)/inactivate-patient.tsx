'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogContent } from '@radix-ui/react-dialog'
import { CircleXIcon, XIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

interface PatientInactivateModalProps {
  id: string
  name: string
  open: boolean
  onClose: () => void
}

export function PatientInactivateModal({
  id,
  name,
  open,
  onClose,
}: PatientInactivateModalProps) {
  const inactivatePatientFormSchema = z.object({ name: z.literal(name) })
  type InactivatePatientFormSchema = z.infer<typeof inactivatePatientFormSchema>

  const formMethods = useForm<InactivatePatientFormSchema>({
    resolver: zodResolver(inactivatePatientFormSchema),
    defaultValues: { name: '' },
    mode: 'onChange',
  })

  function submitForm(data: InactivatePatientFormSchema) {
    console.log(data, id)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='border-border max-w-lg overflow-hidden rounded-2xl border p-0'>
        <div className='border-border flex items-center justify-between border-b px-6 py-4'>
          <div className='flex items-center gap-3'>
            <CircleXIcon className='text-color-error size-6' />
            <div>
              <h2 className='text-lg font-semibold'>Inativar {name}?</h2>
              <p className='text-foreground-soft text-sm'>
                Confirme a inativação deste paciente.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='text-disabled hover:text-foreground'
          >
            <XIcon className='size-5' />
          </button>
        </div>

        <FormProvider {...formMethods}>
          <FormContainer onSubmit={formMethods.handleSubmit(submitForm)}>
            <TextInput
              name='name'
              label='Digite o nome completo do paciente:'
              isRequired
            />
            <p className='mt-3 text-sm font-semibold'>
              Nome do paciente: {name}
            </p>

            <Button type='submit' variant='outline'>
              Inativar paciente
            </Button>
          </FormContainer>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
