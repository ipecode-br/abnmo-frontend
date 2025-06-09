'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cva, type VariantProps } from 'class-variance-authority'
import { type LucideIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

export interface DropdownMenuTriggerProps
  extends Omit<
      React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>,
      'asChild'
    >,
    VariantProps<typeof triggerVariants> {
  icon?: LucideIcon
  asChild?: boolean
}

const triggerVariants = cva(
  'ring-offset-background focus-visible:ring-ring flex h-10 w-full cursor-pointer items-center gap-2 rounded-full border bg-transparent px-3 text-sm shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-4.5',
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

export function DropdownMenuTrigger({
  variant,
  icon: Icon,
  className,
  children,
  asChild,
  ...props
}: Readonly<DropdownMenuTriggerProps>) {
  const iconColors = {
    default: 'text-disabled',
    error: 'text-error',
  }

  return (
    <DropdownMenuPrimitive.Trigger
      asChild={asChild}
      className={cn(triggerVariants({ variant }), className)}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {Icon && <Icon className={cn(iconColors[variant ?? 'default'])} />}
          {children}
        </>
      )}
    </DropdownMenuPrimitive.Trigger>
  )
}
