import { Users2Icon } from 'lucide-react'

import { getTotalPatients } from '@/actions/statistics/get-total-patients'
import { getTotalReferredPatients } from '@/actions/statistics/get-total-referred-patients'
import { SummaryCard } from '@/components/summary-card'

export async function ReferredPatientsPercentageCard() {
  const [totalPatients, totalReferredPatients] = await Promise.all([
    getTotalPatients(),
    getTotalReferredPatients(),
  ])

  const totalPatientsValue = totalPatients?.total ?? 0
  const totalReferredPatientsValue = totalReferredPatients?.total ?? 0

  const referredPatientsPercentage =
    (totalReferredPatientsValue / totalPatientsValue) * 100

  return (
    <SummaryCard
      icon={Users2Icon}
      label='Pacientes encaminhados'
      value={`${referredPatientsPercentage.toFixed(1)}%`}
      className='sm:col-span-1'
    />
  )
}
