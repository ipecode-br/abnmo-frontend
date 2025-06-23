import { cn } from '@/utils/class-name-merge'

export function Tag({
  className,
  ...props
}: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div
      className={cn(
        'border-border text-foreground-soft bg-background flex w-fit items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium [&_svg]:size-3.5',
        className,
      )}
      {...props}
    />
  )
}
