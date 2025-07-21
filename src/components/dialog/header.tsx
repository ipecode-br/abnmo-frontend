import type { LucideIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

interface DialogHeaderProps extends React.ComponentProps<'header'> {
  icon?: LucideIcon
  iconClassName?: React.ComponentProps<'div'>['className']
}

export function DialogHeader({
  className,
  icon,
  iconClassName,
  ...props
}: Readonly<DialogHeaderProps>) {
  const Icon = icon

  return (
    <header
      className={cn(
        'border-border flex items-center gap-4 border-b p-5',
        className,
      )}
    >
      {Icon && (
        <div
          className={cn('bg-accent shrink-0 rounded-full p-2.5', iconClassName)}
        >
          <Icon className='size-6' />
        </div>
      )}

      <div>{props.children}</div>
    </header>
  )
}
