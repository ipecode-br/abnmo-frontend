'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

export function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />
}

/* USAGE

  <DropdownMenu>
    <DropdownMenuTrigger>
      Options
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem variant="destructive">
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

*/
