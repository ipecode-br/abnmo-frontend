'use client'

import { useQuery } from '@tanstack/react-query'
import { ClipboardPasteIcon } from 'lucide-react'
import { useState } from 'react'

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
import { QUERY_PARAM_KEYS } from '@/enums/params'
import type { PatientReferralsOrder } from '@/enums/patients'
import {
  REFERRAL_STATUS_OPTIONS,
  REFERRALS_ORDER_OPTIONS,
} from '@/enums/referrals'
import { SPECIALTIES_OPTIONS } from '@/enums/shared'
import { useParams } from '@/hooks/params'
import { usePermissions } from '@/hooks/use-permissions'
import { api } from '@/lib/api'
import { NewReferralButton } from '@/modules/referrals/new-referral-button'
import { ReferralsTable } from '@/modules/referrals/table'
import type { PatientReferralsOrderBy, QueryOrderMapping } from '@/types/orders'
import type { Referral } from '@/types/referrals'

interface PatientReferralsListProps {
  patientId: string
}

export function PatientReferralsList({
  patientId,
}: Readonly<PatientReferralsListProps>) {
  const [manualShowFilters, setManualShowFilters] = useState(false)
  const { getParams, paramsQueryKey } = useParams()
  const { canUser } = usePermissions()

  const [page, category, status, orderBy, startDate, endDate] = getParams([
    QUERY_PARAM_KEYS.page,
    QUERY_PARAM_KEYS.category,
    QUERY_PARAM_KEYS.status,
    QUERY_PARAM_KEYS.orderBy,
    QUERY_PARAM_KEYS.startDate,
    QUERY_PARAM_KEYS.endDate,
  ])

  const ORDER_MAPPING: QueryOrderMapping<
    PatientReferralsOrder,
    PatientReferralsOrderBy
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
    ORDER_MAPPING[orderBy as PatientReferralsOrder] ?? ORDER_MAPPING['date_asc']

  const { data: response, isLoading } = useQuery({
    placeholderData: (previousData) => previousData,
    queryKey: [QUERY_CACHE_KEYS.referrals.main, patientId, paramsQueryKey],
    queryFn: () =>
      api<{ referrals: Referral[]; total: number }>(`/referrals`, {
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

  const referrals = response?.data?.referrals ?? []
  const total = response?.data?.total ?? 0

  const hasActiveFilters = Boolean(category || status || startDate || endDate)
  const showFilters = manualShowFilters || hasActiveFilters
  const canCreateReferral = canUser('create', 'Referrals')

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Encaminhamentos'
          icon={<ClipboardPasteIcon />}
          total={total}
        />
        <SectionHeaderActions>
          <FilterSelect
            param={QUERY_PARAM_KEYS.orderBy}
            options={REFERRALS_ORDER_OPTIONS}
            placeholder='Ordenar por'
            resetLabel='Limpar ordem'
            className='w-52'
          />
          <ShowFilterButton
            onClick={() => setManualShowFilters(!manualShowFilters)}
          />

          {canCreateReferral && (
            <NewReferralButton patientId={patientId} size='sm' />
          )}
        </SectionHeaderActions>
      </SectionHeader>

      {showFilters && (
        <section className='flex flex-wrap gap-4 max-lg:flex-col lg:items-end lg:gap-6'>
          <FilterContainer title='Categoria' className='lg:w-46'>
            <FilterSelect
              param={QUERY_PARAM_KEYS.category}
              options={SPECIALTIES_OPTIONS}
              placeholder='Todas'
              resetLabel='Limpar categoria'
            />
          </FilterContainer>
          <FilterContainer title='Status' className='lg:w-46'>
            <FilterSelect
              param={QUERY_PARAM_KEYS.status}
              options={REFERRAL_STATUS_OPTIONS}
              placeholder='Todos'
              resetLabel='Limpar status'
            />
          </FilterContainer>
          <FilterDate allowFutureDates />
          <ClearFiltersButton />
        </section>
      )}

      <Card className='p-6'>
        <ReferralsTable
          referrals={referrals}
          hideColumns={['name']}
          loading={isLoading}
        />
      </Card>

      <Pagination totalItems={total} />
    </>
  )
}
