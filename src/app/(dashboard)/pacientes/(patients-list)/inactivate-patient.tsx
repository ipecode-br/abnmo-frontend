'use client'

import { DialogContent } from '@radix-ui/react-dialog'
import { CircleXIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import type { PatientType } from '@/types/patients'

interface PatientInactivateModalProps {
  open: boolean
  onClose: () => void
  patientId: string
}

export function PatientInactivateModal({
  open,
  onClose,
  patientId,
}: PatientInactivateModalProps) {
  const [patient, setPatient] = useState<PatientType | null>(null)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const patientName = patient?.user.name ?? ''

  const isValid = inputValue.trim().toLowerCase() === patientName.toLowerCase()

  useEffect(() => {
    if (open) {
      setLoading(true)
      api<{ patient: PatientType }>(`/patients/${patientId}`)
        .then((res) => {
          if (res.data) {
            setPatient(res.data.patient)
          }
        })
        .finally(() => setLoading(false))
    }
  }, [open, patientId])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='border-border max-w-lg overflow-hidden rounded-2xl border p-0'>
        <div className='border-border flex items-center justify-between border-b px-6 py-4'>
          <div className='flex items-center gap-3'>
            <CircleXIcon className='text-color-error size-6' />
            <div>
              <h2 className='text-lg font-semibold'>
                {loading ? 'Carregando...' : `Inativar ${patientName}?`}
              </h2>
              {!loading && (
                <p className='text-foreground-soft text-sm'>
                  Confirme a inativação deste paciente.
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className='text-disabled hover:text-foreground'
          >
            <XIcon className='size-5' />
          </button>
        </div>

        {!loading && (
          <div className='border-border border-b px-6 py-6'>
            <Label className='text-sm font-medium'>
              Digite o nome completo do paciente:
            </Label>
            <Input
              className='mt-2'
              placeholder='Nome do paciente'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <h3 className='mt-3 text-sm font-semibold'>
              Nome do paciente: {patientName}
            </h3>
          </div>
        )}

        {!loading && (
          <div className='flex justify-end gap-3 px-6 py-4'>
            <Button variant='outline' onClick={onClose}>
              Cancelar
            </Button>
            <Button
              disabled={!isValid}
              className={
                isValid ? 'bg-color-warning text-white hover:opacity-90' : ''
              }
            >
              Inativar paciente
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
