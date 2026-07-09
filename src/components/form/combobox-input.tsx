import { Controller, useFormContext } from 'react-hook-form'

import { Combobox, ComboboxProps } from '../ui-v2/combobox'
import { FormMessage } from './form-message'

interface ComboboxInputProps extends Omit<ComboboxProps, 'value' | 'onChange'> {
  name: string
  description?: string
  onChange?: ComboboxProps['onChange']
}

export function ComboboxInput({
  name,
  description,
  ...props
}: ComboboxInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message

        return (
          <>
            <Combobox
              variant={!!errorMessage ? 'error' : 'default'}
              {...field}
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
