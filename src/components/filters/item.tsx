import { cn } from '@/utils/class-name-merge'

interface FilterItemProps extends React.ComponentProps<'div'> {
  title: string
}

export function FilterItem({
  title,
  className,
  children,
  ...props
}: Readonly<FilterItemProps>) {
  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      <label className='text-sm font-medium'>{title}</label>
      {children}
    </div>
  )
}
