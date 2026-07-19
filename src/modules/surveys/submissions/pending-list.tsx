'use client'

import { useQuery } from '@tanstack/react-query'
import { CheckIcon, ClipboardListIcon, FileTextIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

import { Pagination } from '@/components/pagination'
import { SectionHeader, SectionHeaderTitle } from '@/components/section-header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { Skeleton } from '@/components/ui/skeleton'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { QUERY_PARAM_KEYS } from '@/enums/params'
import { useParams } from '@/hooks/params'
import { usePermissions } from '@/hooks/use-permissions'
import { api } from '@/lib/api'
import type { SurveySubmission } from '@/types/surveys'
import { formatDate } from '@/utils/formatters/format-date'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

import { ApproveSurveySubmissionModal } from './approve-modal'
import { DeclineSurveySubmissionModal } from './decline-modal'

type SubmissionModalMode = 'approve' | 'decline'

export function PendingSurveysList() {
  const [modalMode, setModalMode] = useState<SubmissionModalMode | null>(null)
  const [selectedSubmission, setSelectedSubmission] =
    useState<SurveySubmission | null>(null)

  const { getParams, currentParams } = useParams()
  const { canUser } = usePermissions()

  const [page] = getParams([QUERY_PARAM_KEYS.page])
  const status = 'pending_review'

  const { data: response, isLoading } = useQuery({
    placeholderData: (previousData) => previousData,
    queryKey: [QUERY_CACHE_KEYS.surveys.submissions, status, currentParams],
    queryFn: () =>
      api<{ submissions: SurveySubmission[]; total: number }>(
        '/survey-submissions',
        { params: { status, page } },
      ),
  })

  function handleOpenModal(
    mode: SubmissionModalMode,
    submission: SurveySubmission,
  ) {
    setSelectedSubmission(submission)
    setModalMode(mode)
  }

  const submissions = response?.data?.submissions ?? []
  const total = response?.data?.total ?? 0

  const isEmpty = !isLoading && submissions.length <= 0
  const canReview = canUser('review:survey')

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Pendentes'
          icon={<ClipboardListIcon />}
          total={total}
        />
      </SectionHeader>

      <div className='grid gap-3 xl:grid-cols-2'>
        {isLoading && (
          <Skeleton
            quantity={8}
            className='bg-border/50 h-36 w-full rounded-2xl'
          />
        )}

        {isEmpty && (
          <Card className='text-foreground-soft col-span-full p-8 text-center'>
            <p>Nenhuma catalogação pendente para analisar.</p>
          </Card>
        )}

        {!isEmpty &&
          submissions.map((submission) => (
            <Card
              key={submission.id}
              className='text-foreground-soft flex flex-col gap-2'
            >
              <header className='flex flex-wrap items-end justify-between gap-x-8 gap-y-1'>
                <h3 className='text-foreground text-xl font-semibold'>
                  {submission.name}
                </h3>

                <div className='flex flex-wrap gap-x-8 gap-y-1'>
                  <span>{formatPhoneNumber(submission.phone)}</span>
                  <span>{submission.email}</span>
                </div>
              </header>

              <Divider className='my-1' />

              <div className='flex flex-wrap items-start justify-between gap-x-12 gap-y-6'>
                {submission.document && (
                  <div className='flex items-center gap-2'>
                    <FileTextIcon className='text-foreground/50 size-5 transition-colors' />
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      href={submission.document.url}
                      className='hover:text-primary font-medium underline underline-offset-3'
                    >
                      {submission.document.name}
                    </a>
                  </div>
                )}

                {canReview && (
                  <div className='flex items-center gap-4 max-md:flex-1'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='text-success flex-1'
                      onClick={() => handleOpenModal('approve', submission)}
                    >
                      <CheckIcon />
                      Aprovar
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      className='text-error flex-1'
                      onClick={() => handleOpenModal('decline', submission)}
                    >
                      <XIcon />
                      Recusar
                    </Button>
                  </div>
                )}
              </div>

              <span className='text-sm max-sm:mt-2'>
                {formatDate(submission.createdAt, {
                  dateStyle: 'long',
                  timeStyle: 'short',
                })}
              </span>
            </Card>
          ))}
      </div>

      <Pagination totalItems={total} />

      {canReview && (
        <>
          <Dialog
            open={modalMode === 'approve'}
            onOpenChange={(open) => setModalMode(open ? 'approve' : null)}
          >
            {selectedSubmission && (
              <ApproveSurveySubmissionModal
                submission={selectedSubmission}
                onClose={() => setModalMode(null)}
              />
            )}
          </Dialog>

          <Dialog
            open={modalMode === 'decline'}
            onOpenChange={(open) => setModalMode(open ? 'decline' : null)}
          >
            {selectedSubmission && (
              <DeclineSurveySubmissionModal
                submission={selectedSubmission}
                onClose={() => setModalMode(null)}
              />
            )}
          </Dialog>
        </>
      )}
    </>
  )
}
