'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/class-name-merge'

const triggerItemVariants = cva(
  'focus:bg-primary focus:text-primary-foreground flex cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-2 text-sm outline-none [&_svg]:size-4',
  {
    variants: {
      variant: {
        default: 'text-foreground-soft',
        destructive: 'text-red-500 focus:bg-red-500/10 focus:text-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface DropdownMenuItemProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Item>,
    VariantProps<typeof triggerItemVariants> {
  disabled?: boolean
}

export function DropdownMenuItem({
  className,
  disabled,
  variant,
  children,
  ...props
}: Readonly<DropdownMenuItemProps>) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        triggerItemVariants({ variant }),
        className,
        disabled && 'pointer-events-none opacity-50',
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
}
