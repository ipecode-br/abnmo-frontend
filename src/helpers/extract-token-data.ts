import jwt from 'jsonwebtoken'

export async function extractTokenData<T>(token: string) {
  if (!token) return null

  const payload = jwt.decode(token) as T

  if (!payload) return null

  return payload
}
