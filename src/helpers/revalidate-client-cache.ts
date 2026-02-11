import { queryClient } from '@/lib/tanstack-query'

export function revalidateClientCache(keys: string | string[] | 'all') {
  if (keys === 'all') {
    queryClient.clear()
    return
  }

  if (Array.isArray(keys)) {
    for (const key of keys) {
      queryClient.invalidateQueries({ queryKey: [key] })
    }
    return
  }

  queryClient.invalidateQueries({ queryKey: [keys] })
}
