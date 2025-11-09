import type { Metadata } from 'next'

import { PatientPendingRequirements } from './patient-pending-requirements'

export const metadata: Metadata = {
  title: 'Envios pendentes',
}

export default function Page() {
  return <PatientPendingRequirements />
}
