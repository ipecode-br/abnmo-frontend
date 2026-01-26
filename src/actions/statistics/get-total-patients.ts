'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'

type Status = 'total' | 'active' | 'inactive'

type GetTotalPatientsParams = {
  period?: string
}

export async function getTotalPatients(params?: GetTotalPatientsParams) {
  try {
    const response = await api<Record<Status, number>>(
      '/statistics/patients-total',
      {
        params,
        includeCookies: true,
        cache: 'force-cache',
        next: {
          revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
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
