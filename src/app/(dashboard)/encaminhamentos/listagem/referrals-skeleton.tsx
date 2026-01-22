import { Skeleton } from '@/components/ui/skeleton'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'

export default function ReferralsSkeleton() {
  const skeletons = Array.from({ length: 10 }).map((_, index) => index)

  return (
    <TableBody>
      {skeletons.map((skeleton) => (
        <TableRow key={skeleton}>
          <TableCell className='py-0'>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-5 w-35 rounded-md' />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className='h-5 w-30 rounded-md' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-5 w-30 rounded-md' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-5 w-30 rounded-md' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-5 w-30 rounded-md' />
          </TableCell>
          <TableCell className='flex justify-center'>
            <Skeleton className='size-5 rounded-md' />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
