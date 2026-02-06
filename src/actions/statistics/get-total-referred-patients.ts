'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import type { QueryPeriod } from '@/enums/queries'
import { api } from '@/lib/api'

type GetTotalReferredPatientsParams = {
  period?: QueryPeriod
}

interface GetTotalReferredPatientsProps {
  params?: GetTotalReferredPatientsParams
  cacheKey?: string
}

export async function getTotalReferredPatients({
  params,
  cacheKey,
}: GetTotalReferredPatientsProps = {}) {
  try {
    const response = await api<{ total: number }>(
      '/statistics/referred-patients-total',
      {
        includeCookies: true,
        cache: 'force-cache',
        params,
        next: {
          revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
          tags: cacheKey
            ? [NEXT_CACHE_TAGS.statistics.totalReferredPatients.main, cacheKey]
            : [NEXT_CACHE_TAGS.statistics.totalReferredPatients.main],
        },
      },
    )

    if (!response.data) {
      return null
    }

    return response.data
  } catch (error) {
    console.error('Failed to fetch total referred patients:', error)
    return null
  }
}
