import type { Metadata } from 'next'

import { ScreeningPatientDataForm } from './patient-data-form'

export const metadata: Metadata = {
  title: 'Seus dados',
}

export default function ScreeningPatientPage() {
  return <ScreeningPatientDataForm />
}
