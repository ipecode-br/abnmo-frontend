'use client'

import { cva, VariantProps } from 'class-variance-authority'
import { ReactNode } from 'react'

import { useAnimatedUnmount } from '@/hooks/animatedUnmount'
import { useModal } from '@/store/modal'
import { cn } from '@/utils/class-name-merge'

import { ReactPortal } from '../react-portal'

const modalVariants = cva(
  'bg-accent-foreground/50 absolute top-0 left-0 flex h-full w-full',
  {
    variants: {
      position: {
        center: 'items-center justify-center',
        right: 'items-center justify-end',
      },
    },
    defaultVariants: {
      position: 'center',
    },
  },
)
interface ModalProps extends VariantProps<typeof modalVariants> {
  children: ReactNode
  contentClassName?: string
}

export function Modal({ position, children }: Readonly<ModalProps>) {
  const { isOpen } = useModal()
  const { isAnimating, shouldRender, animatedElementRef } =
    useAnimatedUnmount(isOpen)

  if (!shouldRender) return null

  return (
    <ReactPortal containerId='modal-root'>
      <div
        className={cn(
          modalVariants({ position }),
          'transition-opacity duration-300 ease-out',
          isAnimating ? 'opacity-100' : 'opacity-0',
        )}
        ref={animatedElementRef}
      >
        {children}
      </div>
    </ReactPortal>
  )
}
