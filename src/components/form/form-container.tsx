import { cn } from '@/utils/class-name-merge'

export function FormContainer({
  className,
  ...props
}: Readonly<React.FormHTMLAttributes<HTMLFormElement>>) {
  return (
    <form className={cn('flex w-full flex-col gap-6', className)} {...props} />
  )
}
