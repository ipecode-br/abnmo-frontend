'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'

import { cn } from '@/utils/class-name-merge'

export function DialogTitle({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>) {
  return (
    <DialogPrimitive.Title
      className={cn(
        'flex flex-col space-y-1.5 text-start sm:text-left',
        className,
      )}
      {...props}
    />
  )
}
