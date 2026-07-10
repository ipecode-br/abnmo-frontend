'use client'

import { Switch as BaseSwitch, SwitchRootProps } from '@base-ui/react/switch'

import { cn } from '@/utils/class-name-merge'

export interface SwitchProps extends SwitchRootProps {
  label: string
}

export function Switch({ label, className, ...props }: SwitchProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center justify-between gap-2',
        className,
      )}
    >
      <span>{label}</span>
      <BaseSwitch.Root
        className='bg-border data-checked:bg-primary relative flex h-6 w-10 rounded-full p-0.5 transition-colors'
        {...props}
      >
        <BaseSwitch.Thumb className='aspect-square h-full rounded-full bg-white shadow transition-transform data-checked:translate-x-4' />
      </BaseSwitch.Root>
    </label>
  )
}
