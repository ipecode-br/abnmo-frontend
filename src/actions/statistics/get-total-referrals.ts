'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import type { QueryPeriod } from '@/enums/queries'
import { api } from '@/lib/api'

type GetTotalReferralsParams = {
  period?: QueryPeriod
}

interface GetTotalReferralsProps {
  params?: GetTotalReferralsParams
  cacheKey?: string
}

export async function getTotalReferrals({
  params,
  cacheKey,
}: GetTotalReferralsProps = {}) {
  try {
    const response = await api<{ total: number }>(
      '/statistics/referrals-total',
      {
        includeCookies: true,
        cache: 'force-cache',
        params,
        next: {
          revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
          tags: cacheKey
            ? [NEXT_CACHE_TAGS.statistics.totalReferrals.main, cacheKey]
            : [NEXT_CACHE_TAGS.statistics.totalReferrals.main],
        },
      },
    )

    if (!response.data) {
      return null
    }

    return response.data
  } catch (error) {
    console.error('Failed to fetch total referrals statistic:', error)
    return null
  }
}
