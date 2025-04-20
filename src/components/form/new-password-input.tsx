import { Eye, EyeOff, LockKeyholeIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input, type InputProps } from '@/components/ui/input'

import { Label } from '../ui/label'
import { FormMessage } from './form-message'
import { PasswordRequirements } from './password-requirements'
import { RequiredInput } from './required-input'

interface RequiredNewPasswordInputProps {
  name: string
  label: string
  triggerOnChange: () => void
  type?: never
}

type NewPasswordInputProps = RequiredNewPasswordInputProps &
  InputProps & {
    isRequired?: boolean
  }

export function NewPasswordInput({
  name,
  label,
  isRequired,
  triggerOnChange,
  ...props
}: Readonly<NewPasswordInputProps>) {
  const [showPassword, setShowPassword] = useState(false)
  const { control } = useFormContext()

  if (!control) {
    throw new Error('NewPasswordInput must be used within a FormProvider')
  }

  return (
    <div className='group/password flex w-full flex-col gap-1'>
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
                // Override default behaviour to validate on "onChange".
                onChange={(e) => {
                  field.onChange(e)
                  triggerOnChange()
                }}
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
            <PasswordRequirements value={field.value} />
          </>
        )}
      />
    </div>
  )
}
