import { PatientsWithReferralsPercentageCard } from '@/modules/referrals/patients-with-referrals-percentage-card'
import { ReferralsPeriodTabSelect } from '@/modules/referrals/period-tab-select'
import { TotalReferralsByCategoryCard } from '@/modules/referrals/total-by-category-card'
import { TotalReferralsByStateCard } from '@/modules/referrals/total-by-state-card'
import { TotalReferralsCard } from '@/modules/referrals/total-referrals-card'

export const dynamic = 'force-dynamic'

export default function Page() {
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
