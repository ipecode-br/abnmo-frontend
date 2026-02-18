'use server'

import { cookies } from 'next/headers'

import { env } from '@/config/env'

export async function getAllCookies() {
  const cookieStore = await cookies()
  return cookieStore
}

export async function getCookie(name: string) {
  const cookieStore = await cookies()
  return cookieStore.get(name)?.value
}

export async function deleteCookie(name: string) {
  const cookieStore = await cookies()

  cookieStore.delete({
    name,
    path: '/',
    domain: `.${env.NEXT_PUBLIC_DOMAIN}`,
  })
}
