import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function UsersTableSkeleton() {
  const skeletons = Array.from({ length: 10 }).map((_, index) => index)

  return skeletons.map((skeleton) => (
    <TableRow key={skeleton}>
      <TableCell>
        <div className='flex w-64 items-center gap-2'>
          <Skeleton className='size-9 rounded-full' />
          <Skeleton className='h-5 w-44 rounded-md' />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className='h-5 w-24 rounded-md' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-6 w-32 rounded-md' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-6 w-36 rounded-md' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-5 w-28 rounded-md' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-6 w-16 rounded-md' />
      </TableCell>
      <TableCell>
        <Skeleton className='mx-auto size-9' />
      </TableCell>
    </TableRow>
  ))
}
