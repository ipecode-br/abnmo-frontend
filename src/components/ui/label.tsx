import { cn } from '@/utils/class-name-merge'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  readOnly?: boolean
}

export function Label({
  readOnly,
  className,
  children,
  ...props
}: Readonly<LabelProps>) {
  return (
    <label
      aria-readonly={readOnly}
      className={cn(
        'font-medium peer-disabled:opacity-50 aria-readonly:pointer-events-none',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}
