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
        size='xs'
        variant={active ? 'default' : 'outline'}
        disabled={disabled || active}
        className={cn('min-w-8 disabled:opacity-100', className)}
        {...props}
      />
    </div>
  )
}
