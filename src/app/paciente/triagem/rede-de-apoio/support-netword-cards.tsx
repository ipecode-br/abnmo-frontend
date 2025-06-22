import { Trash2Icon, UserIcon } from 'lucide-react'

import type { ScreeningSupportNetworkFormSchema } from '@/app/paciente/triagem/rede-de-apoio/support-network-form-schema'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ScreeningSupportNetworkCardsProps {
  contacts: ScreeningSupportNetworkFormSchema[]
  isPending?: boolean
  onRemove: (name: string) => void
}

export function ScreeningSupportNetworkCards({
  contacts,
  isPending,
  onRemove,
}: Readonly<ScreeningSupportNetworkCardsProps>) {
  if (contacts.length <= 0) return null

  return (
    <div className='space-y-4'>
      <p className='text-sm font-medium'>Contatos adicionados:</p>
      {contacts.map((contact) => (
        <Card key={contact.name} className='flex items-center gap-3'>
          <div className='border-border rounded-full border p-2'>
            <UserIcon className='text-disabled size-5' />
          </div>

          <div className='space-y-1'>
            <p className='text-sm font-medium'>{contact.name}</p>
            <p className='text-disabled text-xs'>
              {contact.kinship} | {contact.phone}
            </p>
          </div>

          <Button
            size='xs'
            type='button'
            variant='ghost'
            disabled={isPending}
            className='text-error ml-auto'
            onClick={() => onRemove(contact.name)}
          >
            <Trash2Icon />
            Remover
          </Button>
        </Card>
      ))}
    </div>
  )
}
