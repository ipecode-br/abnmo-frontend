'use client'

import { SearchIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { QUERY_PARAMS } from '@/constants/params'
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
  const queryParam = QUERY_PARAMS.search
  const pageParam = QUERY_PARAMS.page

  const { getParam, updateParams } = useParams()
  const searchQuery = getParam(queryParam) || ''

  const [query, setQuery] = useState(searchQuery)
  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    updateParams({
      set: [{ key: queryParam, value: debouncedQuery }],
      remove: !debouncedQuery ? [queryParam, pageParam] : [pageParam],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery])

  useEffect(() => {
    if (!searchQuery) setQuery('')
  }, [searchQuery])

  return (
    <div className={cn('relative', className)}>
      <Input
        size='sm'
        name='search'
        value={query}
        icon={SearchIcon}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className='w-full pr-10'
      />

      {query && (
        <Button
          size='icon'
          variant='ghost'
          title='Limpar pesquisa'
          className='absolute top-0 right-0 size-9 [&_svg]:size-4'
          onClick={() => setQuery('')}
        >
          <XIcon />
        </Button>
      )}
    </div>
  )
}
