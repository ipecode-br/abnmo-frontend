import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

import { buttonVariants } from '../button'

interface DialogContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content> {
  showCloseButton?: boolean
}

export function DialogContainer({
  className,
  children,
  showCloseButton = true,
  ...props
}: Readonly<DialogContentProps>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity' />
      <DialogPrimitive.Content
        className={cn(
          'bg-background fixed top-1/2 left-1/2 z-50 w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-xl',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'hover:text-foreground text-foreground-soft absolute top-3 right-3 size-8 [&_svg]:size-4',
            )}
          >
            <XIcon />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
