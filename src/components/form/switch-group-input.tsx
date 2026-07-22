import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/utils/class-name-merge'

import { Switch } from '../ui/switch'
import { FormMessage } from './form-message'

interface SwitchGroupInputOptions {
  value: string
  label: string
}

interface SwitchGroupInputProps extends React.ComponentProps<'div'> {
  name: string
  options: SwitchGroupInputOptions[]
  disabledValues?: string[]
  description?: string
  readOnly?: boolean
  disabled?: boolean
}

export function SwitchGroupInput({
  name,
  options,
  disabled,
  readOnly,
  className,
  description,
  disabledValues,
  ...props
}: SwitchGroupInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const values: string[] = Array.isArray(field.value) ? field.value : []
        const errorMessage = fieldState.error?.message

        function handleCheckedChange(value: string, checked: boolean) {
          return checked
            ? field.onChange([...values, value])
            : field.onChange(values.filter((v) => v !== value))
        }

        return (
          <>
            <div className={cn('flex flex-col gap-3', className)} {...props}>
              {options.map(({ label, value }) => (
                <Switch
                  key={value}
                  label={label}
                  readOnly={readOnly}
                  checked={values.includes(value)}
                  disabled={disabledValues?.includes(value) || disabled}
                  onCheckedChange={(checked) =>
                    handleCheckedChange(value, checked)
                  }
                />
              ))}
            </div>

            {description && <FormMessage>{description}</FormMessage>}
            {errorMessage && <FormMessage error>{errorMessage}</FormMessage>}
          </>
        )
      }}
    />
  )
}
