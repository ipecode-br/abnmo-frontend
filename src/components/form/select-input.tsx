import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '../ui/label'
import { Select, SelectValue } from '../ui/select'
import { SelectContent } from '../ui/select/content'
import { SelectItem } from '../ui/select/item'
import { SelectTrigger, type SelectTriggerProps } from '../ui/select/trigger'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

interface RequiredSelectInputProps {
  name: string
  label: string | ReactNode
  options: Array<{ value: string; label: string }>
}

type SelectInputProps = RequiredSelectInputProps &
  SelectTriggerProps & {
    isRequired?: boolean
    placeholder?: string
  }

export function SelectInput({
  name,
  label,
  options,
  isRequired,
  placeholder,
  ...props
}: Readonly<SelectInputProps>) {
  const { control } = useFormContext()

  if (!control) {
    throw new Error('SelectInput must be used within a FormProvider')
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className='flex flex-col gap-1'>
          <Label htmlFor={name}>
            {label}
            {isRequired && <RequiredInput />}
          </Label>
          <Select onValueChange={field.onChange} {...field}>
            <SelectTrigger
              id={name}
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
          <FormMessage error>{fieldState.error?.message}</FormMessage>
        </div>
      )}
    />
  )
}
