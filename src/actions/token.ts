'use server'

import jwt from 'jsonwebtoken'

import type { Role } from '@/lib/permissions/schemas'

import { getCookie } from './cookies'

export async function getDataFromToken() {
  const accessTokenCookie = await getCookie('access_token')

  if (!accessTokenCookie) return null

  const tokenWithoutPrefix = accessTokenCookie.slice(2)
  const extractedToken = tokenWithoutPrefix.split('.').slice(0, 3).join('.')

  const payload = jwt.decode(extractedToken) as { sub: string; role: string }

  const userId = payload?.sub
  const userRole = payload?.role as Role | undefined

  return { userId, userRole }
}
