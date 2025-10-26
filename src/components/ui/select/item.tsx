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
        'focus:bg-primary focus:text-primary-foreground group flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm outline-none [&_svg]:size-4',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}
