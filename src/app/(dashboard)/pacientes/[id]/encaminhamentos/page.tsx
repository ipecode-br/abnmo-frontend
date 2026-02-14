import type { Metadata } from 'next'

import { PatientReferralsList } from '@/modules/patients/referrals-list'

export const metadata: Metadata = {
  title: 'Encaminhamentos',
}

interface PageParams {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Readonly<PageParams>) {
  const patientId = (await params).id

  return <PatientReferralsList patientId={patientId} />
}
