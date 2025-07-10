'use client'

import React from 'react'

import { Button } from './button'
import { Card } from './card'
import { Divider } from './divider'

interface ModalProps {
  isOpen: boolean
  icon?: React.ReactNode
  onCloseAction: () => void
  onConfirmAction: () => void
  title: string
  description: string
  cancelText?: string
  confirmText?: string
}

export function Modal({
  isOpen,
  icon,
  onCloseAction,
  onConfirmAction,
  title,
  description,
  cancelText,
  confirmText,
}: Readonly<ModalProps>) {
  if (!isOpen) {
    return null
  }

  const handleBackdropKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onCloseAction()
    }
  }

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={onCloseAction}
      onKeyDown={handleBackdropKeyDown}
      className='bg-foreground/25 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'
    >
      <Card
        onClick={(e) => e.stopPropagation()}
        className='w-full max-w-md p-6'
      >
        <div className='flex items-start gap-4'>
          {icon}
          <div className='flex flex-col gap-1'>
            <h2 className='text-lg font-medium'>{title}</h2>
            <p className='text-foreground-soft text-sm'>{description}</p>
          </div>
        </div>
        <Divider className='my-4' />
        <div className='grid grid-cols-2 gap-3'>
          <Button variant='outline' onClick={onCloseAction}>
            {cancelText}
          </Button>
          <Button variant='destructive' onClick={onConfirmAction}>
            {confirmText}
          </Button>
        </div>
      </Card>
    </div>
  )
}
