'use client'

import { CircleCheckIcon } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

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

interface ApproveSurveySubmissionModalProps {
  submission: SurveySubmission
  onClose: () => void
}

export function ApproveSurveySubmissionModal({
  submission,
  onClose,
}: Readonly<ApproveSurveySubmissionModalProps>) {
  const [isApproving, startApproving] = useTransition()

  async function approve() {
    startApproving(async () => {
      const response = await api(
        `/survey-submissions/${submission.id}/approve`,
        { method: 'PATCH' },
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
    })
  }

  return (
    <DialogContainer>
      <DialogHeader
        icon={<DialogIcon icon={CircleCheckIcon} variant='success' />}
      >
        <DialogTitle>Aprovar catalogação</DialogTitle>
      </DialogHeader>

      <DialogContent className='space-y-2'>
        <p>
          Deseja aprovar a catalogação de <strong>{submission.name}</strong>?
        </p>
        <p>
          Ao confirmar, este paciente será notificado para prosseguir com a
          segunda etapa do formulário.
        </p>
      </DialogContent>

      <DialogFooter>
        <Button
          className='md:flex-1'
          loading={isApproving}
          onClick={approve}
          variant='success'
        >
          Aprovar
        </Button>
        <DialogClose className='md:flex-1' disabled={isApproving}>
          Voltar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
