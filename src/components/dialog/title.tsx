import * as DialogPrimitive from '@radix-ui/react-dialog'

import { cn } from '@/utils/class-name-merge'

export function DialogTitle({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>) {
  return (
    <DialogPrimitive.Title
      className={cn('text-lg font-medium', className)}
      {...props}
    />
  )
}
