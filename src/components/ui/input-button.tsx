import { cn } from '@/utils/class-name-merge'

import { Button, ButtonProps } from './button'

export function InputButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      type='button'
      variant='ghost'
      className={cn(
        'hover:text-primary absolute size-9 -outline-offset-1',
        className,
      )}
      {...props}
    />
  )
}
