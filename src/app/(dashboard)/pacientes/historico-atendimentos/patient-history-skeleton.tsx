import { TableBody, TableCell, TableRow } from '@/components/ui/table'

export default function PatientHistorySkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell className='bg-muted h-10 rounded' />
          <TableCell className='bg-muted h-10 rounded' />
          <TableCell className='bg-muted h-10 rounded' />
          <TableCell className='bg-muted h-10 rounded' />
          <TableCell className='bg-muted h-10 rounded' />
        </TableRow>
      ))}
    </TableBody>
  )
}
