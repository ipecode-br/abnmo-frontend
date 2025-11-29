import { Suspense } from 'react'

import { DashboardContainer } from '@/components/dashboard/container'
import { Skeleton } from '@/components/ui/skeleton'
import AppointmentsCard from '@/modules/dashboard/appointments-card'
import { PatientsByCityCard } from '@/modules/dashboard/patients-by-city-card'
import { PatientsByGenderCard } from '@/modules/dashboard/patients-by-gender-card'
import { PatientsByStatusCards } from '@/modules/dashboard/patients-by-status-cards'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <DashboardContainer>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-6'>
        <Suspense
          fallback={
            <Skeleton quantity={3} className='h-28 rounded-2xl sm:col-span-2' />
          }
        >
          <PatientsByStatusCards />
        </Suspense>

        <PatientsByGenderCard className='sm:col-span-3' />
        <PatientsByCityCard className='sm:col-span-3' />

        <AppointmentsCard />
      </div>
    </DashboardContainer>
  )
}
