import { Controller, useFormContext } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '../ui/checkbox'
import { FormMessage } from './form-message'

interface CheckboxInputProps extends CheckboxProps {
  name: string
  label: string
  description?: string
}

export function CheckboxInput({
  name,
  description,
  ...props
}: CheckboxInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message

        return (
          <>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              {...props}
            />

            {description && <FormMessage>{description}</FormMessage>}
            {errorMessage && <FormMessage error>{errorMessage}</FormMessage>}
          </>
        )
      }}
    />
  )
}
