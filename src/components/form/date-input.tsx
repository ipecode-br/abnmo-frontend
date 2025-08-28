import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/utils/class-name-merge'

import { DatePicker } from '../ui/date-picker'
import { InputProps } from '../ui/input'
import { Label } from '../ui/label'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

interface RequiredDateInputProps {
  name: string
  label: string | ReactNode
}

type DateInputProps = RequiredDateInputProps & {
  isRequired?: boolean
  message?: string
  wrapperClassName?: InputProps['className']
  navMode?: 'step' | 'dropdown'
}

export function DateInput({
  name,
  label,
  isRequired,
  message,
  wrapperClassName,
  navMode,
}: Readonly<DateInputProps>) {
  const { control } = useFormContext()

  if (!control) {
    throw new Error('DateInput must be used within a FormProvider')
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const showMessage = fieldState.error?.message ?? message
        return (
          <div className={cn('flex w-full flex-col gap-1', wrapperClassName)}>
            <Label htmlFor={name}>
              {label}
              {isRequired && <RequiredInput />}
            </Label>

            <DatePicker
              name={name}
              navMode={navMode}
              value={field.value}
              onSelectDate={field.onChange}
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
