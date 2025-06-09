'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import { cn } from '@/utils/class-name-merge'

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot='dropdown-menu-separator'
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

export { DropdownMenu, DropdownMenuSeparator }
