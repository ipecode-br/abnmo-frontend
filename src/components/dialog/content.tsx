import { cn } from '@/utils/class-name-merge'

export function DialogContent({
  className,
  ...props
}: Readonly<React.ComponentProps<'div'>>) {
  return <div className={cn('p-5', className)} {...props} />
}
