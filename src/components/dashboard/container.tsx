import { cn } from '@/utils/class-name-merge'

export function DashboardContainer({
  className,
  ...props
}: Readonly<React.ComponentProps<'main'>>) {
  return (
    <main
      className={cn('bg-background-soft flex-1 p-8', className)}
      {...props}
    />
  )
}
