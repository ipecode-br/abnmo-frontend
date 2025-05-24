'use server'
import { cookies } from 'next/headers'

export async function getAllCookies() {
  const cookieStore = await cookies()
  return cookieStore
}
