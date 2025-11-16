'use client'

import { useQuery } from '@tanstack/react-query'
import { UserCheck2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderInfo } from '@/components/data-table/header/info'
import { DataTableHeaderOrderBy } from '@/components/data-table/header/order-by'
import { DataTableHeaderSearch } from '@/components/data-table/header/search'
import { Pagination } from '@/components/pagination'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tag } from '@/components/ui/tag'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { QUERY_PARAMS } from '@/constants/params'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import type { OrderMappingType } from '@/types/order'
import {
  PATIENT_REQUIREMENT_TYPES,
  PATIENT_REQUIREMENTS_ORDER_OPTIONS,
  type PatientRequirement,
  type PatientRequirementsOrder,
} from '@/types/patient-requirements'
import { formatDate } from '@/utils/formatters/format-date'

import { ApprovedPatientRequirementsListTableActions } from './approved-list-table-actions'
import ApprovedPatientRequirementsListTableSkeleton from './approved-list-table-skeleton'

export function ApprovedPatientRequirementsListTable() {
  const [stableTotal, setStableTotal] = useState(0)
  const { getParam } = useParams()

  const page = getParam(QUERY_PARAMS.page)
  const search = getParam(QUERY_PARAMS.search)
  const orderBy = getParam(QUERY_PARAMS.orderBy)

  const ORDER_MAPPING: OrderMappingType<PatientRequirementsOrder> = {
    name_asc: { orderBy: 'name', order: 'ASC' },
    name_desc: { orderBy: 'name', order: 'DESC' },
    date_asc: { orderBy: 'approved_at', order: 'ASC' },
    date_desc: { orderBy: 'approved_at', order: 'DESC' },
    type_asc: { orderBy: 'type', order: 'ASC' },
    type_desc: { orderBy: 'type', order: 'DESC' },
  }

  const orderByQuery = ORDER_MAPPING[orderBy as PatientRequirementsOrder] ?? {
    orderBy: 'approved_at',
    order: 'DESC',
  }

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.approvals.approved, search, page, orderByQuery],
    queryFn: () =>
      api<{ requirements: PatientRequirement[]; total: number }>(
        '/patient-requirements',
        { params: { page, search, status: 'approved', ...orderByQuery } },
      ),
  })

  const requirements = response?.data?.requirements ?? []
  const isEmpty = requirements.length === 0
  const hasActiveFilters = !!search

  useEffect(() => {
    if (response?.data) {
      setStableTotal(response.data.total)
    }
  }, [response?.data])

  return (
    <>
      <DataTableHeader>
        <DataTableHeaderInfo
          icon={<UserCheck2Icon />}
          total={stableTotal}
          title='Aprovações'
        />

        <DataTableHeaderActions>
          <DataTableHeaderSearch placeholder='Pesquisar nome...' />
          <DataTableHeaderOrderBy
            options={PATIENT_REQUIREMENTS_ORDER_OPTIONS}
            className='w-52'
          />
        </DataTableHeaderActions>
      </DataTableHeader>

      <Card className='p-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='min-w-80'>Nome</TableHead>
              <TableHead className='w-48'>Data da aprovação</TableHead>
              <TableHead className='w-48'>Tipo da solicitação</TableHead>
              <TableHead className='w-32 text-center'>Ações</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading && <ApprovedPatientRequirementsListTableSkeleton />}

          {!isLoading && isEmpty && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className='py-4 text-center'>
                  {hasActiveFilters
                    ? 'Nenhuma aprovação encontrada para os filtros aplicados.'
                    : 'Nenhuma aprovação encontrada'}
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {!isLoading && !isEmpty && (
            <TableBody>
              {requirements.map((requirement) => (
                <TableRow key={requirement.id}>
                  <TableCell className='flex items-center gap-2'>
                    <Avatar
                      className='size-9'
                      src={requirement.patient.avatar_url}
                    />
                    <span className='truncate'>{requirement.patient.name}</span>
                  </TableCell>
                  <TableCell>
                    {formatDate(requirement.approved_at ?? '-')}
                  </TableCell>
                  <TableCell>
                    <Tag>{PATIENT_REQUIREMENT_TYPES[requirement.type]}</Tag>
                  </TableCell>
                  <TableCell className='text-center'>
                    <ApprovedPatientRequirementsListTableActions
                      requirement={requirement}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Card>

      <Pagination totalItems={stableTotal} />
    </>
  )
}
