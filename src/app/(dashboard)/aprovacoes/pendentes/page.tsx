import type { Metadata } from 'next'

import { PendingPatientRequirements } from '@/modules/patient-requirements/pending-requirements'

export const metadata: Metadata = {
  title: 'Envios pendentes',
}

export default function Page() {
  return <PendingPatientRequirements />
}
