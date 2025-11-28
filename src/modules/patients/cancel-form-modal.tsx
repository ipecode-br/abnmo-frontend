import { CircleAlertIcon } from 'lucide-react'

import { Button } from '../../components/ui/button'
import {
  DialogClose,
  DialogContainer,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from '../../components/ui/dialog'

interface CancelPatientFormModalProps {
  onConfirm: () => void
}

export default function CancelPatientFormModal({
  onConfirm,
}: Readonly<CancelPatientFormModalProps>) {
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
        <Button className='flex-1' variant='destructive' onClick={onConfirm}>
          Cancelar cadastro
        </Button>
        <DialogClose className='flex-1'>Voltar</DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
