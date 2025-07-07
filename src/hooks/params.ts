'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'

type ParamType = {
  key: string
  value: string | number
}

interface UpdateParamsProps {
  set?: ParamType[]
  remove?: string[]
}

export function useParams() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  function getParam(key: string): string | null {
    return searchParams.get(key)
  }

  const updateParams = useCallback(
    ({ set, remove }: UpdateParamsProps) => {
      const params = new URLSearchParams(searchParams.toString())

      if (set) {
        for (const { key, value } of set) {
          params.set(key, String(value))
        }
      }

      if (remove) {
        for (const key of remove) {
          params.delete(key)
        }
      }

      startTransition(() => {
        router.replace(`?${params.toString()}`)
      })
    },
    [router, searchParams],
  )

  return {
    searchParams,
    getParam,
    updateParams,
  }
}
