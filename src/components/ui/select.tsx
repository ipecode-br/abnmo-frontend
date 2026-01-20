'use client'

import {
  Select as BaseSelect,
  type SelectRootProps,
} from '@base-ui-components/react/select'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

export type SelectOption = {
  label: string
  value: string
  description?: string
}

export type SelectProps = Omit<SelectRootProps<string, false>, 'items'> & {
  options: SelectOption[]
  className?: string
  placeholder?: string
}

export function Select({
  value,
  options,
  className,
  placeholder = 'Selecione uma opção',
  ...props
}: Readonly<SelectProps>) {
  const selectedOption = options.find((option) => option.value === value)

  return (
    <BaseSelect.Root value={value} items={options} {...props}>
      <BaseSelect.Trigger
        className={cn(
          'border-border bg-background hover:bg-accent flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border pr-2 pl-3 shadow-xs transition-colors',
          'focus-visible:outline-ring outline-offset-4 outline-transparent',
          'disabled:pointer-events-none disabled:opacity-50 aria-[readonly]:pointer-events-none',
          'data-[placeholder]:text-disabled',
          className,
        )}
      >
        <BaseSelect.Value>
          {() => (selectedOption ? selectedOption.label : placeholder)}
        </BaseSelect.Value>
        <BaseSelect.Icon>
          <ChevronsUpDownIcon className='text-disabled size-4.5 shrink-0' />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner
          sideOffset={4}
          alignItemWithTrigger={false}
          className='z-50'
        >
          <BaseSelect.Popup
            className={cn(
              'border-border bg-popover rounded-lg border p-2 shadow-lg',
              'max-h-[min(var(--available-height),30rem)] max-w-[var(--available-width)] min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-y-auto overscroll-contain',
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
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}
