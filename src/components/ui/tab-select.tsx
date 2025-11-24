import type React from 'react'

import { cn } from '@/utils/class-name-merge'

import { Button, type ButtonProps } from './button'

export type TabSelectButton = ButtonProps & {
  label: string
  isActive?: boolean
}

interface TabSelectProps extends React.ComponentProps<'div'> {
  buttons: TabSelectButton[]
}

export function TabSelect({
  buttons,
  className,
  ...props
}: Readonly<TabSelectProps>) {
  return (
    <div
      className={cn('bg-border/40 flex h-10 gap-1 rounded-lg p-1', className)}
      {...props}
    >
      {buttons.map(({ label, isActive, className, ...buttonProps }) => (
        <Button
          key={label}
          variant='ghost'
          data-active={isActive}
          className={cn(
            'text-foreground-soft hover:bg-background hover:text-foreground h-auto min-h-auto flex-1 rounded-md hover:shadow',
            'data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:pointer-events-none data-[active=true]:shadow',
            className,
          )}
          {...buttonProps}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}
