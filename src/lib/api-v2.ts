import { redirect } from 'next/navigation'

import { getAllCookies } from '@/actions/cookies'
import { env } from '@/config/env'
import { ROUTES } from '@/constants/routes'

type ApiResponse<Data> = {
  success: boolean
  message: string
  data?: Data
}

interface ApiOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | undefined | null>
  body?: Record<string, unknown>
}

export async function api<Data>(
  path: string,
  { params, headers, body, ...options }: ApiOptions = {},
): Promise<ApiResponse<Data>> {
  const isServerSide = typeof window === 'undefined'

  try {
    if (isServerSide) {
      const cookies = await getAllCookies()
      headers = { ...headers, Cookie: cookies.toString() }
    }

    const url = new URL(path, env.NEXT_PUBLIC_API_URL)

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      }
    }

    const response = await fetch(url.toString(), {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    })

    const preventClearSession = [
      '/login',
      '/register/user',
      '/recover-password',
      '/reset-password',
    ].includes(url.pathname)

    if (response.status === 401 && !preventClearSession) {
      if (isServerSide) {
        redirect(ROUTES.auth.clearSession)
      } else {
        window.location.href = ROUTES.auth.clearSession
      }
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error
    }

    console.error('API request error:', error)

    return {
      success: false,
      message: 'Não foi possível se conectar ao servidor.',
    } as ApiResponse<Data>
  }
}
