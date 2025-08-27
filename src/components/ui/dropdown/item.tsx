'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/class-name-merge'

const triggerItemVariants = cva(
  'focus:bg-primary focus:text-primary-foreground flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:size-4',
  {
    variants: {
      variant: {
        default: 'text-foreground-soft',
        destructive: 'text-error focus:bg-error/10 focus:text-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface DropdownMenuItemProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Item>,
    VariantProps<typeof triggerItemVariants> {}

export function DropdownMenuItem({
  className,
  variant,
  children,
  ...props
}: Readonly<DropdownMenuItemProps>) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(triggerItemVariants({ variant, className }))}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
}
