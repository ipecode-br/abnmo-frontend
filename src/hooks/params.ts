'use client'

import { useRouter, useSearchParams } from 'next/navigation'

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

  function getParam(key: string): string | null {
    return searchParams.get(key)
  }

  function updateParams({ set, remove }: Readonly<UpdateParamsProps>) {
    const pageParams = new URLSearchParams(searchParams)

    if (set) {
      for (const param of set) {
        pageParams.set(param.key, String(param.value))
      }
    }

    if (remove) {
      for (const param of remove) {
        pageParams.delete(param)
      }
    }

    router.replace(`?${pageParams.toString()}`)
  }

  return {
    searchParams,
    getParam,
    updateParams,
  }
}
