import type React from 'react'

import { cn } from '@/utils/class-name-merge'

import { Button } from './button'

type TabSelectOptions<T> = { label: string; value: T }

interface TabSelectProps<T> {
  value?: T | null
  options: TabSelectOptions<T>[]
  onSelect: (value: T) => void
  className?: string
}

export function TabSelect<T>({
  value,
  options,
  className,
  onSelect,
  ...props
}: Readonly<TabSelectProps<T>>) {
  return (
    <div
      className={cn('bg-border/40 flex h-10 gap-1 rounded-lg p-1', className)}
      {...props}
    >
      {options.map((option) => {
        return (
          <Button
            key={option.label}
            variant='ghost'
            data-active={value === option.value}
            onClick={() => onSelect(option.value)}
            className='text-foreground-soft hover:bg-background hover:text-foreground data-[active=true]:bg-background data-[active=true]:text-foreground h-auto min-h-auto flex-1 rounded-md hover:shadow data-[active=true]:pointer-events-none data-[active=true]:shadow'
          >
            {option.label}
          </Button>
        )
      })}
    </div>
  )
}
