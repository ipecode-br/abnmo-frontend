'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

import { DialogOverlay } from './overlay'

export function DialogContent({
  className,
  children,
  ...props
}: Readonly<React.ComponentProps<typeof DialogPrimitive.Content>>) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay className='dialog-overlay' />
      <DialogPrimitive.Content
        className={cn(
          'fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg',
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Close
          className={cn(
            'ring-offset-background absolute top-4 right-4 rounded-sm opacity-70 transition-opacity',
            'hover:opacity-100',
          )}
        >
          <X className='h-4 w-4' />
        </DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
