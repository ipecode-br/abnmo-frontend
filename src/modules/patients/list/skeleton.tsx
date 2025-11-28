import { Skeleton } from '@/components/ui/skeleton'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'

export default function PatientsListTableSkeleton() {
  const skeletons = Array.from({ length: 10 }).map((_, index) => index)

  return (
    <TableBody>
      {skeletons.map((skeleton) => (
        <TableRow key={skeleton}>
          <TableCell className='py-0'>
            <div className='flex w-64 items-center gap-2'>
              <Skeleton className='size-9 rounded-full' />
              <Skeleton className='h-5 w-48 rounded-md' />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className='h-5 w-32 rounded-md' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-5 w-56 rounded-md' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-6 w-18 rounded-md' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-5 w-24 rounded-md' />
          </TableCell>
          <TableCell>
            <Skeleton className='mx-auto size-8 rounded-md' />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
