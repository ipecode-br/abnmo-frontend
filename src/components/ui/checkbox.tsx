import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

export interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  size?: 'sm' | 'md'
}

export function Checkbox({ size = 'sm', ...props }: Readonly<CheckboxProps>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'peer border-border focus-visible:ring-ring data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=checked]:bg-primary data-[state=checked]:inset-shadow-md shrink-0 rounded border-2 shadow-xs focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' && 'size-4.5',
        size === 'md' && 'size-5',
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center')}
      >
        <CheckIcon
          className={cn(size === 'sm' && 'size-3', size === 'md' && 'size-4')}
          strokeWidth={3}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
