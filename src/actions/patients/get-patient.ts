'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'
import type { Patient } from '@/types/patients.d.ts'

export async function getPatient(id: string) {
  try {
    const response = await api<Patient>(`/patients/${id}`, {
      cache: 'force-cache',
      next: {
        revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
        tags: [NEXT_CACHE_TAGS.patient(id)],
      },
    })

    if (!response.data) {
      return null
    }

    return response.data
  } catch (error) {
    console.error('Failed to fetch patient:', error)
    return null
  }
}
