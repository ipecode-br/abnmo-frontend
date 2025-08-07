'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import { cn } from '@/utils/class-name-merge'

export function DropdownMenuContent({
  className,
  loop = true,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        loop={loop}
        sideOffset={sideOffset}
        data-slot='dropdown-menu-content'
        className={cn(
          'bg-popover text-foreground border-border data-[state=open]:animate-fade-in relative z-50 flex min-w-[var(--radix-dropdown-menu-trigger-width)] flex-col gap-1 overflow-hidden rounded-xl border p-2 shadow-md',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}
