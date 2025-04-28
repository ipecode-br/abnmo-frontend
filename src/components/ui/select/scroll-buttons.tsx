'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

interface SelectScrollButtonProps
  extends React.ComponentProps<typeof SelectPrimitive.ScrollUpButton> {
  direction: 'up' | 'down'
}

export function SelectScrollButton({
  direction,
  className,
  ...props
}: Readonly<SelectScrollButtonProps>) {
  const Component =
    direction === 'up'
      ? SelectPrimitive.ScrollUpButton
      : SelectPrimitive.ScrollDownButton
  const Icon = direction === 'up' ? ChevronUp : ChevronDown

  return (
    <Component
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <Icon className='size-4' />
    </Component>
  )
}
