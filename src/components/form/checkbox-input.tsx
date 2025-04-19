import { Controller, useFormContext } from 'react-hook-form'

import { Checkbox, type CheckboxProps } from '../ui/checkbox'
import { Label } from '../ui/label'
import { FormMessage } from './form-message'

interface RequiredCheckboxInputProps {
  name: string
  label: string
}

type CheckboxInputProps = RequiredCheckboxInputProps & CheckboxProps

export function CheckboxInput({
  name,
  label,
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
        <fieldset className='flex flex-col gap-1'>
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
            </Label>
          </div>
          <FormMessage error>{fieldState.error?.message}</FormMessage>
        </fieldset>
      )}
    />
  )
}
