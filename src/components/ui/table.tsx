import { cn } from '@/utils/class-name-merge'

export function Table({
  className,
  children,
  ...props
}: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div
      className={cn('w-full overflow-x-auto text-left text-sm', className)}
      {...props}
    >
      <table className='w-full border-separate border-spacing-y-0'>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({
  className,
  ...props
}: Readonly<React.ComponentProps<'thead'>>) {
  return <thead className={cn('pointer-events-none', className)} {...props} />
}

export function TableHead({
  className,
  ...props
}: Readonly<React.ComponentProps<'th'>>) {
  return (
    <th
      className={cn(
        'text-foreground-soft border-border bg-background-soft/50 border-y px-4 py-3 font-normal whitespace-nowrap first-of-type:rounded-l-lg first-of-type:border-l last-of-type:rounded-r-lg last-of-type:border-r',
        className,
      )}
      {...props}
    />
  )
}

export function TableBody(props: Readonly<React.ComponentProps<'tbody'>>) {
  return <tbody {...props} />
}

export function TableRow({
  className,
  ...props
}: Readonly<React.ComponentProps<'tr'>>) {
  return <tr className={cn('hover:bg-background-soft', className)} {...props} />
}

export function TableCell({
  className,
  isLastRow,
  ...props
}: Readonly<React.ComponentProps<'td'> & { isLastRow?: boolean }>) {
  return (
    <td
      className={cn(
        'border-border border-b px-4 py-3 whitespace-nowrap',
        isLastRow && 'border-none',
        className,
      )}
      {...props}
    />
  )
}
