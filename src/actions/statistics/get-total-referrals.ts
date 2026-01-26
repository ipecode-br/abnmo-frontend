'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import type { QueryPeriod } from '@/enums/queries'
import { api } from '@/lib/api'

type GetTotalReferralsParams = {
  period?: QueryPeriod
}

export async function getTotalReferrals(params?: GetTotalReferralsParams) {
  try {
    const response = await api<{ total: number }>(
      '/statistics/referrals-total',
      {
        params,
        includeCookies: true,
        cache: 'force-cache',
        next: {
          revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
          tags: [
            NEXT_CACHE_TAGS.statistics.totalReferrals(JSON.stringify(params)),
          ],
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
