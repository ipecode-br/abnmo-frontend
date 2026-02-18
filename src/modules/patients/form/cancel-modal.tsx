import { CircleAlertIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from '@/components/ui/dialog'

interface CancelPatientFormModalProps {
  onConfirm: () => void
}

export default function CancelPatientFormModal({
  onConfirm,
}: Readonly<CancelPatientFormModalProps>) {
  return (
    <DialogContainer>
      <DialogHeader
        icon={<DialogIcon icon={CircleAlertIcon} variant='destructive' />}
      >
        <DialogTitle>Cancelar cadastro</DialogTitle>
      </DialogHeader>
      <DialogContent className='space-y-2'>
        <p>Tem certeza que deseja cancelar o cadastro deste paciente?</p>
        <p>Esta ação é irreversível e todo o progresso será perdido.</p>
      </DialogContent>
      <DialogFooter>
        <Button className='flex-1' variant='destructive' onClick={onConfirm}>
          Cancelar cadastro
        </Button>
        <DialogClose className='flex-1'>Voltar</DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
