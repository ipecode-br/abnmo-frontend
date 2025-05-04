import { Controller, useFormContext } from 'react-hook-form'

import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/utils/class-name-merge'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

import { Label } from '../ui/label'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

interface RequiredPhoneInputProps {
  name: string
  label: string
}

type PhoneInputProps = RequiredPhoneInputProps &
  InputProps & {
    isRequired?: boolean
    message?: string
    wrapperClassName?: InputProps['className']
  }

export function PhoneInput({
  name,
  label,
  isRequired,
  message,
  wrapperClassName,
  ...props
}: Readonly<PhoneInputProps>) {
  const { control } = useFormContext()

  if (!control) {
    throw new Error('PhoneInput must be used within a FormProvider')
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
            <Input
              id={name}
              variant={fieldState.error && 'error'}
              {...props}
              {...field}
              onChange={(e) => {
                const formattedValue = formatPhoneNumber(e.target.value)
                field.onChange(formattedValue)
              }}
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
