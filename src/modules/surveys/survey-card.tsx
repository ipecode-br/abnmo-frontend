import { cn } from '@/utils/class-name-merge'

export function SurveyCardContent({
  className,
  ...props
}: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div
      className={cn(
        'divide-border divide-y',
        '[&>*]:py-4 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0',
        className,
      )}
      {...props}
    />
  )
}

export function SurveyCardRow({
  className,
  ...props
}: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div
      className={cn('flex flex-wrap gap-x-12 gap-y-4', className)}
      {...props}
    />
  )
}

interface SurveyCardDetailProps extends React.ComponentProps<'div'> {
  label: string
  value?: string | number | null
}

export function SurveyCardItem({
  label,
  value,
  className,
  ...props
}: Readonly<SurveyCardDetailProps>) {
  if (value === null || value === undefined) return null

  return (
    <div
      className={cn('flex flex-col gap-1 leading-tight', className)}
      {...props}
    >
      <span className='text-foreground-soft text-sm'>{label}</span>
      <p className='font-medium'>{value}</p>
    </div>
  )
}

interface SurveyCardDetailProps extends React.ComponentProps<'div'> {
  label: string
  values?: string[] | null
}

export function SurveyCardItems({
  label,
  values,
  className,
  ...props
}: Readonly<SurveyCardDetailProps>) {
  if (!values || values.length === 0) return null

  return (
    <div
      className={cn('flex flex-col gap-1 leading-tight', className)}
      {...props}
    >
      <span className='text-foreground-soft text-sm'>{label}</span>

      <ul className='flex flex-col gap-1'>
        {values.map((value, index) => (
          <li
            key={index}
            className="before:text-foreground-soft/50 relative pl-3 font-medium before:absolute before:left-0 before:mr-0 before:text-sm before:leading-snug before:content-['•']"
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
}
