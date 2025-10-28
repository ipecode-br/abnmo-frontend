import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '@/utils/class-name-merge'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'bg-popover text-foreground data-[state=open]:animate-fade-in border-border relative z-50 max-h-96 min-w-32 overflow-hidden rounded-lg border shadow-md',

        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverContent, PopoverTrigger }
