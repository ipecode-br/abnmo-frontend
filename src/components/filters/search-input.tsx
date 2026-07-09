'use client'

import { SearchIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Input } from '@/components/ui-v2/input'
import { QUERY_PARAM_KEYS } from '@/enums/params'
import { useDebounce } from '@/hooks/debounce'
import { useParams } from '@/hooks/params'
import { cn } from '@/utils/class-name-merge'

import { InputButton } from '../ui/input-button'

interface SearchInputProps {
  placeholder: string
  className?: string
}

export function SearchInput({
  placeholder,
  className,
}: Readonly<SearchInputProps>) {
  const searchParam = QUERY_PARAM_KEYS.search
  const pageParam = QUERY_PARAM_KEYS.page

  const { getParam, updateParams } = useParams()
  const searchQuery = getParam(searchParam) || ''

  const [query, setQuery] = useState(searchQuery)
  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    updateParams({
      set: [{ key: searchParam, value: debouncedQuery }],
      remove: !debouncedQuery ? [searchParam, pageParam] : [pageParam],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery])

  useEffect(() => {
    if (!searchQuery) setQuery('')
  }, [searchQuery])

  return (
    <div className={cn('relative flex items-center', className)}>
      <SearchIcon className='text-disabled absolute left-3 size-5' />
      <Input
        name='search'
        value={query}
        className='px-10'
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <InputButton
          className='right-1'
          aria-label='Limpar pesquisa'
          onClick={() => setQuery('')}
        >
          <XIcon />
        </InputButton>
      )}
    </div>
  )
}
