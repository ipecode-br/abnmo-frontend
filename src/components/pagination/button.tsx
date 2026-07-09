import { cn } from '@/utils/class-name-merge'

import { Button, type ButtonProps } from '../ui/button'

interface PaginationButtonProps extends ButtonProps {
  active?: boolean
}

export function PaginationButton({
  active,
  className,
  disabled,
  ...props
}: Readonly<PaginationButtonProps>) {
  return (
    <div>
      <Button
        variant={active ? 'default' : 'outline'}
        disabled={disabled || active}
        className={cn('h-9 min-w-9 px-3 disabled:opacity-100', className)}
        {...props}
      />
    </div>
  )
}
