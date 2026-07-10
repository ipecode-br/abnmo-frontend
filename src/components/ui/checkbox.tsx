import {
  Checkbox as UICheckbox,
  CheckboxRootProps,
} from '@base-ui/react/checkbox'
import { cva, type VariantProps } from 'class-variance-authority'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

export const checkboxVariants = cva(
  'bg-background border-border data-checked:bg-primary data-checked:border-primary text-background outline-primary group-hover:border-ring flex shrink-0 items-center justify-center rounded-md border-2 transition-colors',
  {
    variants: {
      variant: {
        default: 'border-border',
        error: 'border-error focus:outline-error',
      },
      size: {
        default: 'size-5.5 [&_svg]:size-4.5',
        lg: 'size-7 [&_svg]:size-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface CheckboxProps
  extends CheckboxRootProps,
    VariantProps<typeof checkboxVariants> {
  label?: string
}

export function Checkbox({
  label,
  className,
  variant,
  size,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={cn(
        'text-foreground group flex cursor-pointer items-center gap-2 text-base',
        props.disabled ? 'opacity-50' : '',
        className,
      )}
    >
      <UICheckbox.Root
        className={cn(checkboxVariants({ variant, size }))}
        {...props}
      >
        <UICheckbox.Indicator className='flex data-unchecked:hidden'>
          <CheckIcon />
        </UICheckbox.Indicator>
      </UICheckbox.Root>
      {label && <span>{label}</span>}
    </label>
  )
}
