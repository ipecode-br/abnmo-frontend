import { Suspense } from 'react'

import { DashboardOverviewPatientsByGender } from '@/app/(dashboard)/_cards/patients-by-gender'
import { DashboardOverviewPatientsByStatus } from '@/app/(dashboard)/_cards/patients-by-status'
import { DashboardContainer } from '@/components/dashboard/container'
import { Skeleton } from '@/components/ui/skeleton'

import DashboardOverviewAppointments from './_cards/appointments'
import { DashboardOverviewPatientsByCity } from './_cards/patients-by-city'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <DashboardContainer>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-6'>
        <Suspense
          fallback={
            <Skeleton quantity={3} className='h-32 rounded-2xl sm:col-span-2' />
          }
        >
          <DashboardOverviewPatientsByStatus />
        </Suspense>

        <DashboardOverviewPatientsByGender />
        <DashboardOverviewPatientsByCity />

        <DashboardOverviewAppointments />
      </div>
    </DashboardContainer>
  )
}
