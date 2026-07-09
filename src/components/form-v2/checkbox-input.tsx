import { Controller, useFormContext } from 'react-hook-form'

import { FormMessage } from '../form/form-message'
import { Checkbox, CheckboxProps } from '../ui-v2/checkbox'

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
