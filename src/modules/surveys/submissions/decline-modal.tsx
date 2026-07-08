'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleXIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { TextareaInput } from '@/components/form/textarea-input'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from '@/components/ui/dialog'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { api } from '@/lib/api'
import { SurveySubmission } from '@/types/surveys'

const MAX_REASON_LENGTH = 500

const formSchema = z.object({
  reason: z
    .string()
    .min(3, 'Forneça detalhes da recusa')
    .max(MAX_REASON_LENGTH),
})
type FormSchema = z.infer<typeof formSchema>

interface DeclineSurveySubmissionModalProps {
  submission: SurveySubmission
  onClose: () => void
}

export function DeclineSurveySubmissionModal({
  submission,
  onClose,
}: Readonly<DeclineSurveySubmissionModalProps>) {
  const formMethods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { reason: '' },
    mode: 'onBlur',
  })

  async function submitForm({ reason }: FormSchema) {
    const response = await api(
      `/surveys/submissions/${submission.id}/decline`,
      { method: 'PATCH', body: { reason } },
    )

    if (!response.success) {
      toast.error(response.message)
      return
    }

    revalidateClientCache([
      QUERY_CACHE_KEYS.surveys.submissions,
      QUERY_CACHE_KEYS.surveys.total,
    ])

    toast.success(response.message)
    onClose()
  }

  return (
    <DialogContainer>
      <DialogHeader
        icon={<DialogIcon icon={CircleXIcon} variant='destructive' />}
      >
        <DialogTitle>Recusar catalogação</DialogTitle>
      </DialogHeader>

      <DialogContent className='space-y-4'>
        <FormProvider {...formMethods}>
          <FormContainer
            className='gap-2'
            onSubmit={formMethods.handleSubmit(submitForm)}
          >
            <p>
              Deseja recusar a catalogação de <strong>{submission.name}</strong>
              ?
            </p>

            <TextareaInput
              rows={6}
              name='reason'
              label='Motivo'
              wrapperClassName='my-2'
              maxLength={MAX_REASON_LENGTH}
              placeholder='Insira o motivo da recusa'
            />

            <p>Ao confirmar, este paciente será notificado.</p>
          </FormContainer>
        </FormProvider>
      </DialogContent>

      <DialogFooter>
        <Button
          className='md:flex-1'
          variant='destructive'
          loading={formMethods.formState.isSubmitting}
          onClick={formMethods.handleSubmit(submitForm)}
        >
          Recusar
        </Button>
        <DialogClose
          className='md:flex-1'
          disabled={formMethods.formState.isSubmitting}
        >
          Voltar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
