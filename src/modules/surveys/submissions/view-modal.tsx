import { FileTextIcon } from 'lucide-react'

import { CopyButton } from '@/components/copy-button'
import { DataField } from '@/components/ui/data-display'
import {
  DialogContainer,
  DialogContent,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { Tag } from '@/components/ui/tag'
import { WhatsAppButton } from '@/components/whatsapp-button'
import {
  SURVEY_FILLING_METHODS,
  SURVEY_SUBMISSION_STATUSES,
} from '@/enums/surveys'
import type { SurveySubmissionListItem } from '@/types/surveys'
import { formatDate } from '@/utils/formatters/format-date'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

interface ViewSurveySubmissionModalProps {
  submission: SurveySubmissionListItem
}

export function ViewSurveySubmissionModal({
  submission,
}: ViewSurveySubmissionModalProps) {
  const status = SURVEY_SUBMISSION_STATUSES[submission.status]
  const fillingMethod = SURVEY_FILLING_METHODS[submission.fillingMethod]

  return (
    <DialogContainer className='max-w-2xl'>
      <DialogHeader icon={<DialogIcon icon={FileTextIcon} />}>
        <DialogTitle>Dados da solicitação</DialogTitle>
      </DialogHeader>

      <DialogContent className='grid gap-6 sm:grid-cols-2'>
        <DataField label='Nome completo'>{submission.patient.name}</DataField>
        <DataField label='E-mail'>
          <div className='flex items-center gap-2'>
            <span className='truncate'>{submission.patient.email}</span>
            <CopyButton
              value={submission.patient.email}
              message='E-mail copiado para a área de transferência.'
            />
          </div>
        </DataField>

        <DataField label='Telefone'>
          <div className='flex items-center gap-3'>
            <span>{formatPhoneNumber(submission.patient.phone)}</span>
            <WhatsAppButton
              phone={formatPhoneNumber(submission.patient.phone)}
            />
            <CopyButton
              value={formatPhoneNumber(submission.patient.phone)}
              message='Telefone copiado para a área de transferência.'
            />
          </div>
        </DataField>

        {submission.document && (
          <DataField className='space-y-1' label='Laudo médico'>
            <div className='flex items-center gap-2'>
              <FileTextIcon className='text-foreground/50 size-5 transition-colors' />
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={submission.document.url}
                className='hover:text-primary text-foreground font-medium underline underline-offset-3'
              >
                Ver laudo médico
              </a>
            </div>
          </DataField>
        )}

        <DataField label='Preenchimento' className='space-y-1'>
          <Tag>{fillingMethod}</Tag>
        </DataField>

        <DataField label='Status' className='space-y-1'>
          <Tag variant={status.variant}>{status.label}</Tag>
        </DataField>

        {submission.reason && (
          <DataField label='Motivo da recusa' className='sm:col-span-full'>
            {submission.reason}
          </DataField>
        )}

        <Divider className='sm:col-span-full' />

        <DataField label='Data'>
          {formatDate(submission.createdAt, {
            dateStyle: 'long',
            timeStyle: 'short',
          })}
        </DataField>
      </DialogContent>
    </DialogContainer>
  )
}
