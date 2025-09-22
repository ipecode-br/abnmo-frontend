import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2Icon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

const buttonVariants = cva(
  'ring-offset-background focus-visible:ring-ring inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/80 shadow-xs',
        destructive:
          'bg-error text-primary-foreground hover:bg-error/80 shadow-xs',
        fancy:
          'bg-primary text-primary-foreground hover:bg-primary/80 inset-shadow-md shadow-xs',
        outline:
          'border-border hover:bg-accent text-accent-foreground bg-background border shadow-xs',
        muted: 'bg-background-soft text-accent-foreground hover:bg-accent',
        ghost: 'text-accent-foreground hover:bg-accent bg-transparent',
      },
      size: {
        default: 'h-10 min-h-10 px-4 [&_svg]:size-5',
        xs: 'h-8 min-h-8 rounded-md px-2.5 text-xs [&_svg]:size-4',
        sm: 'h-9 min-h-9 px-4 [&_svg]:size-4',
        lg: 'h-11 min-h-11 rounded-xl px-3 text-base [&_svg]:size-5',
        icon: 'min-size-10 size-10 [&_svg]:size-5',
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
  loading?: boolean
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  loading,
  disabled,
  asChild = false,
  children,
  ...props
}: Readonly<ButtonProps>) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? <Loader2Icon className='animate-spin' /> : children}
    </Comp>
  )
}

export { Button, buttonVariants }
