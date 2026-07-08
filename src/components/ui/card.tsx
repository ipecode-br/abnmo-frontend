import { cva, type VariantProps } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

const cardVariants = cva('overflow-hidden rounded-2xl border p-4', {
  variants: {
    variant: {
      default: 'bg-card border-border shadow-xs',
      info: 'bg-accent/75 border-border',
      warning: 'bg-warning/5 border-warning/25',
      error: 'bg-error/5 border-error/25',
      success: 'bg-success/5 border-success/25',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface CardProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof cardVariants> {}

export function Card({ variant, className, ...props }: Readonly<CardProps>) {
  return <div className={cn(cardVariants({ variant, className }))} {...props} />
}

interface CardHeaderProps extends React.ComponentProps<'header'> {
  title: string
  icon?: LucideIcon
}

export function CardHeader({
  title,
  icon: Icon,
  className,
  ...props
}: Readonly<CardHeaderProps>) {
  return (
    <header
      className={cn(
        'border-border [&_svg]:text-primary mb-6 flex items-center gap-2 border-b pb-1 [&_svg]:size-6',
        className,
      )}
      {...props}
    >
      {Icon && <Icon strokeWidth={1.5} />}
      <h4 className='text-xl font-medium'>{title}</h4>
    </header>
  )
}
