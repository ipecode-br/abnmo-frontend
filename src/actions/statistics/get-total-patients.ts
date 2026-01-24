'use server'

import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'

type Status = 'total' | 'active' | 'inactive'

type GetTotalPatientsParams = {
  period?: string
}

export async function getTotalPatients(params?: GetTotalPatientsParams) {
  const REVALIDATE_IN_SECONDS = 3600

  try {
    const response = await api<Record<Status, number>>(
      '/statistics/patients-total',
      {
        params,
        includeCookies: true,
        cache: 'force-cache',
        next: {
          revalidate: REVALIDATE_IN_SECONDS,
          tags: [
            NEXT_CACHE_TAGS.statistics.totalPatients(JSON.stringify(params)),
          ],
        },
      },
    )

    if (!response.data) {
      return null
    }

    return response.data
  } catch (error) {
    console.error('Failed to fetch patients statistics:', error)
    return null
  }
}
