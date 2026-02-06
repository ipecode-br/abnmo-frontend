import { queryClient } from '@/lib/tanstack-query'

export async function revalidateClientCache(keys: string | string[]) {
  if (Array.isArray(keys)) {
    for (const key of keys) {
      queryClient.invalidateQueries({ queryKey: [key] })
    }
    return
  }

  queryClient.invalidateQueries({ queryKey: [keys] })
}
