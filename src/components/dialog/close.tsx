'use client'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/class-name-merge'

import { buttonVariants } from '../ui/button'

interface DialogCloseProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>,
      'asChild'
    >,
    VariantProps<typeof buttonVariants> {}

export function DialogClose({
  variant = 'default',
  size,
  children,
  className,
  ...props
}: Readonly<DialogCloseProps>) {
  return (
    <DialogPrimitive.Close
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Close>
  )
}
