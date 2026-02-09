import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function UserInvitesTableSkeleton() {
  const skeletons = Array.from({ length: 5 }).map((_, index) => index)

  return skeletons.map((skeleton) => (
    <TableRow key={skeleton}>
      <TableCell>
        <Skeleton className='h-5 w-56 rounded-md' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-5 w-36 rounded-md' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-5 w-36 rounded-md' />
      </TableCell>
      <TableCell>
        <Skeleton className='mx-auto size-8 rounded-md' />
      </TableCell>
    </TableRow>
  ))
}
