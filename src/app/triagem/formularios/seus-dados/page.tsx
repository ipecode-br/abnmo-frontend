import { Metadata } from 'next'

import { PatientDataForm } from './patient-data-form'

export const metadata: Metadata = {
  title: 'Seus dados',
}

export default function PatientPage() {
  return <PatientDataForm />
}
