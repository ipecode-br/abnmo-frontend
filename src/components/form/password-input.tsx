import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { EyeIcon, EyeOffIcon, LockKeyholeIcon } from '@/components/ui/icons'
import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/utils/class-name-merge'

import { Label } from '../ui/label'
import { FormMessage } from './form-message'
import { PasswordRequirements } from './password-requirements'
import { RequiredInput } from './required-input'

interface RequiredPasswordInputProps {
  name: string
  label: string
  type?: never
}

type PasswordInputProps = RequiredPasswordInputProps &
  InputProps & {
    isRequired?: boolean
    message?: string
    showRequirements?: boolean
    wrapperClassName?: InputProps['className']
  }

export function PasswordInput({
  name,
  label,
  isRequired,
  message,
  showRequirements,
  wrapperClassName,
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
        const showMessage = fieldState.error?.message ?? message

        return (
          <div className={cn('flex w-full flex-col gap-1', wrapperClassName)}>
            <Label htmlFor={name}>
              {label}
              {isRequired && <RequiredInput />}
            </Label>
            <div className='relative flex'>
              <Input
                id={name}
                icon={LockKeyholeIcon}
                variant={fieldState.error && 'error'}
                type={showPassword ? 'text' : 'password'}
                {...props}
                {...field}
              />

              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='text-foreground-soft hover:text-primary focus-visible:outline-ring absolute top-0 right-1 flex size-10 cursor-pointer items-center justify-center rounded-lg transition-colors [&_svg]:size-5'
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>

            <FormMessage error={!!fieldState.error?.message}>
              {showMessage}
            </FormMessage>

            {showRequirements && <PasswordRequirements value={field.value} />}
          </div>
        )
      }}
    />
  )
}
