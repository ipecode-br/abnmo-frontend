import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/utils/class-name-merge'

import { InputButton } from '../ui/input-button'
import { FormMessage } from './form-message'
import { PasswordRequirements } from './password-requirements'

interface PasswordInputProps extends InputProps {
  name: string
  type?: never
  description?: string
  showRequirements?: boolean
}

export function PasswordInput({
  name,
  className,
  description,
  showRequirements,
  ...props
}: Readonly<PasswordInputProps>) {
  const [showPassword, setShowPassword] = useState(false)
  const { control } = useFormContext()

  if (!control) {
    throw new Error('PasswordInput must be used within a FormProvider')
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message

        return (
          <>
            <div className={cn('relative flex items-center', className)}>
              <Input
                id={name}
                variant={fieldState.error && 'error'}
                type={showPassword ? 'text' : 'password'}
                {...props}
                {...field}
              />

              <InputButton
                className='right-1'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </InputButton>
            </div>

            {description && <FormMessage>{description}</FormMessage>}
            {errorMessage && <FormMessage error>{errorMessage}</FormMessage>}

            {showRequirements && <PasswordRequirements value={field.value} />}
          </>
        )
      }}
    />
  )
}
