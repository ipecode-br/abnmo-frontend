import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/class-name-merge'

export const textareaVariants = cva(
  'ring-offset-background focus-visible:ring-ring bg-background w-full shrink-0 resize-y rounded-lg border px-3 py-2 shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none read-only:focus-visible:ring-0 read-only:focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-border text-foreground placeholder:text-disabled',
        error: 'border-error focus-visible:ring-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'size'> &
  VariantProps<typeof textareaVariants>

export function Textarea({
  className,
  variant,
  ...props
}: Readonly<TextareaProps>) {
  return (
    <textarea
      className={cn(textareaVariants({ variant, className }))}
      {...props}
    />
  )
}
