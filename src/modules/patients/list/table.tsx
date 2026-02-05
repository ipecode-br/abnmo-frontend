'use client'

import { useQuery } from '@tanstack/react-query'
import { PlusIcon, Users2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ClearFiltersButton } from '@/components/filters/clear-filters-button'
import { FilterContainer } from '@/components/filters/container'
import { FilterDate } from '@/components/filters/date'
import { FilterSelect } from '@/components/filters/filter-select'
import { SearchInput } from '@/components/filters/search-input'
import { ShowFilterButton } from '@/components/filters/show-filter-button'
import { Pagination } from '@/components/pagination'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@/components/section-header'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { NavButton } from '@/components/ui/nav-button'
import {
  Table,
  TableBody,
  TableButton,
  TableCell,
  TableEmptyCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tag } from '@/components/ui/tag'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { QUERY_PARAMS } from '@/constants/params'
import { ROUTES } from '@/constants/routes'
import {
  PATIENT_STATUS_OPTIONS,
  PATIENT_STATUSES,
  PATIENTS_ORDER_OPTIONS,
  type PatientsOrder,
} from '@/enums/patients'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import type { PatientsOrderBy, QueryOrderMapping } from '@/types/orders'
import type { Patient } from '@/types/patients.d.ts'
import { formatDate } from '@/utils/formatters/format-date'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

import { PatientsListTableActions } from './actions'
import PatientsListTableSkeleton from './skeleton'

export function PatientsListTable() {
  const [showFilters, setShowFilters] = useState(false)
  const [stableTotal, setStableTotal] = useState(0)
  const { getParam } = useParams()
  const router = useRouter()

  const page = getParam(QUERY_PARAMS.page)
  const search = getParam(QUERY_PARAMS.search)
  const status = getParam(QUERY_PARAMS.status)
  const orderBy = getParam(QUERY_PARAMS.orderBy)
  const startDate = getParam(QUERY_PARAMS.startDate)
  const endDate = getParam(QUERY_PARAMS.endDate)
  const filterQueries = [page, search, orderBy, status, startDate, endDate]

  const ORDER_MAPPING: QueryOrderMapping<PatientsOrder, PatientsOrderBy> = {
    date_asc: { orderBy: 'date', order: 'ASC' },
    date_desc: { orderBy: 'date', order: 'DESC' },
    email_asc: { orderBy: 'email', order: 'ASC' },
    email_desc: { orderBy: 'email', order: 'DESC' },
    name_asc: { orderBy: 'name', order: 'ASC' },
    name_desc: { orderBy: 'name', order: 'DESC' },
  }

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.patients.main, filterQueries],
    queryFn: () =>
      api<{ patients: Patient[]; total: number }>('/patients', {
        params: {
          page,
          search,
          status,
          startDate,
          endDate,
          ...ORDER_MAPPING[orderBy as PatientsOrder],
        },
      }),
  })

  const patients = response?.data?.patients ?? []
  const isEmpty = patients.length === 0

  // Update stable total only when we have actual data to prevent pagination flickering
  useEffect(() => {
    if (response?.data?.total !== undefined) {
      setStableTotal(response.data.total)
    }
  }, [response?.data?.total])

  useEffect(() => {
    if (status || startDate || endDate) {
      setShowFilters(true)
    }
  }, [status, startDate, endDate])

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Pacientes'
          icon={<Users2Icon />}
          total={stableTotal}
        />
        <SectionHeaderActions>
          <SearchInput placeholder='Pesquisar...' className='w-48' />
          <FilterSelect
            param={QUERY_PARAMS.orderBy}
            options={PATIENTS_ORDER_OPTIONS}
            placeholder='Ordenar por...'
            resetLabel='Limpar ordem'
            className='w-52'
          />
          <ShowFilterButton onClick={() => setShowFilters(!showFilters)} />

          <NavButton size='sm' href={ROUTES.dashboard.patients.new}>
            <PlusIcon />
            Novo paciente
          </NavButton>
        </SectionHeaderActions>
      </SectionHeader>

      {showFilters && (
        <section className='flex items-end gap-8'>
          <FilterContainer title='Status' className='w-48'>
            <FilterSelect
              param={QUERY_PARAMS.status}
              options={PATIENT_STATUS_OPTIONS}
              placeholder='Selecione o status'
              resetLabel='Limpar status'
            />
          </FilterContainer>
          <FilterDate />
          <ClearFiltersButton />
        </section>
      )}

      <Card className='p-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-64'>Nome do paciente</TableHead>
              <TableHead className='w-44'>Telefone</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className='w-28'>Status</TableHead>
              <TableHead className='w-40 whitespace-nowrap'>
                Data de cadastro
              </TableHead>
              <TableHead className='w-20 text-center'>Ações</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading && <PatientsListTableSkeleton />}

          {!isLoading && !isEmpty && (
            <TableBody>
              {patients.map((patient) => {
                const status = PATIENT_STATUSES[patient.status]
                return (
                  <TableRow key={patient.id}>
                    <TableCell className='py-0'>
                      <TableButton
                        className='w-64'
                        onClick={() =>
                          router.push(
                            ROUTES.dashboard.patients.details.info(patient.id),
                          )
                        }
                      >
                        <Avatar className='size-9' src={patient.avatar_url} />
                        <span className='truncate'>{patient.name}</span>
                      </TableButton>
                    </TableCell>

                    <TableCell>{formatPhoneNumber(patient.phone)}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>
                      <Tag variant={status.variant} size='sm'>
                        {status.label}
                      </Tag>
                    </TableCell>
                    <TableCell>{formatDate(patient.created_at)}</TableCell>
                    <TableCell className='text-center'>
                      <PatientsListTableActions patient={patient} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          )}

          {!isLoading && isEmpty && (
            <TableBody>
              <TableRow>
                <TableEmptyCell colSpan={6}>
                  Nenhum paciente encontrado
                </TableEmptyCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </Card>

      <Pagination totalItems={stableTotal} />
    </>
  )
}
