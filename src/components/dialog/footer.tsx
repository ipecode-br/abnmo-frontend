import { cn } from '@/utils/class-name-merge'

export function DialogFooter({
  className,
  ...props
}: Readonly<React.ComponentProps<'footer'>>) {
  return (
    <footer
      className={cn(
        'border-border flex flex-col gap-2 border-t p-5 md:flex-row-reverse',

        className,
      )}
      {...props}
    />
  )
}
