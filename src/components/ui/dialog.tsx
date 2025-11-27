import { Dialog as BaseDialog } from '@base-ui-components/react/dialog'
import type { VariantProps } from 'class-variance-authority'
import { type LucideIcon, XIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

import { buttonVariants } from './button'

interface DialogProps extends React.ComponentProps<typeof BaseDialog.Root> {
  children: React.ReactNode
}
export function Dialog({ children, ...props }: Readonly<DialogProps>) {
  return <BaseDialog.Root {...props}>{children}</BaseDialog.Root>
}

type DialogTriggerProps = React.ComponentProps<typeof BaseDialog.Trigger> &
  VariantProps<typeof buttonVariants>
export function DialogTrigger({
  variant,
  size,
  className,
  ...props
}: Readonly<DialogTriggerProps>) {
  return (
    <BaseDialog.Trigger
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export function DialogContainer({
  className,
  children,
  ...props
}: Readonly<React.ComponentProps<typeof BaseDialog.Popup>>) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className='fixed inset-0 z-20 min-h-dvh bg-black/60 backdrop-blur transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute' />
      <BaseDialog.Popup
        className={cn(
          'bg-background divide-border fixed top-1/2 left-1/2 z-30 flex max-h-[90vh] w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col divide-y rounded-2xl shadow-lg',
          'transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
          className,
        )}
        {...props}
      >
        <BaseDialog.Close
          title='Fechar'
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon_sm' }),
            'absolute top-2 right-2 border-none',
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
export function DialogHeader({
  icon,
  className,
  ...props
}: Readonly<DialogHeaderProps>) {
  return (
    <header className='flex items-center gap-4 p-5'>
      {icon && icon}
      <div className={cn('flex flex-col gap-0.5', className)} {...props} />
    </header>
  )
}

interface DialogIconProps extends React.ComponentProps<'div'> {
  icon: LucideIcon
}
export function DialogIcon({
  icon: Icon,
  className,
}: Readonly<DialogIconProps>) {
  return (
    <Icon
      className={cn(
        'border-border text-foreground-soft size-12 rounded-full border p-2.5',
        className,
      )}
    />
  )
}

export function DialogTitle({
  className,
  ...props
}: Readonly<React.ComponentProps<'h2'>>) {
  return (
    <BaseDialog.Title
      className={cn('text-xl font-medium', className)}
      {...props}
    />
  )
}

export function DialogDescription({
  className,
  ...props
}: Readonly<React.ComponentProps<'p'>>) {
  return (
    <BaseDialog.Title
      className={cn('text-foreground-soft', className)}
      {...props}
    />
  )
}

export function DialogContent({
  className,
  ...props
}: Readonly<React.ComponentProps<'div'>>) {
  return (
    <footer
      className={cn('flex-1 overflow-y-auto p-5', className)}
      {...props}
    />
  )
}

export function DialogFooter({
  className,
  ...props
}: Readonly<React.ComponentProps<'footer'>>) {
  return (
    <footer
      className={cn('flex flex-col gap-2 p-5 md:flex-row-reverse', className)}
      {...props}
    />
  )
}

type DialogCloseProps = React.ComponentProps<typeof BaseDialog.Close> &
  VariantProps<typeof buttonVariants>
export function DialogClose({
  variant = 'outline',
  size,
  className,
  ...props
}: Readonly<DialogCloseProps>) {
  return (
    <BaseDialog.Close
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
