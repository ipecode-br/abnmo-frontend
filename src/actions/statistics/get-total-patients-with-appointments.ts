'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import type { QueryPeriod } from '@/enums/queries'
import { api } from '@/lib/api'

type GetTotalPatientsWithAppointmentsParams = {
  period?: QueryPeriod
}

interface GetTotalPatientsWithAppointmentsProps {
  params?: GetTotalPatientsWithAppointmentsParams
  cacheKey?: string
}

export async function getTotalPatientsWithAppointments({
  params,
  cacheKey,
}: GetTotalPatientsWithAppointmentsProps = {}) {
  try {
    const response = await api<{ total: number }>(
      '/statistics/patients/with-appointments',
      {
        cache: 'force-cache',
        params,
        next: {
          revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
          tags: cacheKey
            ? [
                NEXT_CACHE_TAGS.statistics.totalPatientsWithAppointments.main,
                cacheKey,
              ]
            : [NEXT_CACHE_TAGS.statistics.totalPatientsWithAppointments.main],
        },
      },
    )

    if (!response.data) {
      return null
    }

    return response.data
  } catch (error) {
    console.error('Failed to fetch total patients with appointments:', error)
    return null
  }
}
