import React from 'react'

import { cn } from '@/utils/class-name-merge'

export function SectionHeader({
  className,
  ...props
}: Readonly<React.ComponentProps<'header'>>) {
  return (
    <header
      className={cn('flex flex-wrap items-center gap-4', className)}
      {...props}
    />
  )
}

interface SectionHeaderTitleProps {
  title: string
  icon: React.ReactNode
  total?: number
  className?: string
}

export function SectionHeaderTitle({
  title,
  icon,
  total = 0,
  className,
}: Readonly<SectionHeaderTitleProps>) {
  // Uncomment it when changing icon color is needed
  // const iconElement = React.isValidElement<{ className?: string }>(icon)
  //   ? React.cloneElement(icon, {
  //       className: cn('text-primary', icon.props.className),
  //     })
  //   : icon

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className='bg-background border-border [&_svg]:text-primary flex size-10 items-center justify-center rounded-lg border shadow shadow-black/5'>
        {icon}
      </div>
      <div className='flex items-center gap-2'>
        {total > 0 && <span className='text-2xl font-semibold'>{total}</span>}
        <p className='text-foreground-soft text-lg'>{title}</p>
      </div>
    </div>
  )
}

interface SectionHeaderIconProps {
  icon: React.ReactNode
  className?: string
}

export function SectionHeaderIcon({
  icon,
  className,
}: Readonly<SectionHeaderIconProps>) {
  return (
    <div
      className={cn(
        'bg-background border-border flex size-10 items-center justify-center rounded-lg border shadow shadow-black/5',
        className,
      )}
    >
      {icon}
    </div>
  )
}

export function SectionHeaderActions({
  className,
  ...props
}: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div className={cn('ml-auto flex flex-wrap gap-2', className)} {...props} />
  )
}
