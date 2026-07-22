'use client'

import {
  Select as BaseSelect,
  type SelectPositionerProps,
  type SelectRootProps,
} from '@base-ui/react/select'
import { cva, type VariantProps } from 'class-variance-authority'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { RefCallBack } from 'react-hook-form'

import { cn } from '@/utils/class-name-merge'

import { Divider } from './divider'

export type SelectOption = {
  label: string
  value: string
  description?: string
}

const selectTriggerVariants = cva(
  'bg-background data-[placeholder]:text-disabled border-border [&_svg]:text-disabled text-foreground flex h-10 cursor-pointer items-center gap-2 rounded-lg border pr-2 pl-3 text-left transition-colors focus:outline-2 focus:-outline-offset-1 disabled:pointer-events-none disabled:opacity-50 aria-[readonly]:pointer-events-none [&_svg]:opacity-50 disabled:[&_svg]:opacity-50 aria-[readonly]:[&_svg]:opacity-25',
  {
    variants: {
      variant: {
        default: 'outline-ring hover:border-ring',
        error: 'outline-error border-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type SelectProps = Omit<SelectRootProps<string, false>, 'items'> &
  VariantProps<typeof selectTriggerVariants> & {
    options: SelectOption[]
    align?: SelectPositionerProps['align']
    className?: string
    placeholder?: string
    resetLabel?: string
    contentClassName?: string
    ref?: RefCallBack
  }

export function Select({
  ref,
  value,
  options,
  variant,
  className,
  resetLabel,
  align = 'start',
  contentClassName,
  placeholder = 'Selecione uma opção',
  ...props
}: Readonly<SelectProps>) {
  const selectedOption = options.find((option) => option.value === value)

  return (
    <BaseSelect.Root value={value} items={options} {...props}>
      <BaseSelect.Trigger
        ref={ref}
        className={cn(selectTriggerVariants({ variant }), className)}
      >
        <BaseSelect.Value className='w-full truncate whitespace-nowrap'>
          {() => (selectedOption ? selectedOption.label : placeholder)}
        </BaseSelect.Value>
        <BaseSelect.Icon aria-readonly={true}>
          <ChevronsUpDownIcon className='size-4.5' />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          align={align}
          sideOffset={4}
          alignItemWithTrigger={false}
          className='z-50'
        >
          <BaseSelect.Popup
            className={cn(
              'border-border bg-popover scroll-py-4 rounded-xl border p-2 shadow-lg outline-none',
              'max-h-[min(var(--available-height),32rem)] max-w-(--available-width) min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto overscroll-contain',
              'transition-[transform,translate,opacity]',
              'data-starting-style:-translate-y-2 data-starting-style:opacity-0',
              'data-ending-style:-translate-y-2 data-ending-style:opacity-0',
              'scrollbar-thumb-foreground-soft/40 scrollbar-track-transparent scrollbar-thin',
              contentClassName,
            )}
          >
            <BaseSelect.List>
              {options.map(({ label, value, description }) => (
                <BaseSelect.Item
                  key={value}
                  value={value}
                  className='data-highlighted:bg-primary data-highlighted:text-primary-foreground data-highlighted:[&_svg]:text-primary-foreground flex cursor-pointer items-center justify-between gap-1 rounded-md px-3 py-1.5 transition-colors outline-none'
                >
                  <BaseSelect.ItemText className='flex flex-col'>
                    <span>{label}</span>
                    {description && (
                      <span className='text-sm opacity-60'>{description}</span>
                    )}
                  </BaseSelect.ItemText>

                  <BaseSelect.ItemIndicator>
                    <CheckIcon className='text-primary relative left-1.5 size-4.5' />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}

              {resetLabel && selectedOption && (
                <>
                  <Divider className='my-1' />
                  <BaseSelect.Item
                    value='reset'
                    className='data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 transition-colors outline-none [&_svg]:size-4'
                  >
                    <BaseSelect.ItemText>{resetLabel}</BaseSelect.ItemText>
                  </BaseSelect.Item>
                </>
              )}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}
