'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import type { QueryPeriod } from '@/enums/queries'
import type { Specialty } from '@/enums/shared'
import { api } from '@/lib/api'

type GetTotalReferralsByCategoryParams = {
  period?: QueryPeriod
  patientId?: string
}

interface GetTotalReferralsByCategoryProps {
  params?: GetTotalReferralsByCategoryParams
  cacheKey?: string
}

export async function getTotalReferralsByCategory({
  params,
  cacheKey,
}: GetTotalReferralsByCategoryProps = {}) {
  try {
    const response = await api<{
      categories: Array<{ category: Specialty; total: number }>
      total: number
    }>('/statistics/referrals/by-category', {
      includeCookies: true,
      cache: 'force-cache',
      params,
      next: {
        revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
        tags: cacheKey
          ? [NEXT_CACHE_TAGS.statistics.totalReferralsByCategory.main, cacheKey]
          : [NEXT_CACHE_TAGS.statistics.totalReferralsByCategory.main],
      },
    })

    if (!response.data) {
      return null
    }

    return response.data
  } catch (error) {
    console.error('Failed to fetch total referrals by category:', error)
    return null
  }
}
