'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'
import type { Survey } from '@/types/surveys'

export async function getSurvey(id: string) {
  const response = await api<Survey>(`/surveys/${id}`, {
    cache: 'force-cache',
    next: {
      revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
      tags: [NEXT_CACHE_TAGS.survey(id)],
    },
  })

  if (!response.data) {
    return null
  }

  return response.data
}
