'use client'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/class-name-merge'

import { buttonVariants } from '../ui/button'

export interface DialogTriggerProps
  extends Omit<React.ComponentProps<typeof DialogPrimitive.Trigger>, 'asChild'>,
    VariantProps<typeof buttonVariants> {
  indicator?: boolean
}

export function DialogTrigger({
  variant = 'outline',
  size,
  className,
  children,
  ...props
}: Readonly<DialogTriggerProps>) {
  return (
    <DialogPrimitive.Trigger
      data-slot='dropdown-menu-trigger'
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Trigger>
  )
}
