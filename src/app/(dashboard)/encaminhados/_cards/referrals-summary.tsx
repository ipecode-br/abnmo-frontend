import { HeartPulse, Waypoints } from 'lucide-react'

import {
  getMockReferralsCount,
  getMockReferredPatients,
} from '@/app/(dashboard)/encaminhados/_cards/mock-data'
import { Card } from '@/components/ui/card'

type StatKey = 'referrals' | 'patients'

export async function ReferralsSummary() {
  const referrals = getMockReferralsCount()
  const referredPatients = getMockReferredPatients()

  const statistics = [
    {
      value: referrals.total,
      label: 'referrals',
    },
    {
      value: `${referredPatients.percentage}%`,
      label: 'patients',
    },
  ]

  const STATISTICS_MAPPING = {
    referrals: {
      title: (
        <>
          Total de <strong>encaminhamentos</strong>
        </>
      ),
      icon: Waypoints,
    },
    patients: {
      title: (
        <>
          Total de <strong>pacientes com encaminhamento</strong>
        </>
      ),
      icon: HeartPulse,
    },
  }

  return statistics.map((statistic) => {
    const label = statistic.label as StatKey
    const data = STATISTICS_MAPPING[label]

    return (
      <Card
        key={statistic.label}
        className='flex min-h-28 flex-col justify-between gap-3 p-6 sm:col-span-5'
      >
        <div className='flex items-center justify-between'>
          <span className='text-4xl font-semibold'>{statistic.value}</span>
          <div
            className={'border-border rounded-full border p-2 [&_svg]:size-5'}
          >
            <data.icon />
          </div>
        </div>
        <p className='text-foreground-soft text-xs uppercase'>{data.title}</p>
      </Card>
    )
  })
}
