import { Controller, useFormContext } from 'react-hook-form'

import { NON_NUMBER_REGEX } from '@/constants/regex'
import { formatCepNumber } from '@/utils/formatters/format-cep-number'
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

import { FormMessage } from '../form/form-message'
import { Input, InputProps } from '../ui-v2/input'

type InputMaskType = 'phone' | 'cpf' | 'cep' | 'number'

interface TextInputProps extends InputProps {
  name: string
  description?: string
  mask?: InputMaskType
}

const INPUT_MODES: Record<InputMaskType, InputProps['inputMode']> = {
  phone: 'tel',
  cpf: 'numeric',
  cep: 'numeric',
  number: 'numeric',
}

export function TextInput({
  name,
  description,
  mask,
  ...props
}: TextInputProps) {
  const { control } = useFormContext()

  function formatter(value: string) {
    if (mask === 'phone') return formatPhoneNumber(value)
    if (mask === 'cpf') return formatCpfNumber(value)
    if (mask === 'cep') return formatCepNumber(value)
    if (mask === 'number') return value.replace(NON_NUMBER_REGEX, '')
    return value
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message

        return (
          <>
            <Input
              {...field}
              id={name}
              name={name}
              inputMode={mask ? INPUT_MODES[mask] : undefined}
              variant={!!errorMessage ? 'error' : 'default'}
              onChange={(e) => {
                const formattedValue = formatter(e.target.value)
                field.onChange(formattedValue)
              }}
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
