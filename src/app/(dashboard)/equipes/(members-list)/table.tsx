'use client'

import { ClipboardPen, EllipsisIcon, PlusIcon, XCircle } from 'lucide-react'
import { useState } from 'react'

import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderFilterButton } from '@/components/data-table/header/filter-button'
import { DataTableHeaderOrderBy } from '@/components/data-table/header/order-by'
import { DataTableHeaderSearch } from '@/components/data-table/header/search'
import { Pagination } from '@/components/pagination'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'
import { StatusTag } from '@/components/ui/status-tag'
import { TabButtons } from '@/components/ui/tab-buttons'
import {
  Table,
  TableBody,
  TableButton,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tag } from '@/components/ui/tag'
import { TEAMS_ORDER_OPTIONS } from '@/types/teams'
import { formatDate } from '@/utils/formatters/format-date'
import { TEAMS_MOCK } from '@/utils/mock/teams'

export function MembersListTable() {
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
              <TableHead className='w-64'>Colaborador</TableHead>
              <TableHead>Data de entrada</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Especialidade</TableHead>
              <TableHead>Registro</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredMembers.map((member) => {
              return (
                <TableRow key={member.id}>
                  <TableCell>
                    <TableButton className='w-64'>
                      <Avatar className='size-9' />
                      <span className='truncate'>{member.name}</span>
                    </TableButton>
                  </TableCell>

                  <TableCell>{formatDate(member.entryDate)}</TableCell>

                  <TableCell>
                    <Tag>{member.role}</Tag>
                  </TableCell>

                  <TableCell>
                    {member.specialty ? <Tag>{member.specialty}</Tag> : '-'}
                  </TableCell>

                  <TableCell>{member.registration}</TableCell>

                  <TableCell>
                    <StatusTag status={member.status} />
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
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
                          Desativar
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

      <Pagination totalItems={filteredMembers.length} />
    </>
  )
}
