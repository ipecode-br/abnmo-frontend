'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import { cn } from '@/utils/class-name-merge'

export function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot='dropdown-menu-content'
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-foreground data-[state=open]:animate-fade-in border-border relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border p-2 shadow-md',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}
