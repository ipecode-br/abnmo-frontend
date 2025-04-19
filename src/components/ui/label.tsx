import { cn } from '@/utils/class-name-merge'

export function Label({
  htmlFor,
  className,
  children,
  ...props
}: Readonly<React.LabelHTMLAttributes<HTMLLabelElement>>) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('text-sm font-medium peer-disabled:opacity-50', className)}
      {...props}
    >
      {children}
    </label>
  )
}
