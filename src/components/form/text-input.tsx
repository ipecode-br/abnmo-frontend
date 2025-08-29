import { Controller, useFormContext } from 'react-hook-form'

import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/utils/class-name-merge'
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'
import { formatDateInput } from '@/utils/formatters/format-date-input'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

import { Label } from '../ui/label'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

type InputMaskType = 'phone' | 'cpf' | 'date'

interface RequiredTextInputProps {
  name: string
  label: string
}

type TextInputProps = RequiredTextInputProps &
  InputProps & {
    isRequired?: boolean
    mask?: InputMaskType
    message?: string
    wrapperClassName?: InputProps['className']
  }

export function TextInput({
  name,
  label,
  isRequired,
  mask,
  message,
  wrapperClassName,
  icon,
  ...props
}: Readonly<TextInputProps>) {
  const { control } = useFormContext()

  if (!control) {
    throw new Error('TextInput must be used within a FormProvider')
  }

  function formatter(input: string) {
    if (mask === 'phone') return formatPhoneNumber(input)
    if (mask === 'cpf') return formatCpfNumber(input)
    if (mask === 'date') return formatDateInput(input)
    return input
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
              {...props}
              {...field}
              id={name}
              icon={icon}
              variant={fieldState.error && 'error'}
              onChange={(e) => {
                const formattedValue = formatter(e.target.value)
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
