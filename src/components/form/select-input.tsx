import { Controller, useFormContext } from 'react-hook-form'

import { Select, SelectProps } from '../ui/select'
import { FormMessage } from './form-message'

interface SelectInputProps extends Omit<SelectProps, 'id'> {
  name: string
  description?: string
}

export function SelectInput({ name, description, ...props }: SelectInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message

        return (
          <>
            <Select
              {...field}
              id={name}
              onValueChange={field.onChange}
              variant={!!errorMessage ? 'error' : 'default'}
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
