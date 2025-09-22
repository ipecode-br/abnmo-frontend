'use server'

import { cookies } from 'next/headers'

export async function getAllCookies() {
  const cookieStore = await cookies()
  return cookieStore
}

export async function getCookie(name: string) {
  const cookieStore = await cookies()
  return cookieStore.get(name)?.value
}
