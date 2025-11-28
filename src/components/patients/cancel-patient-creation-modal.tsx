import { CircleAlertIcon } from 'lucide-react'

import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContainer,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from '../ui/dialog'

interface CancelPatientCreationModalProps {
  onConfirm: () => void
}

export default function CancelPatientCreationModal({
  onConfirm,
}: Readonly<CancelPatientCreationModalProps>) {
  return (
    <DialogContainer>
      <DialogHeader
        icon={
          <DialogIcon
            icon={CircleAlertIcon}
            className='bg-error/10 text-error'
          />
        }
      >
        <DialogTitle>Cancelar o cadastro do paciente?</DialogTitle>
        <DialogDescription>
          Esta ação é irreversível e todo o progresso será perdido.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant='destructive' onClick={onConfirm}>
          Cancelar cadastro
        </Button>
        <DialogClose className='flex-1'>Voltar</DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
