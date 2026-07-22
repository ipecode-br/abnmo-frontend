'use server'

import { setCookie } from './cookies'

export async function toggleSidebar(expanded: boolean) {
  await setCookie('sidebar_expanded', String(expanded))
}
