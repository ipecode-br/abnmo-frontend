import { UserCheck2Icon } from 'lucide-react'

import { getTotalPatients } from '@/actions/statistics/get-total-patients'
import { getTotalPatientsWithReferrals } from '@/actions/statistics/get-total-patients-with-referrals'
import { SummaryCard } from '@/components/summary-card'

export async function PatientsWithReferralsPercentageCard() {
  const [totalPatients, totalPatientsWithReferrals] = await Promise.all([
    getTotalPatients(),
    getTotalPatientsWithReferrals(),
  ])

  const patientsValue = totalPatients?.total || 0
  const referralsValue = totalPatientsWithReferrals?.total || 0
  const percentageCalc = (referralsValue / patientsValue) * 100 || 0
  const percentage = Math.max(0, Math.min(100, percentageCalc))

  return (
    <SummaryCard
      icon={UserCheck2Icon}
      label='Pacientes encaminhados'
      value={`${percentage.toFixed(1)}%`}
      className='sm:col-span-1'
    />
  )
}
