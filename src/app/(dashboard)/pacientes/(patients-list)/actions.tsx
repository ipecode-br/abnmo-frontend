import { CircleXIcon, Edit, EllipsisIcon, SendIcon } from 'lucide-react'

import { Divider } from '@/components/ui/divider'
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
        className='size-8'
      >
        <EllipsisIcon />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <Edit />
          Editar paciente
        </DropdownMenuItem>

        <DropdownMenuItem>
          <SendIcon />
          Encaminhar
        </DropdownMenuItem>

        <Divider />

        <DropdownMenuItem variant='destructive'>
          <CircleXIcon />
          Inativar paciente
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
