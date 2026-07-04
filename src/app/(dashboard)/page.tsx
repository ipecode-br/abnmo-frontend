import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { DashboardPatientsByGenderCard } from '@/modules/dashboard/patients-by-gender-card'
import { DashboardPatientsByStateCard } from '@/modules/dashboard/patients-by-state-card'
import { DashboardSummaryCards } from '@/modules/dashboard/summary-cards'
import { DashboardUpcomingAppointmentsCard } from '@/modules/dashboard/upcoming-appointments-card'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className='grid gap-4 sm:grid-cols-6 lg:gap-6'>
      <Suspense
        fallback={
          <Skeleton
            quantity={3}
            className='bg-border h-30 rounded-2xl sm:col-span-2'
          />
        }
      >
        <DashboardSummaryCards />
      </Suspense>

      <DashboardPatientsByGenderCard />
      <DashboardPatientsByStateCard />

      <DashboardUpcomingAppointmentsCard />
    </div>
  )
}
