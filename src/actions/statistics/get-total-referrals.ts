'use server'

import { NEXT_CACHE_TAGS } from '@/constants/cache'
import type { QueryPeriod } from '@/enums/queries'
import { api } from '@/lib/api'

type GetTotalReferralsParams = {
  period?: QueryPeriod
}

export async function getTotalReferrals(params?: GetTotalReferralsParams) {
  const REVALIDATE_IN_SECONDS = 3600

  try {
    const response = await api<{ total: number }>(
      '/statistics/referrals-total',
      {
        params,
        includeCookies: true,
        cache: 'force-cache',
        next: {
          revalidate: REVALIDATE_IN_SECONDS,
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
