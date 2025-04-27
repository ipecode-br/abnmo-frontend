'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

export function SelectItem({
  className,
  disabled,
  children,
  ...props
}: Readonly<React.ComponentProps<typeof SelectPrimitive.Item>>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'focus:bg-primary focus:text-primary-foreground flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm outline-none',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className='size-4' />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}
