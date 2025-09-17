'use server'

import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'

type StatisticType = 'total' | 'active' | 'inactive'

export async function getTotalPatientsByStatus() {
  const REVALIDATE_IN_SECONDS = 3600

  const response = await api<Record<StatisticType, number>>(
    '/statistics/patients/total',
    {
      includeCookies: true,
      cache: 'force-cache',
      next: {
        revalidate: REVALIDATE_IN_SECONDS,
        tags: [NEXT_CACHE_TAGS.statistics.totalPatientsByStatus],
      },
    },
  )

  if (!response.data) {
    return null
  }

  const statistics = Object.entries(response.data).map(([label, value]) => ({
    label: label as StatisticType,
    value,
  }))

  return statistics
}
