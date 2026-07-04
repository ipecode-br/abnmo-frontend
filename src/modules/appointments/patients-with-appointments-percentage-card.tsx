import { UserCheck2Icon } from 'lucide-react'

import { getTotalPatients } from '@/actions/statistics/get-total-patients'
import { getTotalPatientsWithAppointments } from '@/actions/statistics/get-total-patients-with-appointments'
import { SummaryCard } from '@/components/summary-card'

export async function PatientsWithAppointmentsPercentageCard() {
  const [totalPatients, totalPatientsWithAppointments] = await Promise.all([
    getTotalPatients(),
    getTotalPatientsWithAppointments(),
  ])

  const patientsValue = totalPatients?.total || 0
  const appointmentsValue = totalPatientsWithAppointments?.total || 0
  const percentageCalc = (appointmentsValue / patientsValue) * 100 || 0
  const percentage = Math.max(0, Math.min(100, percentageCalc))

  return (
    <SummaryCard
      icon={UserCheck2Icon}
      label='Pacientes atendidos'
      value={`${percentage.toFixed(1)}%`}
      className='sm:col-span-1'
    />
  )
}
