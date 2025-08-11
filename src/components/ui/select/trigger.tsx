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
  'ring-offset-background focus-visible:ring-ring bg-background flex h-10 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm whitespace-nowrap shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4.5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border-border text-foreground hover:bg-accent data-[placeholder]:text-disabled [&_svg]:text-disabled',
        error: 'border-error text-error focus-visible:ring-error',
      },
      size: {
        default: 'h-10 pr-3 pl-4 [&_svg]:size-5',
        xs: 'h-8 rounded-md px-2.5 text-xs [&_svg]:size-4',
        sm: 'h-9 pr-2 pl-4 [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export function SelectTrigger({
  variant,
  icon: Icon,
  className,
  size,
  children,
  ...props
}: Readonly<SelectTriggerProps>) {
  const iconColors = {
    default: 'text-disabled',
    error: 'text-error',
  }

  return (
    <SelectPrimitive.Trigger
      className={cn(triggerVariants({ variant, size, className }))}
      {...props}
    >
      {Icon && <Icon className={cn(iconColors[variant ?? 'default'])} />}

      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronsUpDownIcon className='text-disabled ml-auto shrink-0' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}
