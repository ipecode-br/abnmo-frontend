import { Controller, useFormContext } from 'react-hook-form'

import { Textarea, type TextareaProps } from '@/components/ui/textarea'
import { cn } from '@/utils/class-name-merge'

import { Label } from '../ui/label'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

interface RequiredTextareaInputProps {
  name: string
  label: string
}

type TextareaInputProps = RequiredTextareaInputProps &
  TextareaProps & {
    isRequired?: boolean
    message?: string
    wrapperClassName?: TextareaProps['className']
  }

export function TextareaInput({
  name,
  label,
  isRequired,
  message,
  readOnly,
  wrapperClassName,
  ...props
}: Readonly<TextareaInputProps>) {
  const { control } = useFormContext()

  if (!control) {
    throw new Error('TextareaInput must be used within a FormProvider')
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const showMessage = fieldState.error?.message ?? message

        return (
          <div className={cn('flex w-full flex-col gap-1', wrapperClassName)}>
            <Label htmlFor={name} readOnly={readOnly}>
              {label}
              {isRequired && <RequiredInput />}
            </Label>
            <Textarea
              {...field}
              id={name}
              readOnly={readOnly}
              variant={fieldState.error && 'error'}
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
