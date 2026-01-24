'use server'

import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'

type GetTotalAppointmentsParams = {
  period?: string
}

export async function getTotalAppointments(
  params?: GetTotalAppointmentsParams,
) {
  const REVALIDATE_IN_SECONDS = 3600

  try {
    const response = await api<{ total: number }>(
      '/statistics/appointments-total',
      {
        params,
        includeCookies: true,
        cache: 'force-cache',
        next: {
          revalidate: REVALIDATE_IN_SECONDS,
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
