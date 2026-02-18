'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import type { QueryPeriod } from '@/enums/queries'
import { api } from '@/lib/api'

type Status = 'total' | 'active' | 'inactive'

type GetTotalPatientsParams = {
  period?: QueryPeriod
}

interface GetTotalPatientsProps {
  params?: GetTotalPatientsParams
  cacheKey?: string
}

export async function getTotalPatients({
  params,
  cacheKey,
}: GetTotalPatientsProps = {}) {
  try {
    const response = await api<Record<Status, number>>(
      '/statistics/patients/total',
      {
        includeCookies: true,
        cache: 'force-cache',
        params,
        next: {
          revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
          tags: cacheKey
            ? [NEXT_CACHE_TAGS.statistics.totalPatients.main, cacheKey]
            : [NEXT_CACHE_TAGS.statistics.totalPatients.main],
        },
      },
    )

    if (!response.data) {
      return null
    }

    return response.data
  } catch (error) {
    console.error('Failed to fetch patients statistics:', error)
    return null
  }
}
