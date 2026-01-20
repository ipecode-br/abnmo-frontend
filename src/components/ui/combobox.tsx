'use client'

import { Combobox as BaseCombobox } from '@base-ui-components/react/combobox'
import { cva, type VariantProps } from 'class-variance-authority'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

export const comboboxInputVariants = cva(
  'border-border bg-background h-10 w-full truncate overflow-hidden rounded-lg border pr-12 pl-3 shadow-xs outline-offset-2 outline-transparent transition-colors disabled:opacity-50 aria-[readonly]:focus-visible:outline-none',
  {
    variants: {
      variant: {
        default:
          'border-border text-foreground placeholder:text-disabled focus-visible:outline-ring',
        error:
          'border-error focus-visible:ring-error focus-visible:outline-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type ComboboxOption = {
  label: string
  value: string
  description?: string
}

export interface ComboboxProps
  extends VariantProps<typeof comboboxInputVariants> {
  name: string
  value: string
  options: ComboboxOption[]
  disabled?: boolean
  readOnly?: boolean
  placeholder?: string
  onSelect: (value: string) => void
}

export function Combobox({
  name,
  value,
  options,
  variant,
  disabled,
  readOnly,
  placeholder = 'Selecione uma opção',
  onSelect,
}: Readonly<ComboboxProps>) {
  const selectedOption =
    options.find((option) => option.value === value) || null

  return (
    <BaseCombobox.Root
      items={options}
      value={selectedOption}
      onValueChange={(option) => onSelect(option?.value || '')}
      disabled={disabled}
      readOnly={readOnly}
    >
      <div className='relative flex h-fit items-center'>
        <BaseCombobox.Input
          id={name}
          name={name}
          placeholder={placeholder}
          className={cn(comboboxInputVariants({ variant }))}
        />
        <div className='text-disabled absolute right-1.5 flex items-center'>
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
          <BaseCombobox.Trigger
            aria-label='Abrir menu de opções'
            className={cn(
              'hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-full p-1 transition-colors',
              'disabled:pointer-events-none disabled:opacity-50',
              'aria-[readonly]:pointer-events-none aria-[readonly]:opacity-50',
            )}
          >
            <ChevronsUpDownIcon className='size-4' />
          </BaseCombobox.Trigger>
        </div>
      </div>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner align='start' sideOffset={6} className='z-50'>
          <BaseCombobox.Popup
            className={cn(
              'border-border bg-popover rounded-lg border p-2 shadow-lg',
              'max-h-[min(var(--available-height),30rem)] max-w-[var(--available-width)] min-w-[var(--anchor-width)] origin-[var(--transform-origin)] scroll-pt-2 scroll-pb-2 overflow-y-auto overscroll-contain transition-[transform,translate,opacity]',
              'data-[ending-style]:-translate-y-2 data-[ending-style]:opacity-0 data-[starting-style]:-translate-y-2 data-[starting-style]:opacity-0',
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
                  className='data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 transition-colors'
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
