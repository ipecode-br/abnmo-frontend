'use client'

import { SearchIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input, type InputProps } from '@/components/ui/input'
import { QUERY_PARAMS } from '@/constants/params'
import { useDebounce } from '@/hooks/debounce'
import { useParams } from '@/hooks/params'
import { cn } from '@/utils/class-name-merge'

export function SearchInput({ className, ...props }: Readonly<InputProps>) {
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
    <div className='relative'>
      <Input
        size='sm'
        name='search'
        value={query}
        icon={SearchIcon}
        onChange={(e) => setQuery(e.target.value)}
        className={cn('w-52 pr-10', className)}
        {...props}
      />

      {query && (
        <Button
          size='icon'
          variant='ghost'
          title='Limpar busca'
          className='absolute top-0 right-0 size-9 [&_svg]:size-4'
          onClick={() => setQuery('')}
        >
          <XIcon />
        </Button>
      )}
    </div>
  )
}
