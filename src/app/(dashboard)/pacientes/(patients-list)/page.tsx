import type { Metadata } from 'next'
import { Suspense } from 'react'

import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { ROUTES } from '@/constants/routes'

import PatientsListTable from './table'

export const metadata: Metadata = {
  title: 'Pacientes',
}

export default function PatientsListPage() {
  const tabButtons = [
    {
      title: 'Listagem de pacientes',
      path: ROUTES.dashboard.patients.main,
    },
  ]

  return (
    <>
      <DashboardTabButtons buttons={tabButtons} />
      <DashboardContainer className='flex flex-col gap-6'>
        <Suspense>
          <PatientsListTable />
        </Suspense>
      </DashboardContainer>
    </>
  )
}
