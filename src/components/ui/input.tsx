import { cva, type VariantProps } from 'class-variance-authority'

export const inputVariants = cva(
  'peer text-foreground bg-background placeholder:text-disabled w-full rounded-lg border px-3 text-base read-only:outline-none focus:outline-2 focus:-outline-offset-1 disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-border focus:outline-ring hover:border-ring',
        error: 'border-error focus:outline-error',
      },
      size: {
        default: 'h-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {}

export function Input({ className, variant, size, ...props }: InputProps) {
  return (
    <input
      type={props.type ?? 'text'}
      className={inputVariants({ variant, size, className })}
      {...props}
    />
  )
}
