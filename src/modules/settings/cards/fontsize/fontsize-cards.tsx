'use client'

import { useState } from 'react'

import { FontSizeCard } from '@/modules/settings/cards/fontsize'

type FontSize = 'small' | 'medium' | 'large'

export function FontSizeCards() {
  const [selectedSize, setSelectedSize] = useState<FontSize>('medium')

  return (
    <div className='flex gap-4'>
      <FontSizeCard
        sizeLabel='Pequeno'
        isSelected={selectedSize === 'small'}
        onClick={() => setSelectedSize('small')}
      />
      <FontSizeCard
        sizeLabel='Médio'
        textDisplayClass='text-xl'
        isSelected={selectedSize === 'medium'}
        onClick={() => setSelectedSize('medium')}
      />
      <FontSizeCard
        sizeLabel='Grande'
        textDisplayClass='text-2xl'
        isSelected={selectedSize === 'large'}
        onClick={() => setSelectedSize('large')}
      />
    </div>
  )
}
