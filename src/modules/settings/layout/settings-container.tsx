import { cn } from '@/utils/class-name-merge'

export function SettingsContainer({
  className,
  ...props
}: Readonly<React.ComponentProps<'main'>>) {
  return <main className={cn('flex-1 p-8', className)} {...props} />
}
