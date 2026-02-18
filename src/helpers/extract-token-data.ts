'use server'

import jwt from 'jsonwebtoken'

import { getCookie } from '@/actions/cookies'

interface ExtractTokenDataProps {
  cookie?: string
  token?: string
}

export async function extractTokenData<T>({
  cookie,
  token,
}: ExtractTokenDataProps) {
  let value: string | undefined = token

  if (cookie) {
    const cookieValue = await getCookie(cookie)
    const tokenWithoutPrefix = cookieValue?.slice(2)
    const extractedToken = tokenWithoutPrefix?.split('.').slice(0, 3).join('.')
    value = extractedToken
  }

  if (!value) return null

  const payload = jwt.decode(value) as T

  if (!payload) return null

  return payload
}
