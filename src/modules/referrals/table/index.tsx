import { EyeIcon } from 'lucide-react'
import { useState } from 'react'

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableEmptyCell,
  TableHead,
  TableHeader,
  TableLink,
  TableRow,
} from '@/components/ui/table'
import { Tag } from '@/components/ui/tag'
import { ROUTES } from '@/constants/routes'
import { PATIENT_CONDITIONS } from '@/enums/patients'
import { REFERRAL_STATUSES } from '@/enums/referrals'
import { SPECIALTIES } from '@/enums/shared'
import type { Referral } from '@/types/referrals'
import { formatDate } from '@/utils/formatters/format-date'

import { ViewReferralModal } from '../view-referral-modal'
import { ReferralsTableActions } from './actions'

type HideReferralsColumns = 'name'

interface ReferralsTableProps {
  referrals: Referral[]
  hideColumns?: HideReferralsColumns[]
  loading?: boolean
}

export function ReferralsTable({
  referrals,
  hideColumns = [],
  loading,
}: Readonly<ReferralsTableProps>) {
  const [viewReferral, setViewReferral] = useState<Referral | null>(null)

  const skeletons = Array.from({ length: 10 }).map((_, index) => index)

  const isEmpty = !loading && referrals.length <= 0
  const showPatientName = !hideColumns.includes('name')

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-16'>Ver</TableHead>
          {showPatientName && <TableHead className='w-64'>Paciente</TableHead>}
          <TableHead className='w-36'>Data</TableHead>
          <TableHead className='w-48'>Categoria</TableHead>
          <TableHead>Profissional</TableHead>
          <TableHead className='w-36'>Quadro geral</TableHead>
          <TableHead className='w-36'>Status</TableHead>
          <TableHead className='w-20 text-center'>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isEmpty && (
          <TableRow>
            <TableEmptyCell colSpan={8}>
              Nenhum encaminhamento registrado
            </TableEmptyCell>
          </TableRow>
        )}

        {!isEmpty &&
          referrals.map((referral) => {
            const status = REFERRAL_STATUSES[referral.status]
            const condition = PATIENT_CONDITIONS[referral.condition]
            const Icon = condition.icon

            return (
              <TableRow key={referral.id}>
                <TableCell>
                  <Button
                    size='icon_sm'
                    variant='ghost'
                    aria-label='Ver detalhes do encaminhamento'
                    onClick={() => setViewReferral(referral)}
                  >
                    <EyeIcon />
                  </Button>
                </TableCell>
                {showPatientName && (
                  <TableCell>
                    <TableLink
                      className='w-64'
                      href={ROUTES.dashboard.patients.details.info(
                        referral.patient_id,
                      )}
                    >
                      <Avatar
                        className='size-9'
                        src={referral.patient.avatar_url}
                      />
                      <span className='truncate'>{referral.patient.name}</span>
                    </TableLink>
                  </TableCell>
                )}
                <TableCell>{formatDate(referral.date)}</TableCell>
                <TableCell>
                  <Tag size='sm'>{SPECIALTIES[referral.category]}</Tag>
                </TableCell>
                <TableCell>{referral.professional_name ?? '-'}</TableCell>
                <TableCell>
                  <Tag variant={condition.variant} size='sm'>
                    <Icon />
                    {condition.label}
                  </Tag>
                </TableCell>
                <TableCell>
                  <Tag variant={status.variant} size='sm'>
                    {status.label}
                  </Tag>
                </TableCell>
                <TableCell className='text-center'>
                  <ReferralsTableActions referral={referral} />
                </TableCell>
              </TableRow>
            )
          })}

        {loading &&
          skeletons.map((skeleton) => (
            <TableRow key={skeleton}>
              {showPatientName && (
                <TableCell>
                  <div className='flex w-64 items-center gap-2'>
                    <Skeleton className='size-9 rounded-full' />
                    <Skeleton className='h-5 w-44 rounded-md' />
                  </div>
                </TableCell>
              )}
              <TableCell>
                <Skeleton className='h-5 w-24 rounded-md' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 w-36 rounded-md' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-5 w-40 rounded-md' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 w-24 rounded-md' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 w-28 rounded-md' />
              </TableCell>
              <TableCell>
                <Skeleton className='mx-auto size-9' />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>

      {viewReferral && (
        <Dialog
          open={!!viewReferral}
          onOpenChange={() => setViewReferral(null)}
        >
          <ViewReferralModal referral={viewReferral} />
        </Dialog>
      )}
    </Table>
  )
}
