import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/utils/class-name-merge'

import { Label } from '../ui/label'
import {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupProps,
} from '../ui/radio-group'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

interface RequiredRadioInputProps {
  name: string
  label: string | ReactNode
  options: Array<{ label: string; value: string }>
}

type RadioInputProps = RequiredRadioInputProps &
  RadioGroupProps & {
    isRequired?: boolean
    message?: string
    wrapperClassName?: RadioGroupProps['className']
  }

export function RadioInput({
  name,
  label,
  isRequired,
  options,
  message,
  wrapperClassName,
  ...props
}: Readonly<RadioInputProps>) {
  const { control } = useFormContext()

  if (!control) {
    throw new Error('RadioInput must be used within a FormProvider')
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const showMessage = fieldState.error?.message ?? message

        return (
          <div className={cn('flex flex-col gap-2', wrapperClassName)}>
            <Label htmlFor={name}>
              {label}
              {isRequired && <RequiredInput />}
            </Label>

            <RadioGroup
              id={name}
              onValueChange={field.onChange}
              value={field.value}
              {...props}
            >
              {options.map(({ label, value }) => (
                <RadioGroupItem key={value} value={value} label={label} />
              ))}
            </RadioGroup>

            <FormMessage error={!!fieldState.error?.message}>
              {showMessage}
            </FormMessage>
          </div>
        )
      }}
    />
  )
}
