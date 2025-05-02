import type { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/utils/class-name-merge'

import { Checkbox, type CheckboxProps } from '../ui/checkbox'
import { Label } from '../ui/label'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

interface RequiredCheckboxInputProps {
  name: string
  label: string | ReactNode
}

type CheckboxInputProps = RequiredCheckboxInputProps &
  CheckboxProps & {
    isRequired?: boolean
    wrapperClassName?: CheckboxProps['className']
  }

export function CheckboxInput({
  name,
  label,
  isRequired,
  wrapperClassName,
  ...props
}: Readonly<CheckboxInputProps>) {
  const { control } = useFormContext()

  if (!control) {
    throw new Error('CheckboxInput must be used within a FormProvider')
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={cn('flex flex-col gap-1', wrapperClassName)}>
          <div className='flex items-center gap-2'>
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              {...props}
              {...field}
            />
            <Label htmlFor={name} className='font-normal'>
              {label}
              {isRequired && <RequiredInput />}
            </Label>
          </div>
          <FormMessage error>{fieldState.error?.message}</FormMessage>
        </div>
      )}
    />
  )
}
