import {
  Popover as BasePopover,
  PopoverPositionerProps,
  PopoverRootProps,
  PopoverTriggerProps as BasePopoverTriggerProps,
} from '@base-ui/react/popover'
import { VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/class-name-merge'

import { buttonVariants } from './button'

export function Popover(props: PopoverRootProps) {
  return <BasePopover.Root {...props} />
}

interface PopoverTriggerProps
  extends BasePopoverTriggerProps,
    VariantProps<typeof buttonVariants> {}

export function PopoverTrigger({
  className,
  size,
  variant = 'outline',
  ...props
}: PopoverTriggerProps) {
  return (
    <BasePopover.Trigger
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export function PopoverContainer({
  align = 'start',
  sideOffset = 8,
  className,
  children,
  ...props
}: PopoverPositionerProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        sideOffset={sideOffset}
        className='z-50'
        align={align}
        {...props}
      >
        <BasePopover.Popup
          className={cn(
            'outline-border bg-popover z-50 origin-(--transform-origin) rounded-xl p-4 shadow-lg outline-1 transition-[transform,translate,opacity]',
            'data-starting-style:-translate-y-2 data-starting-style:opacity-0',
            'data-ending-style:-translate-y-2 data-ending-style:opacity-0',
            className,
          )}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}
