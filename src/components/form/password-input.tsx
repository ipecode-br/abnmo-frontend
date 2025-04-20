import { Eye, EyeOff, LockKeyholeIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input, type InputProps } from '@/components/ui/input'

import { Label } from '../ui/label'
import { FormMessage } from './form-message'
import { RequiredInput } from './required-input'

interface RequiredPasswordInputProps {
  name: string
  label: string
  type?: never
}

type PasswordInputProps = RequiredPasswordInputProps &
  InputProps & {
    isRequired?: boolean
  }

export function PasswordInput({
  name,
  label,
  isRequired,
  ...props
}: Readonly<PasswordInputProps>) {
  const [showPassword, setShowPassword] = useState(false)
  const { control } = useFormContext()

  if (!control) {
    throw new Error('PasswordInput must be used within a FormProvider')
  }

  return (
    <div className='flex w-full flex-col gap-1'>
      <Label htmlFor={name}>
        {label}
        {isRequired && <RequiredInput />}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
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
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>

            <FormMessage error>{fieldState.error?.message}</FormMessage>
          </>
        )}
      />
    </div>
  )
}
