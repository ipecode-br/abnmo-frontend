import { TextareaHTMLAttributes } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/utils/class-name-merge'

import { Label } from '../ui/label'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

interface RequiredTextareaInputProps {
  name: string
  label: string
}

type TextareaInputProps = RequiredTextareaInputProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    isRequired?: boolean
    maxLength?: number
    message?: string
    wrapperClassName?: string
  }

export function TextareaInput({
  name,
  label,
  isRequired,
  maxLength,
  message,
  wrapperClassName,
  ...props
}: Readonly<TextareaInputProps>) {
  const { control } = useFormContext()

  if (!control) {
    throw new Error('TextareaInput must be used dentro de um FormProvider')
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const showMessage = fieldState.error?.message ?? message
        const value = field.value ?? '' // garante string

        return (
          <div className={cn('flex w-full flex-col gap-1', wrapperClassName)}>
            <Label htmlFor={name}>
              {label}
              {isRequired && <RequiredInput />}
            </Label>

            <textarea
              id={name}
              {...field}
              value={value}
              maxLength={maxLength}
              className={cn(
                'focus:ring-primary w-full rounded-lg border p-2 text-sm outline-none focus:ring-2',
                fieldState.error && 'border-error focus:ring-error',
              )}
              {...props}
            />

            <div className='flex justify-between text-xs text-gray-500'>
              <FormMessage error={!!fieldState.error?.message}>
                {showMessage}
              </FormMessage>
              {maxLength && (
                <span>
                  {value.length}/{maxLength}
                </span>
              )}
            </div>
          </div>
        )
      }}
    />
  )
}
