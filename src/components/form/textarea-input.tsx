import { Controller, useFormContext } from 'react-hook-form'

import { Textarea, TextareaProps } from '../ui-v2/textarea'
import { FormMessage } from './form-message'

interface TextareaInputProps extends TextareaProps {
  name: string
  description?: string
}

export function TextareaInput({
  name,
  description,
  ...props
}: TextareaInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message

        return (
          <>
            <Textarea
              {...field}
              id={name}
              name={name}
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
