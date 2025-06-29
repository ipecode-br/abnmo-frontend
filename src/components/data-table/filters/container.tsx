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
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      <label className='text-xs font-medium'>{title}</label>
      {children}
    </div>
  )
}
