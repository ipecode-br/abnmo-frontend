'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import type { QueryPeriod } from '@/enums/queries'
import { api } from '@/lib/api'

type GetTotalPatientsWithReferralsParams = {
  period?: QueryPeriod
}

interface GetTotalPatientsWithReferralsProps {
  params?: GetTotalPatientsWithReferralsParams
  cacheKey?: string
}

export async function getTotalPatientsWithReferrals({
  params,
  cacheKey,
}: GetTotalPatientsWithReferralsProps = {}) {
  try {
    const response = await api<{ total: number }>(
      '/statistics/patients/with-referrals',
      {
        includeCookies: true,
        cache: 'force-cache',
        params,
        next: {
          revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
          tags: cacheKey
            ? [
                NEXT_CACHE_TAGS.statistics.totalPatientsWithReferrals.main,
                cacheKey,
              ]
            : [NEXT_CACHE_TAGS.statistics.totalPatientsWithReferrals.main],
        },
      },
    )

    if (!response.data) {
      return null
    }

    return response.data
  } catch (error) {
    console.error('Failed to fetch total patients with referrals:', error)
    return null
  }
}
