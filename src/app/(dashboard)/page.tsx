import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { DashboardPatientsByCityCard } from '@/modules/dashboard/patients-by-city-card'
import { DashboardPatientsByGenderCard } from '@/modules/dashboard/patients-by-gender-card'
import { DashboardSummaryCards } from '@/modules/dashboard/summary-cards'
import { DashboardUpcomingAppointmentsCard } from '@/modules/dashboard/upcoming-appointments-card'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className='grid gap-6 sm:grid-cols-6'>
      <Suspense
        fallback={
          <Skeleton quantity={3} className='h-30 rounded-2xl sm:col-span-2' />
        }
      >
        <DashboardSummaryCards />
      </Suspense>

      <DashboardPatientsByGenderCard />
      <DashboardPatientsByCityCard />

      <DashboardUpcomingAppointmentsCard />
    </div>
  )
}
