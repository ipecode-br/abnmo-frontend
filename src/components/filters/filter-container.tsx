import { cn } from '@/utils/class-name-merge'

export function FilterContainer({
  className,
  ...props
}: Readonly<React.ComponentProps<'section'>>) {
  return (
    <section
      className={cn(
        'flex flex-wrap gap-4 max-lg:flex-col lg:items-end lg:gap-6',
        className,
      )}
      {...props}
    />
  )
}
