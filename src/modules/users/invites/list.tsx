'use client'

import { useQuery } from '@tanstack/react-query'
import { MailPlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { FilterSelect } from '@/components/filters/filter-select'
import { SearchInput } from '@/components/filters/search-input'
import { Pagination } from '@/components/pagination'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@/components/section-header'
import { Card } from '@/components/ui/card'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { INVITES_ORDER_OPTIONS, type InvitesOrder } from '@/enums/invites'
import { QUERY_PARAM_KEYS } from '@/enums/params'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import type { InvitesOrderBy, QueryOrderMapping } from '@/types/orders'
import type { UserInvite } from '@/types/users'

import { NewInviteButton } from './new-invite-button'
import { UserInvitesTable } from './table'

export function UserInvitesList() {
  const [stableTotal, setStableTotal] = useState(0)
  const { getParams, paramsQueryKey } = useParams()

  const [page, search, orderBy, startDate, endDate] = getParams([
    QUERY_PARAM_KEYS.page,
    QUERY_PARAM_KEYS.search,
    QUERY_PARAM_KEYS.orderBy,
    QUERY_PARAM_KEYS.startDate,
    QUERY_PARAM_KEYS.endDate,
  ])

  const ORDER_MAPPING: QueryOrderMapping<InvitesOrder, InvitesOrderBy> = {
    email_asc: { orderBy: 'email', order: 'ASC' },
    email_desc: { orderBy: 'email', order: 'DESC' },
    date_asc: { orderBy: 'date', order: 'ASC' },
    date_desc: { orderBy: 'date', order: 'DESC' },
  }

  const orderByQuery =
    ORDER_MAPPING[orderBy as InvitesOrder] ?? ORDER_MAPPING['email_asc']

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.users.invites, paramsQueryKey],
    queryFn: () =>
      api<{ invites: UserInvite[]; total: number }>('/users/invites', {
        params: { page, search, startDate, endDate, ...orderByQuery },
      }),
  })

  const invites = response?.data?.invites ?? []

  // Update stable total only when we have actual data to prevent pagination flickering
  useEffect(() => {
    if (response?.data?.total !== undefined) {
      setStableTotal(response.data.total)
    }
  }, [response?.data?.total])

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Convites'
          icon={<MailPlusIcon />}
          total={stableTotal}
        />

        <SectionHeaderActions>
          <SearchInput placeholder='Pesquisar' className='w-48' />
          <FilterSelect
            param={QUERY_PARAM_KEYS.orderBy}
            options={INVITES_ORDER_OPTIONS}
            placeholder='Ordenar por'
            resetLabel='Limpar ordem'
            className='w-40'
          />
          <NewInviteButton size='sm' />
        </SectionHeaderActions>
      </SectionHeader>

      <Card className='p-6 sm:col-span-6'>
        <UserInvitesTable invites={invites} loading={isLoading} />
      </Card>

      <Pagination totalItems={stableTotal} />
    </>
  )
}
