import { AlertTriangle } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Props {
  open: boolean
  onClose: () => void
}

export default function ObservationModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-md p-6'>
        <DialogHeader>
          <div className='mb-2 flex items-center gap-3'>
            <div
              className='flex h-12 w-12 items-center justify-center rounded-full'
              style={{ backgroundColor: '#FCE8D9' }}
            >
              <AlertTriangle size={28} color='#F17B2C' />
            </div>
            <DialogTitle className='text-xl font-semibold'>
              Observação do atendimento
            </DialogTitle>
          </div>
        </DialogHeader>

        <p className='text-base text-gray-700'>
          O atendimento foi direcionado à equipe competente, que seguirá com a
          análise e retorno.
        </p>
      </DialogContent>
    </Dialog>
  )
}
