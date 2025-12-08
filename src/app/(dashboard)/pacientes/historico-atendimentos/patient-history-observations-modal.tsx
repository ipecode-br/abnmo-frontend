'use client'

import { AlertTriangle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import type { PatientHistory } from './patient-history.types'

interface Props {
  data: PatientHistory | null
  onClose: () => void
}

export default function PatientHistoryObservationsModal({
  data,
  onClose,
}: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClose = () => {
    onClose()
  }

  if (!mounted || !data) return null

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
      onClick={handleClose}
    >
      <div
        className='relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
          onClick={handleClose}
        >
          <X size={20} />
        </button>
        <div className='flex items-center gap-4'>
          <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100'>
            <AlertTriangle className='h-6 w-6 text-orange-600' />
          </div>
          <div className='flex flex-col'>
            <h2 className='text-[16px] font-semibold text-gray-900'>
              Observação do atendimento
            </h2>
            <p className='mt-1 text-[14px] text-gray-700'>
              O atendimento foi direcionado à equipe competente, que seguirá com
              a análise e retorno.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
