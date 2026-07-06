import { SurveyStatus, SurveySubmissionStatus } from '@/enums/surveys'

export type SurveySubmission = {
  id: string
  name: string
  email: string
  phone: string
  status: SurveySubmissionStatus
  reason: string | null
  createdAt: string
  document: { name: string; url: string } | null
}

export type Survey = {
  id: string
  name: string
  phone: string
  email: string
  status: SurveyStatus
  createdAt: string
}
