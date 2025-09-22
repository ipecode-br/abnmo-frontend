import { cva, type VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

export const inputVariants = cva(
  'ring-offset-background focus-visible:ring-ring bg-background h-10 w-full shrink-0 rounded-lg border px-3 text-sm shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none read-only:focus-visible:ring-0 read-only:focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-border text-foreground placeholder:text-disabled',
        error: 'border-error text-error focus-visible:ring-error',
      },
      size: {
        default: 'h-10',
        sm: 'h-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  VariantProps<typeof inputVariants> & {
    icon?: LucideIcon
  }

export function Input({
  icon,
  className,
  variant,
  size,
  ...props
}: Readonly<InputProps>) {
  const Icon = icon

  const iconColors = {
    default: 'text-disabled',
    error: 'text-error',
  }

  if (Icon) {
    return (
      <div
        className={cn(
          'relative flex w-full items-center [&>svg]:size-4.5',
          props.disabled && '[&>svg]:opacity-50',
        )}
      >
        <input
          type={props.type ?? 'text'}
          className={cn(inputVariants({ variant, size, className }), 'pl-10')}
          {...props}
        />
        <Icon
          data-testid='input-icon'
          className={cn(
            'pointer-events-none absolute left-3 shrink-0 transition-colors',
            iconColors[variant ?? 'default'],
          )}
        />
      </div>
    )
  }

  return (
    <input
      type={props.type ?? 'text'}
      className={cn(inputVariants({ variant, size, className }))}
      {...props}
    />
  )
}
