import { ReferralsByCategoryCard } from '@/modules/referrals/by-category-card'
import { ReferralsByCityCards } from '@/modules/referrals/by-city-cards'
import { ReferralsPeriodTab } from '@/modules/referrals/period-tab'
import { ReferralsSummaryCard } from '@/modules/referrals/summary-card'

export default function Page() {
  return (
    <div className='grid gap-6 sm:grid-cols-2'>
      <ReferralsPeriodTab />

      <ReferralsSummaryCard />

      <ReferralsByCategoryCard />
      <ReferralsByCityCards />
    </div>
  )
}
