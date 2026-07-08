import { cva } from 'class-variance-authority'
import { FileImage, FileUpIcon } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/utils/class-name-merge'

import { FormMessage } from '../form/form-message'

export const fileInputVariants = cva(
  'flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors',
  {
    variants: {
      variant: {
        default:
          'group-hover:bg-primary/5 border-foreground/15 group-hover:border-primary/50 peer-focus-visible:border-primary peer-focus-visible:bg-primary/5',
        error:
          'group-hover:bg-error/5 border-error peer-focus-visible:bg-error/5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface FileInputProps extends Omit<React.ComponentProps<'input'>, 'type'> {
  name: string
  description?: string
}

export function FileInput({
  name,
  description,
  className,
  accept,
  ...props
}: FileInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message

        const file: File | undefined = field.value
        const fileName = file?.name
        const Icon = fileName ? FileImage : FileUpIcon

        return (
          <>
            <div className={cn('group relative w-full', className)}>
              <input
                id={name}
                type='file'
                ref={field.ref}
                accept={accept}
                className='peer absolute inset-0 cursor-pointer opacity-0'
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    field.onChange(file)
                  }
                }}
                {...props}
              />

              <label
                htmlFor={name}
                className={fileInputVariants({
                  variant: errorMessage ? 'error' : 'default',
                })}
              >
                <Icon className='text-primary size-8' />
                {fileName ? (
                  <>
                    <p className='w-full truncate text-base font-medium'>
                      {fileName}
                    </p>
                    <span className='text-foreground-soft text-sm underline underline-offset-4'>
                      Alterar arquivo
                    </span>
                  </>
                ) : (
                  <>
                    <p className='text-base font-medium'>
                      <span className='text-primary underline underline-offset-4'>
                        Clique aqui
                      </span>{' '}
                      para selecionar ou arraste o arquivo
                    </p>
                    <span className='text-foreground-soft text-sm'>
                      JPG, PNG ou PDF (Máx. 6 MB)
                    </span>
                  </>
                )}
              </label>
            </div>
            {description && <FormMessage>{description}</FormMessage>}
            {errorMessage && (
              <FormMessage variant='error'>{errorMessage}</FormMessage>
            )}
          </>
        )
      }}
    />
  )
}
