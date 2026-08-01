import { cn } from '@/utils/class-name-merge'

import { Skeleton } from './skeleton'

export function List({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      className={cn('divide-border flex flex-col divide-y', className)}
      {...props}
    />
  )
}

export function ListHead({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      className={cn(
        'text-foreground-soft bg-accent/75 border-border hidden items-center gap-6 rounded-t-lg border p-3 md:flex',
        className,
      )}
      {...props}
    />
  )
}

export function ListRow({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      className={cn(
        'md:hover:bg-accent flex items-center gap-x-6 gap-y-2 py-4 md:p-3',
        className,
      )}
      {...props}
    />
  )
}

interface ListSkeletonProps extends React.ComponentProps<'li'> {
  quantity?: number
}

export function ListSkeleton({
  className,
  quantity = 10,
  ...props
}: ListSkeletonProps) {
  return Array.from({ length: quantity }).map((_, index) => (
    <li key={index} className={cn('h-14 p-3', className)} {...props}>
      <Skeleton key={index} className='size-full' />
    </li>
  ))
}
