import { Controller, useFormContext } from 'react-hook-form'

import { Input, type InputProps } from '@/components/ui/input'

import { Label } from '../ui/label'
import { FormMessage } from './form-message'

interface RequiredTextInputProps {
  name: string
  label: string
}

type TextInputProps = RequiredTextInputProps & InputProps

export function TextInput({
  name,
  label,
  icon,
  ...props
}: Readonly<TextInputProps>) {
  const { control } = useFormContext()

  if (!control) {
    throw new Error('TextInput must be used within a FormProvider')
  }

  return (
    <div className='flex w-full flex-col gap-1'>
      <Label htmlFor={name}>{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input
              id={name}
              icon={icon}
              variant={fieldState.error && 'error'}
              {...props}
              {...field}
            />

            <FormMessage error>{fieldState.error?.message}</FormMessage>
          </>
        )}
      />
    </div>
  )
}
