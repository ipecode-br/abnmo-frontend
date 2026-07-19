import { Suspense } from 'react'

import { canUser } from '@/actions/auth/can-user'
import { Skeleton } from '@/components/ui/skeleton'
import { TotalPatientsByGenderCard } from '@/modules/overview/patients-by-gender-card'
import { TotalPatientsByStateCard } from '@/modules/overview/patients-by-state-card'
import { SummaryCards } from '@/modules/overview/summary-cards'
import { UpcomingAppointmentsCard } from '@/modules/overview/upcoming-appointments-card'

export default async function Page() {
  const [canViewStatistics, canViewPatientStatistics, canViewAppointments] =
    await Promise.all([
      canUser('read:statistic'),
      canUser('read:statistic:patient'),
      canUser('read:appointment:others'),
    ])

  return (
    <div className='grid gap-4 sm:grid-cols-6 lg:gap-6'>
      <Suspense
        fallback={
          <Skeleton
            quantity={3}
            className='bg-border h-24 rounded-2xl sm:col-span-2 md:h-28'
          />
        }
      >
        <SummaryCards />
      </Suspense>

      {(canViewStatistics || canViewPatientStatistics) && (
        <>
          <TotalPatientsByGenderCard />
          <TotalPatientsByStateCard />
        </>
      )}

      {canViewAppointments && <UpcomingAppointmentsCard />}
    </div>
  )
}
