'use client'

import {
  Command as Cmdk,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'cmdk'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import type { ReactNode } from 'react'
import React, { forwardRef, useState } from 'react'

import { cn } from '@/utils/class-name-merge'

import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

interface SelectOption {
  label: string
  value: string
}

interface AutocompleteInputProps {
  name?: string
  label: string | ReactNode
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  isRequired?: boolean
  placeholder?: string
  message?: string
  wrapperClassName?: string
  error?: boolean
}

export const AutocompleteInput = forwardRef<
  React.ElementRef<typeof Cmdk>,
  AutocompleteInputProps
>(
  (
    {
      name,
      label,
      options,
      message,
      isRequired,
      placeholder,
      wrapperClassName,
      value,
      onChange,
      error,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false)
    const [internalValue, setInternalValue] = useState('')

    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const selectedOption = options.find(
      (option) => option.value === currentValue,
    )

    function handleSelect(selectedValue: string) {
      const newValue = selectedValue === currentValue ? '' : selectedValue

      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)

      setOpen(false)
    }

    return (
      <div className={cn('flex w-full flex-col gap-1', wrapperClassName)}>
        <Label htmlFor={name}>
          {label}
          {isRequired && <RequiredInput />}
        </Label>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              aria-controls='command-list'
              className={cn(
                !currentValue && 'text-muted-foreground',
                error && 'border-destructive',
              )}
            >
              <div className='flex-1 truncate text-left'>
                {selectedOption ? selectedOption.label : placeholder}
              </div>
              <ChevronsUpDown className='ml-auto shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className='bg-popover text-popover-foreground w-[--radix-popover-trigger-width] rounded-md border p-0 shadow-md'
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <Cmdk ref={ref} {...props} id='command-list'>
              <CommandInput
                placeholder={placeholder}
                className='placeholder:text-muted-foreground h-9 px-4 py-2 text-sm outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                autoFocus
                aria-labelledby={name}
              />
              <CommandList className='max-h-60 overflow-x-hidden overflow-y-auto p-1'>
                <CommandEmpty className='py-6 text-center text-sm'>
                  Nenhuma opção encontrada.
                </CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={handleSelect}
                      className={cn(
                        'aria-selected:bg-primary aria-selected:text-primary-foreground flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm outline-none [&_svg]:size-4',
                      )}
                    >
                      {option.label}
                      <CheckIcon
                        className={cn(
                          currentValue === option.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Cmdk>
          </PopoverContent>
        </Popover>
        <FormMessage error={!!error}>{message}</FormMessage>
      </div>
    )
  },
)

AutocompleteInput.displayName = 'AutocompleteInput'

/* USAGE

const cities = [
  { label: 'São Paulo', value: 'SP' },
  { label: 'Rio de Janeiro', value: 'RJ' },
];

// 1. Uncontrolled (standalone, recommended for simple cases)

<AutocompleteInput
  label="Cidade"
  options={cities}
  placeholder="Selecione uma cidade..."
  onChange={(value) => console.log(value)}
/>

// 2. Controlled (for forms or complex state management)
// State is managed by a parent component.
import { useState } from 'react';

const [city, setCity] = useState('');

<AutocompleteInput
  label="Cidade "
  options={cities}
  placeholder="Selecione uma cidade..."
  value={city}
  onChange={setCity}
/>

// 3. With React Hook Form (as a controlled component)
import { Controller } from 'react-hook-form';

<Controller
  name="city"
  control={form.control}
  render={({ field, fieldState }) => (
    <AutocompleteInput
      label="Cidade"
      options={cities}
      placeholder="Selecione uma cidade..."
      isRequired
      error={!!fieldState.error}
      message={fieldState.error?.message}
      value={field.value}
      onChange={field.onChange}
    />
  )}
/>

*/
