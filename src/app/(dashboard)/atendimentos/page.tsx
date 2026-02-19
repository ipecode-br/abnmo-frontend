import { PatientsWithAppointmentsPercentageCard } from '@/modules/appointments/patients-with-appointments-percentage-card'
import { AppointmentsPeriodTabSelect } from '@/modules/appointments/period-tab-select'
import { TotalAppointmentsCard } from '@/modules/appointments/total-appointments-card'
import { TotalAppointmentsByCategoryCard } from '@/modules/appointments/total-by-category-card'
import { TotalAppointmentsByStateCard } from '@/modules/appointments/total-by-state-card'

export const dynamic = 'force-dynamic'

export default function Page() {
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
