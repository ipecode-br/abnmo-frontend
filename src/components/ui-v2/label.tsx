import { cn } from '@/utils/class-name-merge'

interface LabelProps extends React.ComponentProps<'label'> {
  preventLabelClick?: boolean
}

export function Label({ className, preventLabelClick, ...props }: LabelProps) {
  const Comp = (preventLabelClick ? 'div' : 'label') as 'label'

  return (
    <Comp
      className={cn(
        'text-foreground-soft flex shrink-0 cursor-default flex-col gap-2 text-base leading-snug',
        className,
      )}
      {...props}
    />
  )
}
