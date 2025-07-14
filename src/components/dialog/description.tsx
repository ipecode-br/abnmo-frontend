'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'

import { cn } from '@/utils/class-name-merge'

export function DialogDescription({
  className,
  ...props
}: Readonly<React.ComponentProps<typeof DialogPrimitive.Description>>) {
  return (
    <DialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}
