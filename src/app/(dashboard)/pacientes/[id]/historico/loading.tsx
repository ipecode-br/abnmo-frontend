import {
  ChartBarDecreasingIcon,
  ClipboardCheckIcon,
  ClipboardPasteIcon,
} from 'lucide-react'

import { SummaryCard } from '@/components/summary-card'
import { ChartCard } from '@/components/ui/chart-card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='grid gap-6 sm:grid-cols-2'>
      <SummaryCard icon={ClipboardCheckIcon} label='Atendimentos' loading />
      <SummaryCard icon={ClipboardPasteIcon} label='Encaminhamentos' loading />
      <ChartCard
        title='Atendimentos por categoria'
        icon={ChartBarDecreasingIcon}
      >
        <div className='flex h-full min-h-60 items-center justify-center'>
          <Skeleton className='size-full rounded-xl' />
        </div>
      </ChartCard>
      <ChartCard
        title='Encaminhamentos por categoria'
        icon={ChartBarDecreasingIcon}
      >
        <div className='flex h-full min-h-60 items-center justify-center'>
          <Skeleton className='size-full rounded-xl' />
        </div>
      </ChartCard>
    </div>
  )
}
