import { HeartPulse, Waypoints } from 'lucide-react'

import {
  getMockReferralsCount,
  getMockReferredPatients,
} from '@/app/(dashboard)/encaminhados/_cards/mock-data'
import { Card } from '@/components/ui/card'

export function ReferralsSummaryCard() {
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
  ] as const

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
  } as const

  return statistics.map((statistic) => {
    const data = STATISTICS_MAPPING[statistic.label]
    const Icon = data.icon

    return (
      <Card
        key={statistic.label}
        className='flex min-h-28 flex-col justify-between gap-3 p-6'
      >
        <div className='flex items-center justify-between'>
          <span className='text-4xl font-semibold'>{statistic.value}</span>
          <div className='border-border rounded-full border p-2 [&_svg]:size-5'>
            <Icon />
          </div>
        </div>
        <p className='text-foreground-soft text-xs uppercase'>{data.title}</p>
      </Card>
    )
  })
}
