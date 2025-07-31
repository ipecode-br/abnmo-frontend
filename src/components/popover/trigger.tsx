import * as PopoverPrimitive from '@radix-ui/react-popover'
import { VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/class-name-merge'

import { buttonVariants } from '../ui/button'

interface PopoverTriggerProps
  extends Omit<
      React.ComponentProps<typeof PopoverPrimitive.Trigger>,
      'asChild'
    >,
    VariantProps<typeof buttonVariants> {}

export function PopoverTrigger({
  variant,
  size,
  className,
  children,
  ...props
}: Readonly<PopoverTriggerProps>) {
  return (
    <PopoverPrimitive.Trigger
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </PopoverPrimitive.Trigger>
  )
}
