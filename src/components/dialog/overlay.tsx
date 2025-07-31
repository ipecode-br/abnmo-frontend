'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/utils/class-name-merge'

interface DialogOverlayProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}

export function DialogOverlay({
  className,
  ...props
}: Readonly<DialogOverlayProps>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity',
        className,
      )}
      {...props}
    />
  )
}
