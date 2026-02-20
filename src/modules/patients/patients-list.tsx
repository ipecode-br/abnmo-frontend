'use client'

import { useQuery } from '@tanstack/react-query'
import { PlusIcon, Users2Icon } from 'lucide-react'
import { useState } from 'react'

import { ClearFiltersButton } from '@/components/filters/clear-filters-button'
import { FilterContainer } from '@/components/filters/container'
import { FilterDate } from '@/components/filters/date'
import { FilterSelect } from '@/components/filters/filter-select'
import { FilterItem } from '@/components/filters/item'
import { SearchInput } from '@/components/filters/search-input'
import { ShowFilterButton } from '@/components/filters/show-filter-button'
import { Pagination } from '@/components/pagination'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@/components/section-header'
import { Card } from '@/components/ui/card'
import { NavButton } from '@/components/ui/nav-button'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { ROUTES } from '@/constants/routes'
import { QUERY_PARAM_KEYS } from '@/enums/params'
import {
  PATIENT_STATUS_OPTIONS,
  PATIENTS_ORDER_OPTIONS,
  type PatientsOrder,
} from '@/enums/patients'
import { useParams } from '@/hooks/params'
import { usePermissions } from '@/hooks/use-permissions'
import { api } from '@/lib/api'
import type { PatientsOrderBy, QueryOrderMapping } from '@/types/orders'
import type { Patient } from '@/types/patients.d.ts'

import { PatientsTable } from './table'

export function PatientsList() {
  const [manualShowFilters, setManualShowFilters] = useState(false)
  const { getParams, paramsQueryKey } = useParams()
  const { canUser } = usePermissions()

  const [page, search, status, orderBy, startDate, endDate] = getParams([
    QUERY_PARAM_KEYS.page,
    QUERY_PARAM_KEYS.search,
    QUERY_PARAM_KEYS.status,
    QUERY_PARAM_KEYS.orderBy,
    QUERY_PARAM_KEYS.startDate,
    QUERY_PARAM_KEYS.endDate,
  ])

  const ORDER_MAPPING: QueryOrderMapping<PatientsOrder, PatientsOrderBy> = {
    date_asc: { orderBy: 'date', order: 'ASC' },
    date_desc: { orderBy: 'date', order: 'DESC' },
    email_asc: { orderBy: 'email', order: 'ASC' },
    email_desc: { orderBy: 'email', order: 'DESC' },
    name_asc: { orderBy: 'name', order: 'ASC' },
    name_desc: { orderBy: 'name', order: 'DESC' },
  }

  const { data: response, isLoading } = useQuery({
    placeholderData: (previousData) => previousData,
    queryKey: [QUERY_CACHE_KEYS.patients.main, paramsQueryKey],
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
  const total = response?.data?.total ?? 0

  const hasActiveFilters = Boolean(status || startDate || endDate)
  const showFilters = manualShowFilters || hasActiveFilters
  const canCreatePatient = canUser('create', 'Patients')

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Pacientes'
          icon={<Users2Icon />}
          total={total}
        />
        <SectionHeaderActions>
          <SearchInput placeholder='Pesquisar' className='w-40' />
          <FilterSelect
            param={QUERY_PARAM_KEYS.orderBy}
            options={PATIENTS_ORDER_OPTIONS}
            placeholder='Ordenar por'
            resetLabel='Limpar ordem'
            className='w-40'
          />
          <ShowFilterButton
            onClick={() => setManualShowFilters(!manualShowFilters)}
          />

          {canCreatePatient && (
            <NavButton size='sm' href={ROUTES.dashboard.patients.new}>
              <PlusIcon />
              Cadastrar
            </NavButton>
          )}
        </SectionHeaderActions>
      </SectionHeader>

      {showFilters && (
        <FilterContainer>
          <FilterItem title='Status' className='lg:w-40'>
            <FilterSelect
              param={QUERY_PARAM_KEYS.status}
              options={PATIENT_STATUS_OPTIONS}
              placeholder='Todos'
              resetLabel='Limpar status'
            />
          </FilterItem>
          <FilterDate />
          <ClearFiltersButton />
        </FilterContainer>
      )}

      <Card className='p-6'>
        <PatientsTable patients={patients} loading={isLoading} />
      </Card>

      <Pagination totalItems={total} />
    </>
  )
}
