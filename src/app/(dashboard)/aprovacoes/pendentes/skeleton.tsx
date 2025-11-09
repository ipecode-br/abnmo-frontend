import { Card } from '../../../../components/ui/card'
import { Skeleton } from '../../../../components/ui/skeleton'

export function PendingRequirementsSkeleton() {
  return (
    <div className='pt-4'>
      <Card className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className='space-y-4 p-4'>
            <Skeleton className='h-5 w-3/4 rounded' />
            <Skeleton className='h-4 w-1/2 rounded' />
            <Skeleton className='h-4 w-1/2 rounded' />
            <div className='flex items-center gap-2 pt-2'>
              <Skeleton className='size-4 rounded-full' />
              <Skeleton className='h-4 w-1/3 rounded' />
            </div>
          </Card>
        ))}
      </Card>
    </div>
  )
}
