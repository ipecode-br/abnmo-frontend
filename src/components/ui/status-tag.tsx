import {
  CircleCheckIcon,
  CircleMinusIcon,
  CircleXIcon,
} from '@/components/ui/icons'
import { cn } from '@/utils/class-name-merge'

import { Tag } from './tag'

export const STATUS_MAPPING = {
  active: {
    icon: CircleCheckIcon,
    label: 'Ativo',
    class: '[&_svg]:text-success',
  },
  inactive: {
    icon: CircleXIcon,
    label: 'Inativo',
    class: '[&_svg]:text-error',
  },
  pending: {
    icon: CircleMinusIcon,
    label: 'Pendente',
    class: '[&_svg]:text-disabled',
  },
}

export type StatusTagType = keyof typeof STATUS_MAPPING

interface StatusTagProps extends React.ComponentProps<'div'> {
  status: StatusTagType
}

export function StatusTag({
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
