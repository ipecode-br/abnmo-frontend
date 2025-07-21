import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/class-name-merge'

import { buttonVariants } from '../ui/button'

interface DialogTriggerProps
  extends Omit<React.ComponentProps<typeof DialogPrimitive.Trigger>, 'asChild'>,
    VariantProps<typeof buttonVariants> {}

export function DialogTrigger({
  variant,
  size,
  className,
  children,
  ...props
}: Readonly<DialogTriggerProps>) {
  return (
    <DialogPrimitive.Trigger
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Trigger>
  )
}
