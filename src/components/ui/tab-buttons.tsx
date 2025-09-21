import type React from 'react'

import { cn } from '@/utils/class-name-merge'

import { Button, type ButtonProps } from './button'

export type TabButton = ButtonProps & {
  label: string
  isActive?: boolean
}

interface TabButtonsProps extends React.ComponentProps<'div'> {
  buttons: TabButton[]
}

export function TabButtons({
  buttons,
  className,
  ...props
}: Readonly<TabButtonsProps>) {
  return (
    <div
      className={cn('bg-accent flex h-9 w-fit gap-1 rounded-lg p-1', className)}
      {...props}
    >
      {buttons.map(({ label, isActive, className, ...buttonProps }) => (
        <Button
          key={label}
          variant='ghost'
          data-active={isActive}
          className={cn(
            'text-disabled hover:bg-background hover:text-foreground h-auto min-h-auto rounded-md text-sm hover:shadow',
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
