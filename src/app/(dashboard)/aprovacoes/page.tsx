import type { Metadata } from 'next'

import { UnderReviewPatientRequirements } from '@/modules/patient-requirements/under-review-requirements'

export const metadata: Metadata = {
  title: 'Aprovações pendentes',
}

export default function Page() {
  return <UnderReviewPatientRequirements />
}
