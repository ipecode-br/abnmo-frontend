'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateCache(tags: string | string[]) {
  if (Array.isArray(tags)) {
    for (const tag of tags) {
      revalidateTag(tag)
    }
    return
  }

  revalidateTag(tags)
}
