import { cn } from '@/utils/class-name-merge'

export function DataTableHeaderActions({
  className,
  ...props
}: Readonly<React.ComponentProps<'div'>>) {
  return <div className={cn('ml-auto flex gap-2', className)} {...props} />
}
