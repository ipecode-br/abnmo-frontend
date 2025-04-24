import { cva, type VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

const inputVariants = cva(
  'ring-offset-background focus-visible:ring-ring [&_svg]: h-10 w-full shrink-0 rounded-lg border bg-transparent px-3 text-sm shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-border text-foreground placeholder:text-foreground-soft',
        error: 'border-error text-error focus-visible:ring-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    icon?: LucideIcon
  }

export function Input({
  icon,
  className,
  variant,
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
          role='textbox'
          className={cn(inputVariants({ variant, className }), 'pl-10')}
          {...props}
        />
        <Icon
          role='img'
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
      role='textbox'
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  )
}
