import * as PopoverPrimitive from '@radix-ui/react-popover'
import React from 'react'

export function Popover(
  props: Readonly<React.ComponentProps<typeof PopoverPrimitive.Root>>,
) {
  return <PopoverPrimitive.Root {...props} />
}

/* USAGE

  <Popover>
    <PopoverTrigger>
      Open Popover
    </PopoverTrigger>
    <PopoverContent>
      Content here
    </PopoverContent>
  </Popover>

*/
