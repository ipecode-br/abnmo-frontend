'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type { VariantProps } from 'class-variance-authority'
import { ChevronsUpDownIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

import { buttonVariants } from '../button'

export interface DropdownMenuTriggerProps
  extends Omit<
      React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>,
      'asChild'
    >,
    VariantProps<typeof buttonVariants> {
  indicator?: boolean
}

export function DropdownMenuTrigger({
  variant = 'outline',
  size,
  indicator,
  className,
  children,
  ...props
}: Readonly<DropdownMenuTriggerProps>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot='dropdown-menu-trigger'
      className={cn(
        buttonVariants({ variant, size }),
        indicator && 'gap-3',
        '[&_svg]:size-4',
        className,
      )}
      {...props}
    >
      {children}
      {indicator && <ChevronsUpDownIcon className='opacity-50' />}
    </DropdownMenuPrimitive.Trigger>
  )
}
