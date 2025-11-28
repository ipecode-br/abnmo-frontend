import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircleIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

const formMessageVariants = cva('mt-1 flex items-center gap-1.5 text-sm', {
  variants: {
    variant: {
      default: 'text-foreground-soft',
      error: 'text-error',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof formMessageVariants> {
  error?: boolean
}

export function FormMessage({
  error,
  variant,
  className,
  children,
  ...props
}: Readonly<FormMessageProps>) {
  if (!children) return null

  return (
    <p
      className={cn(
        formMessageVariants({ variant: error ? 'error' : variant, className }),
      )}
      {...props}
    >
      {error && <AlertCircleIcon className='size-4 shrink-0' />}
      {children}
    </p>
  )
}
