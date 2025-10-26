import { CircleAlertIcon, CircleCheckIcon, CircleXIcon } from 'lucide-react'

import { Tag } from '@/components/ui/tag'
import { cn } from '@/utils/class-name-merge'

export const STATUS_MAPPING = {
  approved: {
    icon: CircleCheckIcon,
    label: 'Aprovado',
    class: '[&_svg]:text-success',
  },
  rejected: {
    icon: CircleXIcon,
    label: 'Recusado',
    class: '[&_svg]:text-error',
  },
  waiting: {
    icon: CircleAlertIcon,
    label: 'Aprovação pendente',
    class: '[&_svg]:text-warning',
  },
}

export type StatusTagType = keyof typeof STATUS_MAPPING

interface StatusTagProps extends React.ComponentProps<'div'> {
  status: StatusTagType
}

export function DocumentStatusTag({
  status,
  className,
  ...props
}: Readonly<StatusTagProps>) {
  const statusTag = STATUS_MAPPING[status]
  const StatusIcon = statusTag.icon

  return (
    <Tag className={cn(statusTag.class, className)} {...props}>
      <StatusIcon />
      {statusTag.label}
    </Tag>
  )
}
