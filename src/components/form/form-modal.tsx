'use client'

import React from 'react'

interface FormModalProps {
  isOpen: boolean
  title: string
  description?: string
  onClose: () => void
  children: React.ReactNode
}

export function FormModal({
  isOpen,
  title,
  description,
  onClose,
  children,
}: Readonly<FormModalProps>) {
  if (!isOpen) return null

  const handleBackdropKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClose()
    }
  }

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={onClose}
      onKeyDown={handleBackdropKeyDown}
      className='bg-foreground/25 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-background w-full max-w-lg rounded-2xl p-6 shadow-lg'
      >
        <div className='flex flex-col gap-1'>
          <h2 className='text-lg font-medium'>{title}</h2>
          {description && (
            <p className='text-foreground-soft text-sm'>{description}</p>
          )}
        </div>

        <div className='mt-4'>{children}</div>
      </div>
    </div>
  )
}
