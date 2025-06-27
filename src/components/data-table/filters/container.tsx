import { cn } from '@/utils/class-name-merge'

export interface DataTableFilterContainerProps
  extends React.ComponentProps<'div'> {
  title: string
}

export function DataTableFilterContainer({
  title,
  className,
  children,
  ...props
}: Readonly<DataTableFilterContainerProps>) {
  return (
    <div className={cn('space-y-1', className)} {...props}>
      <p className='text-xs font-medium'>{title}</p>
      {children}
    </div>
  )
}
