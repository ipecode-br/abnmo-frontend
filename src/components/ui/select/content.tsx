'use client'

import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '@/utils/class-name-merge'

import { SelectScrollButton } from './scroll-buttons'

export function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: Readonly<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'bg-popover text-foreground data-[state=open]:animate-fade-in border-border relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border shadow-md',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollButton direction='up' />
        <SelectPrimitive.Viewport
          className={cn(
            'p-2',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[calc(var(--radix-select-trigger-width)_-_2px)]',
            className,
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollButton direction='down' />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}
