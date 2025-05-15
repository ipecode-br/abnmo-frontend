import type { Metadata } from 'next'

import { ScreeningMedicalReportForm } from './medical-report-form'

export const metadata: Metadata = {
  title: 'Laudo médico',
}

export default function ScreeningMedicalReportPage() {
  return <ScreeningMedicalReportForm />
}
