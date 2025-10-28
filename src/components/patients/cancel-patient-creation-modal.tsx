import { CircleAlertIcon } from 'lucide-react'

import { Button } from '../ui/button'
import { DialogClose } from '../ui/dialog/close'
import { DialogContainer } from '../ui/dialog/container'
import { DialogDescription } from '../ui/dialog/description'
import { DialogFooter } from '../ui/dialog/footer'
import { DialogHeader } from '../ui/dialog/header'
import { DialogTitle } from '../ui/dialog/title'

interface CancelPatientCreationModalProps {
  onConfirm: () => void
}

export default function CancelPatientCreationModal({
  onConfirm,
}: CancelPatientCreationModalProps) {
  return (
    <DialogContainer>
      <DialogHeader
        icon={CircleAlertIcon}
        iconClassName='bg-error/10 text-error'
        className='border-none'
      >
        <DialogTitle>Cancelar o cadastro do paciente?</DialogTitle>
        <DialogDescription>
          Esta ação é irreversível e todo o progresso será perdido.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          type='button'
          className='bg-error hover:bg-error/80 flex-1'
          onClick={onConfirm}
        >
          Cancelar cadastro
        </Button>
        <DialogClose className='flex-1'>Voltar</DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
