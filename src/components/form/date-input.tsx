import { Controller, useFormContext } from 'react-hook-form'

import { DatePicker, DatePickerProps } from '../ui-v2/date-picker'
import { FormMessage } from './form-message'

interface DateInputProps
  extends Omit<DatePickerProps, 'id' | 'value' | 'onChange'> {
  name: string
  description?: string
}

export function DateInput({ name, description, ...props }: DateInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message

        return (
          <>
            <DatePicker
              id={name}
              error={!!errorMessage}
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
