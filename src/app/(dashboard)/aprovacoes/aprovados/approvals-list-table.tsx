'use client'

import { useQuery } from '@tanstack/react-query'
import { PlusIcon, Users2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import React from 'react'

import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderFilterButton } from '@/components/data-table/header/filter-button'
import { DataTableHeaderInfo } from '@/components/data-table/header/info'
import { DataTableHeaderOrderBy } from '@/components/data-table/header/order-by'
import { DataTableHeaderSearch } from '@/components/data-table/header/search'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'
import { NavButton } from '@/components/ui/nav-button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { QUERY_PARAMS } from '@/constants/params'
import { ROUTES } from '@/constants/routes'
import { useParams } from '@/hooks/params'
import { PATIENTS_ORDER_OPTIONS } from '@/types/patients'
import { formatDate } from '@/utils/formatters/format-date'

export type RequirementType = {
  id: string
  name: string
  approved_at: string
  type: string
  actions?: React.ReactNode
}

const renderActions = (id: string): React.ReactNode => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button
        variant='ghost'
        size='sm'
        className='px-2 text-lg font-bold'
        aria-label='Ações'
      >
        ...
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end'>
      <DropdownMenuItem onClick={() => console.log('Editar', id)}>
        Editar
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

const mockApprovals: RequirementType[] = [
  {
    id: '1',
    name: 'João Silva',
    approved_at: '2024-05-20',
    type: 'Cadastro',
    actions: renderActions('1'),
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    approved_at: '2024-06-15',
    type: 'Atualização de dados',
    actions: renderActions('2'),
  },
  {
    id: '3',
    name: 'Pedro Souza',
    approved_at: '2024-07-10',
    type: 'Envio de documento',
    actions: renderActions('3'),
  },
]

export function ApprovalsListTable() {
  const [showFilters, setShowFilters] = useState(false)
  const [stableTotal, setStableTotal] = useState(mockApprovals.length)
  const { getParam } = useParams()

  const search = getParam(QUERY_PARAMS.search)
  const page = getParam(QUERY_PARAMS.page)

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.approvals, search, page],
    queryFn: async () => {
      return new Promise<{ data: RequirementType[] }>((resolve) => {
        setTimeout(() => resolve({ data: mockApprovals }), 300)
      })
    },
  })

  const approvals = response?.data ?? []
  const isEmpty = approvals.length === 0

  useEffect(() => {
    if (response?.data?.length !== undefined) {
      setStableTotal(response.data.length)
    }
  }, [response?.data?.length])

  return (
    <>
      <DataTableHeader>
        <DataTableHeaderInfo
          icon={<Users2Icon />}
          total={stableTotal}
          title='Pacientes cadastrados'
          emptyTitle='Nenhum paciente cadastrado'
        />

        <DataTableHeaderActions>
          <DataTableHeaderSearch placeholder='Pesquisar nome...' />
          <DataTableHeaderFilterButton
            onClick={() => setShowFilters(!showFilters)}
          />
          <DataTableHeaderOrderBy
            options={PATIENTS_ORDER_OPTIONS}
            className='w-52'
          />
          <NavButton size='sm' href={ROUTES.dashboard.patients.new}>
            <PlusIcon />
            Novo paciente
          </NavButton>
        </DataTableHeaderActions>
      </DataTableHeader>

      <Card className='p-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-64'>Nome</TableHead>
              <TableHead className='w-48'>Data de Aprovação</TableHead>
              <TableHead className='w-48'>Tipo de Solicitação</TableHead>
              <TableHead className='w-32 text-center'>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className='py-4 text-center'>
                  Carregando...
                </TableCell>
              </TableRow>
            )}

            {!isLoading && isEmpty && (
              <TableRow>
                <TableCell colSpan={4} className='py-4 text-center'>
                  Nenhum aprovado encontrado
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !isEmpty &&
              approvals.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{formatDate(item.approved_at)}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell className='text-center'>{item.actions}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>

      <Pagination totalItems={stableTotal} />
    </>
  )
}
