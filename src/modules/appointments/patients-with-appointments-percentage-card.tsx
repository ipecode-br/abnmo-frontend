import { UserCheck2Icon } from 'lucide-react'

import { getTotalPatients } from '@/actions/statistics/get-total-patients'
import { getTotalPatientsWithAppointments } from '@/actions/statistics/get-total-patients-with-appointments'
import { SummaryCard } from '@/components/summary-card'

export async function PatientsWithAppointmentsPercentageCard() {
  const [totalPatients, totalPatientsWithAppointments] = await Promise.all([
    getTotalPatients(),
    getTotalPatientsWithAppointments(),
  ])

  const totalPatientsValue = totalPatients?.total ?? 0
  const totalPatientsWithAppointmentsValue =
    totalPatientsWithAppointments?.total ?? 0

  const totalPatientsWithAppointmentsPercentage =
    (totalPatientsWithAppointmentsValue / totalPatientsValue) * 100

  return (
    <SummaryCard
      icon={UserCheck2Icon}
      label='Pacientes atendidos'
      value={`${totalPatientsWithAppointmentsPercentage.toFixed(1)}%`}
      className='sm:col-span-1'
    />
  )
}
