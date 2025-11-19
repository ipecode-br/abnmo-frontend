import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import { PatientsLocation } from './_cards/patients-location'
import { ReferralsBySpecialist } from './_cards/referrals-by-specialist'
import { ReferralsSummary } from './_cards/referrals-summary'
import { ReferralsTabButtons } from './referrals-tab-buttons'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-10'>
      <div className='sm:col-span-10'>
        <ReferralsTabButtons />
      </div>

      <Suspense
        fallback={
          <Skeleton quantity={2} className='h-28 rounded-2xl sm:col-span-5' />
        }
      >
        <ReferralsSummary />
      </Suspense>

      <ReferralsBySpecialist className='sm:col-span-6' />
      <PatientsLocation className='sm:col-span-4' />
    </div>
  )
}
