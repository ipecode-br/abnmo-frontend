import { Avatar } from '@/components/ui/avatar'
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

import { ReferralsTableActions } from './actions'
import { ReferralsTableSkeleton } from './skeleton'

interface ReferralsTableProps {
  referrals: Referral[]
  loading?: boolean
}

export function ReferralsTable({
  referrals,
  loading,
}: Readonly<ReferralsTableProps>) {
  const isEmpty = !loading && referrals.length <= 0

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-64'>Paciente</TableHead>
          <TableHead className='w-36'>Data</TableHead>
          <TableHead className='w-48'>Categoria</TableHead>
          <TableHead>Profissional</TableHead>
          <TableHead className='w-36'>Quadro geral</TableHead>
          <TableHead className='w-36'>Status</TableHead>
          <TableHead className='w-20 text-center'>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && <ReferralsTableSkeleton />}

        {isEmpty && (
          <TableRow>
            <TableEmptyCell colSpan={6}>
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
      </TableBody>
    </Table>
  )
}
