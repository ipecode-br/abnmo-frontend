'use client'

import { useQuery } from '@tanstack/react-query'
import { HeartHandshakeIcon, PlusIcon } from 'lucide-react'
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
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { QUERY_PARAM_KEYS } from '@/enums/params'
import {
  USER_STATUS_OPTIONS,
  USERS_ORDER_OPTIONS,
  USERS_ROLE_OPTIONS,
  type UsersOrder,
} from '@/enums/users'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import type { QueryOrderMapping, UsersOrderBy } from '@/types/orders'
import type { User } from '@/types/users'

import { UsersTable } from './table'

export function UsersList() {
  const [showFilters, setShowFilters] = useState(false)
  const [stableTotal, setStableTotal] = useState(0)
  const { getParams, paramsQueryKey } = useParams()

  const [page, search, role, status, orderBy, startDate, endDate] = getParams([
    QUERY_PARAM_KEYS.page,
    QUERY_PARAM_KEYS.search,
    QUERY_PARAM_KEYS.role,
    QUERY_PARAM_KEYS.status,
    QUERY_PARAM_KEYS.orderBy,
    QUERY_PARAM_KEYS.startDate,
    QUERY_PARAM_KEYS.endDate,
  ])

  const ORDER_MAPPING: QueryOrderMapping<UsersOrder, UsersOrderBy> = {
    name_asc: { orderBy: 'name', order: 'ASC' },
    name_desc: { orderBy: 'name', order: 'DESC' },
    date_asc: { orderBy: 'date', order: 'ASC' },
    date_desc: { orderBy: 'date', order: 'DESC' },
    role_asc: { orderBy: 'role', order: 'ASC' },
    role_desc: { orderBy: 'role', order: 'DESC' },
    status_asc: { orderBy: 'status', order: 'ASC' },
    status_desc: { orderBy: 'status', order: 'DESC' },
  }

  const orderByQuery =
    ORDER_MAPPING[orderBy as UsersOrder] ?? ORDER_MAPPING['name_asc']

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.users.main, paramsQueryKey],
    queryFn: () =>
      api<{ users: User[]; total: number }>('/users', {
        params: {
          page,
          search,
          role,
          status,
          startDate,
          endDate,
          ...orderByQuery,
        },
      }),
  })

  const users = response?.data?.users ?? []

  // Update stable total only when we have actual data to prevent pagination flickering
  useEffect(() => {
    if (response?.data?.total !== undefined) {
      setStableTotal(response.data.total)
    }
  }, [response?.data?.total])

  useEffect(() => {
    if (status || role || startDate || endDate) {
      setShowFilters(true)
    }
  }, [status, role, startDate, endDate])

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Membros'
          icon={<HeartHandshakeIcon />}
          total={stableTotal}
        />

        <SectionHeaderActions>
          <SearchInput placeholder='Pesquisar' className='w-48' />
          <FilterSelect
            param={QUERY_PARAM_KEYS.orderBy}
            options={USERS_ORDER_OPTIONS}
            placeholder='Ordenar por'
            resetLabel='Limpar ordem'
            className='w-44'
          />
          <ShowFilterButton onClick={() => setShowFilters(!showFilters)} />
          <Button size='sm'>
            <PlusIcon />
            Novo usuário
          </Button>
        </SectionHeaderActions>
      </SectionHeader>

      {showFilters && (
        <section className='flex flex-wrap items-end gap-6'>
          <FilterContainer title='Cargo' className='w-44'>
            <FilterSelect
              param={QUERY_PARAM_KEYS.role}
              options={USERS_ROLE_OPTIONS}
              placeholder='Todos'
              resetLabel='Limpar cargo'
            />
          </FilterContainer>
          <FilterContainer title='Status' className='w-44'>
            <FilterSelect
              param={QUERY_PARAM_KEYS.status}
              options={USER_STATUS_OPTIONS}
              placeholder='Todos'
              resetLabel='Limpar status'
            />
          </FilterContainer>
          <FilterDate />
          <ClearFiltersButton />
        </section>
      )}

      <Card className='p-6 sm:col-span-6'>
        <UsersTable users={users} loading={isLoading} />
      </Card>

      <Pagination totalItems={stableTotal} />
    </>
  )
}
