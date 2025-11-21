'use client'

import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/utils/class-name-merge'

import { Combobox, type ComboboxProps } from '../ui/combobox'
import { Label } from '../ui/label'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

type ComboboxInputProps = Omit<
  ComboboxProps,
  'value' | 'onSelect' | 'variant'
> & {
  label: string | ReactNode
  message?: string
  className?: string
  isRequired?: boolean
  onValueChange?: (value: string) => void
}

export function ComboboxInput({
  name,
  label,
  message,
  isRequired,
  className,
  onValueChange,
  ...props
}: Readonly<ComboboxInputProps>) {
  const { control } = useFormContext()

  if (!control) {
    throw new Error('SelectInput must be used within a FormProvider')
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const showMessage = fieldState.error?.message ?? message

        return (
          <div className={cn('flex w-full flex-col gap-1', className)}>
            <Label htmlFor={name}>
              {label}
              {isRequired && <RequiredInput />}
            </Label>
            <Combobox
              name={name}
              value={field.value}
              variant={fieldState.error && 'error'}
              onSelect={(value) => {
                field.onChange(value)
                onValueChange?.(value)
              }}
              {...props}
            />
            <FormMessage error={!!fieldState.error?.message}>
              {showMessage}
            </FormMessage>
          </div>
        )
      }}
    />
  )
}
