import { cn } from '@/utils/class-name-merge'

interface LabelWrapperProps extends React.ComponentProps<'label'> {
  preventLabelClick?: boolean
}

export function LabelWrapper({
  className,
  preventLabelClick,
  ...props
}: LabelWrapperProps) {
  const Comp = (preventLabelClick ? 'div' : 'label') as 'label'

  return (
    <Comp
      className={cn('flex shrink-0 flex-col gap-1', className)}
      {...props}
    />
  )
}

interface LabelProps extends React.ComponentProps<'label'> {
  isRequired?: boolean
  as?: React.ElementType
}
export function Label({
  children,
  className,
  isRequired,
  as = 'span',
  ...props
}: LabelProps) {
  const Comp = as

  return (
    <Comp
      className={cn(
        'cursor-default text-base leading-snug font-medium',
        className,
      )}
      {...props}
    >
      {children}
      {isRequired && <span className='pl-0.5 text-red-600'>*</span>}
    </Comp>
  )
}
