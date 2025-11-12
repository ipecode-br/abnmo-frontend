import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { type PatientRequirementType } from '@/types/patients'
import { formatDate } from '@/utils/formatters/format-date'

type PatientRequirementCardProps = {
  requirement: PatientRequirementType
}

export function PatientRequirementCard({
  requirement,
}: Readonly<PatientRequirementCardProps>) {
  return (
    <Card className='p-0'>
      <div className='bg-accent aspect-video w-full' />

      <div className='flex flex-col gap-1 p-4'>
        <h3 className='text-foreground text-lg font-medium'>
          {requirement.title}
        </h3>
        <p className='text-foreground-soft text-sm'>
          Solicitado em: {formatDate(requirement.created_at)}
        </p>

        <Button size='sm' className='mt-3 w-full'>
          Preencher agora
        </Button>
      </div>
    </Card>
  )
}
