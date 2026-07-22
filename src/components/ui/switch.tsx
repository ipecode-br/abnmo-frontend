'use client'

import { Switch as BaseSwitch, SwitchRootProps } from '@base-ui/react/switch'

import { cn } from '@/utils/class-name-merge'

export interface SwitchProps extends SwitchRootProps {
  label: string
}

export function Switch({
  label,
  readOnly,
  disabled,
  className,
  ...props
}: SwitchProps) {
  return (
    <label
      aria-readonly={readOnly}
      aria-disabled={disabled}
      className={cn(
        'flex cursor-pointer items-center justify-between gap-2',
        'aria-readonly:pointer-events-none aria-readonly:opacity-80',
        'aria-disabled:pointer-events-none aria-disabled:opacity-40',
        className,
      )}
    >
      <span>{label}</span>
      <BaseSwitch.Root
        disabled={disabled}
        readOnly={readOnly}
        className='bg-border data-checked:bg-primary outline-ring relative flex h-6 w-10 rounded-full p-0.5 outline-offset-2 transition-colors'
        {...props}
      >
        <BaseSwitch.Thumb className='aspect-square h-full rounded-full bg-white shadow transition-transform data-checked:translate-x-4' />
      </BaseSwitch.Root>
    </label>
  )
}
