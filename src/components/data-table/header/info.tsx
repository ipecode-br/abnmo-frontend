import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/utils/class-name-merge'

interface DataTableHeaderInfoProps {
  icon: React.ReactNode
  total?: number
  title: string
  iconClassName?: string
}

export function DataTableHeaderInfo({
  icon,
  total = 0,
  title,
}: Readonly<DataTableHeaderInfoProps>) {
  return (
    <div className='flex items-center gap-4'>
      <div className='bg-border/50 flex size-10 items-center justify-center rounded-lg'>
        <Slot className={cn('text-primary size-5.5')}>{icon}</Slot>
      </div>

      <div className='flex items-center gap-2'>
        {total > 0 && <span className='text-2xl font-semibold'>{total}</span>}
        <p className='text-foreground-soft'>{title}</p>
      </div>
    </div>
  )
}
