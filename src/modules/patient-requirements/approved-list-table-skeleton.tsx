import { Skeleton } from '@/components/ui/skeleton'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'

export default function ApprovedPatientRequirementsListTableSkeleton() {
  const skeletons = Array.from({ length: 10 }).map((_, index) => index)

  return (
    <TableBody>
      {skeletons.map((skeleton) => (
        <TableRow key={skeleton}>
          <TableCell className='flex items-center gap-2'>
            <Skeleton className='size-9 rounded-full' />
            <Skeleton className='h-5 w-44 rounded-md' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-5 w-20 rounded-md' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-5 w-24 rounded-md' />
          </TableCell>
          <TableCell className='text-center'>
            <Skeleton className='mx-auto size-8 rounded-lg' />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
