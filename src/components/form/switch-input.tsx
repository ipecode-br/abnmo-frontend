import { Controller, useFormContext } from 'react-hook-form'

import { Switch, SwitchProps } from '../ui/switch'
import { FormMessage } from './form-message'

interface SwitchInputProps extends SwitchProps {
  name: string
  label: string
  description?: string
}

export function SwitchInput({ name, description, ...props }: SwitchInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message

        return (
          <>
            <Switch
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
