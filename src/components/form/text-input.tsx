import { Controller, useFormContext } from 'react-hook-form'

import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/utils/class-name-merge'

import { Label } from '../ui/label'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

interface RequiredTextInputProps {
  name: string
  label: string
}

type TextInputProps = RequiredTextInputProps &
  InputProps & {
    isRequired?: boolean
    message?: string
    wrapperClassName?: InputProps['className']
  }

export function TextInput({
  name,
  label,
  isRequired,
  message,
  wrapperClassName,
  icon,
  ...props
}: Readonly<TextInputProps>) {
  const { control } = useFormContext()

  if (!control) {
    throw new Error('TextInput must be used within a FormProvider')
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
