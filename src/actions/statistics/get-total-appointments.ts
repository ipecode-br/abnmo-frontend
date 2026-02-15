'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import type { QueryPeriod } from '@/enums/queries'
import { api } from '@/lib/api'

type GetTotalAppointmentsParams = {
  period?: QueryPeriod
  patientId?: string
}

interface GetTotalAppointmentsProps {
  params?: GetTotalAppointmentsParams
  cacheKey?: string
}

export async function getTotalAppointments({
  params,
  cacheKey,
}: GetTotalAppointmentsProps = {}) {
  try {
    const response = await api<{ total: number }>(
      '/statistics/appointments/total',
      {
        includeCookies: true,
        cache: 'force-cache',
        params,
        next: {
          revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
          tags: cacheKey
            ? [NEXT_CACHE_TAGS.statistics.totalAppointments.main, cacheKey]
            : [NEXT_CACHE_TAGS.statistics.totalAppointments.main],
        },
      },
    )

    if (!response.data) {
      return null
    }

    return response.data
  } catch (error) {
    console.error('Failed to fetch total appointments statistic:', error)
    return null
  }
}
