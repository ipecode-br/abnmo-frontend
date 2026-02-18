import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/utils/class-name-merge'

import { Label } from '../ui/label'
import { Select, type SelectOption } from '../ui/select'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

interface RequiredSelectInputProps {
  name: string
  label: string | ReactNode
  options: SelectOption[]
}

type SelectInputProps<T> = RequiredSelectInputProps & {
  isRequired?: boolean
  placeholder?: string
  message?: string
  onValueChange?: (value: T) => void
  disabled?: boolean
  readOnly?: boolean
  modal?: boolean
  className?: string
}

export function SelectInput<T>({
  name,
  label,
  options,
  message,
  readOnly,
  isRequired,
  placeholder,
  onValueChange,
  disabled,
  modal,
  className,
}: Readonly<SelectInputProps<T>>) {
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

        function handleValueChange(value: string) {
          field.onChange(value)
          onValueChange?.(value as T)
        }

        return (
          <div className={cn('flex w-full flex-col gap-1', className)}>
            <Label htmlFor={name} readOnly={readOnly}>
              {label}
              {isRequired && <RequiredInput />}
            </Label>
            <Select
              modal={modal}
              options={options}
              readOnly={readOnly}
              disabled={disabled}
              value={field.value}
              placeholder={placeholder}
              onValueChange={handleValueChange}
              variant={fieldState.error && 'error'}
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
