import { cn } from '@/utils/class-name-merge'

export function DataTableHeader({
  className,
  ...props
}: Readonly<React.ComponentProps<'section'>>) {
  return (
    <section className={cn('flex items-center gap-2', className)} {...props} />
  )
}
