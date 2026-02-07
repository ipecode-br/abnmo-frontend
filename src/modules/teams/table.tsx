'use client'

import {
  ClipboardPenIcon,
  EllipsisIcon,
  PlusIcon,
  XCircleIcon,
} from 'lucide-react'
import { useState } from 'react'

import { FilterSelect } from '@/components/filters/filter-select'
import { SearchInput } from '@/components/filters/search-input'
import { Pagination } from '@/components/pagination'
import {
  SectionHeader,
  SectionHeaderActions,
} from '@/components/section-header'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'
import { StatusTag } from '@/components/ui/status-tag'
import { TabSelect } from '@/components/ui/tab-select'
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
import { QUERY_PARAM_KEYS } from '@/enums/params'
import { TEAMS_ORDER_OPTIONS } from '@/enums/team'
import { formatDate } from '@/utils/formatters/format-date'
import { TEAMS_MOCK } from '@/utils/mock/teams'

type Status = 'all' | 'active' | 'inactive'

export function TeamListTable() {
  const members = TEAMS_MOCK

  const [statusFilter, setStatusFilter] = useState<Status>('all')

  const filteredMembers = members.filter((member) => {
    if (statusFilter === 'all') {
      return true
    }
    return member.status === statusFilter
  })

  const filterOptions: Array<{ label: string; value: Status }> = [
    { label: 'Todos', value: 'all' },
    { label: 'Ativos', value: 'active' },
    { label: 'Inativos', value: 'inactive' },
  ]

  return (
    <>
      <SectionHeader>
        <TabSelect
          value={statusFilter}
          onSelect={(value) => setStatusFilter(value)}
          options={filterOptions}
        />

        <SectionHeaderActions>
          <SearchInput placeholder='Pesquisar' className='w-48' />

          <FilterSelect
            param={QUERY_PARAM_KEYS.orderBy}
            options={TEAMS_ORDER_OPTIONS}
            placeholder='Ordenar por'
            resetLabel='Limpar ordem'
            className='w-68'
          />

          <Button size='sm'>
            <PlusIcon />
            Novo membro
          </Button>
        </SectionHeaderActions>
      </SectionHeader>

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
                          <ClipboardPenIcon />
                          Editar
                        </DropdownMenuItem>

                        <Divider />

                        <DropdownMenuItem
                          variant='destructive'
                          className='text-center'
                        >
                          <XCircleIcon />
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
