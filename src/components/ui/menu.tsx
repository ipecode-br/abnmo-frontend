import {
  Menu as BaseMenu,
  type MenuItemProps,
  type MenuPositionerProps,
  type MenuRootProps,
  type MenuTriggerProps as BaseMenuTriggerProps,
} from '@base-ui-components/react'

import { cn } from '@/utils/class-name-merge'

import { type ButtonProps, buttonVariants } from './button'

export function Menu(props: Readonly<MenuRootProps>) {
  return <BaseMenu.Root {...props} />
}

interface MenuTriggerProps extends BaseMenuTriggerProps {
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}

export function MenuTrigger({
  variant = 'outline',
  size,
  className,
  ...props
}: Readonly<MenuTriggerProps>) {
  return (
    <BaseMenu.Trigger
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export function MenuContent({
  align = 'start',
  sideOffset = 4,
  children,
  className,
  ...props
}: Readonly<MenuPositionerProps>) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        align={align}
        sideOffset={sideOffset}
        className={cn('relative z-50 outline-none', className)}
        {...props}
      >
        <BaseMenu.Popup className='bg-popover text-foreground border-border origin-[var(--transform-origin)] overflow-hidden rounded-xl border p-2 shadow-md transition-[translate,opacity] outline-none data-[ending-style]:-translate-y-2 data-[ending-style]:opacity-0 data-[starting-style]:-translate-y-2 data-[starting-style]:opacity-0'>
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

export function MenuItem({ className, ...props }: Readonly<MenuItemProps>) {
  return (
    <BaseMenu.Item
      className={cn(
        'data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground flex cursor-pointer items-center gap-2 rounded-md py-2 pr-6 pl-3 leading-tight transition-colors outline-none [&_svg]:size-5',
        className,
      )}
      {...props}
    />
  )
}
