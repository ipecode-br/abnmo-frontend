'use client'

import { XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { CardOverview } from '@/components/cards/card-overview'

export function OverviewModal() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  // Abre o modal assim que o componente monta
  useEffect(() => {
    setIsOpen(true)
  }, [])

  function closeModal() {
    setIsOpen(false)
    router.push('/') // ou a rota que quiser após fechar
  }

  if (!isOpen) return null

  return (
    <>
      {/* Botão X fixo no canto superior direito */}
      <button
        onClick={closeModal}
        aria-label='Fechar modal'
        className='fixed top-4 right-4 z-[60] text-gray-600 transition-colors hover:text-gray-800'
        style={{ fontSize: '28px' }}
      >
        <XIcon size={28} />
      </button>

      <div
        className='fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-[3px]'
        onClick={closeModal}
      >
        <div
          className='relative w-full max-w-lg p-6'
          onClick={(e) => e.stopPropagation()}
        >
          <CardOverview
            title='Visão Geral'
            description='Esta é uma visão geral do sistema para monitorar e gerenciar a fila de atendimento'
          ></CardOverview>
        </div>
      </div>
    </>
  )
}
