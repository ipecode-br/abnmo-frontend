'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'
import type { SurveySubmission } from '@/types/surveys'

export async function getSurveySubmission(id: string) {
  const response = await api<SurveySubmission>(`/survey-submissions/${id}`, {
    cache: 'force-cache',
    next: {
      revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
      tags: [NEXT_CACHE_TAGS.surveySubmission(id)],
    },
  })

  if (!response.data) {
    return null
  }

  return response.data
}
