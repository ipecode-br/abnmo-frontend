import * as PopoverPrimitive from '@radix-ui/react-popover'

import { Button, type ButtonProps } from '../button'

export interface PopoverTriggerProps
  extends Omit<
      React.ComponentProps<typeof PopoverPrimitive.Trigger>,
      'asChild'
    >,
    ButtonProps {}

export function PopoverTrigger({
  variant = 'outline',
  ...props
}: Readonly<PopoverTriggerProps>) {
  return (
    <PopoverPrimitive.Trigger asChild>
      <Button variant={variant} {...props} />
    </PopoverPrimitive.Trigger>
  )
}
