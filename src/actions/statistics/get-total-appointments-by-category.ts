'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import type { QueryPeriod } from '@/enums/queries'
import type { Specialty } from '@/enums/shared'
import { api } from '@/lib/api'

type GetTotalAppointmentsByCategoryParams = {
  period?: QueryPeriod
  patientId?: string
}

interface GetTotalAppointmentsByCategoryProps {
  params?: GetTotalAppointmentsByCategoryParams
  cacheKey?: string
}

export async function getTotalAppointmentsByCategory({
  params,
  cacheKey,
}: GetTotalAppointmentsByCategoryProps = {}) {
  const response = await api<{
    categories: Array<{ category: Specialty; total: number }>
    total: number
  }>('/statistics/appointments/by-category', {
    cache: 'force-cache',
    params,
    next: {
      revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
      tags: cacheKey
        ? [
            NEXT_CACHE_TAGS.statistics.totalAppointmentsByCategory.main,
            cacheKey,
          ]
        : [NEXT_CACHE_TAGS.statistics.totalAppointmentsByCategory.main],
    },
  })

  if (!response.data) {
    return null
  }

  return response.data
}
