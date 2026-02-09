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
import { SPECIALTIES } from '@/enums/shared'
import { USER_ROLES, USER_STATUSES } from '@/enums/users'
import type { User } from '@/types/users'
import { formatDate } from '@/utils/formatters/format-date'

import { UsersTableActions } from './actions'
import { UsersTableSkeleton } from './skeleton'

interface UsersTableProps {
  users: User[]
  loading?: boolean
}

export function UsersTable({ users, loading }: Readonly<UsersTableProps>) {
  const isEmpty = !loading && users.length <= 0

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-64'>Nome</TableHead>
          <TableHead className='w-36'>Data</TableHead>
          <TableHead className='w-40'>Função</TableHead>
          <TableHead className='w-48'>Especialidade</TableHead>
          <TableHead className='w-44'>Registro</TableHead>
          <TableHead className='w-24'>Status</TableHead>
          <TableHead className='w-20 text-center'>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && <UsersTableSkeleton />}

        {isEmpty && (
          <TableRow>
            <TableEmptyCell colSpan={7}>
              Nenhum usuário encontrado
            </TableEmptyCell>
          </TableRow>
        )}

        {!isEmpty &&
          users.map((user) => {
            const status = USER_STATUSES[user.status]

            return (
              <TableRow key={user.id}>
                <TableCell>
                  <TableLink
                    className='w-64'
                    href={ROUTES.dashboard.users.details(user.id)}
                  >
                    <Avatar className='size-9' src={user.avatar_url} />
                    <span className='truncate'>{user.name}</span>
                  </TableLink>
                </TableCell>
                <TableCell>{formatDate(user.created_at)}</TableCell>
                <TableCell>
                  <Tag size='sm'>{USER_ROLES[user.role]}</Tag>
                </TableCell>
                <TableCell>
                  {user.specialty ? (
                    <Tag size='sm'>{SPECIALTIES[user.specialty]}</Tag>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>{user.registration_number ?? '-'}</TableCell>
                <TableCell>
                  <Tag variant={status.variant} size='sm'>
                    {status.label}
                  </Tag>
                </TableCell>
                <TableCell className='text-center'>
                  <UsersTableActions user={user} />
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
