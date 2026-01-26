'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'

type GetTotalAppointmentsParams = {
  period?: string
}

export async function getTotalAppointments(
  params?: GetTotalAppointmentsParams,
) {
  try {
    const response = await api<{ total: number }>(
      '/statistics/appointments-total',
      {
        params,
        includeCookies: true,
        cache: 'force-cache',
        next: {
          revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
          tags: [
            NEXT_CACHE_TAGS.statistics.totalAppointments(
              JSON.stringify(params),
            ),
          ],
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
