'use client'

import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { cva, type VariantProps } from 'class-variance-authority'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { RefCallBack } from 'react-hook-form'

import { cn } from '@/utils/class-name-merge'

export const comboboxInputVariants = cva(
  'border-border bg-background text-foreground h-10 w-full truncate overflow-hidden rounded-lg border pr-16 pl-3 focus:outline-2 focus:-outline-offset-1 disabled:opacity-50 aria-[readonly]:outline-none',
  {
    variants: {
      variant: {
        default: 'outline-ring hover:border-ring',
        error: 'border-error outline-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface ComboboxOption {
  label: string
  value: string
  description?: string
}

export interface ComboboxProps
  extends VariantProps<typeof comboboxInputVariants> {
  name: string
  value: string
  options: ComboboxOption[]
  onChange: (value: string) => void
  disabled?: boolean
  readOnly?: boolean
  className?: string
  placeholder?: string
  ref?: RefCallBack
}

export function Combobox({
  ref,
  name,
  value,
  options,
  variant,
  disabled,
  readOnly,
  onChange,
  className,
  placeholder = 'Selecione uma opção',
}: Readonly<ComboboxProps>) {
  const selectedOption =
    options.find((option) => option.value === value) || null

  const showClearButton = !readOnly && !disabled

  return (
    <BaseCombobox.Root
      inputRef={ref}
      items={options}
      disabled={disabled}
      readOnly={readOnly}
      value={selectedOption}
      onValueChange={(option) => onChange(option?.value || '')}
    >
      <div className={cn('relative flex w-full items-center', className)}>
        <BaseCombobox.Input
          id={name}
          name={name}
          placeholder={placeholder}
          className={cn(comboboxInputVariants({ variant }))}
        />
        <div className='text-disabled absolute right-1.5 flex items-center'>
          {showClearButton && (
            <BaseCombobox.Clear
              aria-label='Limpar seleção'
              className={cn(
                'hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-full p-1 transition-colors',
                'disabled:pointer-events-none disabled:opacity-0',
                'aria-[readonly]:pointer-events-none aria-[readonly]:opacity-0',
              )}
            >
              <XIcon className='size-4' />
            </BaseCombobox.Clear>
          )}
          <BaseCombobox.Trigger
            disabled={disabled}
            aria-readonly={readOnly}
            aria-label='Abrir menu de opções'
            className='p-1 opacity-50 disabled:opacity-25 aria-[readonly]:opacity-25'
          >
            <ChevronsUpDownIcon className='size-4' />
          </BaseCombobox.Trigger>
        </div>
      </div>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner align='start' sideOffset={6} className='z-50'>
          <BaseCombobox.Popup
            className={cn(
              'border-border bg-popover scroll-py-4 rounded-xl border p-2 shadow-lg',
              'max-h-[min(var(--available-height),32rem)] max-w-(--available-width) min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto overscroll-contain',
              'transition-[transform,translate,opacity]',
              'data-starting-style:-translate-y-2 data-starting-style:opacity-0',
              'data-ending-style:-translate-y-2 data-ending-style:opacity-0',
              'scrollbar-thumb-foreground-soft/40 scrollbar-track-transparent scrollbar-thin',
            )}
          >
            <BaseCombobox.Empty className='text-foreground-soft p-2 text-sm empty:p-0'>
              Nenhuma opção encontrada
            </BaseCombobox.Empty>
            <BaseCombobox.List>
              {(option: ComboboxOption) => (
                <BaseCombobox.Item
                  key={option.value}
                  value={option}
                  className='data-highlighted:bg-primary data-highlighted:text-primary-foreground data-highlighted:[&_svg]:text-primary-foreground flex cursor-pointer items-center justify-between gap-2 rounded-md py-1.5 pr-1.5 pl-3 transition-colors'
                >
                  <div className='flex flex-col'>
                    {option.label}
                    {option.description && (
                      <span className='text-sm opacity-60'>
                        {option.description}
                      </span>
                    )}
                  </div>

                  <BaseCombobox.ItemIndicator>
                    <CheckIcon className='size-5 shrink-0' />
                  </BaseCombobox.ItemIndicator>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  )
}
