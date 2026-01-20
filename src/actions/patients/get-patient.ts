'use server'

import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'
import type { Patient } from '@/types/patients'

export async function getPatient(id: string) {
  const REVALIDATE_IN_SECONDS = 3600

  try {
    const response = await api<Patient>(`/patients/${id}`, {
      includeCookies: true,
      cache: 'force-cache',
      next: {
        revalidate: REVALIDATE_IN_SECONDS,
        tags: [NEXT_CACHE_TAGS.patient(id)],
      },
    })

    if (!response.data) {
      return null
    }

    return response.data
  } catch (error) {
    console.error('Failed to fetch patient data:', error)
    return null
  }
}
