'use server'

import jwt from 'jsonwebtoken'

import type { Role } from '@/lib/permissions/schemas'

import { getCookie } from './cookies'

export async function getUserFromToken() {
  const accessToken = await getCookie('access_token')

  if (!accessToken) return null

  const tokenWithoutPrefix = accessToken.slice(2)
  const extractedToken = tokenWithoutPrefix.split('.').slice(0, 3).join('.')

  const payload = jwt.decode(extractedToken) as { sub: string; role: Role }

  if (!payload) return null

  const id = payload.sub
  const role = payload.role

  return { id, role }
}
