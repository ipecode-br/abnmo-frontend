import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { canUser } from '@/actions/auth/can-user'
import { ROUTES } from '@/constants/routes'
import { PatientsWithAppointmentsPercentageCard } from '@/modules/appointments/patients-with-appointments-percentage-card'
import { AppointmentsPeriodTabSelect } from '@/modules/appointments/period-tab-select'
import { TotalAppointmentsCard } from '@/modules/appointments/total-appointments-card'
import { TotalAppointmentsByCategoryCard } from '@/modules/appointments/total-by-category-card'
import { TotalAppointmentsByStateCard } from '@/modules/appointments/total-by-state-card'

export const metadata: Metadata = {
  title: 'Atendimentos',
}

export default async function Page() {
  const canAccess = await canUser('read:appointment:others')

  if (!canAccess) {
    redirect(ROUTES.main)
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:gap-6'>
      <AppointmentsPeriodTabSelect />

      <TotalAppointmentsCard />
      <PatientsWithAppointmentsPercentageCard />

      <TotalAppointmentsByCategoryCard />
      <TotalAppointmentsByStateCard />
    </div>
  )
}
