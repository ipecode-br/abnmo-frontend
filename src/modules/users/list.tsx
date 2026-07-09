'use client'

import { useQuery } from '@tanstack/react-query'
import { HeartHandshakeIcon } from 'lucide-react'
import { useState } from 'react'

import { ClearFiltersButton } from '@/components/filters/clear-filters-button'
import { FilterDate } from '@/components/filters/filter-date'
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
import { Label, LabelWrapper } from '@/components/ui-v2/label'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { QUERY_PARAM_KEYS } from '@/enums/params'
import {
  USER_STATUS_OPTIONS,
  USERS_ORDER_OPTIONS,
  USERS_ROLE_OPTIONS,
  type UsersOrder,
} from '@/enums/users'
import { useParams } from '@/hooks/params'
import { usePermissions } from '@/hooks/use-permissions'
import { api } from '@/lib/api'
import type { QueryOrderMapping, UsersOrderBy } from '@/types/orders'
import type { User } from '@/types/users'

import { NewInviteButton } from './invites/new-invite-button'
import { UsersTable } from './table'

export function UsersList() {
  const [manualShowFilters, setManualShowFilters] = useState(false)
  const { getParams, currentParams } = useParams()
  const { canUser } = usePermissions()

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
    placeholderData: (previousData) => previousData,
    queryKey: [QUERY_CACHE_KEYS.users.main, currentParams],
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
  const total = response?.data?.total ?? 0

  const hasActiveFilters = Boolean(role || status || startDate || endDate)
  const showFilters = manualShowFilters || hasActiveFilters
  const canCreatInvite = canUser('create', 'Invites')

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Membros'
          icon={<HeartHandshakeIcon />}
          total={total}
        />

        <SectionHeaderActions>
          <SearchInput className='md:w-48' />
          <FilterSelect
            param={QUERY_PARAM_KEYS.orderBy}
            options={USERS_ORDER_OPTIONS}
            placeholder='Ordenar por'
            resetLabel='Limpar ordem'
            className='w-44'
          />
          <ShowFilterButton
            onClick={() => setManualShowFilters(!manualShowFilters)}
          />

          {canCreatInvite && <NewInviteButton />}
        </SectionHeaderActions>
      </SectionHeader>

      {showFilters && (
        <section className='flex flex-wrap items-end gap-6'>
          <LabelWrapper>
            <Label className='w-44'>Cargo</Label>
            <FilterSelect
              param={QUERY_PARAM_KEYS.role}
              options={USERS_ROLE_OPTIONS}
              placeholder='Todos'
              resetLabel='Todos'
            />
          </LabelWrapper>
          <LabelWrapper>
            <Label className='w-44'>Status</Label>
            <FilterSelect
              param={QUERY_PARAM_KEYS.status}
              options={USER_STATUS_OPTIONS}
              placeholder='Todos'
              resetLabel='Todos'
            />
          </LabelWrapper>
          <FilterDate />
          <ClearFiltersButton />
        </section>
      )}

      <Card className='p-6 sm:col-span-6'>
        <UsersTable users={users} loading={isLoading} />
      </Card>

      <Pagination totalItems={total} />
    </>
  )
}
