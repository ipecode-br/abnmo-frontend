'use client'

import { useQuery } from '@tanstack/react-query'
import { ClipboardPasteIcon } from 'lucide-react'
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
import { Card } from '@/components/ui/card'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { QUERY_PARAM_KEYS } from '@/enums/params'
import type { ReferralsOrder } from '@/enums/referrals'
import {
  REFERRAL_STATUS_OPTIONS,
  REFERRALS_ORDER_OPTIONS,
} from '@/enums/referrals'
import { SPECIALTIES_OPTIONS } from '@/enums/shared'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import type { QueryOrderMapping, ReferralsOrderBy } from '@/types/orders'
import type { Referral } from '@/types/referrals'

import { NewReferralButton } from './new-referral-button'
import { ReferralsTable } from './table'

export function ReferralsList() {
  const [showFilters, setShowFilters] = useState(false)
  const [stableTotal, setStableTotal] = useState(0)
  const { getParams, paramsQueryKey } = useParams()

  const [page, search, category, status, orderBy, startDate, endDate] =
    getParams([
      QUERY_PARAM_KEYS.page,
      QUERY_PARAM_KEYS.search,
      QUERY_PARAM_KEYS.category,
      QUERY_PARAM_KEYS.status,
      QUERY_PARAM_KEYS.orderBy,
      QUERY_PARAM_KEYS.startDate,
      QUERY_PARAM_KEYS.endDate,
    ])

  const ORDER_MAPPING: QueryOrderMapping<ReferralsOrder, ReferralsOrderBy> = {
    date_asc: { orderBy: 'date', order: 'ASC' },
    date_desc: { orderBy: 'date', order: 'DESC' },
    name_asc: { orderBy: 'patient', order: 'ASC' },
    name_desc: { orderBy: 'patient', order: 'DESC' },
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
    ORDER_MAPPING[orderBy as ReferralsOrder] ?? ORDER_MAPPING['name_asc']

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.referrals.main, paramsQueryKey],
    queryFn: () =>
      api<{ referrals: Referral[]; total: number }>('/referrals', {
        params: {
          page,
          search,
          category,
          status,
          startDate,
          endDate,
          ...orderByQuery,
        },
      }),
  })

  const referrals = response?.data?.referrals ?? []

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
          title='Encaminhamentos'
          icon={<ClipboardPasteIcon />}
          total={stableTotal}
        />
        <SectionHeaderActions>
          <SearchInput placeholder='Pesquisar...' className='w-48' />
          <FilterSelect
            param={QUERY_PARAM_KEYS.orderBy}
            options={REFERRALS_ORDER_OPTIONS}
            placeholder='Ordenar por...'
            resetLabel='Limpar ordem'
            className='w-52'
          />
          <ShowFilterButton onClick={() => setShowFilters(!showFilters)} />

          <NewReferralButton size='sm' />
        </SectionHeaderActions>
      </SectionHeader>

      {showFilters && (
        <section className='flex items-end gap-6'>
          <FilterContainer title='Categoria' className='w-48'>
            <FilterSelect
              param={QUERY_PARAM_KEYS.category}
              options={SPECIALTIES_OPTIONS}
              placeholder='Todas'
              resetLabel='Limpar categoria'
            />
          </FilterContainer>
          <FilterContainer title='Status' className='w-48'>
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
        <ReferralsTable referrals={referrals} loading={isLoading} />
      </Card>

      <Pagination totalItems={stableTotal} />
    </>
  )
}
