import { DOCUMENT_TYPE, DocumentType } from '@/constants/documents'
import {
  getPendingDays,
  getPendingStatusColor,
} from '@/helpers/pending-helpers'
import { cn } from '@/utils/class-name-merge'

import { Tag } from './tag'

const PENDING_STATUS_CLASSES: Record<
  ReturnType<typeof getPendingStatusColor>,
  string
> = {
  error: 'border-none bg-error/15 text-error',
  warning: 'border-none bg-warning/15 text-warning',
  default: 'border-none bg-foreground-soft/15 text-foreground-soft',
}

interface DocumentTagProps extends React.ComponentProps<'div'> {
  documentType: DocumentType
  createdAt: Date | string
}

export function DocumentTag({
  documentType,
  createdAt,
  className,
  ...props
}: Readonly<DocumentTagProps>) {
  const daysPending = getPendingDays(createdAt)
  const status = getPendingStatusColor(daysPending)
  const statusClass = PENDING_STATUS_CLASSES[status]

  return (
    <Tag className={cn(statusClass, className)} {...props}>
      {DOCUMENT_TYPE[documentType]}
    </Tag>
  )
}
