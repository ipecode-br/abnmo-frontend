import { ReferralsByCategoryCard } from '@/modules/referrals/by-category-card'
import { ReferralsByCityCards } from '@/modules/referrals/by-city-cards'
import { ReferralsPeriodTabSelect } from '@/modules/referrals/period-tab-select'
import { ReferralsSummaryCard } from '@/modules/referrals/summary-card'

export default function Page() {
  return (
    <div className='grid gap-6 sm:grid-cols-2'>
      <ReferralsPeriodTabSelect />

      <ReferralsSummaryCard />

      <ReferralsByCategoryCard />
      <ReferralsByCityCards />
    </div>
  )
}
