'use client'

import { ChevronFirstIcon, ChevronLastIcon } from 'lucide-react'

import { useParams } from '@/hooks/params'

import { PaginationButton } from './button'

type PageButtonValue = {
  key: string | number
  value: '...' | number
}

interface PaginationProps {
  totalItems: number
  perPage?: number
  maxPageButtons?: number
}

export function Pagination({
  totalItems,
  perPage = 10,
  maxPageButtons = 7,
}: Readonly<PaginationProps>) {
  const { getParam, updateParams } = useParams()

  if (totalItems <= 0) {
    return null
  }

  const currentPage = Number(getParam('page')) || 1
  const totalPages = Math.ceil(totalItems / perPage)
  const lastPageItems = totalItems - (totalPages - 1) * perPage

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages
  const showFirstAndLastArrowButtons = totalItems > perPage

  function getCurrentItems() {
    if (totalItems < perPage) return totalItems
    if (isLastPage) return `${totalItems - lastPageItems}-${totalItems}`

    const startItems = (currentPage - 1) * perPage
    const endItems = startItems + perPage

    return `${startItems}-${endItems}`
  }

  function generatePageButtonValues(startPage = 1): PageButtonValue[] {
    const length = totalPages < maxPageButtons ? totalPages : maxPageButtons
    return Array.from({ length }).map((_, index) => {
      const value = index + startPage
      return { key: value, value }
    })
  }

  function generatePageButtons() {
    if (totalPages <= maxPageButtons) {
      return generatePageButtonValues()
    }

    const middlePosition = Math.floor(maxPageButtons / 2)
    const showFirstPageButton = currentPage - middlePosition > 1
    const renderLastPageButtons = currentPage + middlePosition >= totalPages

    let startPage = currentPage - middlePosition

    if (renderLastPageButtons) {
      startPage = totalPages - maxPageButtons + 1
    }

    const pageButtons = generatePageButtonValues(startPage > 1 ? startPage : 1)

    if (showFirstPageButton) {
      pageButtons[0] = { key: 1, value: 1 }
      pageButtons[1] = { key: 'first...', value: '...' }
    }

    if (!renderLastPageButtons) {
      pageButtons[maxPageButtons - 2] = { key: 'last...', value: '...' }
      pageButtons[maxPageButtons - 1] = { key: totalPages, value: totalPages }
    }

    return pageButtons
  }

  function handlePaginate(page: number) {
    updateParams({
      remove: page <= 1 ? ['page'] : undefined,
      set: page > 1 ? [{ key: 'page', value: page }] : undefined,
    })
  }

  const pageButtons = generatePageButtons()

  return (
    <div className='text-foreground-soft grid grid-cols-[10rem_1fr_10rem] items-center gap-2'>
      <div>
        Exibindo {getCurrentItems()} {totalItems > 1 ? 'itens' : 'item'}
      </div>

      <div className='flex justify-center gap-2'>
        {showFirstAndLastArrowButtons && (
          <PaginationButton
            variant='ghost'
            title='Primeira página'
            disabled={isFirstPage}
            className='w-8 disabled:opacity-25'
            onClick={() => handlePaginate(1)}
          >
            <ChevronFirstIcon />
          </PaginationButton>
        )}

        {pageButtons.map((page) => (
          <PaginationButton
            key={page.key}
            disabled={page.value === '...'}
            active={page.value === currentPage}
            onClick={() =>
              page.value !== '...' ? handlePaginate(page.value) : null
            }
          >
            {page.value}
          </PaginationButton>
        ))}

        {showFirstAndLastArrowButtons && (
          <PaginationButton
            variant='ghost'
            title='Última página'
            disabled={isLastPage}
            className='w-8 disabled:opacity-25'
            onClick={() => handlePaginate(totalPages)}
          >
            <ChevronLastIcon />
          </PaginationButton>
        )}
      </div>

      <div className='text-right'>
        Página {currentPage} de {totalPages}
      </div>
    </div>
  )
}
