'use client'
import { cva, VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { ReactNode } from 'react'

import { useAnimatedUnmount } from '@/hooks/animatedUnmount'
import { useModal } from '@/store/modal'
import { cn } from '@/utils/class-name-merge'

import { Button } from '../ui/button'

const contentVariants = cva(
  'bg-background relative w-full rounded-xl p-8 shadow-xl transition-all duration-300 ease-out',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

interface ModalContentProps extends VariantProps<typeof contentVariants> {
  children: ReactNode
  className?: string
  unstyled?: boolean
  hideCloseButton?: boolean
}

export function ModalContent({
  children,
  className,
  unstyled = false,
  hideCloseButton = false,
  size,
}: Readonly<ModalContentProps>) {
  const { close, isOpen } = useModal()
  const { isAnimating, animatedElementRef } = useAnimatedUnmount(isOpen)

  return (
    <div
      className={cn(
        !unstyled && contentVariants({ size }),
        isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
        className,
      )}
      ref={animatedElementRef}
    >
      {!unstyled && !hideCloseButton && (
        <Button
          className='absolute top-8 right-8 p-1.5'
          variant='ghost'
          size='close'
          onClick={close}
        >
          <X />
        </Button>
      )}
      {children}
    </div>
  )
}
