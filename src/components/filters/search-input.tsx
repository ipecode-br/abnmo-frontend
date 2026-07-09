'use client'

import { SearchIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui-v2/input'
import { QUERY_PARAM_KEYS } from '@/enums/params'
import { useDebounce } from '@/hooks/debounce'
import { useParams } from '@/hooks/params'
import { cn } from '@/utils/class-name-merge'

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
    <div className={cn('relative', className)}>
      <span className='absolute top-1 left-1 size-7 rounded-md [&_svg]:size-4'>
        <SearchIcon />
      </span>
      <Input
        name='search'
        value={query}
        className='w-full pr-10'
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <Button
          variant='ghost'
          title='Limpar pesquisa'
          className='absolute top-1 right-1 size-7 rounded-md [&_svg]:size-4'
          onClick={() => setQuery('')}
        >
          <XIcon />
        </Button>
      )}
    </div>
  )
}
