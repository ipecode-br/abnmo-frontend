'use server'

import { updateTag } from 'next/cache'

export async function revalidateServerCache(tags: string | string[]) {
  if (Array.isArray(tags)) {
    for (const tag of tags) {
      updateTag(tag)
    }
    return
  }

  updateTag(tags)
}
