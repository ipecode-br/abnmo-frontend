import { Users2Icon } from 'lucide-react'

import { getTotalPatients } from '@/actions/statistics/get-total-patients'
import { getTotalPatientsWithReferrals } from '@/actions/statistics/get-total-patients-with-referrals'
import { SummaryCard } from '@/components/summary-card'

export async function PatientsWithReferralsPercentageCard() {
  const [totalPatients, totalPatientsWithReferrals] = await Promise.all([
    getTotalPatients(),
    getTotalPatientsWithReferrals(),
  ])

  const totalPatientsValue = totalPatients?.total ?? 0
  const totalPatientsWithReferralsValue = totalPatientsWithReferrals?.total ?? 0

  const totalPatientsWithReferralsPercentage =
    (totalPatientsWithReferralsValue / totalPatientsValue) * 100

  return (
    <SummaryCard
      icon={Users2Icon}
      label='Pacientes encaminhados'
      value={`${totalPatientsWithReferralsPercentage.toFixed(1)}%`}
      className='sm:col-span-1'
    />
  )
}
