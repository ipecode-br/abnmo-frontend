'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import React from 'react'

export function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot='dialog-modal' {...props} />
}

export { DialogClose } from './close'
export { DialogContent } from './content'
export { DialogDescription } from './description'
export { DialogFooter } from './footer'
export { DialogHeader } from './header'
export { DialogOverlay } from './overlay'
export { DialogTitle } from './title'
export { DialogTrigger } from './trigger'
