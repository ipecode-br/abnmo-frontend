import { cn } from '@/utils/class-name-merge'

export function DataTableHeader({
  className,
  ...props
}: Readonly<React.ComponentProps<'section'>>) {
  return (
    <section
      className={cn('flex flex-wrap items-center gap-4', className)}
      {...props}
    />
  )
}
