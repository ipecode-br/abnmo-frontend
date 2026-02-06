import { Users2Icon } from 'lucide-react'

import { getTotalReferrals } from '@/actions/statistics/get-total-referrals'
import { getTotalReferredPatients } from '@/actions/statistics/get-total-referred-patients'
import { SummaryCard } from '@/components/summary-card'

export async function ReferredPatientsPercentageCard() {
  const [totalReferrals, totalReferredPatients] = await Promise.all([
    getTotalReferrals(),
    getTotalReferredPatients(),
  ])

  const totalReferralsValue = totalReferrals?.total ?? 0
  const totalReferredPatientsValue = totalReferredPatients?.total ?? 0

  const referredPatientsPercentage =
    (totalReferredPatientsValue / totalReferralsValue) * 100

  return (
    <SummaryCard
      icon={Users2Icon}
      label='Pacientes encaminhados'
      value={`${referredPatientsPercentage.toFixed(1)}%`}
      className='sm:col-span-1'
    />
  )
}
