import { Edit, MoreVertical, Share2, Slash } from 'lucide-react'

import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'

export function PatientsListTableActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        variant='ghost'
        size='icon'
        indicator={false}
        className='focus:ring-primary rounded-md p-2 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:outline-none'
      >
        <MoreVertical className='text-foreground-soft h-5 w-5' />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-44'>
        <DropdownMenuItem>
          <Edit className='mr-2 h-4 w-4' />
          Editar paciente
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Share2 className='mr-2 h-4 w-4' />
          Encaminhar
        </DropdownMenuItem>

        <DropdownMenuItem variant='destructive'>
          <Slash className='mr-2 h-4 w-4' />
          Inativar paciente
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
