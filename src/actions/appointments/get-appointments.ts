'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import type { AppointmentStatus } from '@/enums/appointments'
import { api } from '@/lib/api'
import type { Appointment } from '@/types/appointments'

type Params = {
  status?: AppointmentStatus
  limit?: number
}

interface GetAppointmentsProps {
  params?: Params
  cacheKey?: string
}

export async function getAppointments({
  params,
  cacheKey,
}: GetAppointmentsProps = {}) {
  try {
    const response = await api<{ appointments: Appointment[]; total: number }>(
      '/appointments',
      {
        includeCookies: true,
        cache: 'force-cache',
        params,
        next: {
          revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
          tags: cacheKey
            ? [NEXT_CACHE_TAGS.appointments.main, cacheKey]
            : [NEXT_CACHE_TAGS.appointments.main],
        },
      },
    )

    if (!response.data) {
      return null
    }

    return response.data
  } catch (error) {
    console.error('Failed to fetch appointments:', error)
    return null
  }
}
