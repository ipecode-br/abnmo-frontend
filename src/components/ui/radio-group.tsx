'use client'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { useId } from 'react'

import { CheckIcon } from '@/components/ui/icons'
import { cn } from '@/utils/class-name-merge'

import { Label } from './label'

export type RadioGroupProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Root
>

export function RadioGroup({ className, ...props }: Readonly<RadioGroupProps>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn('flex gap-6', className)}
      {...props}
    />
  )
}

export interface RadioGroupItemProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {
  label: string
}

export function RadioGroupItem({
  label,
  className,
  ...props
}: Readonly<RadioGroupItemProps>) {
  const id = useId()

  return (
    <div className='flex items-center gap-2'>
      <RadioGroupPrimitive.Item
        id={id}
        className={cn(
          'peer border-border focus-visible:ring-ring data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=checked]:bg-primary data-[state=checked]:inset-shadow-md size-6 shrink-0 cursor-pointer rounded-md border shadow-xs focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
          <CheckIcon
            className='text-primary-foreground size-4'
            strokeWidth={3}
          />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <Label
        htmlFor={id}
        className='text-foreground-soft cursor-pointer font-medium'
      >
        {label}
      </Label>
    </div>
  )
}
