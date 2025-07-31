import { cn } from '@/utils/class-name-merge'

interface DataTableHeaderActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function DataTableHeaderActions({
  className,
  children,
  ...props
}: Readonly<DataTableHeaderActionsProps>) {
  return (
    <div className={cn('ml-auto flex gap-2', className)} {...props}>
      {children}
    </div>
  )
}
