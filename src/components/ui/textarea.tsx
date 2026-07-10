import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/class-name-merge'

export const textareaVariants = cva(
  'focus:outline-ring text-foreground border-border bg-background scrollbar-thumb-foreground-soft/40 scrollbar-track-transparent scrollbar-thin placeholder:text-disabled w-full resize-y rounded-lg border px-4 py-2 text-base read-only:outline-none focus:outline-2 focus:-outline-offset-1 disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-border hover:border-ring',
        error: 'border-error focus:outline-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface TextareaProps
  extends React.ComponentProps<'textarea'>,
    VariantProps<typeof textareaVariants> {
  showCounter?: boolean
}

export function Textarea({
  className,
  variant,
  showCounter,
  children,
  ...props
}: Readonly<TextareaProps>) {
  return (
    <div className={cn('leading-0', className)}>
      <textarea className={textareaVariants({ variant })} {...props}>
        {children}
      </textarea>

      {showCounter && (
        <div className='text-foreground-soft pointer-events-none mt-0.5 text-right text-sm tracking-wide'>
          <span>{props.value?.toLocaleString().length}</span>
          {props.maxLength && (
            <span className='text-disabled'>/{props.maxLength}</span>
          )}
        </div>
      )}
    </div>
  )
}
