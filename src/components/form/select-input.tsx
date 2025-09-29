import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/utils/class-name-merge'

import { Label } from '../ui/label'
import { Select, type SelectOptions, SelectValue } from '../ui/select'
import { SelectContent } from '../ui/select/content'
import { SelectItem } from '../ui/select/item'
import { SelectTrigger, type SelectTriggerProps } from '../ui/select/trigger'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

interface RequiredSelectInputProps {
  name: string
  label: string | ReactNode
  options: SelectOptions
}

type SelectInputProps<T> = RequiredSelectInputProps &
  SelectTriggerProps & {
    isRequired?: boolean
    placeholder?: string
    message?: string
    wrapperClassName?: SelectTriggerProps['className']
    onValueChange?: (value: T) => void
  }

export function SelectInput<T>({
  name,
  label,
  options,
  message,
  readOnly,
  isRequired,
  placeholder,
  wrapperClassName,
  onValueChange,
  ...props
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
          <div className={cn('flex w-full flex-col gap-1', wrapperClassName)}>
            <Label htmlFor={name} readOnly={readOnly}>
              {label}
              {isRequired && <RequiredInput />}
            </Label>
            <Select
              key={field.value || 'empty'}
              defaultValue={field.value || ''}
              onValueChange={handleValueChange}
            >
              <SelectTrigger
                id={name}
                readOnly={readOnly}
                variant={fieldState.error && 'error'}
                {...props}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage error={!!fieldState.error?.message}>
              {showMessage}
            </FormMessage>
          </div>
        )
      }}
    />
  )
}
