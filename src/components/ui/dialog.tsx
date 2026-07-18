import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { type LucideIcon, XIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

import { buttonVariants } from './button'

interface DialogProps extends React.ComponentProps<typeof BaseDialog.Root> {
  children: React.ReactNode
}
export function Dialog({ children, ...props }: DialogProps) {
  return <BaseDialog.Root {...props}>{children}</BaseDialog.Root>
}

interface DialogTriggerProps
  extends React.ComponentProps<typeof BaseDialog.Trigger>,
    VariantProps<typeof buttonVariants> {}
export function DialogTrigger({
  variant,
  size,
  className,
  ...props
}: DialogTriggerProps) {
  return (
    <BaseDialog.Trigger
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}

export function DialogContainer({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className='fixed inset-0 z-20 min-h-dvh bg-black/60 backdrop-blur transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute' />
      <BaseDialog.Popup
        className={cn(
          'bg-background divide-border fixed top-1/2 left-1/2 z-30 flex max-h-[90vh] w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col divide-y overflow-hidden rounded-2xl shadow-lg',
          'transition-all duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0',
          className,
        )}
        {...props}
      >
        <BaseDialog.Close
          aria-label='Fechar'
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'text-foreground-soft absolute top-2 right-2 size-10 border-none [&_svg]:size-6',
          )}
        >
          <XIcon />
        </BaseDialog.Close>
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

interface DialogHeaderProps extends React.ComponentProps<'div'> {
  icon?: React.ReactNode
}
export function DialogHeader({ icon, ...props }: Readonly<DialogHeaderProps>) {
  return (
    <header className='flex items-center gap-4 py-4 pr-12 pl-5'>
      {icon && icon}
      <div {...props} />
    </header>
  )
}

interface DialogIconProps extends React.ComponentProps<'div'> {
  icon: LucideIcon
}
const dialogIconVariants = cva(
  'border-border size-12 overflow-visible rounded-full p-2.5',
  {
    variants: {
      variant: {
        default: 'text-foreground-soft border',
        destructive: 'text-error bg-error/10',
        success: 'text-success bg-success/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface DialogIconComponentProps
  extends DialogIconProps,
    VariantProps<typeof dialogIconVariants> {}
export function DialogIcon({
  icon: Icon,
  variant,
  className,
}: Readonly<DialogIconComponentProps>) {
  return <Icon className={cn(dialogIconVariants({ variant, className }))} />
}

export function DialogTitle({
  className,
  ...props
}: React.ComponentProps<'h2'>) {
  return (
    <BaseDialog.Title
      className={cn('text-xl leading-tight font-medium', className)}
      {...props}
    />
  )
}

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <BaseDialog.Description
      className={cn('text-foreground-soft', className)}
      {...props}
    />
  )
}

export function DialogContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col gap-2 overflow-y-auto p-5',
        className,
      )}
      {...props}
    />
  )
}

interface DialogDetailFieldProps extends React.ComponentProps<'div'> {
  label: string
  value?: string | number
}
export function DialogDetailField({
  label,
  className,
  children,
  ...props
}: Readonly<DialogDetailFieldProps>) {
  const isChildrenString = typeof children === 'string'

  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      <p className='text-foreground-soft font-medium'>{label}</p>
      {isChildrenString ? <p className='text-lg'>{children}</p> : children}
    </div>
  )
}

export function DialogFooter({
  className,
  ...props
}: React.ComponentProps<'footer'>) {
  return (
    <footer
      className={cn('flex flex-col gap-2 p-5 md:flex-row-reverse', className)}
      {...props}
    />
  )
}

interface DialogCloseProps
  extends React.ComponentProps<typeof BaseDialog.Close>,
    VariantProps<typeof buttonVariants> {}
export function DialogClose({
  variant = 'outline',
  size,
  className,
  ...props
}: DialogCloseProps) {
  return (
    <BaseDialog.Close
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}
