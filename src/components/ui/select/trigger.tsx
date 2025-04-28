'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronsUpDownIcon, type LucideIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

export interface SelectTriggerProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof triggerVariants> {
  icon?: LucideIcon
}

const triggerVariants = cva(
  'ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center gap-2 rounded-lg border bg-transparent px-3 text-sm shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-4.5',
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

export function SelectTrigger({
  variant,
  icon: Icon,
  className,
  children,
  ...props
}: Readonly<SelectTriggerProps>) {
  const iconColors = {
    default: 'text-disabled',
    error: 'text-error',
  }

  return (
    <SelectPrimitive.Trigger
      className={cn(triggerVariants({ variant, className }))}
      {...props}
    >
      {Icon && <Icon className={cn(iconColors[variant ?? 'default'])} />}

      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronsUpDownIcon className='text-disabled ml-auto size-5 shrink-0' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}
