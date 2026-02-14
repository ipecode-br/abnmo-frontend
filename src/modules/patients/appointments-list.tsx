'use client'

import { useQuery } from '@tanstack/react-query'
import { ClipboardCheckIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { ClearFiltersButton } from '@/components/filters/clear-filters-button'
import { FilterContainer } from '@/components/filters/container'
import { FilterDate } from '@/components/filters/date'
import { FilterSelect } from '@/components/filters/filter-select'
import { ShowFilterButton } from '@/components/filters/show-filter-button'
import { Pagination } from '@/components/pagination'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@/components/section-header'
import { Card } from '@/components/ui/card'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import {
  APPOINTMENT_STATUS_OPTIONS,
  APPOINTMENTS_ORDER_OPTIONS,
} from '@/enums/appointments'
import { QUERY_PARAM_KEYS } from '@/enums/params'
import type { PatientAppointmentsOrder } from '@/enums/patients'
import { SPECIALTIES_OPTIONS } from '@/enums/shared'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import { NewAppointmentButton } from '@/modules/appointments/new-appointment-button'
import { AppointmentsTable } from '@/modules/appointments/table'
import type { Appointment } from '@/types/appointments'
import type {
  PatientAppointmentsOrderBy,
  QueryOrderMapping,
} from '@/types/orders'

interface PatientAppointmentsListProps {
  patientId: string
}

export function PatientAppointmentsList({
  patientId,
}: Readonly<PatientAppointmentsListProps>) {
  const [showFilters, setShowFilters] = useState(false)
  const [stableTotal, setStableTotal] = useState(0)
  const { getParams, paramsQueryKey } = useParams()

  const [page, category, status, orderBy, startDate, endDate] = getParams([
    QUERY_PARAM_KEYS.page,
    QUERY_PARAM_KEYS.category,
    QUERY_PARAM_KEYS.status,
    QUERY_PARAM_KEYS.orderBy,
    QUERY_PARAM_KEYS.startDate,
    QUERY_PARAM_KEYS.endDate,
  ])

  const ORDER_MAPPING: QueryOrderMapping<
    PatientAppointmentsOrder,
    PatientAppointmentsOrderBy
  > = {
    date_asc: { orderBy: 'date', order: 'ASC' },
    date_desc: { orderBy: 'date', order: 'DESC' },
    status_asc: { orderBy: 'status', order: 'ASC' },
    status_desc: { orderBy: 'status', order: 'DESC' },
    category_asc: { orderBy: 'category', order: 'ASC' },
    category_desc: { orderBy: 'category', order: 'DESC' },
    condition_asc: { orderBy: 'condition', order: 'ASC' },
    condition_desc: { orderBy: 'condition', order: 'DESC' },
    professional_asc: { orderBy: 'professional', order: 'ASC' },
    professional_desc: { orderBy: 'professional', order: 'DESC' },
  }

  const orderByQuery =
    ORDER_MAPPING[orderBy as PatientAppointmentsOrder] ??
    ORDER_MAPPING['date_asc']

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.appointments.main, patientId, paramsQueryKey],
    queryFn: () =>
      api<{ appointments: Appointment[]; total: number }>(`/appointments`, {
        params: {
          patientId,
          page,
          category,
          status,
          startDate,
          endDate,
          ...orderByQuery,
        },
      }),
  })

  const appointments = response?.data?.appointments ?? []

  // Update stable total only when we have actual data to prevent pagination flickering
  useEffect(() => {
    if (response?.data?.total !== undefined) {
      setStableTotal(response.data.total)
    }
  }, [response?.data?.total])

  useEffect(() => {
    if (category || startDate || endDate) {
      setShowFilters(true)
    }
  }, [category, startDate, endDate])

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Atendimentos'
          icon={<ClipboardCheckIcon />}
          total={stableTotal}
        />
        <SectionHeaderActions>
          <FilterSelect
            param={QUERY_PARAM_KEYS.orderBy}
            options={APPOINTMENTS_ORDER_OPTIONS}
            placeholder='Ordenar por'
            resetLabel='Limpar ordem'
            className='w-52'
          />
          <ShowFilterButton onClick={() => setShowFilters(!showFilters)} />

          <NewAppointmentButton patientId={patientId} size='sm' />
        </SectionHeaderActions>
      </SectionHeader>

      {showFilters && (
        <section className='flex flex-wrap items-end gap-6'>
          <FilterContainer title='Categoria' className='w-46'>
            <FilterSelect
              param={QUERY_PARAM_KEYS.category}
              options={SPECIALTIES_OPTIONS}
              placeholder='Todas'
              resetLabel='Limpar categoria'
            />
          </FilterContainer>
          <FilterContainer title='Status' className='w-46'>
            <FilterSelect
              param={QUERY_PARAM_KEYS.status}
              options={APPOINTMENT_STATUS_OPTIONS}
              placeholder='Todos'
              resetLabel='Limpar status'
            />
          </FilterContainer>
          <FilterDate allowFutureDates />
          <ClearFiltersButton />
        </section>
      )}

      <Card className='p-6'>
        <AppointmentsTable
          appointments={appointments}
          hideColumns={['name']}
          loading={isLoading}
        />
      </Card>

      <Pagination totalItems={stableTotal} />
    </>
  )
}
