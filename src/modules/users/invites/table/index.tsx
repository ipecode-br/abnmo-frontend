import {
  Table,
  TableBody,
  TableCell,
  TableEmptyCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tag } from '@/components/ui/tag'
import type { UserInvite } from '@/types/users'
import { formatDate } from '@/utils/formatters/format-date'

import { UserInvitesTableActions } from './actions'
import { UserInvitesTableSkeleton } from './skeleton'

interface UserInvitesTableProps {
  invites: UserInvite[]
  loading?: boolean
}

export function UserInvitesTable({
  invites,
  loading,
}: Readonly<UserInvitesTableProps>) {
  const isEmpty = !loading && invites.length <= 0

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead className='w-44'>Data de criação</TableHead>
          <TableHead className='w-44'>Data de expiração</TableHead>
          <TableHead className='w-20 text-center'>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && <UserInvitesTableSkeleton />}

        {isEmpty && (
          <TableRow>
            <TableEmptyCell colSpan={4}>
              Nenhum convite encontrado
            </TableEmptyCell>
          </TableRow>
        )}

        {!isEmpty &&
          invites.map((invite) => {
            const isExpired = new Date() > new Date(invite.expires_at)
            return (
              <TableRow key={invite.id}>
                <TableCell>
                  <span className='truncate'>{invite.email}</span>
                </TableCell>
                <TableCell>
                  {formatDate(invite.created_at, {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </TableCell>
                <TableCell>
                  {isExpired ? (
                    <Tag variant='error' size='sm'>
                      Expirado
                    </Tag>
                  ) : (
                    formatDate(invite.expires_at, {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })
                  )}
                </TableCell>
                <TableCell className='text-center'>
                  <UserInvitesTableActions invite={invite} />
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
