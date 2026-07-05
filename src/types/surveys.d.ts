type SurveySubmissionStatus =
  | 'pending_document'
  | 'pending_review'
  | 'rejected'
  | 'approved'
  | 'completed'

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
