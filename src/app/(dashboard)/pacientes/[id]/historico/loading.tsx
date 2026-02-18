import {
  ChartBarDecreasingIcon,
  ClipboardCheckIcon,
  ClipboardPasteIcon,
} from 'lucide-react'

import { DashboardCardChart } from '@/components/dashboard/cards/chart'
import { SummaryCard } from '@/components/summary-card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='grid gap-6 sm:grid-cols-2'>
      <SummaryCard icon={ClipboardCheckIcon} label='Atendimentos' loading />
      <SummaryCard icon={ClipboardPasteIcon} label='Encaminhamentos' loading />
      <DashboardCardChart
        title='Atendimentos por categoria'
        icon={ChartBarDecreasingIcon}
      >
        <div className='flex h-full min-h-60 items-center justify-center'>
          <Skeleton className='size-full rounded-xl' />
        </div>
      </DashboardCardChart>
      <DashboardCardChart
        title='Encaminhamentos por categoria'
        icon={ChartBarDecreasingIcon}
      >
        <div className='flex h-full min-h-60 items-center justify-center'>
          <Skeleton className='size-full rounded-xl' />
        </div>
      </DashboardCardChart>
    </div>
  )
}
