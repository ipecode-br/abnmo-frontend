'use client'

import {
  Select as BaseSelect,
  type SelectPositionerProps,
  type SelectRootProps,
} from '@base-ui-components/react/select'
import { cva, type VariantProps } from 'class-variance-authority'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

import { Divider } from './divider'

export type SelectOption = {
  label: string
  value: string
  description?: string
}

const selectTriggerVariants = cva(
  'border-border bg-background data-[placeholder]:text-disabled outline-ring hover:bg-accent flex cursor-pointer items-center justify-between gap-2 rounded-lg border pr-2 pl-3 shadow-xs outline-offset-4 transition-colors disabled:pointer-events-none disabled:opacity-50 aria-[readonly]:pointer-events-none',
  {
    variants: {
      size: {
        default: 'h-10',
        sm: 'h-9',
      },
    },
    defaultVariants: {
      size: 'default',
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
  }

export function Select({
  size,
  value,
  align = 'start',
  options,
  className,
  resetLabel,
  placeholder = 'Selecione uma opção',
  ...props
}: Readonly<SelectProps>) {
  const selectedOption = options.find((option) => option.value === value)
  const showIndicator = !props.disabled && !props.readOnly

  return (
    <BaseSelect.Root value={value} items={options} {...props}>
      <BaseSelect.Trigger
        className={cn('w-full', selectTriggerVariants({ size, className }))}
      >
        <BaseSelect.Value>
          {() => (selectedOption ? selectedOption.label : placeholder)}
        </BaseSelect.Value>
        {showIndicator && (
          <BaseSelect.Icon>
            <ChevronsUpDownIcon className='text-disabled size-4.5 shrink-0' />
          </BaseSelect.Icon>
        )}
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
              'border-border bg-popover rounded-lg border p-2 shadow-lg outline-none',
              'max-h-[min(var(--available-height),32rem)] max-w-[var(--available-width)] min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-y-auto overscroll-contain',
              'transition-[transform,translate,opacity]',
              'data-[ending-style]:-translate-y-2 data-[ending-style]:opacity-0',
              'data-[starting-style]:-translate-y-2 data-[starting-style]:opacity-0',
            )}
          >
            <BaseSelect.List>
              {options.map(({ label, value, description }) => (
                <BaseSelect.Item
                  key={value}
                  value={value}
                  className={cn(
                    'data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground',
                    'flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 transition-colors outline-none',
                    '[&_svg]:size-4',
                  )}
                >
                  <BaseSelect.ItemText className='flex flex-col'>
                    <span>{label}</span>
                    {description && (
                      <span className='text-sm opacity-60'>{description}</span>
                    )}
                  </BaseSelect.ItemText>

                  <BaseSelect.ItemIndicator>
                    <CheckIcon />
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
                    <XIcon />
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
