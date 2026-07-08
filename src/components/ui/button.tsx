import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2Icon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

const buttonVariants = cva(
  'outline-ring inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-lg font-medium whitespace-nowrap outline-offset-4 transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/80 shadow-md',
        outline:
          'bg-background border-border text-foreground hover:bg-accent border',
        destructive:
          'bg-error text-primary-foreground hover:bg-error/80 shadow-md',
        success:
          'bg-success text-primary-foreground hover:bg-success/80 shadow-xs',
        muted: 'bg-background-soft text-accent-foreground hover:bg-border',
        ghost: 'text-foreground hover:bg-accent bg-transparent',
        error:
          'border-error focus-visible:ring-error bg-background hover:bg-accent outline-error border',
      },
      size: {
        default: 'h-10 px-4 text-base [&_svg]:size-5',
        sm: 'h-9 px-4 [&_svg]:size-4',
        lg: 'h-12 rounded-xl px-6 text-lg [&_svg]:size-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  readOnly?: boolean
  loading?: boolean
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  loading,
  disabled,
  readOnly,
  asChild = false,
  children,
  ...props
}: Readonly<ButtonProps>) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      aria-readonly={readOnly}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? <Loader2Icon className='animate-spin' /> : children}
    </Comp>
  )
}

export { Button, buttonVariants }
