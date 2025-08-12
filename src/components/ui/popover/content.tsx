import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '@/utils/class-name-merge'

export function PopoverContent({
  align = 'start',
  side = 'bottom',
  sideOffset = 4,
  className,
  children,
  ...props
}: Readonly<PopoverPrimitive.PopoverContentProps>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-foreground border-border data-[state=open]:animate-fade-in relative z-50 flex flex-col gap-1 overflow-hidden rounded-xl border p-2 shadow-md',
          className,
        )}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}
