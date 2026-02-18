import { getAllCookies } from '@/actions/cookies'
import { env } from '@/config/env'

type ApiResponse<Data> = {
  success: boolean
  message: string
  data?: Data
}

interface ApiOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>
}

export async function api<Data>(
  path: string,
  { params, headers, ...options }: ApiOptions,
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
      ...options,
    })

    return await response.json()
  } catch (error) {
    console.error('API request error:', error)
    return {
      success: false,
      message: 'Não foi possível se conectar ao servidor.',
    } as ApiResponse<Data>
  }
}
