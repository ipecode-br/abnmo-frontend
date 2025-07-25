'use client'

import { CheckIcon, UsersRound, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { CardDataDisplay } from '@/components/cards/card-data-display'

export default function ExibicaoDadosModal() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsOpen(true)
  }, [])

  function closeModal() {
    setIsOpen(false)
    router.push('/')
  }

  if (!isOpen) return null

  return (
    <>
      <button
        onClick={closeModal}
        aria-label='Fechar modal'
        className='fixed top-4 right-4 z-[60] text-gray-600 transition-colors hover:text-gray-800'
      >
        <XIcon size={28} />
      </button>

      <div
        className='fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-[3px]'
        onClick={closeModal}
      >
        <div
          className='relative w-full max-w-3xl p-6'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
            <CardDataDisplay
              className='min-w-[200px]'
              title={
                <p className='uppercase'>
                  <span className='font-bold text-gray-700'>TOTAL</span> DE
                  PACIENTES
                </p>
              }
              value={120}
              icon={
                <div className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white'>
                  <UsersRound className='text-green-700' size={14} />
                </div>
              }
            />

            <CardDataDisplay
              className='min-w-[200px]'
              title={
                <p className='uppercase'>
                  TOTAL DE PACIENTES{' '}
                  <span className='font-bold text-gray-700'>ATIVOS</span>
                </p>
              }
              value={80}
              icon={
                <div className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white'>
                  <div className='flex h-4 w-4 items-center justify-center rounded-full bg-green-700'>
                    <CheckIcon className='text-white' size={9} />
                  </div>
                </div>
              }
            />

            <CardDataDisplay
              className='min-w-[200px]'
              title={
                <p className='uppercase'>
                  TOTAL DE PACIENTES{' '}
                  <span className='font-bold text-gray-700'>INATIVOS</span>
                </p>
              }
              value={40}
              icon={
                <div className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white'>
                  <div className='flex h-4 w-4 items-center justify-center rounded-full bg-red-700'>
                    <XIcon className='text-white' size={9} />
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}
