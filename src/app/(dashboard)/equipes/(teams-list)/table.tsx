'use client'

import { ClipboardPen, EllipsisIcon, PlusIcon, XCircle } from 'lucide-react'
import { useState } from 'react'

import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderFilterButton } from '@/components/data-table/header/filter-button'
import { DataTableHeaderOrderBy } from '@/components/data-table/header/order-by'
import { DataTableHeaderSearch } from '@/components/data-table/header/search'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'
import { TabButtons } from '@/components/ui/tab-buttons'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tag } from '@/components/ui/tag'
import { STATUS_TAGS } from '@/constants/utils'
import { TEAMS_ORDER_OPTIONS } from '@/types/teams'
import { USER_STATUS } from '@/types/users'
import { formatDate } from '@/utils/formatters/format-date'
import { TEAMS_MOCK } from '@/utils/mock/teams'

export default function DashboardTeamsManagement() {
  const members = TEAMS_MOCK

  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all')

  const filteredMembers = members.filter((member) => {
    if (statusFilter === 'all') {
      return true
    }
    return member.status === statusFilter
  })

  const filterOptions = [
    {
      label: 'Todos',
      isActive: statusFilter === 'all',
      onClick: () => setStatusFilter('all'),
    },
    {
      label: 'Ativos',
      isActive: statusFilter === 'active',
      onClick: () => setStatusFilter('active'),
    },
    {
      label: 'Inativos',
      isActive: statusFilter === 'inactive',
      onClick: () => setStatusFilter('inactive'),
    },
  ]

  return (
    <>
      <DataTableHeader>
        <TabButtons buttons={filterOptions} />

        <DataTableHeaderActions>
          <DataTableHeaderSearch placeholder='Pesquisar' />

          <DataTableHeaderFilterButton />

          <DataTableHeaderOrderBy
            options={TEAMS_ORDER_OPTIONS}
            className='min-w-48'
          />

          <Button size='sm'>
            <PlusIcon />
            Novo membro
          </Button>
        </DataTableHeaderActions>
      </DataTableHeader>

      <Card className='p-6 sm:col-span-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Colaborador</TableHead>
              <TableHead>Data de entrada</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Especialidade</TableHead>
              <TableHead>Registro</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredMembers.map((member, index) => {
              const isLastRow = index === filteredMembers.length - 1
              const statusTag =
                STATUS_TAGS[member.status as keyof typeof STATUS_TAGS]
              const StatusIcon = statusTag.icon
              return (
                <TableRow key={member.id}>
                  <TableCell isLastRow={isLastRow}>
                    <button className='cursor-pointer'>
                      <div className='flex min-w-0 items-center gap-2'>
                        <span className='truncate'>{member.name}</span>
                      </div>
                    </button>
                  </TableCell>

                  <TableCell isLastRow={isLastRow}>
                    {formatDate(member.entryDate)}
                  </TableCell>

                  <TableCell isLastRow={isLastRow}>
                    <Tag>{member.role}</Tag>
                  </TableCell>

                  <TableCell isLastRow={isLastRow}>
                    {member.specialty ? <Tag>{member.specialty}</Tag> : '-'}
                  </TableCell>

                  <TableCell isLastRow={isLastRow}>
                    {member.registration}
                  </TableCell>

                  <TableCell isLastRow={isLastRow}>
                    <Tag className={statusTag.class}>
                      <StatusIcon />
                      {USER_STATUS[member.status as keyof typeof USER_STATUS]}
                    </Tag>
                  </TableCell>

                  <TableCell isLastRow={isLastRow}>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        indicator={false}
                        size='icon'
                        variant='ghost'
                        className='size-8'
                      >
                        <EllipsisIcon />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem>
                          <ClipboardPen />
                          Editar
                        </DropdownMenuItem>

                        <Divider />

                        <DropdownMenuItem
                          variant='destructive'
                          className='text-center'
                        >
                          <XCircle />
                          Cancelar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}
