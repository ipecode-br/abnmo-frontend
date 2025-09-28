'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronsUpDownIcon, Loader2Icon, type LucideIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

export interface SelectTriggerProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof triggerVariants> {
  readOnly?: boolean
  icon?: LucideIcon
  loading?: boolean
}

const triggerVariants = cva(
  'ring-offset-background focus-visible:ring-ring bg-background disabled:bg-background flex h-10 cursor-pointer items-center gap-2 rounded-lg border text-sm whitespace-nowrap shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[readonly=true]:pointer-events-none [&_svg]:size-4.5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border-border text-foreground hover:bg-accent data-[placeholder]:text-disabled [&_svg]:text-disabled',
        error: 'border-error text-error focus-visible:ring-error',
      },
      size: {
        default: 'h-10 pr-2 pl-3 [&_svg]:size-4.5',
        xs: 'h-8 rounded-md pr-1.5 pl-2 text-xs [&_svg]:size-3.5',
        sm: 'h-9 pr-2 pl-3 [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export function SelectTrigger({
  readOnly,
  variant,
  icon: Icon,
  className,
  size,
  loading,
  disabled,
  children,
  ...props
}: Readonly<SelectTriggerProps>) {
  const iconColors = {
    default: 'text-disabled',
    error: 'text-error',
  }

  const disabledTrigger = disabled || loading
  const IndicatorIcon = loading ? Loader2Icon : ChevronsUpDownIcon

  return (
    <SelectPrimitive.Trigger
      data-readonly={readOnly}
      className={cn(triggerVariants({ variant, size, className }))}
      disabled={disabledTrigger}
      {...props}
    >
      {Icon && <Icon className={cn(iconColors[variant ?? 'default'])} />}

      {children}

      <SelectPrimitive.Icon asChild>
        <IndicatorIcon
          className={cn(
            'text-disabled ml-auto shrink-0',
            loading && 'animate-spin',
          )}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}
