import { cn } from '@/utils/class-name-merge'

export function FormField({
  className,
  ...props
}: Readonly<React.FieldsetHTMLAttributes<HTMLFieldSetElement>>) {
  return (
    <fieldset
      className={cn('flex w-full flex-col gap-3', className)}
      {...props}
    />
  )
}
