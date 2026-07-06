export const SURVEY_SUBMISSION_STATUSES = {
  pending_document: { variant: 'default', label: 'Aguardando laudo' },
  pending_review: { variant: 'default', label: 'Aguardando revisão' },
  declined: { variant: 'error', label: 'Recusada' },
  approved: { variant: 'success', label: 'Aprovada' },
  completed: { variant: 'success', label: 'Concluída' },
} as const
export type SurveySubmissionStatus = keyof typeof SURVEY_SUBMISSION_STATUSES

export const SURVEY_STATUSES = {
  pending_signature: { variant: 'default', label: 'Assinatura' },
  completed: { variant: 'success', label: 'Concluído' },
} as const
export type SurveyStatus = keyof typeof SURVEY_STATUSES

export const SURVEY_STATUS_OPTIONS = Object.entries(SURVEY_STATUSES).map(
  ([key, status]) => ({ label: status.label, value: key }),
)
