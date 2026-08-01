'use client'

import {
  EllipsisIcon,
  EyeIcon,
  LinkIcon,
  Loader2Icon,
  UserRoundIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { Dialog } from '@/components/ui/dialog'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
import { ROUTES } from '@/constants/routes'
import { usePermissions } from '@/hooks/use-permissions'
import { useUtils } from '@/hooks/use-utils'
import { api } from '@/lib/api'
import type { SurveySubmissionListItem } from '@/types/surveys'

import { ViewSurveySubmissionModal } from './view-modal'

interface SurveySubmissionsListActionsProps {
  submission: SurveySubmissionListItem
}

export function SurveySubmissionsListActions({
  submission,
}: Readonly<SurveySubmissionsListActionsProps>) {
  const [modalMode, setModalMode] = useState<'view' | null>(null)
  const [isGettingUrl, startTransition] = useTransition()
  const { copyToClipboard } = useUtils()
  const { canUser } = usePermissions()
  const router = useRouter()

  const showPatientRedirect = submission.status === 'completed'
  const canGetUrl = canUser('review:survey') && submission.status === 'approved'

  async function handleCopyLink() {
    startTransition(async () => {
      const response = await api<{ url: string }>(
        `/survey-submissions/${submission.id}/survey-url`,
      )

      console.log(response)

      if (!response.success) {
        toast.error(response.message)
        return
      }

      copyToClipboard({
        value: response.data?.url,
        message: 'Link copiado para a área de transferência.',
      })
    })
  }

  return (
    <>
      <Menu>
        <MenuTrigger
          variant='ghost'
          className='hover:bg-border size-8'
          aria-label='Abrir ações'
        >
          <EllipsisIcon />
        </MenuTrigger>

        <MenuContent align='end'>
          <MenuItem onClick={() => setModalMode('view')}>
            <EyeIcon />
            Ver detalhes
          </MenuItem>

          {showPatientRedirect && (
            <MenuItem
              onClick={() =>
                router.push(ROUTES.patients.details.info(submission.patient.id))
              }
            >
              <UserRoundIcon />
              Ver paciente
            </MenuItem>
          )}

          {canGetUrl && (
            <MenuItem disabled={isGettingUrl} onClick={handleCopyLink}>
              {isGettingUrl ? (
                <Loader2Icon className='animate-spin' />
              ) : (
                <LinkIcon />
              )}
              Copiar link
            </MenuItem>
          )}
        </MenuContent>
      </Menu>

      <Dialog
        open={modalMode === 'view'}
        onOpenChange={(open) => setModalMode(open ? 'view' : null)}
      >
        {modalMode === 'view' && (
          <ViewSurveySubmissionModal submission={submission} />
        )}
      </Dialog>
    </>
  )
}
