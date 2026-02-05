import { cn } from '@/utils/class-name-merge'

export interface FilterContainerProps extends React.ComponentProps<'div'> {
  title: string
}

export function FilterContainer({
  title,
  className,
  children,
  ...props
}: Readonly<FilterContainerProps>) {
  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      <label className='text-sm font-medium'>{title}</label>
      {children}
    </div>
  )
}
