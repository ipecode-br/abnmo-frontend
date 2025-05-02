import { Controller, useFormContext } from 'react-hook-form'

import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/utils/class-name-merge'
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'

import { Label } from '../ui/label'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

interface RequiredCpfInputProps {
  name: string
  label: string
}

type CpfInputProps = RequiredCpfInputProps &
  InputProps & {
    isRequired?: boolean
    message?: string
    wrapperClassName?: InputProps['className']
  }

export function CpfInput({
  name,
  label,
  isRequired,
  message,
  wrapperClassName,
  icon,
  ...props
}: Readonly<CpfInputProps>) {
  const { control } = useFormContext()

  if (!control) {
    throw new Error('CpfInput must be used within a FormProvider')
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
              icon={icon}
              variant={fieldState.error && 'error'}
              {...props}
              {...field}
              // Overrides default onChange function to format value
              onChange={(e) => {
                const formattedValue = formatCpfNumber(e.target.value)
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
