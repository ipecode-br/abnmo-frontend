'use client'

import { useQuery } from '@tanstack/react-query'
import { ClipboardCheckIcon } from 'lucide-react'

import { FilterSelect } from '@/components/filters/filter-select'
import { SearchInput } from '@/components/filters/search-input'
import { Pagination } from '@/components/pagination'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@/components/section-header'
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
import { QUERY_PARAM_KEYS } from '@/enums/params'
import {
  PATIENT_REQUIREMENT_TYPES,
  PATIENT_REQUIREMENTS_ORDER_OPTIONS,
  type PatientRequirementsOrder,
} from '@/enums/patient-requirements'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import type {
  PatientRequirementsOrderBy,
  QueryOrderMapping,
} from '@/types/orders'
import type { PatientRequirement } from '@/types/patient-requirements.d.ts'
import { formatDate } from '@/utils/formatters/format-date'

import { ApprovedPatientRequirementsListTableActions } from './approved-list-table-actions'
import ApprovedPatientRequirementsListTableSkeleton from './approved-list-table-skeleton'

export function ApprovedPatientRequirementsListTable() {
  const { getParams } = useParams()

  const [page, search, orderBy] = getParams([
    QUERY_PARAM_KEYS.page,
    QUERY_PARAM_KEYS.search,
    QUERY_PARAM_KEYS.orderBy,
  ])

  const ORDER_MAPPING: QueryOrderMapping<
    PatientRequirementsOrder,
    PatientRequirementsOrderBy
  > = {
    name_asc: { orderBy: 'patient', order: 'ASC' },
    name_desc: { orderBy: 'patient', order: 'DESC' },
    date_asc: { orderBy: 'approved_at', order: 'ASC' },
    date_desc: { orderBy: 'approved_at', order: 'DESC' },
    type_asc: { orderBy: 'type', order: 'ASC' },
    type_desc: { orderBy: 'type', order: 'DESC' },
  }

  const orderByQuery =
    ORDER_MAPPING[orderBy as PatientRequirementsOrder] ??
    ORDER_MAPPING['name_asc']

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.approvals.approved, search, page, orderByQuery],
    queryFn: () =>
      api<{ requirements: PatientRequirement[]; total: number }>(
        '/patient-requirements',
        { params: { page, search, status: 'approved', ...orderByQuery } },
      ),
  })

  const requirements = response?.data?.requirements ?? []
  const total = response?.data?.total ?? 0

  const isEmpty = !isLoading && requirements.length <= 0
  const hasActiveFilters = !!search

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Aprovações'
          icon={<ClipboardCheckIcon />}
          total={total}
        />
        <SectionHeaderActions>
          <SearchInput placeholder='Pesquisar nome...' className='w-56' />
          <FilterSelect
            param={QUERY_PARAM_KEYS.orderBy}
            options={PATIENT_REQUIREMENTS_ORDER_OPTIONS}
            placeholder='Ordenar por'
            resetLabel='Limpar ordem'
            className='w-52'
          />
        </SectionHeaderActions>
      </SectionHeader>

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
                    : 'Nenhuma aprovação encontrada.'}
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

      <Pagination totalItems={total} />
    </>
  )
}
