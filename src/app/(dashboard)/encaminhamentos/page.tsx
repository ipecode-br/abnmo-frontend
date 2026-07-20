import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { canUser } from '@/actions/auth/can-user'
import { ROUTES } from '@/constants/routes'
import { PatientsWithReferralsPercentageCard } from '@/modules/referrals/patients-with-referrals-percentage-card'
import { ReferralsPeriodTabSelect } from '@/modules/referrals/period-tab-select'
import { TotalReferralsByCategoryCard } from '@/modules/referrals/total-by-category-card'
import { TotalReferralsByStateCard } from '@/modules/referrals/total-by-state-card'
import { TotalReferralsCard } from '@/modules/referrals/total-referrals-card'

export const metadata: Metadata = {
  title: 'Encaminhamentos',
}

export default async function Page() {
  const [canViewStatistics, canViewReferralStatistics, canViewAppointments] =
    await Promise.all([
      canUser('read:statistic'),
      canUser('read:statistic:referral'),
      canUser('read:appointment:others'),
    ])

  const canViewPage = canViewStatistics || canViewReferralStatistics

  if (!canViewPage && canViewAppointments) {
    redirect(ROUTES.referrals.list)
  }

  if (!canViewPage) {
    redirect(ROUTES.main)
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:gap-6'>
      <ReferralsPeriodTabSelect />

      <TotalReferralsCard />
      <PatientsWithReferralsPercentageCard />

      <TotalReferralsByCategoryCard />
      <TotalReferralsByStateCard />
    </div>
  )
}
