import { ReferralsByCategoryCard } from '@/modules/referrals/by-category-card'
import { ReferralsByStateCard } from '@/modules/referrals/by-state-card'
import { ReferralsPeriodTabSelect } from '@/modules/referrals/period-tab-select'
import { ReferredPatientsPercentageCard } from '@/modules/referrals/referred-patients-percentage-card'
import { TotalReferralsCard } from '@/modules/referrals/total-referrals-card'

export default function Page() {
  return (
    <div className='grid gap-6 sm:grid-cols-2'>
      <ReferralsPeriodTabSelect />

      <TotalReferralsCard />
      <ReferredPatientsPercentageCard />

      <ReferralsByCategoryCard />
      <ReferralsByStateCard />
    </div>
  )
}
