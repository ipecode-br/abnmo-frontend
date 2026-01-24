'use server'

import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'
import type { Appointment } from '@/types/appointments'

type GetAppointmentsParams = {
  limit?: number
}

export async function getAppointments(params?: GetAppointmentsParams) {
  const REVALIDATE_IN_SECONDS = 3600

  try {
    const response = await api<{ appointments: Appointment[]; total: number }>(
      '/appointments',
      {
        params,
        includeCookies: true,
        cache: 'force-cache',
        next: {
          revalidate: REVALIDATE_IN_SECONDS,
          tags: [NEXT_CACHE_TAGS.appointments(JSON.stringify(params))],
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
