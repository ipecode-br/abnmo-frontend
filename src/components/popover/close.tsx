import * as PopoverPrimitive from '@radix-ui/react-popover'
import { VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/class-name-merge'

import { buttonVariants } from '../ui/button'

interface PopoverCloseProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>,
      'asChild'
    >,
    VariantProps<typeof buttonVariants> {}

export function PopoverClose({
  variant,
  size,
  children,
  className,
  ...props
}: Readonly<PopoverCloseProps>) {
  return (
    <PopoverPrimitive.Close
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </PopoverPrimitive.Close>
  )
}
