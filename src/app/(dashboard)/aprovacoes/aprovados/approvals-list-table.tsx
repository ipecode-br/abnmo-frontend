'use client'

import { useQuery } from '@tanstack/react-query'
import { CheckCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderFilterButton } from '@/components/data-table/header/filter-button'
import { DataTableHeaderInfo } from '@/components/data-table/header/info'
import { DataTableHeaderSearch } from '@/components/data-table/header/search'
import { Pagination } from '@/components/pagination'
import { Card } from '@/components/ui/card'
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
import { useParams } from '@/hooks/params'
import { formatDate } from '@/utils/formatters/format-date'

export type RequirementType = {
  id: string
  name: string
  type: string
  approved_at: string
}

const mockApprovals: RequirementType[] = [
  {
    id: '1',
    name: 'João Silva',
    type: 'Cadastro',
    approved_at: '2024-05-20',
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    type: 'Atualização de dados',
    approved_at: '2024-06-15',
  },
  {
    id: '3',
    name: 'Pedro Souza',
    type: 'Envio de documento',
    approved_at: '2024-07-10',
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
          icon={<CheckCircleIcon />}
          total={stableTotal}
          title='Aprovados'
          emptyTitle='Nenhum aprovado encontrado'
        />
        <DataTableHeaderActions>
          <DataTableHeaderSearch placeholder='Pesquisar nome...' />
          <DataTableHeaderFilterButton
            onClick={() => setShowFilters(!showFilters)}
          />
        </DataTableHeaderActions>
      </DataTableHeader>

      <Card className='p-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-64'>Nome</TableHead>
              <TableHead className='w-48'>Tipo</TableHead>
              <TableHead className='w-48'>Data de aprovação</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>Carregando...</TableCell>
              </TableRow>
            )}

            {!isLoading && isEmpty && (
              <TableRow>
                <TableCell colSpan={3} className='py-4 text-center'>
                  Nenhum aprovado encontrado
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !isEmpty &&
              approvals.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{formatDate(item.approved_at)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>

      <Pagination totalItems={stableTotal} />
    </>
  )
}
