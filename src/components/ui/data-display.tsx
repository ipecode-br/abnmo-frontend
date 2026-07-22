import { cn } from '@/utils/class-name-merge'

export function DataDisplay({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'divide-border divide-y',
        '[&>*]:py-4 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0',
        className,
      )}
      {...props}
    />
  )
}

export function DataRow({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-wrap gap-x-12 gap-y-4', className)}
      {...props}
    />
  )
}

interface DataFieldProps extends React.ComponentProps<'div'> {
  label: string
}

export function DataField({ label, children, ...props }: DataFieldProps) {
  if (children === null || children === undefined) return null

  return (
    <div {...props}>
      <span className='text-foreground-soft'>{label}</span>
      <div className='text-lg font-medium'>{children}</div>
    </div>
  )
}

interface DataListProps extends React.ComponentProps<'ul'> {
  values?: string[] | null
}

export function DataList({ values, className, ...props }: DataListProps) {
  if (!values || values.length === 0) return null

  return (
    <ul className={cn('text-lg font-medium', className)} {...props}>
      {values.map((value, index) => (
        <li
          key={index}
          className="before:text-foreground-soft/50 relative pl-3.5 font-medium before:absolute before:left-0 before:font-light before:content-['•']"
        >
          {value}
        </li>
      ))}
    </ul>
  )
}
