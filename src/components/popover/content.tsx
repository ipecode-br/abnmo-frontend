import * as PopoverPrimitive from '@radix-ui/react-popover'

export function PopoverContent({
  children,
  ...props
}: Readonly<PopoverPrimitive.PopoverContentProps>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content {...props}>{children}</PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}
